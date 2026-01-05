"use client";

import { useState } from "react";
import { WalletServices } from "@/services/walletServices";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { GenericForm } from "@/components/generic-form";
import { Eye, Edit, Trash2, Send, RefreshCw } from "lucide-react";
import z from "zod";
import { WalletSchema } from "@/validators/wallet-validator";
import { useAuthStore } from "@/store/auth-store";

type WalletFormData = z.infer<typeof WalletSchema>;

interface WalletFormProps {
  onSubmit: (data: WalletFormData) => void;
  loading?: boolean;
}

function WalletForm({ onSubmit, loading }: WalletFormProps) {
  const formFields = [
    {
      name: "name",
      label: "Nom du wallet",
      placeholder: "Mon wallet principal",
    },
    {
      name: "address",
      label: "Adresse du wallet",
      placeholder: "0x...",
      description: "Adresse Ethereum ou compatible EVM",
    },
    {
      name: "type",
      label: "Type de wallet",
      type: "select" as const,
      options: [
        { value: "personal", label: "Personnel" },
        { value: "business", label: "Professionnel" },
        { value: "contract", label: "Contrat" },
      ],
    },
    {
      name: "network",
      label: "Réseau",
      type: "select" as const,
      options: [
        { value: "ethereum", label: "Ethereum" },
        { value: "polygon", label: "Polygon" },
        { value: "bsc", label: "BSC" },
        { value: "arbitrum", label: "Arbitrum" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Description du wallet...",
    },
  ];

  return (
    <GenericForm
      schema={WalletSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Création..." : "Créer le wallet"}
      loading={loading}
      defaultValues={{
        type: "personal",
        network: "ethereum",
      }}
    />
  );
}

export default function WalletsPage() {
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState<any>(null);
  const token = useAuthStore.getState().token;

  const handleCreateWallet = async (data: WalletFormData) => {
    setLoading(true);
    try {
      const result = await WalletServices.createWallet(data, token as string);

      if (result.success) {
        setWallets([...wallets, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshBalance = async (walletId: string) => {
    try {
      const result = await WalletServices.getWalletBalance(
        walletId,
        token as string,
      );

      if (result.success) {
        setWallets(
          wallets.map((wallet) =>
            wallet.id === walletId
              ? { ...wallet, balance: result.balance }
              : wallet,
          ),
        );
      }
    } catch (error) {
      console.error("Error refreshing balance:", error);
    }
  };

  const handleViewWallet = (wallet: any) => {
    // TODO: Implement view functionality
    console.log("View wallet:", wallet);
  };

  const handleEditWallet = (wallet: any) => {
    // TODO: Implement edit functionality
    console.log("Edit wallet:", wallet);
  };

  const handleDeleteWallet = (wallet: any) => {
    // TODO: Implement delete functionality
    console.log("Delete wallet:", wallet);
  };

  const handleTransferClick = (wallet: any) => {
    setSelectedWallet(wallet);
  };

  const getTypeVariant = (
    type: string,
  ): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      personal: "default",
      business: "secondary",
      contract: "outline",
    };
    return variants[type] || "outline";
  };

  const renderWalletCard = (wallet: any, index: number) => (
    <EntityCard
      key={wallet.id || index}
      title={wallet.name}
      description={wallet.description}
      status={{
        label: wallet.type,
        variant: getTypeVariant(wallet.type),
      }}
      metadata={[
        { label: "Network", value: wallet.network },
        {
          label: "Address",
          value: `${wallet.address.slice(0, 10)}...${wallet.address.slice(-8)}`,
        },
        { label: "Balance", value: `${wallet.balance || "0.00"} ETH` },
      ]}
      actions={[
        {
          icon: <RefreshCw className="h-4 w-4" />,
          label: "Refresh Balance",
          onClick: () => handleRefreshBalance(wallet.id),
        },
        {
          icon: <Eye className="h-4 w-4" />,
          label: "View",
          onClick: () => handleViewWallet(wallet),
        },
        {
          icon: <Edit className="h-4 w-4" />,
          label: "Edit",
          onClick: () => handleEditWallet(wallet),
        },
        {
          icon: <Send className="h-4 w-4" />,
          label: "Transfer",
          onClick: () => handleTransferClick(wallet),
        },
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: "Delete",
          onClick: () => handleDeleteWallet(wallet),
          variant: "destructive" as const,
        },
      ]}
    />
  );

  return (
    <div className="space-y-6">
      <PageHeader
        title="Wallets"
        description="Gérez vos portefeuilles crypto"
        action={{
          label: "Nouveau wallet",
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityList
        title="Liste des wallets"
        description={`${wallets.length} wallet(s) trouvé(s)`}
        items={wallets}
        renderItem={renderWalletCard}
        emptyMessage="Aucun wallet trouvé"
        emptyAction={{
          label: "Ajouter votre premier wallet",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Créer un nouveau wallet"
        description="Ajoutez un nouveau portefeuille à votre compte"
        maxWidth="max-w-2xl overflow-y-auto"
      >
        <WalletForm onSubmit={handleCreateWallet} loading={loading} />
      </FormDialog>
    </div>
  );
}
