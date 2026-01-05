"use client";

import { useEffect, useState } from "react";
import { BlockchainServices } from "@/services/blockchainServices";
import {
  TransactionSchema,
  TransactionFormData,
} from "@/validators/transaction-validator";
import * as z from "zod";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { StatsCards } from "@/components/card/stats-cards";
import { GenericForm } from "@/components/generic-form";
import {
  Eye,
  RefreshCw,
  ExternalLink,
  ArrowUpDown,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";

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
  const formFields = [
    {
      name: "from",
      label: "Adresse de locataire",
      placeholder: "0x...",
      description: "Adresse Ethereum ou compatible EVM",
    },
    {
      name: "to",
      label: "Adresse de destination",
      placeholder: "0x...",
      description: "Adresse Ethereum ou compatible EVM",
    },
    {
      name: "value",
      label: "Valeur",
      placeholder: "1",
      type: "number" as const,
    },
    {
      name: "gasUsed",
      label: "Gas Used",
      placeholder: "21000",
      type: "number" as const,
    },
    {
      name: "gasCost",
      label: "Gas Cost",
      placeholder: "0.000000000000000001",
      type: "number" as const,
    },
  ];

  return (
    <GenericForm
      schema={TransactionSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Envoi..." : "Envoyer la transaction"}
      loading={loading}
      defaultValues={{
        from: "",
        to: "",
        value: 1,
        gasUsed: 21000,
        gasCost: gasPrice || "",
      }}
    />
  );
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    const getTransactions = async () => {
      try {
        const data = await BlockchainServices.getAllTransactions(
          token as string,
        );
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    getTransactions();
  }, []);

  const handleCreateTransaction = async (data: TransactionFormData) => {
    setLoading(true);
    try {
      const result = await BlockchainServices.createTransaction(
        data,
        token as string,
      );
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

  const handleViewTransaction = (transaction: any) => {
    // TODO: Implement view functionality
    console.log("View transaction:", transaction);
  };

  const handleRefreshTransaction = async (transaction: any) => {
    try {
      const result = await BlockchainServices.refreshTransaction(
        transaction.id,
        token as string,
      );
      if (result.success) {
        setTransactions(
          transactions.map((t) => (t.id === transaction.id ? result.data : t)),
        );
      }
    } catch (error) {
      console.error("Error refreshing transaction:", error);
    }
  };

  const handleViewOnExplorer = (transaction: any) => {
    const explorerUrl = `https://etherscan.io/tx/${transaction.hash}`;
    window.open(explorerUrl, "_blank");
  };

  const getStatusBadgeVariant = (
    status: string,
  ): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      pending: "secondary",
      confirmed: "default",
      failed: "destructive",
      mined: "default",
    };
    return variants[status] || "outline";
  };

  const formatAddress = (address: string) => {
    if (!address) return "N/A";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatValue = (value: number) => {
    return `${value} ETH`;
  };

  const renderTransactionCard = (transaction: any, index: number) => (
    <EntityCard
      key={transaction.id || index}
      title={
        transaction.hash
          ? formatAddress(transaction.hash)
          : `Transaction ${index + 1}`
      }
      description={`From ${formatAddress(transaction.from)} to ${formatAddress(transaction.to)}`}
      status={{
        label: transaction.status || "Unknown",
        variant: getStatusBadgeVariant(transaction.status),
      }}
      metadata={[
        { label: "Value", value: formatValue(transaction.value || 0) },
        { label: "Gas Used", value: transaction.gasUsed?.toString() || "N/A" },
        {
          label: "Block",
          value: transaction.blockNumber?.toString() || "Pending",
        },
        { label: "Chain ID", value: transaction.chainId?.toString() || "1" },
      ]}
      actions={[
        {
          icon: <Eye className="h-4 w-4" />,
          label: "View",
          onClick: () => handleViewTransaction(transaction),
        },
        {
          icon: <RefreshCw className="h-4 w-4" />,
          label: "Refresh",
          onClick: () => handleRefreshTransaction(transaction),
        },
        ...(transaction.hash
          ? [
              {
                icon: <ExternalLink className="h-4 w-4" />,
                label: "View on Explorer",
                onClick: () => handleViewOnExplorer(transaction),
              },
            ]
          : []),
      ]}
    />
  );

  const stats = [
    {
      title: "Total Transactions",
      value: transactions.length,
      description: "All blockchain transactions",
      icon: ArrowUpDown,
      trend: { value: 5, label: "this week", positive: true },
    },
    {
      title: "Confirmed",
      value: transactions.filter(
        (t) => t.status === "confirmed" || t.status === "mined",
      ).length,
      description: "Successfully confirmed",
      icon: CheckCircle,
      trend: { value: 3, label: "confirmed today", positive: true },
    },
    {
      title: "Pending",
      value: transactions.filter((t) => t.status === "pending").length,
      description: "Awaiting confirmation",
      icon: Clock,
      trend: { value: 1, label: "still pending", positive: false },
    },
    {
      title: "Failed",
      value: transactions.filter((t) => t.status === "failed").length,
      description: "Transaction failures",
      icon: XCircle,
      trend: { value: 0, label: "no failures", positive: true },
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <PageHeader
        title="Blockchain Transactions"
        description="Monitor and manage blockchain transactions"
        action={{
          label: "Create Transaction",
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityList
        title="Transactions"
        description={`${transactions.length} transaction(s) found`}
        items={transactions}
        renderItem={renderTransactionCard}
        emptyMessage="No transactions found"
        emptyAction={{
          label: "Create your first transaction",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Create New Transaction"
        description="Send a new blockchain transaction"
        maxWidth="max-w-2xl overflow-y-auto"
      >
        <TransactionForm onSubmit={handleCreateTransaction} loading={loading} />
      </FormDialog>
    </div>
  );
}
