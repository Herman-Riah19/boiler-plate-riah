"use client";

import { useEffect, useState } from "react";
import { FileServices } from "@/services/fileServices";
import { PageHeader } from "@/components/page-header";
import { FormDialog } from "@/components/dialog/form-dialog";
import { EntityList } from "@/components/entity/entity-list";
import { EntityCard } from "@/components/card/entity-card";
import { StatsCards } from "@/components/card/stats-cards";
import { GenericForm } from "@/components/generic-form";
import {
  Eye,
  Download,
  Trash2,
  Upload,
  FileText,
  Image,
  HardDrive,
  Database,
  File,
} from "lucide-react";
import { AttachmentSchema } from "@/validators/attachment-validator";
import { useAuthStore } from "@/store/auth-store";

interface FileUploadFormProps {
  onSubmit: (file: File) => void;
  loading?: boolean;
}

function FileUploadForm({ onSubmit, loading }: FileUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Generate preview for images
      if (file.type.startsWith("image/")) {
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
    if (file.type.startsWith("image/")) return "image";
    if (file.type.startsWith("video/")) return "video";
    if (file.type.startsWith("audio/")) return "audio";
    if (
      file.type.includes("pdf") ||
      file.type.includes("document") ||
      file.type.includes("text")
    )
      return "document";
    if (
      file.type.includes("zip") ||
      file.type.includes("rar") ||
      file.type.includes("tar")
    )
      return "archive";
    return "other";
  };

  const formFields = [
    {
      name: "filename",
      label: "Nom du fichier",
      placeholder: "Mon document",
    },
    {
      name: "category",
      label: "Catégorie",
      type: "select" as const,
      options: [
        { value: "document", label: "Document" },
        { value: "image", label: "Image" },
        { value: "video", label: "Vidéo" },
        { value: "audio", label: "Audio" },
        { value: "archive", label: "Archive" },
        { value: "other", label: "Autre" },
      ],
    },
    {
      name: "description",
      label: "Description",
      type: "textarea" as const,
      placeholder: "Description du fichier...",
    },
    {
      name: "tags",
      label: "Tags",
      placeholder: "tag1, tag2, tag3",
      description: "Séparez les tags par des virgules",
    },
  ];

  const handleFormSubmit = (data: any) => {
    if (selectedFile) {
      onSubmit(selectedFile);
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Cliquez pour uploader un fichier
              </span>
              <input
                id="file-upload"
                name="file"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar,.tar"
              />
            </label>
            <p className="mt-1 text-xs text-gray-500">
              PNG, JPG, PDF, DOC, TXT, ZIP jusqu'à 10MB
            </p>
          </div>
        </div>
      </div>

      {selectedFile && (
        <div className="space-y-4">
          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="max-h-32 max-w-32 object-contain rounded"
              />
            </div>
          )}
          <div className="text-center">
            <p className="text-sm text-gray-600">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">
              {formatFileSize(selectedFile.size)}
            </p>
          </div>
        </div>
      )}

      <GenericForm
        schema={AttachmentSchema}
        fields={formFields}
        onSubmit={handleFormSubmit}
        submitLabel={loading ? "Upload..." : "Uploader le fichier"}
        loading={loading}
        defaultValues={{
          filename: selectedFile?.name.split(".")[0] || "",
          category: selectedFile ? getFileCategory(selectedFile) : "other",
        }}
      />
    </div>
  );
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export default function FilesPage() {
  const [files, setFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const token = useAuthStore.getState().token;

  useEffect(() => {
    const getFiles = async () => {
      try {
        const data = await FileServices.getAllFiles(token as string);
        setFiles(data);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    getFiles();
  }, []);

  const handleUploadFile = async (file: File) => {
    setLoading(true);
    try {
      const result = await FileServices.uploadFile(file, token as string);
      if (result.success) {
        setFiles([...files, result.data]);
        setDialogOpen(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewFile = (file: any) => {
    // TODO: Implement view functionality
    console.log("View file:", file);
  };

  const handleDownloadFile = (file: any) => {
    try {
      const link = document.createElement("a");
      link.href = file.url || file.fileUrl;
      link.download = file.filename || file.name;
      link.click();
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleDeleteFile = (file: any) => {
    // TODO: Implement delete functionality
    console.log("Delete file:", file);
  };

  const getFileIcon = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(ext || ""))
      return <Image className="h-4 w-4" />;
    if (["pdf", "doc", "docx", "txt"].includes(ext || ""))
      return <FileText className="h-4 w-4" />;
    return <File className="h-4 w-4" />;
  };

  const renderFileCard = (file: any, index: number) => (
    <EntityCard
      key={file.id || index}
      title={file.filename}
      description={file.description || "No description"}
      metadata={[
        { label: "Size", value: formatFileSize(file.size || 0) },
        { label: "Type", value: file.mimeType || "Unknown" },
        {
          label: "Uploaded",
          value: new Date(file.createdAt).toLocaleDateString(),
        },
      ]}
      actions={[
        {
          icon: getFileIcon(file.filename),
          label: "View",
          onClick: () => handleViewFile(file),
        },
        {
          icon: <Download className="h-4 w-4" />,
          label: "Download",
          onClick: () => handleDownloadFile(file),
        },
        {
          icon: <Trash2 className="h-4 w-4" />,
          label: "Delete",
          onClick: () => handleDeleteFile(file),
          variant: "destructive" as const,
        },
      ]}
    />
  );

  const stats = [
    {
      title: "Total Files",
      value: files.length,
      description: "Files uploaded",
      icon: HardDrive,
      trend: { value: 5, label: "from last week", positive: true },
    },
    {
      title: "Total Size",
      value: `${(files.reduce((acc, file) => acc + (file.size || 0), 0) / 1024 / 1024).toFixed(2)} MB`,
      description: "Storage used",
      icon: Database,
      trend: { value: 12, label: "from last month", positive: true },
    },
    {
      title: "Images",
      value: files.filter((f) => f.mimeType?.startsWith("image/")).length,
      description: "Image files",
      icon: Image,
      trend: { value: 3, label: "from last week", positive: true },
    },
    {
      title: "Documents",
      value: files.filter(
        (f) => f.mimeType?.includes("pdf") || f.mimeType?.includes("document"),
      ).length,
      description: "Document files",
      icon: FileText,
      trend: { value: 1, label: "from last week", positive: false },
    },
  ];

  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />

      <PageHeader
        title="File Management"
        description="Upload and manage your contract files"
        action={{
          label: "Upload File",
          icon: <Upload className="h-4 w-4" />,
          onClick: () => setDialogOpen(true),
        }}
      />

      <EntityList
        title="Files"
        description={`${files.length} file(s) uploaded`}
        items={files}
        renderItem={renderFileCard}
        emptyMessage="No files uploaded yet"
        emptyAction={{
          label: "Upload your first file",
          onClick: () => setDialogOpen(true),
        }}
      />

      <FormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title="Upload New File"
        description="Select and upload a file for your contracts"
        maxWidth="max-w-2xl overflow-y-auto"
      >
        <FileUploadForm onSubmit={handleUploadFile} loading={loading} />
      </FormDialog>
    </div>
  );
}
