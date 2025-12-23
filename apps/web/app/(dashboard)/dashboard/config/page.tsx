'use client';

import { useEffect, useState } from "react";
import { ConfigServices } from "@/services/configServices";
import { SystemConfigSchema } from "@/validators/system-config-validator";
import * as z from "zod";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { StatsCards } from "@/components/card/stats-cards";
import { GenericForm } from "@/components/generic-form";
import { Eye, Edit, Trash2, Settings, Lock, Unlock } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";

type ConfigFormData = z.infer<typeof SystemConfigSchema>;

interface ConfigFormProps {
  onSubmit: (data: ConfigFormData) => void;
  loading?: boolean;
}

function ConfigForm({ onSubmit, loading }: ConfigFormProps) {
  const formFields = [
    {
      name: "key",
      label: "Configuration Key",
      placeholder: "app.name",
      description: "Unique identifier for this configuration",
    },
    {
      name: "value",
      label: "Value",
      placeholder: "Configuration value",
      description: "The value for this configuration setting",
    },
    {
      name: "type",
      label: "Type",
      type: "select" as const,
      options: [
        { value: "string", label: "String" },
        { value: "number", label: "Number" },
        { value: "boolean", label: "Boolean" },
        { value: "json", label: "JSON" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Describe what this configuration does",
    },
    {
      name: "category",
      label: "Category",
      type: "select" as const,
      options: [
        { value: "general", label: "General" },
        { value: "security", label: "Security" },
        { value: "blockchain", label: "Blockchain" },
        { value: "email", label: "Email" },
        { value: "storage", label: "Storage" },
        { value: "api", label: "API" },
      ],
    },
    {
      name: "isSecret",
      label: "Is Secret",
      type: "checkbox" as const,
      description: "Whether this is a sensitive configuration value",
    },
  ];

  return (
    <GenericForm
      schema={SystemConfigSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Creating..." : "Create Configuration"}
      loading={loading}
      defaultValues={{
        key: "",
        value: "",
        type: "string",
        description: "",
        category: "general",
        isSecret: false,
      }}
    />
  );
}

export default function ConfigPage() {
  const [configs, setConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getConfigs = async () => {
      try {
        const data = await ConfigServices.getAllConfigs();
        setConfigs(data);
      } catch (error) {
        console.error('Error fetching configs:', error);
      }
    };
    getConfigs();
  }, []);

  const handleCreateConfig = async (data: ConfigFormData) => {
    setLoading(true);
    try {
      const result = await ConfigServices.createConfig(data);
      if (result.success) {
        setConfigs([...configs, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewConfig = (config: any) => {
    // TODO: Implement view functionality
    console.log('View config:', config);
  };

  const handleEditConfig = (config: any) => {
    // TODO: Implement edit functionality
    console.log('Edit config:', config);
  };

  const handleDeleteConfig = (config: any) => {
    // TODO: Implement delete functionality
    console.log('Delete config:', config);
  };

  const getCategoryBadgeVariant = (category: string): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      general: "default",
      security: "destructive",
      blockchain: "secondary",
      email: "outline",
      storage: "outline",
      api: "outline",
    };
    return variants[category] || "outline";
  };

  const renderConfigCard = (config: any, index: number) => (
    <EntityCard
      key={config.id || index}
      title={config.key}
      description={config.description}
      status={{
        label: config.category,
        variant: getCategoryBadgeVariant(config.category),
      }}
      metadata={[
        { label: "Type", value: config.type },
        { label: "Value", value: config.isSecret ? "••••••••" : config.value?.substring(0, 20) + (config.value?.length > 20 ? "..." : "") },
        { label: "Secret", value: config.isSecret ? "Yes" : "No" },
      ]}
      actions={[
        {
          icon: <Eye className="h-4 w-4" />,
          label: "View",
          onClick: () => handleViewConfig(config),
        },
        {
          icon: <Edit className="h-4 w-4" />,
          label: "Edit",
          onClick: () => handleEditConfig(config),
        },
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: "Delete",
          onClick: () => handleDeleteConfig(config),
          variant: "destructive" as const,
        },
      ]}
    />
  );

  const stats = [
    {
      title: "Total Configs",
      value: configs.length,
      description: "Configuration settings",
      icon: Settings,
      trend: { value: 2, label: "added this month", positive: true },
    },
    {
      title: "Secret Configs",
      value: configs.filter(c => c.isSecret).length,
      description: "Sensitive settings",
      icon: Lock,
      trend: { value: 1, label: "new secret", positive: true },
    },
    {
      title: "Categories",
      value: new Set(configs.map(c => c.category)).size,
      description: "Different categories",
      icon: Settings,
      trend: { value: 0, label: "stable", positive: true },
    },
    {
      title: "Public Configs",
      value: configs.filter(c => !c.isSecret).length,
      description: "Non-sensitive settings",
      icon: Unlock,
      trend: { value: -1, label: "made secret", positive: false },
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <PageHeader
        title="System Configuration"
        description="Manage system-wide configuration settings"
        action={{
          label: "Add Configuration",
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityList
        title="Configurations"
        description={`${configs.length} configuration setting(s)`}
        items={configs}
        renderItem={renderConfigCard}
        emptyMessage="No configurations found"
        emptyAction={{
          label: "Create your first configuration",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Create New Configuration"
        description="Add a new system configuration setting"
        maxWidth="max-w-2xl"
      >
        <ConfigForm onSubmit={handleCreateConfig} loading={loading} />
      </FormDialog>
    </div>
  );
}