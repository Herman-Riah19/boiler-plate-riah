import z from "zod";

export const transactionSchema = z.object({
  from: z
    .string()
    .min(1, "L'adresse de l'expéditeur est requise")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Adresse Ethereum invalide"),

  to: z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, "Adresse Ethereum invalide"),

  value: z
    .number({ error: "Le value doit être un nombre" })
    .int("Le valeur doit être un entier")
    .positive("Le value doit être supérieur à 0"),

  gasUsed: z
    .number()
    .int("Le gasUsed doit être un entier numérique")
    .optional(),

  gasCost: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Le gasCost doit être un nombre valide")
    .optional(),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
