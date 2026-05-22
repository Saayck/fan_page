import { z } from "zod";

export const infoSchema = z.object({
  nombre_institucion: z.string().min(3, "Nombre requerido").max(200),
  descripcion: z.string().max(1000).optional(),
  historia: z.string().optional(),
  mision: z.string().optional(),
  vision: z.string().optional(),
  valores: z.string().optional(),
  direccion: z.string().max(300).optional(),
  telefono: z.string().max(50).optional(),
  correo: z.string().email("Correo inválido").optional().or(z.literal("")),
  facebook_url: z.string().url("URL inválida").optional().or(z.literal("")),
});

export type InfoFormData = z.infer<typeof infoSchema>;

export const portadaSchema = z.object({
  hero_titulo: z.string().min(3, "Título requerido").max(200),
  hero_subtitulo: z.string().max(400).optional(),
  hero_boton_texto: z.string().max(100).optional(),
  hero_boton_url: z.string().max(300).optional(),
  logo_url: z.string().optional(),
  portada_url: z.string().optional(),
});

export type PortadaFormData = z.infer<typeof portadaSchema>;
