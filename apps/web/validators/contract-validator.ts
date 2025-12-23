import z from "zod";

/**
 * Enum status matching ContractDto.ts
 */
export const ContractStatusEnum = z.enum([
  "DRAFT",
  "PENDING_REVIEW",
  "PENDING_SIGNATURE",
  "SIGNED",
  "EXECUTED",
  "ARCHIVED",
  "REJECTED",
  "CANCELLED",
]);

/**
 * Contract validation schema matching ContractDto.ts
 */
export const SmartContractSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),

  description: z
    .string()
    .nullable()
    .optional(),

  status: ContractStatusEnum,

  content: z
    .string()
    .min(1, "Content is required"),

  version: z
    .number({
      message: "Version must be a number",
    })
    .int("Version must be an integer")
    .min(0, "Version must be non-negative"),

  chainId: z
    .number({
      message: "Chain ID must be a number",
    })
    .int("Chain ID must be an integer")
    .nullable()
    .optional(),

  smartContractAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Smart contract address must be a valid Ethereum address")
    .nullable()
    .optional(),

  smartContractCode: z
    .string()
    .nullable()
    .optional(),

  deploymentTxHash: z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/, "Deployment transaction hash must be a valid transaction hash")
    .nullable()
    .optional(),

  gasEstimate: z
    .number({
      message: "Gas estimate must be a number",
    })
    .int("Gas estimate must be an integer")
    .nullable()
    .optional(),

  gasCost: z
    .string()
    .nullable()
    .optional(),

  requiredSigners: z
    .number({
      message: "Required signers must be a number",
    })
    .int("Required signers must be an integer")
    .min(0, "Required signers must be non-negative"),

  organizationId: z
    .string()
    .min(1, "Organization ID is required")
    .uuid("Organization ID must be a valid UUID"),
});
