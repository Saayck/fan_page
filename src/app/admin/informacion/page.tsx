import { getConfiguracion } from "@/backend/lib/supabase/queries";
import { createClient } from "@/backend/lib/supabase/server";
import type { ConfiguracionWeb } from "@/backend/types/database";
import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import InfoForm from "@/frontend/components/admin/InfoForm";

export default async function AdminInformacionPage() {
  let config = await getConfiguracion();
  let errorMsg: string | null = null;

  if (!config) {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("configuracion_web")
      .insert({ nombre_institucion: "Colegio de Profesores de Ica" })
      .select()
      .single();
    if (error) errorMsg = error.message;
    config = (data as ConfiguracionWeb) ?? null;
  }

  if (!config) {
    return (
      <AdminLayout>
        <AdminHeader titulo="Información" />
        <div className="p-4 sm:p-6">
          <p className="text-red-500 font-semibold">Error al cargar la configuración.</p>
          {errorMsg && <p className="text-red-400 text-sm mt-2 font-mono">{errorMsg}</p>}
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader
        titulo="Información institucional"
        descripcion="Edita los datos de la institución"
      />
      <div className="p-4 sm:p-6">
        <InfoForm config={config} />
      </div>
    </AdminLayout>
  );
}
