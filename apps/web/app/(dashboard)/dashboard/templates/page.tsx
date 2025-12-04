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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@repo/ui/components/ui/tabs';
import { TemplateServices } from '@/services/templateServices';
import { Plus, Eye, Edit, Trash2, Play, Copy, Download, Code } from 'lucide-react';

const templateSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().min(1, 'La description est requise'),
  category: z.enum(['token', 'nft', 'defi', 'governance', 'utility', 'custom']),
  sourceCode: z.string().min(1, 'Le code source est requis'),
  version: z.string().min(1, 'La version est requise'),
  tags: z.string().optional(),
});

type TemplateFormData = z.infer<typeof templateSchema>;

const versionSchema = z.object({
  version: z.string().min(1, 'La version est requise'),
  sourceCode: z.string().min(1, 'Le code source est requis'),
  changelog: z.string().optional(),
});

type VersionFormData = z.infer<typeof versionSchema>;

interface TemplateFormProps {
  onSubmit: (data: TemplateFormData) => void;
  loading?: boolean;
}

function TemplateForm({ onSubmit, loading }: TemplateFormProps) {
  const form = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'custom',
      sourceCode: '',
      version: '1.0.0',
      tags: '',
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
              <FormLabel>Nom du template</FormLabel>
              <FormControl>
                <Input placeholder="Mon Template" {...field} />
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
                <Textarea placeholder="Description du template..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
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
                    <SelectItem value="token">Token</SelectItem>
                    <SelectItem value="nft">NFT</SelectItem>
                    <SelectItem value="defi">DeFi</SelectItem>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="utility">Utility</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="version"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Version</FormLabel>
                <FormControl>
                  <Input placeholder="1.0.0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="solidity, erc20, token" {...field} />
              </FormControl>
              <FormDescription>
                Séparez les tags par des virgules
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sourceCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code source Solidity</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="// SPDX-License-Identifier: MIT&#10;pragma solidity ^0.8.0;&#10;&#10;contract MyContract {&#10;    // Votre code ici&#10;}"
                  className="min-h-[300px] font-mono text-sm"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                Collez le code source Solidity de votre template
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Création...' : 'Créer le template'}
        </Button>
      </form>
    </Form>
  );
}

interface VersionFormProps {
  onSubmit: (data: VersionFormData) => void;
  loading?: boolean;
}

function VersionForm({ onSubmit, loading }: VersionFormProps) {
  const form = useForm<VersionFormData>({
    resolver: zodResolver(versionSchema),
    defaultValues: {
      version: '',
      sourceCode: '',
      changelog: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="version"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version</FormLabel>
              <FormControl>
                <Input placeholder="1.1.0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sourceCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code source</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="// Code source de la nouvelle version..."
                  className="min-h-[200px] font-mono text-sm"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="changelog"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Notes de version</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Nouvelles fonctionnalités, corrections de bugs..."
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Création...' : 'Ajouter la version'}
        </Button>
      </form>
    </Form>
  );
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [versionLoading, setVersionLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [versionDialogOpen, setVersionDialogOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('templates');

  const handleCreateTemplate = async (data: TemplateFormData) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await TemplateServices.createTemplate(data, token);
      
      if (result.success) {
        setTemplates([result.data, ...templates]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error creating template:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateVersion = async (data: VersionFormData) => {
    setVersionLoading(true);
    try {
      const token = localStorage.getItem('token') || '';
      const result = await TemplateServices.createTemplateVersion(selectedTemplate.id, data, token);
      
      if (result.success) {
        setVersionDialogOpen(false);
        setSelectedTemplate(null);
      }
    } catch (error) {
      console.error('Error creating version:', error);
    } finally {
      setVersionLoading(false);
    }
  };

  const handleDeployTemplate = async (templateId: string, versionId: string) => {
    try {
      const token = localStorage.getItem('token') || '';
      const result = await TemplateServices.deployTemplate(templateId, versionId, {}, token);
      
      if (result.success) {
        // Update template status
        setTemplates(templates.map(template => 
          template.id === templateId 
            ? { ...template, deployed: true, deployedAt: new Date() }
            : template
        ));
      }
    } catch (error) {
      console.error('Error deploying template:', error);
    }
  };

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      token: 'default',
      nft: 'secondary',
      defi: 'destructive',
      governance: 'outline',
      utility: 'secondary',
      custom: 'outline',
    };
    return <Badge variant={variants[category] || 'outline'}>{category}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Templates de Contrats</h1>
          <p className="text-gray-600">Gérez vos templates de contrats intelligents</p>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Créer un nouveau template</DialogTitle>
              <DialogDescription>
                Définissez un template réutilisable pour vos contrats
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[600px]">
              <TemplateForm onSubmit={handleCreateTemplate} loading={loading} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="versions">Versions</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des templates</CardTitle>
              <CardDescription>
                {templates.length} template(s) trouvé(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {templates.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Aucun template trouvé</p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Créer votre premier template
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[400px]">
                  <div className="space-y-4">
                    {templates.map((template) => (
                      <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium">{template.name}</h4>
                            {getCategoryBadge(template.category)}
                            <Badge variant="outline">v{template.version}</Badge>
                            {template.deployed && (
                              <Badge variant="default">Déployé</Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>Versions: {template.versions?.length || 1}</span>
                            <span>Créé le: {new Date(template.createdAt).toLocaleDateString()}</span>
                            {template.deployedAt && (
                              <span>Déployé le: {new Date(template.deployedAt).toLocaleDateString()}</span>
                            )}
                          </div>
                          {template.tags && (
                            <div className="flex gap-1 mt-2">
                              {template.tags.split(',').map((tag: string, index: number) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {tag.trim()}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedTemplate(template);
                              setVersionDialogOpen(true);
                            }}
                          >
                            <Code className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeployTemplate(template.id, template.latestVersionId)}
                          >
                            <Play className="h-4 w-4" />
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

        <TabsContent value="versions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Versions des templates</CardTitle>
              <CardDescription>
                Historique des versions de tous vos templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-gray-500">Sélectionnez un template pour voir ses versions</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Version Dialog */}
      <Dialog open={versionDialogOpen} onOpenChange={setVersionDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Ajouter une version</DialogTitle>
            <DialogDescription>
              Ajouter une nouvelle version à {selectedTemplate?.name}
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[500px]">
            <VersionForm onSubmit={handleCreateVersion} loading={versionLoading} />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
}