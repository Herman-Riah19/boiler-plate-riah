'use client';

import { useState, useEffect } from 'react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { AuditServices } from '@/services/auditServices';
import { Plus, Eye, Download, Search, Filter, Calendar, User, Activity } from 'lucide-react';

const auditLogSchema = z.object({
  action: z.string().min(1, 'L\'action est requise'),
  entityType: z.string().min(1, 'Le type d\'entité est requis'),
  entityId: z.string().min(1, 'L\'ID de l\'entité est requis'),
  description: z.string().min(1, 'La description est requise'),
  metadata: z.string().optional(),
});

type AuditLogFormData = z.infer<typeof auditLogSchema>;

const filterSchema = z.object({
  action: z.string().optional(),
  entityType: z.string().optional(),
  userId: z.string().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface AuditLogFormProps {
  onSubmit: (data: AuditLogFormData) => void;
  loading?: boolean;
}

function AuditLogForm({ onSubmit, loading }: AuditLogFormProps) {
  const form = useForm<AuditLogFormData>({
    resolver: zodResolver(auditLogSchema),
    defaultValues: {
      action: '',
      entityType: '',
      entityId: '',
      description: '',
      metadata: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une action" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="create">Création</SelectItem>
                    <SelectItem value="update">Mise à jour</SelectItem>
                    <SelectItem value="delete">Suppression</SelectItem>
                    <SelectItem value="deploy">Déploiement</SelectItem>
                    <SelectItem value="transfer">Transfert</SelectItem>
                    <SelectItem value="login">Connexion</SelectItem>
                    <SelectItem value="logout">Déconnexion</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d'entité</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="contract">Contrat</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                    <SelectItem value="organization">Organisation</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                    <SelectItem value="template">Template</SelectItem>
                    <SelectItem value="transaction">Transaction</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="entityId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID de l'entité</FormLabel>
              <FormControl>
                <Input placeholder="entity_123" {...field} />
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
                <Textarea placeholder="Description de l'action..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="metadata"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Métadonnées (JSON)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder='{"key": "value"}'
                  className="font-mono text-sm"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Métadonnées additionnelles au format JSON
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Création...' : 'Créer le log d\'audit'}
        </Button>
      </form>
    </Form>
  );
}

interface FilterFormProps {
  onSubmit: (data: FilterFormData) => void;
  loading?: boolean;
}

function FilterForm({ onSubmit, loading }: FilterFormProps) {
  const form = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      action: '',
      entityType: '',
      userId: '',
      startDate: '',
      endDate: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="action"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Action</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les actions" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">Toutes</SelectItem>
                    <SelectItem value="create">Création</SelectItem>
                    <SelectItem value="update">Mise à jour</SelectItem>
                    <SelectItem value="delete">Suppression</SelectItem>
                    <SelectItem value="deploy">Déploiement</SelectItem>
                    <SelectItem value="transfer">Transfert</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entityType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type d'entité</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les types" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="">Tous</SelectItem>
                    <SelectItem value="contract">Contrat</SelectItem>
                    <SelectItem value="wallet">Wallet</SelectItem>
                    <SelectItem value="organization">Organisation</SelectItem>
                    <SelectItem value="user">Utilisateur</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ID Utilisateur</FormLabel>
              <FormControl>
                <Input placeholder="user_123" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de début</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date de fin</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Filtrage...' : 'Appliquer les filtres'}
        </Button>
      </form>
    </Form>
  );
}

export default function AuditPage() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [statistics, setStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [filterLoading, setFilterLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('logs');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      
      // Load audit logs
      const logsResult = await AuditServices.getAllAuditLogs(token);
      if (logsResult.success) {
        setAuditLogs(logsResult.data || []);
      }

      // Load statistics
      const statsResult = await AuditServices.getAuditStatistics(token);
      if (statsResult.success) {
        setStatistics(statsResult.data);
      }
    } catch (error) {
      console.error('Error loading audit data:', error);
    }
  };

  const handleCreateAuditLog = async (data: AuditLogFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await AuditServices.createAuditLog(data, token);
      
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

  const handleFilter = async (data: FilterFormData) => {
    setFilterLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await AuditServices.getAuditLogsByDateRange(
        data.startDate || '', 
        data.endDate || '', 
        token
      );
      
      if (result.success) {
        setAuditLogs(result.data || []);
        setFilterDialogOpen(false);
      }
    } catch (error) {
      console.error('Error filtering audit logs:', error);
    } finally {
      setFilterLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const result = await AuditServices.exportAuditLogs({}, token);
      
      if (result.success) {
        // Handle file download
        const blob = new Blob([JSON.stringify(result.data, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `audit-logs-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
      }
    } catch (error) {
      console.error('Error exporting audit logs:', error);
    }
  };

  const getActionBadge = (action: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      create: 'default',
      update: 'secondary',
      delete: 'destructive',
      deploy: 'default',
      transfer: 'secondary',
      login: 'outline',
      logout: 'outline',
    };
    return <Badge variant={variants[action] || 'outline'}>{action}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Logs d'Audit</h1>
          <p className="text-gray-600">Suivez toutes les activités du système</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          
          <Button variant="outline" onClick={() => setFilterDialogOpen(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau log
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer un log d'audit</DialogTitle>
                <DialogDescription>
                  Enregistrez une nouvelle action dans les logs d'audit
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[500px]">
                <AuditLogForm onSubmit={handleCreateAuditLog} loading={loading} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics */}
      {statistics && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Activity className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Total des logs</div>
                  <div className="text-lg font-semibold">{statistics.totalLogs}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <User className="h-8 w-8 text-green-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Utilisateurs actifs</div>
                  <div className="text-lg font-semibold">{statistics.activeUsers}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="h-8 w-8 text-purple-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Aujourd'hui</div>
                  <div className="text-lg font-semibold">{statistics.todayLogs}</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Search className="h-8 w-8 text-orange-500 mr-3" />
                <div>
                  <div className="text-sm text-gray-600">Actions critiques</div>
                  <div className="text-lg font-semibold">{statistics.criticalActions}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="logs">Logs</TabsTrigger>
          <TabsTrigger value="statistics">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historique des logs d'audit</CardTitle>
              <CardDescription>
                {auditLogs.length} log(s) trouvé(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {auditLogs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Aucun log d'audit trouvé</p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre premier log
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {auditLogs.map((log) => (
                      <div key={log.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{log.action}</h4>
                            {getActionBadge(log.action)}
                            <Badge variant="outline">{log.entityType}</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{log.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Entité: {log.entityId}</span>
                            <span>Utilisateur: {log.userId}</span>
                            <span>{new Date(log.createdAt).toLocaleString()}</span>
                          </div>
                          {log.metadata && (
                            <div className="mt-2 p-2 bg-gray-50 rounded text-xs font-mono">
                              {JSON.stringify(log.metadata, null, 2)}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques détaillées</CardTitle>
              <CardDescription>
                Analyse des activités du système
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Statistiques détaillées à venir...</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filtrer les logs</DialogTitle>
            <DialogDescription>
              Appliquez des filtres pour affiner les résultats
            </DialogDescription>
          </DialogHeader>
          <FilterForm onSubmit={handleFilter} loading={filterLoading} />
        </DialogContent>
      </Dialog>
    </div>
  );
}