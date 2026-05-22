import slugify from "slugify";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export function generarSlug(texto: string): string {
  return slugify(texto, {
    lower: true,
    strict: true,
    locale: "es",
  });
}

export function formatearFecha(fecha: string | null): string {
  if (!fecha) return "Sin fecha";
  return format(new Date(fecha), "d 'de' MMMM 'de' yyyy", { locale: es });
}

export function formatearFechaCorta(fecha: string | null): string {
  if (!fecha) return "Sin fecha";
  return format(new Date(fecha), "dd/MM/yyyy", { locale: es });
}

export function truncarTexto(texto: string, maxLength: number): string {
  if (texto.length <= maxLength) return texto;
  return texto.substring(0, maxLength).trimEnd() + "...";
}

export function clsx(...clases: (string | undefined | null | boolean)[]): string {
  return clases.filter(Boolean).join(" ");
}
