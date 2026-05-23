import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import AutoridadForm from "@/frontend/components/admin/AutoridadForm";

export default function NuevaAutoridadPage() {
  return (
    <AdminLayout>
      <AdminHeader
        titulo="Nueva autoridad"
        descripcion="Agrega un miembro del Consejo Directivo"
      />
      <div className="p-4 sm:p-6">
        <AutoridadForm />
      </div>
    </AdminLayout>
  );
}
