import z from "zod";

/**
 * Enum status
 */
export const ContractStatusEnum = z.enum([
  "DRAFT",
  "PUBLISHED",
  "DEPLOYED",
  "ARCHIVED",
]);

/**
 * Schéma principal
 */
export const SmartContractSchema = z.object({
  title: z
    .string()
    .min(3, "Le titre doit contenir au moins 3 caractères")
    .max(150, "Le titre ne doit pas dépasser 150 caractères"),

  description: z
    .string()
    .max(500, "La description ne doit pas dépasser 500 caractères")
    .optional(),

  status: ContractStatusEnum,

  content: z
    .string()
    .min(10, "Le contenu du smart contract est trop court"),

  version: z
    .number({
      message: "La version doit être un nombre",
    })
    .int("La version doit être un entier")
    .nonnegative("La version ne peut pas être négative"),

  chainId: z
    .number({
      message: "Le chainId doit être un nombre",
    })
    .int("Le chainId doit être un entier")
    .positive("Le chainId doit être supérieur à 0"),

  smartContractAddress: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Adresse du smart contract invalide")
    .optional(),

  smartContractCode: z
    .string()
    .min(10, "Le code du smart contract est requis"),

  deploymentTxHash: z
    .string()
    .regex(/^0x[a-fA-F0-9]{64}$/, "Hash de transaction invalide")
    .optional(),

  gasEstimate: z
    .number()
    .optional(),

  gasCost: z
    .string()
    .regex(/^\d+$/, "Le gasCost doit être une chaîne numérique")
    .optional(),

  requiredSigners: z
    .number({
      message: "Le nombre de signataires doit être un nombre",
    })
    .int("Le nombre de signataires doit être un entier")
    .nonnegative("Le nombre de signataires ne peut pas être négatif"),

  organizationId: z
    .string()
    .min(11,"organizationId doit être un UUID valide"),
});
