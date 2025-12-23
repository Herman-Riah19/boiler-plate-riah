import z from "zod";

/**
 * Attachment validation schema
 */
export const AttachmentSchema = z.object({
  filename: z
    .string()
    .min(1, "Filename is required")
    .max(255, "Filename must be less than 255 characters"),

  fileUrl: z
    .string()
    .min(1, "File URL is required")
    .url("File URL must be a valid URL"),

  size: z
    .number({
      message: "Size must be a number",
    })
    .int("Size must be an integer")
    .positive("Size must be positive"),

  mimeType: z
    .string()
    .min(1, "MIME type is required")
    .regex(/^[^/]+\/[^/]+$/, "MIME type must be in format 'type/subtype'"),

  contractId: z
    .string()
    .min(1, "Contract ID is required")
    .uuid("Contract ID must be a valid UUID"),
});

export type AttachmentFormData = z.infer<typeof AttachmentSchema>;
