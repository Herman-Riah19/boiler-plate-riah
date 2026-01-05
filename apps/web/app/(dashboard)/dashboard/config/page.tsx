"use client";

import { useState, useEffect } from "react";
import { Button } from "@repo/ui/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/ui/card";
import { Badge } from "@repo/ui/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/ui/tabs";
import { ConfigServices } from "@/services/configServices";
import { Download, RefreshCw, Settings, Database, Shield } from "lucide-react";
import { FormFieldConfig, GenericForm } from "@/components/generic-form";
import {
  SystemConfigFormData,
  SystemConfigSchema,
} from "@/validators/system-config-validator";
import { StatsCards } from "@/components/card/stats-cards";
import { PageHeader } from "@/components/page-header";
import { EntityList } from "@/components/entity/entity-list";
import { FormDialog } from "@/components/dialog/form-dialog";
import { useAuthStore } from "@/store/auth-store";

interface ConfigFormProps {
  onSubmit: (data: SystemConfigFormData) => void;
  loading?: boolean;
}

function ConfigForm({ onSubmit, loading }: ConfigFormProps) {
  const formFields = [
    {
      name: "key",
      label: "Clé de configuration",
      type: "text",
      placeholder: "APP_NAME",
      description: "Nom unique pour cette configuration",
    },
    {
      name: "type",
      label: "Type de valeur",
      type: "select",
      options: [
        { value: "string", label: "Texte" },
        { value: "number", label: "Nombre" },
        { value: "boolean", label: "Booléen" },
        { value: "json", label: "JSON" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Description de la configuration...",
    },
    {
      name: "category",
      label: "Catégorie",
      type: "select",
      options: [
        { value: "general", label: "Général" },
        { value: "blockchain", label: "Blockchain" },
        { value: "email", label: "Email" },
        { value: "storage", label: "Stockage" },
        { value: "api", label: "API" },
        { value: "security", label: "Sécurité" },
      ],
      placeholder: "Sélectionnez une catégorie",
      description: "Catégorie de la configuration",
    },
    {
      name: "value",
      label: "Valeur",
      type: "text",
      placeholder: "Valeur de la configuration",
    },
    {
      name: "isSecret",
      label: "Configuration secrète",
      type: "boolean",
    },
  ] as FormFieldConfig[];

  return (
    <GenericForm
      schema={SystemConfigSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Création..." : "Créer la configuration"}
      loading={loading}
      defaultValues={{
        key: "APP_NAME",
        value: "APP_NAME",
        isSecret: false,
        description: "Description de la configuration...",
      }}
    />
  );
}

export default function ConfigPage() {
  const [configs, setConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("configs");
  const token = useAuthStore.getState().token;

  // Stats cards example (static stats can be replaced with dynamic as needed)
  const stats = [
    {
      title: "Total Configs",
      value: configs.length,
      description: "Nombre de paramètres système",
      icon: Database,
      trend: { value: 3, label: "ce mois", positive: true },
    },
    {
      title: "Paramètres Sécurisés",
      value: configs.filter((c) => c.isSecret).length,
      description: "Configurations secrètes",
      icon: Shield,
      trend: { value: 1, label: "ce mois", positive: true },
    },
    {
      title: "Catégories",
      value: new Set(configs.map((c) => c.category)).size,
      description: "Catégories distinctes",
      icon: Settings,
      trend: { value: 1, label: "nouvelle", positive: true },
    },
  ];

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const result = await ConfigServices.getAllConfigs(token as string);
      if (result.success) {
        setConfigs(result.data || []);
      }
    } catch (error) {
      console.error("Error loading configs:", error);
    }
  };

  const handleCreateConfig = async (data: SystemConfigFormData) => {
    setLoading(true);
    try {
      const result = await ConfigServices.createConfig(data, token as string);
      if (result.success) {
        setConfigs([...configs, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating config:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshConfig = async (key: string) => {
    if (!confirm("Êtes-vous sûr de vouloir réinitialiser cette configuration?"))
      return;
    try {
      const result = await ConfigServices.resetConfig(key, token as string);
      if (result.success) {
        setConfigs(
          configs.map((config) =>
            config.key === key
              ? { ...config, value: config.defaultValue }
              : config,
          ),
        );
      }
    } catch (error) {
      console.error("Error resetting config:", error);
    }
  };

  const handleExport = async () => {
    try {
      const result = await ConfigServices.exportConfigs(token as string);
      if (result.success) {
        const blob = new Blob([JSON.stringify(result.data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `config-${new Date().toISOString().split("T")[0]}.json`;
        a.click();
      }
    } catch (error) {
      console.error("Error exporting configs:", error);
    }
  };

  const getCategoryVariant = (
    category: string,
  ): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      general: "default",
      blockchain: "secondary",
      email: "outline",
      storage: "outline",
      api: "outline",
      security: "destructive",
    };
    return variants[category] || "outline";
  };

  // Render one configuration card (acts like renderTemplateCard example)
  const renderConfigCard = (config: any, index: number) => (
    <Card key={config.key || index}>
      <CardHeader>
        <div className="flex items-center gap-2 mb-1">
          <CardTitle className="font-medium">{config.key}</CardTitle>
          <Badge variant={getCategoryVariant(config.category)}>
            {config.category}
          </Badge>
          <Badge variant="outline">{config.type}</Badge>
          {config.isSecret && <Badge variant="destructive">Secret</Badge>}
        </div>
        <CardDescription>{config.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="p-2 bg-gray-50 rounded text-sm font-mono mb-2">
          {config.isSecret ? "••••••••" : config.value}
        </div>
        <div className="text-xs text-gray-500 mb-2">
          Mis à jour :{" "}
          {config.updatedAt
            ? new Date(config.updatedAt).toLocaleString()
            : "N/A"}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRefreshConfig(config.key)}
            title="Réinitialiser"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
          {/* More actions like Edit/Delete can be added here */}
        </div>
      </CardContent>
    </Card>
  );

  // Group configs by category for category tab
  const groupedConfigs = configs.reduce(
    (acc, config) => {
      const cat = config.category || "Autre";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(config);
      return acc;
    },
    {} as Record<string, any[]>,
  );

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <PageHeader
        title="Configuration Système"
        description="Gérez les paramètres de l'application"
        action={{
          label: "Nouvelle configuration",
          onClick: () => setDialogOpen(true),
        }}
      />

      <div className="flex gap-2">
        <Button variant="outline" onClick={handleExport}>
          <Download className="mr-2 h-4 w-4" />
          Exporter
        </Button>
        <Button variant="outline" onClick={loadConfigs}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Actualiser
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="configs">Configurations</TabsTrigger>
          <TabsTrigger value="categories">Par catégorie</TabsTrigger>
        </TabsList>

        <TabsContent value="configs" className="space-y-4">
          <EntityList
            title="Liste des configurations"
            description={`${configs.length} configuration(s) trouvée(s)`}
            items={configs}
            renderItem={renderConfigCard}
            emptyMessage="Aucune configuration trouvée"
            emptyAction={{
              label: "Créer votre première configuration",
              onClick: () => setDialogOpen(true),
            }}
          />
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {Object.entries(groupedConfigs).map(([category, categoryConfigs]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <Badge variant="outline">
                    {Array.isArray(categoryConfigs)
                      ? categoryConfigs.length
                      : 0}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(Array.isArray(categoryConfigs) ? categoryConfigs : []).map(
                    (config: any, idx: number) => renderConfigCard(config, idx),
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Créer une configuration"
        description="Ajoutez un nouveau paramètre de configuration"
        maxWidth="max-w-2xl overflow-y-auto"
      >
        <ConfigForm onSubmit={handleCreateConfig} loading={loading} />
      </FormDialog>
    </div>
  );
}
