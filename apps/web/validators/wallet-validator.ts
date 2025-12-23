import z from "zod";

/**
 * Wallet validation schema
 */
export const WalletSchema = z.object({
  organizationId: z
    .string()
    .min(1, "Organization ID is required")
    .uuid("Organization ID must be a valid UUID"),

  address: z
    .string()
    .min(1, "Address is required")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Address must be a valid Ethereum address"),

  chainId: z
    .number({
      message: "Chain ID must be a number",
    })
    .int("Chain ID must be an integer")
    .positive("Chain ID must be positive"),

  label: z
    .string()
    .max(100, "Label must be less than 100 characters")
    .optional(),
});

export type WalletFormData = z.infer<typeof WalletSchema>;
