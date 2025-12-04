'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { Label } from '@repo/ui/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/ui/avatar';
import { OrganizationServices } from '@/services/organizationServices';
import { Plus, Eye, Edit, Trash2, Users, UserPlus, Crown } from 'lucide-react';

const organizationSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().min(1, 'La description est requise'),
  type: z.enum(['startup', 'enterprise', 'nonprofit', 'government']),
  website: z.string().url('URL invalide').optional().or(z.literal('')),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
});

type OrganizationFormData = z.infer<typeof organizationSchema>;

const memberSchema = z.object({
  userId: z.string().min(1, 'L\'utilisateur est requis'),
  role: z.enum(['owner', 'admin', 'member', 'viewer']),
});

type MemberFormData = z.infer<typeof memberSchema>;

interface OrganizationFormProps {
  onSubmit: (data: OrganizationFormData) => void;
  loading?: boolean;
}

function OrganizationForm({ onSubmit, loading }: OrganizationFormProps) {
  const form = useForm<OrganizationFormData>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'startup',
      website: '',
      email: '',
      phone: '',
      address: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom de l'organisation</FormLabel>
              <FormControl>
                <Input placeholder="Ma Startup" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description de l'organisation..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d'organisation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="enterprise">Entreprise</SelectItem>
                  <SelectItem value="nonprofit">Organisme à but non lucratif</SelectItem>
                  <SelectItem value="government">Gouvernement</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site web</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Téléphone</FormLabel>
              <FormControl>
                <Input placeholder="+33 1 23 45 67 89" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse</FormLabel>
              <FormControl>
                <Textarea placeholder="123 rue de la République, 75001 Paris" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Création...' : 'Créer l\'organisation'}
        </Button>
      </form>
    </Form>
  );
}

interface MemberFormProps {
  onSubmit: (data: MemberFormData) => void;
  loading?: boolean;
}

function MemberForm({ onSubmit, loading }: MemberFormProps) {
  const form = useForm<MemberFormData>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      userId: '',
      role: 'member',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de l'utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="user_123" {...field} />
              </FormControl>
              <FormDescription>
                Entrez l'ID de l'utilisateur à ajouter
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rôle</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez un rôle" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="owner">Propriétaire</SelectItem>
                  <SelectItem value="admin">Administrateur</SelectItem>
                  <SelectItem value="member">Membre</SelectItem>
                  <SelectItem value="viewer">Lecteur</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Ajout...' : 'Ajouter le membre'}
        </Button>
      </form>
    </Form>
  );
}

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [memberLoading, setMemberLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [memberDialogOpen, setMemberDialogOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<any>(null);

  const handleCreateOrganization = async (data: OrganizationFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await OrganizationServices.createOrganization(data, token);
      
      if (result.success) {
        setOrganizations([...organizations, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating organization:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMember = async (data: MemberFormData) => {
    setMemberLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await OrganizationServices.addMember(selectedOrg.id, data, token);
      
      if (result.success) {
        setMemberDialogOpen(false);
        setSelectedOrg(null);
      }
    } catch (error) {
      console.error('Error adding member:', error);
    } finally {
      setMemberLoading(false);
    }
  };

  const getTypeBadge = (type: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      startup: 'default',
      enterprise: 'secondary',
      nonprofit: 'outline',
      government: 'destructive',
    };
    return <Badge variant={variants[type] || 'outline'}>{type}</Badge>;
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin':
        return <Users className="h-4 w-4 text-blue-500" />;
      default:
        return <Users className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Organisations</h1>
          <p className="text-gray-600">Gérez vos organisations et leurs membres</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouvelle organisation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une nouvelle organisation</DialogTitle>
              <DialogDescription>
                Définissez les informations de votre organisation
              </DialogDescription>
            </DialogHeader>
            <OrganizationForm onSubmit={handleCreateOrganization} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Organizations List */}
      <Card>
        <CardHeader>
          <CardTitle>Liste des organisations</CardTitle>
          <CardDescription>
            {organizations.length} organisation(s) trouvée(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {organizations.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Aucune organisation trouvée</p>
              <Button onClick={() => setDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Créer votre première organisation
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {organizations.map((org) => (
                  <div key={org.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-medium">{org.name}</h4>
                        {getTypeBadge(org.type)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{org.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        {org.website && <span>Site: {org.website}</span>}
                        {org.email && <span>Email: {org.email}</span>}
                        <span>Membres: {org.memberCount || 0}</span>
                      </div>
                      
                      {/* Members preview */}
                      {org.members && org.members.length > 0 && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex -space-x-2">
                            {org.members.slice(0, 3).map((member: any, index: number) => (
                              <Avatar key={index} className="h-6 w-6 border-2 border-white">
                                <AvatarImage src={member.avatar} />
                                <AvatarFallback className="text-xs">
                                  {member.name?.charAt(0) || 'U'}
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
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedOrg(org);
                          setMemberDialogOpen(true);
                        }}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      {/* Add Member Dialog */}
      <Dialog open={memberDialogOpen} onOpenChange={setMemberDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Ajouter un membre</DialogTitle>
            <DialogDescription>
              Ajouter un nouveau membre à {selectedOrg?.name}
            </DialogDescription>
          </DialogHeader>
          <MemberForm onSubmit={handleAddMember} loading={memberLoading} />
        </DialogContent>
      </Dialog>
    </div>
  );
}