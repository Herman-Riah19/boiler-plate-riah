'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { Label } from '@repo/ui/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { WalletServices } from '@/services/walletServices';
import { Plus, Eye, Edit, Trash2, Send, RefreshCw } from 'lucide-react';

const walletSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  address: z.string().min(1, 'L\'adresse est requise'),
  type: z.enum(['personal', 'business', 'contract']),
  network: z.enum(['ethereum', 'polygon', 'bsc', 'arbitrum']),
  description: z.string().optional(),
});

type WalletFormData = z.infer<typeof walletSchema>;

const transferSchema = z.object({
  toAddress: z.string().min(1, 'L\'adresse de destination est requise'),
  amount: z.string().min(1, 'Le montant est requis'),
  token: z.string().min(1, 'Le token est requis'),
});

type TransferFormData = z.infer<typeof transferSchema>;

interface WalletFormProps {
  onSubmit: (data: WalletFormData) => void;
  loading?: boolean;
}

function WalletForm({ onSubmit, loading }: WalletFormProps) {
  const form = useForm<WalletFormData>({
    resolver: zodResolver(walletSchema),
    defaultValues: {
      name: '',
      address: '',
      type: 'personal',
      network: 'ethereum',
      description: '',
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
              <FormLabel>Nom du wallet</FormLabel>
              <FormControl>
                <Input placeholder="Mon wallet principal" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse du wallet</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormDescription>
                Adresse Ethereum ou compatible EVM
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type de wallet</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="personal">Personnel</SelectItem>
                  <SelectItem value="business">Professionnel</SelectItem>
                  <SelectItem value="contract">Contrat</SelectItem>
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
                  <SelectItem value="ethereum">Ethereum</SelectItem>
                  <SelectItem value="polygon">Polygon</SelectItem>
                  <SelectItem value="bsc">BSC</SelectItem>
                  <SelectItem value="arbitrum">Arbitrum</SelectItem>
                </SelectContent>
              </Select>
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
                <Textarea placeholder="Description du wallet..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Création...' : 'Créer le wallet'}
        </Button>
      </form>
    </Form>
  );
}

interface TransferFormProps {
  onSubmit: (data: TransferFormData) => void;
  loading?: boolean;
}

function TransferForm({ onSubmit, loading }: TransferFormProps) {
  const form = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      toAddress: '',
      amount: '',
      token: 'ETH',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="toAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse de destination</FormLabel>
              <FormControl>
                <Input placeholder="0x..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Montant</FormLabel>
              <FormControl>
                <Input type="number" step="0.001" placeholder="0.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="token"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Token</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un token" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Transfert...' : 'Envoyer'}
        </Button>
      </form>
    </Form>
  );
}

export default function WalletsPage() {
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [transferDialogOpen, setTransferDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  const handleCreateWallet = async (data: WalletFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await WalletServices.createWallet(data, token);
      
      if (result.success) {
        setWallets([...wallets, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating wallet:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async (data: TransferFormData) => {
    setTransferLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await WalletServices.transferFunds(selectedWallet.id, data, token);
      
      if (result.success) {
        setTransferDialogOpen(false);
        setSelectedWallet(null);
      }
    } catch (error) {
      console.error('Error transferring funds:', error);
    } finally {
      setTransferLoading(false);
    }
  };

  const handleRefreshBalance = async (walletId: string) => {
    try {
      const token = localStorage.getItem('token') || '';
      const result = await WalletServices.getWalletBalance(walletId, token);
      
      if (result.success) {
        setWallets(wallets.map(wallet => 
          wallet.id === walletId ? { ...wallet, balance: result.balance } : wallet
        ));
      }
    } catch (error) {
      console.error('Error refreshing balance:', error);
    }
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      personal: 'default',
      business: 'secondary',
      contract: 'outline',
    };
    return <Badge variant={variants[type] || 'outline'}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Wallets</h1>
          <p className="text-gray-600">Gérez vos portefeuilles crypto</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer un nouveau wallet</DialogTitle>
              <DialogDescription>
                Ajoutez un nouveau portefeuille à votre compte
              </DialogDescription>
            </DialogHeader>
            <WalletForm onSubmit={handleCreateWallet} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Wallets List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des wallets</CardTitle>
          <CardDescription>
            {wallets.length} wallet(s) trouvé(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {wallets.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Aucun wallet trouvé</p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Ajouter votre premier wallet
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {wallets.map((wallet) => (
                  <div key={wallet.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{wallet.name}</h4>
                        {getTypeBadge(wallet.type)}
                        <Badge variant="outline">{wallet.network}</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{wallet.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>Adresse: {wallet.address.slice(0, 10)}...{wallet.address.slice(-8)}</span>
                        <span>Solde: {wallet.balance || '0.00'} ETH</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRefreshBalance(wallet.id)}
                      >
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedWallet(wallet);
                          setTransferDialogOpen(true);
                        }}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
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

      {/* Transfer Dialog */}
      <Dialog open={transferDialogOpen} onOpenChange={setTransferDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Transférer des fonds</DialogTitle>
            <DialogDescription>
              Envoyer des fonds depuis {selectedWallet?.name}
            </DialogDescription>
          </DialogHeader>
          <TransferForm onSubmit={handleTransfer} loading={transferLoading} />
        </DialogContent>
      </Dialog>
    </div>
  );
}