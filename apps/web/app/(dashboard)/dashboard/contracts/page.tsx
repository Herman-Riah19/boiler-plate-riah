'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { ContractServices } from '@/services/contractServices';
import { Plus, Eye, Edit, Trash2, Play } from 'lucide-react';

const contractSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.enum(['ERC20', 'ERC721', 'ERC1155', 'Custom']),
  sourceCode: z.string().min(1, 'Le code source est requis'),
  network: z.enum(['mainnet', 'testnet', 'localhost']),
});

type ContractFormData = z.infer<typeof contractSchema>;

interface ContractFormProps {
  onSubmit: (data: ContractFormData) => void;
  loading?: boolean;
}

function ContractForm({ onSubmit, loading }: ContractFormProps) {
  const form = useForm<ContractFormData>({
    resolver: zodResolver(contractSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'Custom',
      sourceCode: '',
      network: 'testnet',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du contrat</FormLabel>
              <FormControl>
                <Input placeholder="Mon contrat intelligent" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description du contrat..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de contrat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ERC20">ERC20 (Token)</SelectItem>
                  <SelectItem value="ERC721">ERC721 (NFT)</SelectItem>
                  <SelectItem value="ERC1155">ERC1155 (Multi-Token)</SelectItem>
                  <SelectItem value="Custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="network"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Réseau</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un réseau" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="mainnet">Mainnet</SelectItem>
                  <SelectItem value="testnet">Testnet</SelectItem>
                  <SelectItem value="localhost">Localhost</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sourceCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code source Solidity</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="// pragma solidity ^0.8.0;..."
                  className="min-h-[200px] font-mono"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Collez le code source de votre contrat intelligent
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Création...' : 'Créer le contrat'}
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
      const token = localStorage.getItem('token') || '';
      const result = await ContractServices.createContract(data, token);
      
      if (result.success) {
        setContracts([...contracts, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating contract:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeployContract = async (id: string) => {
    try {
      const token = localStorage.getItem('token') || '';
      const result = await ContractServices.deployContract(id, token);
      
      if (result.success) {
        setContracts(contracts.map(contract => 
          contract.id === id ? { ...contract, status: 'deployed' } : contract
        ));
      }
    } catch (error) {
      console.error('Error deploying contract:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      draft: 'secondary',
      deployed: 'default',
      error: 'destructive',
    };
    return <Badge variant={variants[status] || 'outline'}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contrats Intelligents</h1>
          <p className="text-gray-600">Gérez vos contrats intelligents</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau contrat
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouveau contrat</DialogTitle>
              <DialogDescription>
                Définissez les caractéristiques de votre contrat intelligent
              </DialogDescription>
            </DialogHeader>
            <ContractForm onSubmit={handleCreateContract} loading={loading} />
          </DialogContent>
        </Dialog>
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
                  <div key={contract.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{contract.name}</h4>
                        {getStatusBadge(contract.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{contract.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Type: {contract.type}</span>
                        <span>Réseau: {contract.network}</span>
                        {contract.address && (
                          <span>Adresse: {contract.address.slice(0, 10)}...</span>
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
                      {contract.status === 'draft' && (
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