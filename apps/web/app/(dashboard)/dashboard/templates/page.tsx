'use client';

import { useState, useEffect } from 'react';
import { TemplateServices } from '@/services/templateServices';
import { ContractTemplateSchema } from '@/validators/contract-template-validator';
import { PageHeader } from '@/components/page-header';
import { FormDialog } from '@/components/dialog/form-dialog';
import { EntityList } from '@/components/entity/entity-list';
import { EntityCard } from '@/components/card/entity-card';
import { EntityFilters, FilterField } from '@/components/entity/entity-filters';
import { StatsCards } from '@/components/card/stats-cards';
import { GenericForm } from '@/components/generic-form';
import { Eye, Edit, Trash2, Copy, Download, FileText, Users, Star } from 'lucide-react';
import { z } from 'zod';

type TemplateFormData = z.infer<typeof ContractTemplateSchema>;
type TemplateFilterData = z.infer<typeof ContractTemplateSchema>;
interface TemplateFormProps {
  onSubmit: (data: TemplateFormData) => void;
  loading?: boolean;
}

function TemplateForm({ onSubmit, loading }: TemplateFormProps) {
  const formFields = [
    {
      name: "name",
      label: "Template Name",
      placeholder: "My Smart Contract Template",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Describe your contract template...",
    },
    {
      name: "category",
      label: "Category",
      type: "select" as const,
      options: [
        { value: "token", label: "Token" },
        { value: "nft", label: "NFT" },
        { value: "defi", label: "DeFi" },
        { value: "governance", label: "Governance" },
        { value: "utility", label: "Utility" },
        { value: "custom", label: "Custom" },
      ],
    },
    {
      name: "content",
      label: "Template Content",
      type: "textarea" as const,
      placeholder: "// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract MyContract {\n    // Your code here\n}",
      className: "min-h-[300px] font-mono text-sm",
    },
    {
      name: "organizationId",
      label: "Organization",
      placeholder: "Select organization",
    },
  ];

  return (
    <GenericForm
      schema={ContractTemplateSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? 'Creating...' : 'Create Template'}
      loading={loading}
      defaultValues={{
        category: 'custom',
      }}
    />
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filters, setFilters] = useState<TemplateFilterData | undefined>(undefined);

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const data = await TemplateServices.getAllTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('Error fetching templates:', error);
      }
    };
    getTemplates();
  }, []);

  const handleCreateTemplate = async (data: TemplateFormData) => {
    setLoading(true);
    try {
      const result = await TemplateServices.createTemplate(data);
      if (result.success) {
        setTemplates([...templates, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (newFilters: Record<string, any>) => {
    setFilters(newFilters as TemplateFilterData);
    // Apply filters to templates
    console.log('Applying filters:', newFilters);
  };

  const handleResetFilters = () => {
    setFilters(undefined);
  };

  const getCategoryVariant = (category: string): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      token: 'default',
      nft: 'secondary',
      defi: 'outline',
      governance: 'destructive',
    };
    return variants[category] || 'outline';
  };

  const renderTemplateCard = (template: any, index: number) => (
    <EntityCard
      key={template.id || index}
      title={template.name}
      subtitle={`v${template.version || '1.0'}`}
      description={template.description}
      status={{
        label: template.category,
        variant: getCategoryVariant(template.category),
      }}
      metadata={[
        { label: "Contracts", value: (template.contracts?.length || 0).toString() },
        { label: "Versions", value: (template.versions?.length || 0).toString() },
        { label: "Public", value: template.isPublic ? "Yes" : "No" },
      ]}
      actions={[
        {
          icon: <Eye className="h-4 w-4" />,
          label: "View",
          onClick: () => handleViewTemplate(template),
        },
        {
          icon: <Edit className="h-4 w-4" />,
          label: "Edit",
          onClick: () => handleEditTemplate(template),
        },
        {
          icon: <Copy className="h-4 w-4" />,
          label: "Clone",
          onClick: () => handleCloneTemplate(template),
        },
        {
          icon: <Download className="h-4 w-4" />,
          label: "Download",
          onClick: () => handleDownloadTemplate(template),
        },
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: "Delete",
          onClick: () => handleDeleteTemplate(template),
          variant: "destructive" as const,
        },
      ]}
    />
  );

  const handleViewTemplate = (template: any) => {
    // TODO: Implement view functionality
    console.log('View template:', template);
  };

  const handleEditTemplate = (template: any) => {
    console.log('Edit template:', template);
  };

  const handleDeleteTemplate = (template: any) => {
    console.log('Delete template:', template);
  };

  const handleCloneTemplate = (template: any) => {
    console.log('Clone template:', template);
  };

  const handleDownloadTemplate = (template: any) => {
    console.log('Download template:', template);
  };

  const filterFields: FilterField[] = [
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { value: "token", label: "Token" },
        { value: "nft", label: "NFT" },
        { value: "defi", label: "DeFi" },
        { value: "governance", label: "Governance" },
        { value: "utility", label: "Utility" },
        { value: "custom", label: "Custom" },
      ],
    },
    {
      name: "isPublic",
      label: "Visibility",
      type: "select",
      options: [
        { value: "true", label: "Public" },
        { value: "false", label: "Private" },
      ],
    },
    {
      name: "search",
      label: "Search",
      type: "text",
      placeholder: "Search templates...",
    },
  ];

  const stats = [
    {
      title: "Total Templates",
      value: templates.length,
      description: "Active contract templates",
      icon: FileText,
      trend: { value: 12, label: "from last month", positive: true },
    },
    {
      title: "Public Templates",
      value: templates.filter(t => t.isPublic).length,
      description: "Available to all users",
      icon: Users,
      trend: { value: 8, label: "from last month", positive: true },
    },
    {
      title: "Used Templates",
      value: templates.filter(t => t.contracts?.length > 0).length,
      description: "Templates in use",
      icon: Star,
      trend: { value: -2, label: "from last month", positive: false },
    },
    {
      title: "Categories",
      value: new Set(templates.map(t => t.category)).size,
      description: "Different categories",
      icon: FileText,
      trend: { value: 1, label: "new this month", positive: true },
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <PageHeader
        title="Contract Templates"
        description="Manage your smart contract templates"
        action={{
          label: "New Template",
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityFilters
        title="Filter Templates"
        fields={filterFields}
        onFilter={handleFilter}
        onReset={handleResetFilters}
      />

      <EntityList
        title="Contract Templates"
        description={`${templates.length} template(s) found`}
        items={templates}
        renderItem={renderTemplateCard}
        emptyMessage="No templates found"
        emptyAction={{
          label: "Create your first template",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Create New Template"
        description="Define a reusable template for your contracts"
        maxWidth="max-w-4xl"
      >
        <TemplateForm onSubmit={handleCreateTemplate} loading={loading} />
      </FormDialog>
    </div>
  );
}