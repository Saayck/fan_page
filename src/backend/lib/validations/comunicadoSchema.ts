import { z } from "zod";

export const comunicadoSchema = z.object({
  titulo: z.string().min(5, "El título debe tener al menos 5 caracteres").max(200),
  slug: z.string().min(3).max(200).optional(),
  extracto: z.string().max(500, "El extracto no puede superar 500 caracteres").optional(),
  contenido: z.string().min(10, "El contenido debe tener al menos 10 caracteres"),
  imagen_url: z.string().url("URL de imagen inválida").optional().or(z.literal("")),
  estado: z.enum(["borrador", "publicado"]),
  fecha_publicacion: z.string().optional().nullable(),
});

export type ComunicadoFormData = z.infer<typeof comunicadoSchema>;
