import z from "zod";

/**
 * SystemConfig validation schema
 */
export const SystemConfigSchema = z.object({
  key: z
    .string()
    .min(1, "Key is required")
    .max(255, "Key must be less than 255 characters"),

  value: z
    .any()
    .refine((val) => {
      try {
        JSON.stringify(val);
        return true;
      } catch {
        return false;
      }
    }, "Value must be JSON serializable"),
});

export type SystemConfigFormData = z.infer<typeof SystemConfigSchema>;
