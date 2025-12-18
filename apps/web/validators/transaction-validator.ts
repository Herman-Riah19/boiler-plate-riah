import z from "zod";

export const TransactionSchema = z.object({
  from: z
    .string()
    .min(1, "Le champ 'from' est requis")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Adresse 'from' invalide"),

  to: z
    .string()
    .min(1, "Le champ 'to' est requis")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Adresse 'to' invalide"),

  value: z
    .number({message: "La valeur doit être un nombre", })
    .nonnegative("La valeur ne peut pas être négative"),

  gasCost: z
    .string()
    .min(1, "Le gasCost est requis")
    .regex(/^\d+$/, "Le gasCost doit être une chaîne numérique"),

  gasUsed: z
    .number({
      message: "Le gasUsed doit être un nombre",
    })
    .int("Le gasUsed doit être un entier")
    .nonnegative("Le gasUsed ne peut pas être négatif"),
});


export type TransactionFormData = z.infer<typeof TransactionSchema>;
