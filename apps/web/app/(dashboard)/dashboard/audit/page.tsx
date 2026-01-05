"use client";

import { useEffect, useState } from "react";
import { AuditServices } from "@/services/auditServices";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { StatsCards } from "@/components/card/stats-cards";
import { Eye, Activity, User, Calendar, AlertTriangle, Trash2 } from "lucide-react";
import { AuditLogForm } from "./auditLogForm";
import { AuditLogFormData } from "@/validators/audit-log-validator";
import { useAuthStore } from "@/store/auth-store";

export default function AuditPage() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    const getAuditLogs = async () => {
      try {
        const data = await AuditServices.getAllAuditLogs(token as string);
        setAuditLogs(data);
      } catch (error) {
        console.error("Error fetching audit logs:", error);
      }
    };
    getAuditLogs();
  }, []);

  const handleCreateAuditLog = async (data: AuditLogFormData) => {
    setLoading(true);
    try {
      const result = await AuditServices.createAuditLog(data, token as string);
      if (result.success) {
        setAuditLogs([result.data, ...auditLogs]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating audit log:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewAuditLog = (auditLog: any) => {
    // TODO: Implement view functionality
    console.log("View audit log:", auditLog);
  };

  const handleDeleteAuditLog = (auditLog: any) => {
    // TODO: Implement delete functionality
    console.log("Delete audit log:", auditLog);
  };

  const renderAuditLogCard = (auditLog: any, index: number) => (
    <EntityCard
      key={auditLog.id || index}
      title={auditLog.action}
      description={
        auditLog.details
          ? typeof auditLog.details === "string"
            ? auditLog.details
            : JSON.stringify(auditLog.details)
          : "Aucune information complémentaire"
      }
      status={{
        label: auditLog.action,
        variant: "outline" as const,
      }}
      metadata={[
        { label: "Contrat", value: auditLog.contract.title },
        { label: "Utilisateur", value: auditLog.user.name },
        { label: "Organisation", value: auditLog.organization.name },
        { label: "Date", value: new Date(auditLog.createdAt).toLocaleString() },
      ]}
      actions={[
        {
          icon: <Eye className="h-4 w-4" />,
          label: "Voir",
          onClick: () => handleViewAuditLog(auditLog),
        },
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: "Supprimer",
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
      value: auditLogs.filter((log) => {
        const today = new Date().toDateString();
        return new Date(log.createdAt).toDateString() === today;
      }).length,
      description: "Logs today",
      icon: Calendar,
      trend: { value: 3, label: "from yesterday", positive: true },
    },
    {
      title: "Critical Actions",
      value: auditLogs.filter((log) =>
        ["delete", "deploy", "transfer"].includes(log.action),
      ).length,
      description: "Critical operations",
      icon: AlertTriangle,
      trend: { value: -2, label: "from last week", positive: false },
    },
    {
      title: "Active Users",
      value: new Set(auditLogs.map((log) => log.userId).filter(Boolean)).size,
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
        maxWidth="max-w-4xl overflow-auto"
      >
        <AuditLogForm onSubmit={handleCreateAuditLog} loading={loading} />
      </FormDialog>
    </div>
  );
}
