"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { BlockchainServices } from "@/services/blockchainServices";
import { Plus, Eye, RefreshCw, ExternalLink } from "lucide-react";
import { TransactionFormData, transactionSchema } from "@/validators/transaction-validator";

interface TransactionFormProps {
  onSubmit: (data: TransactionFormData) => void;
  loading?: boolean;
  gasPrice?: string;
}

function TransactionForm({
  onSubmit,
  loading,
  gasPrice,
}: TransactionFormProps) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      from: "",
      to: "",
      value: 1,
      gasUsed: 21000,
      gasCost: gasPrice || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="from"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse de locataire</FormLabel>
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
          name="to"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse de destination</FormLabel>
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
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="1"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="gasUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gas Limit</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="21000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gasCost"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gas Price (Gwei)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.1" placeholder="20" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Envoi..." : "Envoyer la transaction"}
        </Button>
      </form>
    </Form>
  );
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [blocks, setBlocks] = useState<any[]>([]);
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [gasPrice, setGasPrice] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("transactions");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load transactions
      const txResult = await BlockchainServices.getAllTransactions();
      console.log("🚀 ~ file: page.tsx:324 ~ loadData ~ txResult:", txResult);
      if (txResult) {
        setTransactions(txResult || []);
      }

      // // Load latest blocks
      // const blocksResult = await BlockchainServices.getLatestBlocks();
      // if (blocksResult.success) {
      //   setBlocks(blocksResult.data || []);
      // }

      // // Load network info
      // const networkResult = await BlockchainServices.getNetworkInfo();
      // if (networkResult.success) {
      //   setNetworkInfo(networkResult.data);
      // }

      // // Load gas price
      // const gasResult = await BlockchainServices.getGasPrice();
      // if (gasResult.success) {
      //   setGasPrice(gasResult.data.price);
      // }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  const handleCreateTransaction = async (data: TransactionFormData) => {
    setLoading(true);
    try {
      const result = await BlockchainServices.createTransaction(data);

      if (result.success) {
        setTransactions([result.data, ...transactions]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating transaction:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "secondary",
      confirmed: "default",
      failed: "destructive",
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // const formatValue = (value: string) => {
  //   const eth = parseFloat(value) / 1e18;
  //   return `${eth.toFixed(6)} ETH`;
  // };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Transactions Blockchain
          </h1>
          <p className="text-gray-600">Suivez et gérez vos transactions</p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={loadData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une transaction</DialogTitle>
                <DialogDescription>
                  Envoyez des fonds ou interagissez avec des contrats
                </DialogDescription>
              </DialogHeader>
              <TransactionForm
                onSubmit={handleCreateTransaction}
                loading={loading}
                gasPrice={gasPrice}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Network Info */}
      {networkInfo && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Réseau</div>
              <div className="text-lg font-semibold">{networkInfo.name}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Block actuel</div>
              <div className="text-lg font-semibold">
                {networkInfo.blockNumber}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Gas Price</div>
              <div className="text-lg font-semibold">{gasPrice} Gwei</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-gray-600">Chain ID</div>
              <div className="text-lg font-semibold">{networkInfo.chainId}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="blocks">Blocs</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des transactions</CardTitle>
              <CardDescription>
                {transactions.length} transaction(s) trouvée(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {transactions.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">
                    Aucune transaction trouvée
                  </p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre première transaction
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {transactions.map((tx) => (
                      <div
                        key={tx.txHash}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium font-mono text-sm">
                              {formatAddress(tx.txHash)}
                            </h4>
                            {getStatusBadge(tx.status)}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>De: {formatAddress(tx.from)}</span>
                            <span>À: {formatAddress(tx.to)}</span>
                            <span className="font-medium">
                              {tx.value} ETH
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>Block: {tx.blockNumber}</span>
                            <span>
                              Gas: {tx.gasUsed}/{tx.gasLimit}
                            </span>
                            <span>
                              {new Date(tx.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Derniers blocs</CardTitle>
              <CardDescription>
                {blocks.length} bloc(s) trouvé(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {blocks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun bloc trouvé</p>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {blocks.map((block) => (
                      <div
                        key={block.number}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">
                              Bloc #{block.number}
                            </h4>
                            <Badge variant="outline">
                              {block.transactions.length} txs
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>Hash: {formatAddress(block.hash)}</span>
                            <span>Miner: {formatAddress(block.miner)}</span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>Gas Limit: {block.gasLimit}</span>
                            <span>Gas Used: {block.gasUsed}</span>
                            <span>
                              {new Date(block.timestamp).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}