import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import ComunicadoForm from "@/components/admin/ComunicadoForm";

export default function NuevoComunicadoPage() {
  return (
    <AdminLayout>
      <AdminHeader
        titulo="Nuevo comunicado"
        descripcion="Crea un nuevo comunicado institucional"
      />
      <div className="p-6">
        <ComunicadoForm />
      </div>
    </AdminLayout>
  );
}
