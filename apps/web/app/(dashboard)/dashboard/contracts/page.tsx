"use client";

import { useEffect, useState } from "react";
import { ContractServices } from "@/services/contractServices";
import { OrganizationServices } from "@/services/organizationServices";
import { SmartContractSchema } from "@/validators/contract-validator";
import * as z from "zod";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { GenericForm } from "@/components/generic-form";
import { Eye, Edit, Trash2, Play } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

type ContractFormData = z.infer<typeof SmartContractSchema>;

interface ContractFormProps {
  onSubmit: (data: ContractFormData) => void;
  loading?: boolean;
}

function ContractForm({ onSubmit, loading }: ContractFormProps) {
  const [organisations, setOrganisations] = useState([]);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    const getOrganisations = async () => {
      const data = await OrganizationServices.getAllOrganizations(
        token as string,
      );
      setOrganisations(data);
    };
    getOrganisations();
  }, []);

  const formFields = [
    {
      name: "title",
      label: "Titre du contrat",
      placeholder: "Mon contrat intelligent",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Description du contrat",
    },
    {
      name: "status",
      label: "Status",
      type: "select" as const,
      options: [
        { value: "DRAFT", label: "Draft" },
        { value: "PENDING_REVIEW", label: "Pending Review" },
        { value: "PENDING_SIGNATURE", label: "Pending Signature" },
        { value: "SIGNED", label: "Signed" },
        { value: "EXECUTED", label: "Executed" },
        { value: "ARCHIVED", label: "Archived" },
        { value: "REJECTED", label: "Rejected" },
        { value: "CANCELLED", label: "Cancelled" },
      ],
    },
    {
      name: "organizationId",
      label: "Organization",
      type: "select" as const,
      options: organisations.map(({ id, name }: any) => ({
        value: id,
        label: name,
      })),
    },
    {
      name: "version",
      label: "Version",
      type: "number" as const,
      placeholder: "Entrer la version",
    },
    {
      name: "chainId",
      label: "Chain ID",
      type: "number" as const,
      placeholder: "Entrer la chain ID",
    },
    {
      name: "content",
      label: "Description technique",
      placeholder: "Description fonctionnelle du contrat",
    },
    {
      name: "smartContractCode",
      label: "Code source Solidity",
      type: "textarea" as const,
      placeholder: "// pragma solidity ^0.8.0;",
      className: "min-h-[220px] font-mono",
    },
    {
      name: "smartContractAddress",
      label: "Adresse du smart contract",
      placeholder: "0x...",
      description: "Optionnel – après déploiement",
    },
    {
      name: "deploymentTxHash",
      label: "Transaction de déploiement",
      placeholder: "0x...",
      description: "Optionnel – requis si DEPLOYED",
    },
    {
      name: "gasEstimate",
      label: "Gas estimé",
      type: "number" as const,
      placeholder: "Entrer la Gas estimé",
    },
    {
      name: "gasCost",
      label: "Coût du gas",
      placeholder: "ex: 45000000000",
      description: "Optionnel – chaîne numérique",
    },
    {
      name: "requiredSigners",
      label: "Signataires requis",
      type: "number" as const,
      placeholder: "Entrer les signataires requis",
    },
  ];

  return (
    <GenericForm
      schema={SmartContractSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Création..." : "Créer le contrat"}
      loading={loading}
      defaultValues={{
        status: "DRAFT",
        version: 0,
        requiredSigners: 0,
      }}
    />
  );
}

export default function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = useAuthStore().token;

  useEffect(() => {
    const getContracts = async () => {
      const data = await ContractServices.getAllContracts(token as string);
      setContracts(data);
    };
    getContracts();
  }, []);

  const handleCreateContract = async (data: ContractFormData) => {
    setLoading(true);
    try {
      console.log("form data: ", data.organizationId);
      const result = await ContractServices.createContract(
        data,
        token as string,
      );

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
      const result = await ContractServices.deployContract(id, token as string);

      if (result.success) {
        setContracts(
          contracts.map((contract) =>
            contract.id === id ? { ...contract, status: "deployed" } : contract,
          ),
        );
      }
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  const handleViewContract = (contract: any) => {
    // TODO: Implement view functionality
    console.log("View contract:", contract);
  };

  const handleEditContract = (contract: any) => {
    // TODO: Implement edit functionality
    console.log("Edit contract:", contract);
  };

  const handleDeleteContract = (contract: any) => {
    // TODO: Implement delete functionality
    console.log("Delete contract:", contract);
  };

  const getStatusVariant = (
    status: string,
  ): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      deployed: "default",
      draft: "secondary",
      error: "destructive",
    };
    return variants[status.toLowerCase()] || "outline";
  };

  const renderContractCard = (contract: any, index: number) => (
    <EntityCard
      key={contract.id || index}
      title={contract.title || contract.name || "Untitled Contract"}
      description={contract.description}
      status={{
        label: contract.status || "Unknown",
        variant: getStatusVariant(contract.status),
      }}
      metadata={[
        { label: "Version", value: contract.version?.toString() || "N/A" },
        { label: "Chain ID", value: contract.chainId?.toString() || "N/A" },
        ...(contract.smartContractAddress
          ? [
              {
                label: "Address",
                value: `${contract.smartContractAddress.slice(0, 10)}...`,
              },
            ]
          : []),
      ]}
      actions={[
        {
          icon: <Eye className="h-4 w-4" />,
          label: "View",
          onClick: () => handleViewContract(contract),
        },
        {
          icon: <Edit className="h-4 w-4" />,
          label: "Edit",
          onClick: () => handleEditContract(contract),
        },
        ...(contract.status === "draft"
          ? [
              {
                icon: <Play className="h-4 w-4" />,
                label: "Deploy",
                onClick: () => handleDeployContract(contract.id),
              },
            ]
          : []),
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: "Delete",
          onClick: () => handleDeleteContract(contract),
          variant: "destructive" as const,
        },
      ]}
    />
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Contrats Intelligents"
        description="Gérez vos contrats intelligents"
        action={{
          label: "Nouveau contrat",
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityList
        title="Liste des contrats"
        description={`${contracts.length} contrat(s) trouvé(s)`}
        items={contracts}
        renderItem={renderContractCard}
        emptyMessage="Aucun contrat trouvé"
        emptyAction={{
          label: "Créer votre premier contrat",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Créer un nouveau contrat"
        description="Définissez les caractéristiques de votre contrat intelligent"
        maxWidth="max-w-2xl overflow-y-auto"
      >
        <ContractForm onSubmit={handleCreateContract} loading={loading} />
      </FormDialog>
    </div>
  );
}
