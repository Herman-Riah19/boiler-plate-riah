import z from "zod";

/**
 * TemplateVersion validation schema
 */
export const TemplateVersionSchema = z.object({
  version: z
    .number({
      message: "Version must be a number",
    })
    .int("Version must be an integer")
    .positive("Version must be positive"),

  content: z
    .string()
    .min(1, "Content is required"),

  templateId: z
    .string()
    .min(1, "Template ID is required")
    .uuid("Template ID must be a valid UUID"),

  changelog: z
    .string()
    .max(1000, "Changelog must be less than 1000 characters")
    .optional(),
});

export type TemplateVersionFormData = z.infer<typeof TemplateVersionSchema>;
