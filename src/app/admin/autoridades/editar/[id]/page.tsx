import { notFound } from "next/navigation";
import { getAutoridadPorId } from "@/backend/lib/supabase/queries";
import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import AutoridadForm from "@/frontend/components/admin/AutoridadForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarAutoridadPage({ params }: Props) {
  const { id } = await params;
  const autoridad = await getAutoridadPorId(id);

  if (!autoridad) notFound();

  return (
    <AdminLayout>
      <AdminHeader
        titulo="Editar autoridad"
        descripcion={`Editando: ${autoridad.nombre}`}
      />
      <div className="p-4 sm:p-6">
        <AutoridadForm autoridad={autoridad} />
      </div>
    </AdminLayout>
  );
}
