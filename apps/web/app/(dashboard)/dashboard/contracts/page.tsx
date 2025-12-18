"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import { ScrollArea } from "@repo/ui/components/ui/scroll-area";
import { ContractServices } from "@/services/contractServices";
import { Plus, Eye, Edit, Trash2, Play } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";
import { FormTextfield } from "@repo/ui/components/composable/FormTextfield";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { SmartContractSchema } from "@/validators/contract-validator";
import { OrganizationServices } from "@/services/organizationServices";

type ContractFormData = z.infer<typeof SmartContractSchema>;

interface ContractFormProps {
  onSubmit: (data: ContractFormData) => void;
  loading?: boolean;
}
function ContractForm({ onSubmit, loading }: ContractFormProps) {
  const [organisations, setOrganisations] = useState([]);
  const form = useForm<ContractFormData>({
    resolver: zodResolver(SmartContractSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "DRAFT",
      content: "",
      version: 0,
      chainId: 1,
      smartContractAddress: undefined,
      deploymentTxHash: undefined,
      gasEstimate: undefined,
      gasCost: undefined,
      smartContractCode: "",
      requiredSigners: 0,
      organizationId: "",
    },
  });

  useEffect(() => {
    const getOrganisations = async () => {
      const data = await OrganizationServices.getAllOrganizations();
      console.log(data)
      setOrganisations(data)
    }
    getOrganisations();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 overflow-auto"
      >
        {/* TITLE */}
        <FormTextfield
          form={form}
          name="title"
          label="Titre du contrat"
          placeholder="Mon contrat intelligent"
        />

        {/* DESCRIPTION */}
        <FormTextfield
          form={form}
          name="description"
          label="Description"
          placeholder="Description du contrat"
        />

        {/* STATUS */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="DRAFT">Draft</SelectItem>
                  <SelectItem value="PUBLISHED">Published</SelectItem>
                  <SelectItem value="DEPLOYED">Deployed</SelectItem>
                  <SelectItem value="ARCHIVED">Archived</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="organizationId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organisations && organisations.map((org) => (
                    <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* VERSION */}
        <FormTextfield
          form={form}
          name="version"
          label="Version"
          placeholder="Entrer la version"
          type="number" />

        {/* CHAIN ID */}
        <FormTextfield
          form={form}
          name="chainId"
          label="Chain ID"
          placeholder="Entrer la chain ID"
          type="number" />

        {/* CONTENT */}
        <FormTextfield
          form={form}
          name="content"
          label="Description technique"
          placeholder="Description fonctionnelle du contrat"
        />

        {/* SMART CONTRACT CODE */}
        <FormTextfield
          form={form}
          name="smartContractCode"
          label="Code source Solidity"
          placeholder="// pragma solidity ^0.8.0;"
          className="min-h-[220px] font-mono"
        />

        {/* SMART CONTRACT ADDRESS */}
        <FormTextfield
          form={form}
          name="smartContractAddress"
          label="Adresse du smart contract"
          placeholder="0x..."
          description="Optionnel – après déploiement"
        />

        {/* DEPLOYMENT TX HASH */}
        <FormTextfield
          form={form}
          name="deploymentTxHash"
          label="Transaction de déploiement"
          placeholder="0x..."
          description="Optionnel – requis si DEPLOYED"
        />

        {/* GAS ESTIMATE */}
        <FormTextfield
          form={form}
          name="gasEstimate"
          label="Gas estimé"
          placeholder="Entrer la Gas estimé"
          type="number" />

        {/* GAS COST */}
        <FormTextfield
          form={form}
          name="gasCost"
          label="Coût du gas"
          placeholder="ex: 45000000000"
          description="Optionnel – chaîne numérique"
        />

        {/* REQUIRED SIGNERS */}
        <FormTextfield
          form={form}
          name="requiredSigners"
          label="Signataires requis"
          placeholder="Entrer la Signataires requis"
          type="number" />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Création..." : "Créer le contrat"}
        </Button>
      </form>
    </Form>
  );
}


export default function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCreateContract = async (data: ContractFormData) => {
    setLoading(true);
    try {
      console.log("form data: ", data.organizationId)
      const result = await ContractServices.createContract(data);

      if (result) {
        setContracts([...contracts, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating contract:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeployContract = async (id: string) => {
    try {
      const result = await ContractServices.getAllContracts();

      if (result.success) {
        setContracts(
          contracts.map((contract) =>
            contract.id === id ? { ...contract, status: "deployed" } : contract
          )
        );
      }
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      draft: "secondary",
      deployed: "default",
      error: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Contrats Intelligents
          </h1>
          <p className="text-gray-600">Gérez vos contrats intelligents</p>
        </div>

        <Sheet open={dialogOpen} onOpenChange={setDialogOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau contrat
            </Button>
          </SheetTrigger>
          <SheetContent className="max-w-2xl p-4">
            <SheetHeader>
              <SheetTitle>Créer un nouveau contrat</SheetTitle>
              <SheetDescription>
                Définissez les caractéristiques de votre contrat intelligent
              </SheetDescription>
            </SheetHeader>
            <ContractForm onSubmit={handleCreateContract} loading={loading} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Contracts List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des contrats</CardTitle>
          <CardDescription>
            {contracts.length} contrat(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contracts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Aucun contrat trouvé</p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Créer votre premier contrat
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {contracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{contract.name}</h4>
                        {getStatusBadge(contract.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">
                        {contract.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Type: {contract.type}</span>
                        <span>Réseau: {contract.network}</span>
                        {contract.address && (
                          <span>
                            Adresse: {contract.address.slice(0, 10)}...
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      {contract.status === "draft" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeployContract(contract.id)}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
