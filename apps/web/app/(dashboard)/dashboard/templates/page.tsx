"use client";

import { useState, useEffect } from "react";
import { TemplateServices } from "@/services/templateServices";
import { z } from "zod";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { EntityFilters, FilterField } from "@/components/entity/entity-filters";
import { StatsCards } from "@/components/card/stats-cards";
import { GenericForm } from "@/components/generic-form";
import {
  Eye,
  Edit,
  Trash2,
  Copy,
  Download,
  FileText,
  Users,
  Star,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import {
  TemplateVersionSchema,
  TemplateVersionFormData,
} from "@/validators/template-version-validator";

interface TemplateVersionFormProps {
  onSubmit: (data: TemplateVersionFormData) => void;
  loading?: boolean;
}

// Update the form to reflect the TemplateVersionDto fields
function TemplateVersionForm({ onSubmit, loading }: TemplateVersionFormProps) {
  const formFields = [
    {
      name: "version",
      label: "Version",
      type: "number" as const,
      placeholder: "1",
      description: "Enter the version number of the template (integer)",
      required: true,
    },
    {
      name: "content",
      label: "Version Content",
      type: "textarea" as const,
      placeholder:
        "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract MyContract {\n    // Your code here\n}",
      className: "min-h-[300px] font-mono text-sm",
      required: true,
      description: "Paste the full code/content for this template version.",
    },
    {
      name: "templateId",
      label: "Template ID",
      placeholder: "e.g., 9e492127-c5e8-443f-bf5d-0bb740f1a548",
      required: true,
      description: "ID of the template this version belongs to.",
    },
    {
      name: "changelog",
      label: "Changelog",
      type: "textarea" as const,
      placeholder: "Describe what changed in this version (optional)",
      description: "Optional changelog to describe version updates",
      required: false,
    },
  ];

  return (
    <GenericForm
      schema={TemplateVersionSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Creating..." : "Create Version"}
      loading={loading}
      defaultValues={{
        version: 1,
        content: "",
        templateId: "",
        changelog: "",
      }}
    />
  );
}

export default function TemplatesVersionsPage() {
  const [templateVersions, setTemplateVersions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    const getTemplateVersions = async () => {
      try {
        // You need to implement or adjust the service for fetching versions if needed
        const data = await TemplateServices.getTemplateVersions(
          "",
          token as string,
        );
        setTemplateVersions(data);
      } catch (error) {
        console.error("Error fetching template versions:", error);
      }
    };
    getTemplateVersions();
  }, []);

  const handleCreateTemplateVersion = async (data: TemplateVersionFormData) => {
    setLoading(true);
    try {
      // You need to implement or adjust the service for creating versions if needed
      const result = await TemplateServices.createTemplateVersion(
        "",
        data,
        token as string,
      );
      if (result.success) {
        setTemplateVersions([...templateVersions, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating template version:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTemplateVersionCard = (version: any, index: number) => (
    <EntityCard
      key={version.id || index}
      title={`Version ${version.version}`}
      subtitle={version.templateId}
      description={version.changelog || "No changelog provided"}
      status={{
        label: `v${version.version}`,
        variant: "default",
      }}
      metadata={[
        {
          label: "Content length",
          value: version.content
            ? `${version.content.length} chars`
            : "0 chars",
        },
        {
          label: "Template ID",
          value: version.templateId,
        },
      ]}
      actions={[
        {
          icon: <Eye className="h-4 w-4" />,
          label: "View Content",
          onClick: () => handleViewTemplateVersion(version),
        },
        {
          icon: <Edit className="h-4 w-4" />,
          label: "Edit",
          onClick: () => handleEditTemplateVersion(version),
        },
        {
          icon: <Copy className="h-4 w-4" />,
          label: "Clone",
          onClick: () => handleCloneTemplateVersion(version),
        },
        {
          icon: <Download className="h-4 w-4" />,
          label: "Download",
          onClick: () => handleDownloadTemplateVersion(version),
        },
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: "Delete",
          onClick: () => handleDeleteTemplateVersion(version),
          variant: "destructive" as const,
        },
      ]}
    />
  );

  // Placeholder handler functions for actions
  const handleViewTemplateVersion = (version: any) => {
    console.log("View template version:", version);
  };

  const handleEditTemplateVersion = (version: any) => {
    console.log("Edit template version:", version);
  };

  const handleDeleteTemplateVersion = (version: any) => {
    console.log("Delete template version:", version);
  };

  const handleCloneTemplateVersion = (version: any) => {
    console.log("Clone template version:", version);
  };

  const handleDownloadTemplateVersion = (version: any) => {
    console.log("Download template version:", version);
  };

  const filterFields: FilterField[] = [
    {
      name: "version",
      label: "Version",
      type: "text",
      placeholder: "All versions",
    },
    {
      name: "templateId",
      label: "Template ID",
      type: "text",
      placeholder: "Filter by Template ID",
    },
    {
      name: "search",
      label: "Search Content",
      type: "text",
      placeholder: "Search in content or changelog...",
    },
  ];

  const stats = [
    {
      title: "Total Versions",
      value: templateVersions.length,
      description: "Active template versions",
      icon: FileText,
      trend: { value: 3, label: "from last month", positive: true },
    },
    {
      title: "Templates",
      value: new Set(templateVersions.map((v) => v.templateId)).size,
      description: "Different templates",
      icon: Users,
      trend: { value: 1, label: "new this month", positive: true },
    },
    {
      title: "Unique Version Numbers",
      value: new Set(templateVersions.map((v) => v.version)).size,
      description: "Versions used",
      icon: Star,
      trend: { value: 0, label: "month over month", positive: true },
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <PageHeader
        title="Template Versions"
        description="Manage individual versions of your smart contract templates"
        action={{
          label: "New Template Version",
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityFilters
        title="Filter Versions"
        fields={filterFields}
        onFilter={() => {}}
        onReset={() => {}}
      />

      <EntityList
        title="Template Versions"
        description={`${templateVersions.length} version(s) found`}
        items={templateVersions}
        renderItem={renderTemplateVersionCard}
        emptyMessage="No template versions found"
        emptyAction={{
          label: "Create your first version",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Create New Template Version"
        description="Define a version for your template"
        maxWidth="max-w-4xl overflow-y-auto"
      >
        <TemplateVersionForm
          onSubmit={handleCreateTemplateVersion}
          loading={loading}
        />
      </FormDialog>
    </div>
  );
}
