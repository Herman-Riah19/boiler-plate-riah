import { GenericForm } from "@/components/generic-form";
import { useAuthStore } from "@/store/auth-store";
import { ContractServices } from "@/services/contractServices";
import { OrganizationServices } from "@/services/organizationServices";
import { UserServices } from "@/services/userServices";
import { AuditLogSchema } from "@/validators/audit-log-validator";
import { useState } from "react";
import { useEffect } from "react";
import z from "zod";

type AuditLogFormData = z.infer<typeof AuditLogSchema>;

interface AuditLogFormProps {
  onSubmit: (data: AuditLogFormData) => void;
  loading?: boolean;
}

export function AuditLogForm({ onSubmit, loading }: AuditLogFormProps) {
  const [organizations, setOrganizations] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [users, setUsers] = useState([]);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    const getOrganizations = async () => {
      const data = await OrganizationServices.getAllOrganizations(token as string);
      setOrganizations(data);
    };
    const getUsers = async () => {
        const data = await UserServices.getAllUsers(token as string);
        setUsers(data);
    };
    const getContracts = async () => {
        const data = await ContractServices.getAllContracts(token as string);
        setContracts(data);
    };
    getOrganizations();
    getContracts();
    getUsers();
  }, []);

  const formFields = [
    {
      name: "contractId",
      label: "ID du contrat",
      type: "select" as const,
      placeholder: "contract_123",
      options: contracts.map(({ id }: any) => ({
        value: id,
        label: id,
      })),
      required: true,
      formDescription: "Identifiant du contrat lié à la trace d'audit",
    },
    {
      name: "userId",
      label: "ID de l'utilisateur",
      type: "select" as const,
      placeholder: "user_456",
      options: users.map(({ id, name }: any) => ({
        value: id,
        label: name,
      })),
      required: true,
      formDescription: "Identifiant de l'utilisateur ayant effectué l'action",
    },
    {
      name: "organizationId",
      label: "ID de l'organisation",
      type: "select" as const,
      placeholder: "org_789",
      options: organizations.map(({ id, name }: any) => ({
        value: id,
        label: name,
      })),
      required: true,
      formDescription: "Identifiant de l'organisation concernée",
    },
    {
      name: "action",
      label: "Action",
      type: "select" as const,
      options: [
        { value: "CONTRACT_CREATED", label: "Contrat créé" },
        { value: "CONTRACT_UPDATED", label: "Contrat mis à jour" },
        { value: "CONTRACT_DELETED", label: "Contrat supprimé" },
        { value: "CONTRACT_SIGNED", label: "Contrat signé" },
        { value: "CONTRACT_EXECUTED", label: "Contrat exécuté" },
        { value: "CONTRACT_REJECTED", label: "Contrat rejeté" },
        { value: "DEPLOYMENT_STARTED", label: "Déploiement commencé" },
        { value: "TRANSFERT", label: "Transfert" },
      ],
      placeholder: "Sélectionnez une action",
      colSpan: 2,
      required: true,
      formDescription: "Type d'action réalisée",
    },
    {
      name: "details",
      label: "Détails (JSON facultatif)",
      type: "textarea" as const,
      placeholder: '{"field": "valeur"}',
      colSpan: 2,
      formDescription: "Détails additionnels sur l'action, au format JSON",
      className: "font-mono text-sm",
    },
  ];

  return (
    <GenericForm
      schema={AuditLogSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Création..." : "Créer une trace d'audit"}
      loading={loading}
      defaultValues={{
        contractId: "",
        userId: "",
        organizationId: "",
        action: "",
        details: "",
      }}
    />
  );
}
