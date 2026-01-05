"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { OrganizationServices } from "@/services/organizationServices";
import {
  OrganizationSchema,
  OrganizationFormData,
  MemberSchema,
  MemberFormData,
} from "@/validators/organization-validator";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { GenericForm } from "@/components/generic-form";
import { Eye, Edit, Trash2, UserPlus } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";
import { useAuthStore } from "@/store/auth-store";

interface OrganizationFormProps {
  onSubmit: (data: OrganizationFormData) => void;
  loading?: boolean;
}

function OrganizationForm({ onSubmit, loading }: OrganizationFormProps) {
  const formFields = [
    {
      name: "name",
      label: "Nom de l'organisation",
      placeholder: "Ma Startup",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Description de l'organisation...",
    },
    {
      name: "type",
      label: "Type d'organisation",
      type: "select" as const,
      options: [
        { value: "startup", label: "Startup" },
        { value: "enterprise", label: "Entreprise" },
        { value: "nonprofit", label: "Organisme à but non lucratif" },
        { value: "government", label: "Gouvernement" },
      ],
    },
    {
      name: "website",
      label: "Site web",
      placeholder: "https://example.com",
    },
    {
      name: "email",
      label: "Email",
      type: "email" as const,
      placeholder: "contact@example.com",
    },
    {
      name: "phone",
      label: "Téléphone",
      placeholder: "+33 1 23 45 67 89",
    },
    {
      name: "address",
      label: "Adresse",
      type: "textarea" as const,
      placeholder: "123 rue de la République, 75001 Paris",
    },
  ];

  return (
    <GenericForm
      schema={OrganizationSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Création..." : "Créer l'organisation"}
      loading={loading}
      defaultValues={{
        type: "startup",
      }}
    />
  );
}

interface MemberFormProps {
  onSubmit: (data: MemberFormData) => void;
  loading?: boolean;
}

function MemberForm({ onSubmit, loading }: MemberFormProps) {
  const formFields = [
    {
      name: "userId",
      label: "ID de l'utilisateur",
      placeholder: "user_123",
      description: "Entrez l'ID de l'utilisateur à ajouter",
    },
    {
      name: "role",
      label: "Rôle",
      type: "select" as const,
      options: [
        { value: "owner", label: "Propriétaire" },
        { value: "admin", label: "Administrateur" },
        { value: "member", label: "Membre" },
        { value: "viewer", label: "Lecteur" },
      ],
    },
  ];

  return (
    <GenericForm
      schema={MemberSchema}
      fields={formFields}
      onSubmit={onSubmit}
      submitLabel={loading ? "Ajout..." : "Ajouter le membre"}
      loading={loading}
      defaultValues={{
        role: "member",
      }}
    />
  );
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    const getOrganizations = async () => {
      const data = await OrganizationServices.getAllOrganizations(
        token as string,
      );
      setOrganizations(data);
    };
    getOrganizations();
  }, []);

  const handleCreateOrganization = async (data: OrganizationFormData) => {
    setLoading(true);
    try {
      const result = await OrganizationServices.createOrganization(
        data,
        token as string,
      );

      if (result.success) {
        setOrganizations([...organizations, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating organization:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (data: MemberFormData) => {
    setMemberLoading(true);
    try {
      const result = await OrganizationServices.addMember(
        selectedOrg.id,
        data,
        token as string,
      );

      if (result.success) {
        setMemberDialogOpen(false);
        setSelectedOrg(null);
      }
    } catch (error) {
      console.error("Error adding member:", error);
    } finally {
      setMemberLoading(false);
    }
  };

  const handleViewOrganization = (org: any) => {
    // TODO: Implement view functionality
    console.log("View organization:", org);
  };

  const handleEditOrganization = (org: any) => {
    // TODO: Implement edit functionality
    console.log("Edit organization:", org);
  };

  const handleDeleteOrganization = (org: any) => {
    // TODO: Implement delete functionality
    console.log("Delete organization:", org);
  };

  const handleAddMemberClick = (org: any) => {
    setSelectedOrg(org);
    setMemberDialogOpen(true);
  };

  const getTypeVariant = (
    type: string,
  ): "default" | "secondary" | "destructive" | "outline" => {
    const variants: Record<
      string,
      "default" | "secondary" | "destructive" | "outline"
    > = {
      startup: "default",
      enterprise: "secondary",
      nonprofit: "outline",
      government: "destructive",
    };
    return variants[type] || "outline";
  };

  const renderOrganizationCard = (org: any, index: number) => {
    const metadata = [];
    if (org.website) metadata.push({ label: "Site", value: org.website });
    if (org.email) metadata.push({ label: "Email", value: org.email });
    metadata.push({
      label: "Membres",
      value: (org.memberCount || 0).toString(),
    });

    return (
      <EntityCard
        key={org.id || index}
        title={org.name}
        description={org.description}
        status={{
          label: org.type,
          variant: getTypeVariant(org.type),
        }}
        metadata={metadata}
        actions={[
          {
            icon: <Eye className="h-4 w-4" />,
            label: "View",
            onClick: () => handleViewOrganization(org),
          },
          {
            icon: <Edit className="h-4 w-4" />,
            label: "Edit",
            onClick: () => handleEditOrganization(org),
          },
          {
            icon: <UserPlus className="h-4 w-4" />,
            label: "Add Member",
            onClick: () => handleAddMemberClick(org),
          },
          {
            icon: <Trash2 className="h-4 w-4" />,
            label: "Delete",
            onClick: () => handleDeleteOrganization(org),
            variant: "destructive" as const,
          },
        ]}
      >
        {/* Members preview */}
        {org.members && org.members.length > 0 && (
          <div className="mt-3 flex items-center gap-2">
            <div className="flex -space-x-2">
              {org.members.slice(0, 3).map((member: any, index: number) => (
                <Avatar key={index} className="h-6 w-6 border-2 border-white">
                  <AvatarImage src={member.avatar} />
                  <AvatarFallback className="text-xs">
                    {member.name?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>
            {org.members.length > 3 && (
              <span className="text-xs text-gray-500">
                +{org.members.length - 3} autres
              </span>
            )}
          </div>
        )}
      </EntityCard>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Organisations"
        description="Gérez vos organisations et leurs membres"
        action={{
          label: "Nouvelle organisation",
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityList
        title="Liste des organisations"
        description={`${organizations.length} organisation(s) trouvée(s)`}
        items={organizations}
        renderItem={renderOrganizationCard}
        emptyMessage="Aucune organisation trouvée"
        emptyAction={{
          label: "Créer votre première organisation",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Créer une nouvelle organisation"
        description="Définissez les informations de votre organisation"
        maxWidth="max-w-2xl overflow-y-auto"
      >
        <OrganizationForm
          onSubmit={handleCreateOrganization}
          loading={loading}
        />
      </FormDialog>

      <FormDialog
        open={memberDialogOpen}
        onOpenChange={setMemberDialogOpen}
        title="Ajouter un membre"
        description={`Ajouter un nouveau membre à ${selectedOrg?.name}`}
        maxWidth="max-w-md overflow-y-auto"
      >
        <MemberForm onSubmit={handleAddMember} loading={memberLoading} />
      </FormDialog>
    </div>
  );
}
