'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@repo/ui/components/ui/button';
import { Input } from '@repo/ui/components/ui/input';
import { Textarea } from '@repo/ui/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@repo/ui/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@repo/ui/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@repo/ui/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/components/ui/card';
import { Badge } from '@repo/ui/components/ui/badge';
import { ScrollArea } from '@repo/ui/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { Switch } from '@repo/ui/components/ui/switch';
import { ConfigServices } from '@/services/configServices';
import { Plus, Eye, Edit, Trash2, Download, Upload, RefreshCw, Settings } from 'lucide-react';

const configSchema = z.object({
  key: z.string().min(1, 'La clé est requise'),
  value: z.string().min(1, 'La valeur est requise'),
  type: z.enum(['string', 'number', 'boolean', 'json']),
  description: z.string().min(1, 'La description est requise'),
  category: z.enum(['general', 'security', 'blockchain', 'email', 'storage', 'api']),
  isSecret: z.boolean().default(false),
});

type ConfigFormData = z.infer<typeof configSchema>;

interface ConfigFormProps {
  onSubmit: (data: ConfigFormData) => void;
  loading?: boolean;
}

function ConfigForm({ onSubmit, loading }: ConfigFormProps) {
  const form = useForm<ConfigFormData>({
    resolver: zodResolver(configSchema),
    defaultValues: {
      key: '',
      value: '',
      type: 'string',
      description: '',
      category: 'general',
      isSecret: false,
    },
  });

  const watchType = form.watch('type');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="key"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Clé de configuration</FormLabel>
                <FormControl>
                  <Input placeholder="APP_NAME" {...field} />
                </FormControl>
                <FormDescription>
                  Nom unique pour cette configuration
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de valeur</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="string">Texte</SelectItem>
                    <SelectItem value="number">Nombre</SelectItem>
                    <SelectItem value="boolean">Booléen</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Description de la configuration..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="general">Général</SelectItem>
                    <SelectItem value="security">Sécurité</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="storage">Stockage</SelectItem>
                    <SelectItem value="api">API</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valeur</FormLabel>
              <FormControl>
                {watchType === 'boolean' ? (
                  <Select onValueChange={(value) => field.onChange(value === 'true')} defaultValue={field.value?.toString()}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez une valeur" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Vrai</SelectItem>
                      <SelectItem value="false">Faux</SelectItem>
                    </SelectContent>
                  </Select>
                ) : watchType === 'json' ? (
                  <Textarea 
                    placeholder='{"key": "value"}'
                    className="font-mono text-sm min-h-[100px]"
                    {...field} 
                  />
                ) : watchType === 'number' ? (
                  <Input type="number" step="any" placeholder="123" {...field} />
                ) : (
                  <Input 
                    type={field.name === 'password' ? 'password' : 'text'}
                    placeholder="Valeur de la configuration" 
                    {...field} 
                  />
                )}
              </FormControl>
              <FormDescription>
                {watchType === 'json' && 'Entrez une valeur JSON valide'}
                {watchType === 'number' && 'Entrez une valeur numérique'}
                {watchType === 'boolean' && 'Sélectionnez vrai ou faux'}
                {watchType === 'string' && 'Entrez une valeur textuelle'}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isSecret"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Configuration secrète</FormLabel>
                <FormDescription>
                  Masquer cette valeur dans l'interface
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Création...' : 'Créer la configuration'}
        </Button>
      </form>
    </Form>
  );
}

export default function ConfigPage() {
  const [configs, setConfigs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('configs');

  useEffect(() => {
    loadConfigs();
  }, []);

  const loadConfigs = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const result = await ConfigServices.getAllConfigs(token);
      
      if (result.success) {
        setConfigs(result.data || []);
      }
    } catch (error) {
      console.error('Error loading configs:', error);
    }
  };

  const handleCreateConfig = async (data: ConfigFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await ConfigServices.createConfig(data, token);
      
      if (result.success) {
        setConfigs([result.data, ...configs]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating config:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConfig = async (key: string, value: string) => {
    try {
      const token = localStorage.getItem('token') || '';
      const result = await ConfigServices.updateConfig(key, { value }, token);
      
      if (result.success) {
        setConfigs(configs.map(config => 
          config.key === key ? { ...config, value } : config
        ));
      }
    } catch (error) {
      console.error('Error updating config:', error);
    }
  };

  const handleResetConfig = async (key: string) => {
    if (!confirm('Êtes-vous sûr de vouloir réinitialiser cette configuration?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token') || '';
      const result = await ConfigServices.resetConfig(key, token);
      
      if (result.success) {
        setConfigs(configs.map(config => 
          config.key === key ? { ...config, value: config.defaultValue } : config
        ));
      }
    } catch (error) {
      console.error('Error resetting config:', error);
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const result = await ConfigServices.exportConfigs(token);
      
      if (result.success) {
        const blob = new Blob([JSON.stringify(result.data, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `config-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
      }
    } catch (error) {
      console.error('Error exporting configs:', error);
    }
  };

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      general: 'default',
      security: 'destructive',
      blockchain: 'secondary',
      email: 'outline',
      storage: 'outline',
      api: 'outline',
    };
    return <Badge variant={variants[category] || 'outline'}>{category}</Badge>;
  };

  const formatValue = (config: any) => {
    if (config.isSecret) {
      return '••••••••';
    }
    
    if (config.type === 'boolean') {
      return config.value ? 'Vrai' : 'Faux';
    }
    
    if (config.type === 'json') {
      try {
        const parsed = JSON.parse(config.value);
        return JSON.stringify(parsed, null, 2);
      } catch {
        return config.value;
      }
    }
    
    return config.value;
  };

  const groupedConfigs = configs.reduce((acc, config) => {
    if (!acc[config.category]) {
      acc[config.category] = [];
    }
    acc[config.category].push(config);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configuration Système</h1>
          <p className="text-gray-600">Gérez les paramètres de l'application</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport}>
            <Download className="mr-2 h-4 w-4" />
            Exporter
          </Button>
          
          <Button variant="outline" onClick={loadConfigs}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Nouvelle configuration
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Créer une configuration</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau paramètre de configuration
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[600px]">
                <ConfigForm onSubmit={handleCreateConfig} loading={loading} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="configs">Configurations</TabsTrigger>
          <TabsTrigger value="categories">Par catégorie</TabsTrigger>
        </TabsList>

        <TabsContent value="configs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des configurations</CardTitle>
              <CardDescription>
                {configs.length} configuration(s) trouvée(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {configs.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Aucune configuration trouvée</p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre première configuration
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {configs.map((config) => (
                      <div key={config.key} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{config.key}</h4>
                            {getCategoryBadge(config.category)}
                            <Badge variant="outline">{config.type}</Badge>
                            {config.isSecret && (
                              <Badge variant="destructive">Secret</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{config.description}</p>
                          <div className="p-2 bg-gray-50 rounded text-sm font-mono">
                            {formatValue(config)}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Mis à jour: {new Date(config.updatedAt).toLocaleString()}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleResetConfig(config.key)}
                          >
                            <RefreshCw className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {Object.entries(groupedConfigs).map(([category, categoryConfigs]) => (
            <Card key={category}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                  <Badge variant="outline">{categoryConfigs.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {categoryConfigs.map((config) => (
                    <div key={config.key} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h5 className="font-medium">{config.key}</h5>
                        <p className="text-sm text-gray-600">{config.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{config.type}</Badge>
                        {config.isSecret && (
                          <Badge variant="destructive">Secret</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}