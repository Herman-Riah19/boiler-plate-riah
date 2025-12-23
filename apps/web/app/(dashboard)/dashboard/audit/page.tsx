'use client';

import { useEffect, useState } from "react";
import { AuditServices } from "@/services/auditServices";
import { AuditLogSchema } from "@/validators/audit-log-validator";
import * as z from "zod";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { StatsCards } from "@/components/card/stats-cards";
import { GenericForm } from "@/components/generic-form";
import { Eye, Activity, User, Calendar, Shield, AlertTriangle, CheckCircle, XCircle, Trash2 } from "lucide-react";
import { Badge } from "@repo/ui/components/ui/badge";

type AuditLogFormData = z.infer<typeof AuditLogSchema>;

interface AuditLogFormProps {
  onSubmit: (data: AuditLogFormData) => void;
  loading?: boolean;
}

function AuditLogForm({ onSubmit, loading }: AuditLogFormProps) {
  const formFields = [
    {
      name: "action",
      label: "Action",
      type: "select" as const,
      options: [
        { value: "create", label: "Création" },
        { value: "update", label: "Mise à jour" },
        { value: "delete", label: "Suppression" },
        { value: "deploy", label: "Déploiement" },
        { value: "transfer", label: "Transfert" },
        { value: "login", label: "Connexion" },
        { value: "logout", label: "Déconnexion" },
      ],
      placeholder: "Sélectionnez une action",
      colSpan: 1,
    },
    {
      name: "entityType",
      label: "Type d'entité",
      type: "select" as const,
      options: [
        { value: "contract", label: "Contrat" },
        { value: "wallet", label: "Wallet" },
        { value: "organization", label: "Organisation" },
        { value: "user", label: "Utilisateur" },
        { value: "template", label: "Template" },
        { value: "transaction", label: "Transaction" },
      ],
      placeholder: "Sélectionnez un type",
      colSpan: 1,
    },
    {
      name: "entityId",
      label: "ID de l'entité",
      placeholder: "entity_123",
      type: "text" as const,
      colSpan: 2,
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Description de l'action...",
      type: "textarea" as const,
      colSpan: 2,
    },
    {
      name: "metadata",
      label: "Métadonnées (JSON)",
      placeholder: '{"key": "value"}',
      type: "textarea" as const,
      formDescription: "Métadonnées additionnelles au format JSON",
      className: "font-mono text-sm",
      colSpan: 2,
    },
  ];

  return (
    <GenericForm
      schema={AuditLogSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Creating..." : "Create Audit Log"}
      loading={loading}
      defaultValues={{
        action: "",
        entityType: "",
        entityId: "",
        description: "",
        metadata: "",
      }}
    />
  );
}

export default function AuditPage() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const getAuditLogs = async () => {
      try {
        const data = await AuditServices.getAllAuditLogs();
        setAuditLogs(data);
      } catch (error) {
        console.error('Error fetching audit logs:', error);
      }
    };
    getAuditLogs();
  }, []);

  const handleCreateAuditLog = async (data: AuditLogFormData) => {
    setLoading(true);
    try {
      const result = await AuditServices.createAuditLog(data);
      if (result.success) {
        setAuditLogs([result.data, ...auditLogs]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating audit log:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAuditLog = (auditLog: any) => {
    // TODO: Implement view functionality
    console.log('View audit log:', auditLog);
  };

  const handleDeleteAuditLog = (auditLog: any) => {
    // TODO: Implement delete functionality
    console.log('Delete audit log:', auditLog);
  };

  const getActionBadgeVariant = (action: string): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      create: "default",
      update: "secondary",
      delete: "destructive",
      deploy: "default",
      transfer: "secondary",
      login: "outline",
      logout: "outline",
    };
    return variants[action] || "outline";
  };

  const renderAuditLogCard = (auditLog: any, index: number) => (
    <EntityCard
      key={auditLog.id || index}
      title={auditLog.action}
      description={auditLog.description}
      status={{
        label: auditLog.entityType,
        variant: "outline" as const,
      }}
      metadata={[
        { label: "Entity ID", value: auditLog.entityId },
        { label: "User", value: auditLog.userId || "Unknown" },
        { label: "Date", value: new Date(auditLog.createdAt).toLocaleString() },
      ]}
      actions={[
        {
          icon: <Eye className="h-4 w-4" />,
          label: "View",
          onClick: () => handleViewAuditLog(auditLog),
        },
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: "Delete",
          onClick: () => handleDeleteAuditLog(auditLog),
          variant: "destructive" as const,
        },
      ]}
    />
  );

  const stats = [
    {
      title: "Total Logs",
      value: auditLogs.length,
      description: "Audit logs recorded",
      icon: Activity,
      trend: { value: 12, label: "from last month", positive: true },
    },
    {
      title: "Today's Logs",
      value: auditLogs.filter(log => {
        const today = new Date().toDateString();
        return new Date(log.createdAt).toDateString() === today;
      }).length,
      description: "Logs today",
      icon: Calendar,
      trend: { value: 3, label: "from yesterday", positive: true },
    },
    {
      title: "Critical Actions",
      value: auditLogs.filter(log =>
        ['delete', 'deploy', 'transfer'].includes(log.action)
      ).length,
      description: "Critical operations",
      icon: AlertTriangle,
      trend: { value: -2, label: "from last week", positive: false },
    },
    {
      title: "Active Users",
      value: new Set(auditLogs.map(log => log.userId).filter(Boolean)).size,
      description: "Users with activity",
      icon: User,
      trend: { value: 1, label: "new this week", positive: true },
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <PageHeader
        title="Audit Logs"
        description="Monitor system activities and user actions"
        action={{
          label: "Create Log",
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityList
        title="Audit Logs"
        description={`${auditLogs.length} audit log(s) recorded`}
        items={auditLogs}
        renderItem={renderAuditLogCard}
        emptyMessage="No audit logs found"
        emptyAction={{
          label: "Create your first audit log",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Create New Audit Log"
        description="Record a new system activity"
        maxWidth="max-w-4xl"
      >
        <AuditLogForm onSubmit={handleCreateAuditLog} loading={loading} />
      </FormDialog>
    </div>
  );
}