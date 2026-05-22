import { createClient } from "./server";
import type { Comunicado, GaleriaItem, ConfiguracionWeb } from "@/backend/types/database";

export async function getConfiguracion(): Promise<ConfiguracionWeb | null> {
  const supabase = await createClient();
  const { data } = await supabase.from("configuracion_web").select("*").limit(1).single();
  return (data as ConfiguracionWeb) ?? null;
}

export async function getComunicadosPublicados(limite?: number): Promise<Comunicado[]> {
  const supabase = await createClient();
  let query = supabase
    .from("comunicados")
    .select("*")
    .eq("estado", "publicado")
    .order("fecha_publicacion", { ascending: false });
  if (limite) query = query.limit(limite);
  const { data } = await query;
  return (data as Comunicado[]) ?? [];
}

export async function getComunicados(): Promise<Comunicado[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("comunicados")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as Comunicado[]) ?? [];
}

export async function getComunicadoPorSlug(slug: string): Promise<Comunicado | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("comunicados")
    .select("*")
    .eq("slug", slug)
    .eq("estado", "publicado")
    .single();
  return (data as Comunicado) ?? null;
}

export async function getComunicadoPorId(id: string): Promise<Comunicado | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("comunicados")
    .select("*")
    .eq("id", id)
    .single();
  return (data as Comunicado) ?? null;
}

export async function getGaleria(): Promise<GaleriaItem[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("galeria")
    .select("*")
    .order("created_at", { ascending: false });
  return (data as GaleriaItem[]) ?? [];
}

export async function getGaleriaDestacada(limite?: number): Promise<GaleriaItem[]> {
  const supabase = await createClient();
  let query = supabase
    .from("galeria")
    .select("*")
    .eq("destacado", true)
    .order("created_at", { ascending: false });
  if (limite) query = query.limit(limite);
  const { data } = await query;
  return (data as GaleriaItem[]) ?? [];
}

export async function getConteos(): Promise<{ comunicados: number; galeria: number }> {
  const supabase = await createClient();
  const [{ count: totalComunicados }, { count: totalGaleria }] = await Promise.all([
    supabase.from("comunicados").select("*", { count: "exact", head: true }),
    supabase.from("galeria").select("*", { count: "exact", head: true }),
  ]);
  return { comunicados: totalComunicados ?? 0, galeria: totalGaleria ?? 0 };
}
