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
import { Progress } from '@repo/ui/components/ui/progress';
import { FileServices } from '@/services/fileServices';
import { Plus, Eye, Download, Upload, Trash2, FileText, Image, File, Search, Filter } from 'lucide-react';

const fileUploadSchema = z.object({
  file: z.instanceof(File, { message: 'Veuillez sélectionner un fichier' }),
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  category: z.enum(['document', 'image', 'video', 'audio', 'archive', 'other']),
  tags: z.string().optional(),
});

type FileUploadFormData = z.infer<typeof fileUploadSchema>;

const filterSchema = z.object({
  category: z.string().optional(),
  search: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

type FilterFormData = z.infer<typeof filterSchema>;

interface FileUploadFormProps {
  onSubmit: (data: FileUploadFormData) => void;
  loading?: boolean;
  progress?: number;
}

function FileUploadForm({ onSubmit, loading, progress }: FileUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const form = useForm<FileUploadFormData>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      name: '',
      description: '',
      category: 'other',
      tags: '',
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue('file', file);
      form.setValue('name', file.name.split('.')[0]);
      
      // Generate preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    }
  };

  const getFileCategory = (file: File): string => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.startsWith('audio/')) return 'audio';
    if (file.type.includes('pdf') || file.type.includes('document') || file.type.includes('text')) return 'document';
    if (file.type.includes('zip') || file.type.includes('rar') || file.type.includes('tar')) return 'archive';
    return 'other';
  };

  useEffect(() => {
    if (selectedFile) {
      form.setValue('category', getFileCategory(selectedFile) as any);
    }
  }, [selectedFile, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="file"
          render={() => (
            <FormItem>
              <FormLabel>Fichier</FormLabel>
              <FormControl>
                <div className="space-y-2">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept="*/*"
                  />
                  {selectedFile && (
                    <div className="text-sm text-gray-600">
                      Fichier sélectionné: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
                    </div>
                  )}
                  {preview && (
                    <div className="mt-2">
                      <img
                        src={preview}
                        alt="Preview"
                        className="max-w-full h-32 object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du fichier</FormLabel>
              <FormControl>
                <Input placeholder="Mon document" {...field} />
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
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Vidéo</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="archive">Archive</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
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
                <Textarea placeholder="Description du fichier..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="tag1, tag2, tag3" {...field} />
              </FormControl>
              <FormDescription>
                Séparez les tags par des virgules
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {progress !== undefined && progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progression de l'upload</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Upload...' : 'Uploader le fichier'}
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
      category: '',
      search: '',
      dateFrom: '',
      dateTo: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recherche</FormLabel>
              <FormControl>
                <Input placeholder="Rechercher un fichier..." {...field} />
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
                    <SelectValue placeholder="Toutes les catégories" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="">Toutes</SelectItem>
                  <SelectItem value="document">Document</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Vidéo</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                  <SelectItem value="archive">Archive</SelectItem>
                  <SelectItem value="other">Autre</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="dateFrom"
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
            name="dateTo"
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

export default function FilesPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | undefined>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('files');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const token = localStorage.getItem('token') || '';
      const result = await FileServices.getAllFiles();
      
      if (result.success) {
        setFiles(result.data || []);
      }
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  const handleUploadFile = async (data: FileUploadFormData) => {
    setLoading(true);
    setUploadProgress(0);
    
    try {
      const token = localStorage.getItem('token') || '';
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev === undefined) return 10;
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const result = await FileServices.uploadFile(data.file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      if (result.success) {
        const newFile = {
          ...result.data,
          name: data.name,
          description: data.description,
          category: data.category,
          tags: data.tags?.split(',').map(tag => tag.trim()) || [],
        };
        setFiles([newFile, ...files]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setUploadProgress(undefined), 1000);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce fichier?')) {
      return;
    }

    try {
      const result = await FileServices.deleteFile(fileId);
      
      if (result.success) {
        setFiles(files.filter(file => file.id !== fileId));
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleDownloadFile = async (file: any) => {
    try {
      const link = document.createElement('a');
      link.href = file.url;
      link.download = file.name;
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const getCategoryBadge = (category: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      document: 'default',
      image: 'secondary',
      video: 'destructive',
      audio: 'outline',
      archive: 'outline',
      other: 'outline',
    };
    return <Badge variant={variants[category] || 'outline'}>{category}</Badge>;
  };

  const getFileIcon = (category: string) => {
    switch (category) {
      case 'image':
        return <Image className="h-4 w-4" />;
      case 'document':
        return <FileText className="h-4 w-4" />;
      default:
        return <File className="h-4 w-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fichiers</h1>
          <p className="text-gray-600">Gérez vos fichiers et documents</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setFilterDialogOpen(true)}>
            <Filter className="mr-2 h-4 w-4" />
            Filtrer
          </Button>
          
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Uploader un fichier
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Uploader un fichier</DialogTitle>
                <DialogDescription>
                  Ajoutez un nouveau fichier à votre espace de stockage
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[600px]">
                <FileUploadForm 
                  onSubmit={handleUploadFile} 
                  loading={loading}
                  progress={uploadProgress}
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="files">Fichiers</TabsTrigger>
          <TabsTrigger value="grid">Grille</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Liste des fichiers</CardTitle>
              <CardDescription>
                {files.length} fichier(s) trouvé(s)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {files.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Aucun fichier trouvé</p>
                  <Button onClick={() => setDialogOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Uploader votre premier fichier
                  </Button>
                </div>
              ) : (
                <ScrollArea className="h-[500px]">
                  <div className="space-y-4">
                    {files.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="flex-shrink-0">
                            {getFileIcon(file.category)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium truncate">{file.name}</h4>
                              {getCategoryBadge(file.category)}
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{file.description}</p>
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                              <span>Taille: {formatFileSize(file.size || 0)}</span>
                              <span>Type: {file.type || 'Unknown'}</span>
                              <span>Uploadé: {new Date(file.createdAt).toLocaleDateString()}</span>
                            </div>
                            {file.tags && file.tags.length > 0 && (
                              <div className="flex gap-1 mt-2">
                                {file.tags.map((tag: string, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDownloadFile(file)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handleDeleteFile(file.id)}
                          >
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

        <TabsContent value="grid" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vue grille</CardTitle>
              <CardDescription>
                Affichage des fichiers en grille
              </CardDescription>
            </CardHeader>
            <CardContent>
              {files.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Aucun fichier à afficher</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {files.map((file) => (
                    <Card key={file.id} className="overflow-hidden">
                      <div className="aspect-square bg-gray-100 flex items-center justify-center">
                        {file.category === 'image' ? (
                          <img
                            src={file.url}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-gray-400">
                            {getFileIcon(file.category)}
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3">
                        <h5 className="font-medium truncate mb-1">{file.name}</h5>
                        <p className="text-xs text-gray-500 mb-2">
                          {formatFileSize(file.size || 0)}
                        </p>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Download className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Filter Dialog */}
      <Dialog open={filterDialogOpen} onOpenChange={setFilterDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Filtrer les fichiers</DialogTitle>
            <DialogDescription>
              Appliquez des filtres pour affiner les résultats
            </DialogDescription>
          </DialogHeader>
          <FilterForm onSubmit={() => {}} loading={false} />
        </DialogContent>
      </Dialog>
    </div>
  );
}