import { getGaleria } from "@/lib/supabase/queries";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import GaleriaManager from "./GaleriaManager";

export default async function AdminGaleriaPage() {
  const galeria = await getGaleria();

  return (
    <AdminLayout>
      <AdminHeader titulo="Galería" descripcion="Gestiona las imágenes de la galería" />
      <div className="p-6">
        <GaleriaManager galeriaInicial={galeria} />
      </div>
    </AdminLayout>
  );
}
