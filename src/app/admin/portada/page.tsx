import { getConfiguracion } from "@/lib/supabase/queries";
import { createClient } from "@/lib/supabase/server";
import type { ConfiguracionWeb } from "@/types/database";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import PortadaForm from "./PortadaForm";

export default async function AdminPortadaPage() {
  let config = await getConfiguracion();

  if (!config) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("configuracion_web")
      .insert({ nombre_institucion: "Colegio de Profesores de Ica" })
      .select()
      .single();
    config = (data as ConfiguracionWeb) ?? null;
  }

  if (!config) {
    return (
      <AdminLayout>
        <AdminHeader titulo="Portada" />
        <div className="p-6">
          <p className="text-red-500">Error al cargar la configuración.</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader titulo="Portada" descripcion="Personaliza la portada del sitio web" />
      <div className="p-6">
        <PortadaForm config={config} />
      </div>
    </AdminLayout>
  );
}
