import z from "zod";

/**
 * Organization type enum
 */
export const OrganizationTypeEnum = z.enum([
  "startup",
  "enterprise",
  "nonprofit",
  "government",
]);

/**
 * Organization validation schema
 */
export const OrganizationSchema = z.object({
  name: z
    .string()
    .min(1, "Le nom est requis")
    .max(255, "Le nom ne doit pas dépasser 255 caractères"),

  description: z
    .string()
    .min(1, "La description est requise")
    .max(1000, "La description ne doit pas dépasser 1000 caractères"),

  type: OrganizationTypeEnum,

  website: z
    .string()
    .url("URL invalide")
    .optional()
    .or(z.literal("")),

  email: z
    .string()
    .email("Email invalide")
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .max(20, "Le numéro de téléphone ne doit pas dépasser 20 caractères")
    .optional(),

  address: z
    .string()
    .max(500, "L'adresse ne doit pas dépasser 500 caractères")
    .optional(),
});

/**
 * Member validation schema
 */
export const MemberSchema = z.object({
  userId: z
    .string()
    .min(1, "L'utilisateur est requis")
    .uuid("L'ID utilisateur doit être un UUID valide"),

  role: z.enum(["owner", "admin", "member", "viewer"]),
});

export type OrganizationFormData = z.infer<typeof OrganizationSchema>;
export type MemberFormData = z.infer<typeof MemberSchema>;
