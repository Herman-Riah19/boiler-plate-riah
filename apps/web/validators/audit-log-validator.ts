import z from "zod";

/**
 * Enum for audit action types
 */
export const AuditActionEnum = z.enum([
  "CONTRACT_CREATED",
  "CONTRACT_UPDATED",
  "CONTRACT_DELETED",
  "CONTRACT_SIGNED",
  "CONTRACT_EXECUTED",
  "CONTRACT_REJECTED",
  "SIGNATURE_REQUESTED",
  "SIGNATURE_COMPLETED",
  "DEPLOYMENT_STARTED",
  "TRANSFERT",
]);

/**
 * AuditLog validation schema
 */
export const AuditLogSchema = z.object({
  contractId: z
    .string()
    .min(1, "Contract ID is required"),

  userId: z
    .string()
    .min(1, "User ID is required"),

  organizationId: z
    .string()
    .min(1, "Organization ID is required"),

  action: AuditActionEnum,

  details: z
    .any()
    .optional(),
});

export type AuditLogFormData = z.infer<typeof AuditLogSchema>;
