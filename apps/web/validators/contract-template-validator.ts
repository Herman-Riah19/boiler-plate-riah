import z from "zod";

/**
 * ContractTemplate validation schema
 */
export const ContractTemplateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(255, "Name must be less than 255 characters"),

  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional(),

  category: z
    .string()
    .min(1, "Category is required")
    .max(100, "Category must be less than 100 characters"),

  content: z
    .string()
    .min(1, "Content is required"),

  organizationId: z
    .string()
    .min(1, "Organization ID is required")
    .uuid("Organization ID must be a valid UUID"),
});

export type ContractTemplateFormData = z.infer<typeof ContractTemplateSchema>;
