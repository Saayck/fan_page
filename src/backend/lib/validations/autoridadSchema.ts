import { z } from "zod";

export const autoridadSchema = z.object({
  nombre: z.string().min(2, "El nombre es requerido"),
  cargo: z.string().min(2, "El cargo es requerido"),
  descripcion: z.string().optional().default(""),
  foto_url: z.string().optional().default(""),
  orden: z.coerce.number().int().min(0).default(0),
  activo: z.boolean().default(true),
});

export type AutoridadFormData = z.infer<typeof autoridadSchema>;
