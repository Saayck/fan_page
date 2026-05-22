import { notFound } from "next/navigation";
import { getComunicadoPorId } from "@/backend/lib/supabase/queries";
import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import ComunicadoForm from "@/frontend/components/admin/ComunicadoForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarComunicadoPage({ params }: Props) {
  const { id } = await params;
  const comunicado = await getComunicadoPorId(id);

  if (!comunicado) notFound();

  return (
    <AdminLayout>
      <AdminHeader titulo="Editar comunicado" descripcion={comunicado.titulo} />
      <div className="p-4 sm:p-6">
        <ComunicadoForm comunicado={comunicado} />
      </div>
    </AdminLayout>
  );
}
