import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import ComunicadoForm from "@/frontend/components/admin/ComunicadoForm";

export default function NuevoComunicadoPage() {
  return (
    <AdminLayout>
      <AdminHeader
        titulo="Nuevo comunicado"
        descripcion="Crea un nuevo comunicado institucional"
      />
      <div className="p-4 sm:p-6">
        <ComunicadoForm />
      </div>
    </AdminLayout>
  );
}
