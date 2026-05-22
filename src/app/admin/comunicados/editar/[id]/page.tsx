import { notFound } from "next/navigation";
import { getComunicadoPorId } from "@/lib/supabase/queries";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeader from "@/components/admin/AdminHeader";
import ComunicadoForm from "@/components/admin/ComunicadoForm";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditarComunicadoPage({ params }: Props) {
  const { id } = await params;
  const comunicado = await getComunicadoPorId(id);

  if (!comunicado) notFound();

  return (
    <AdminLayout>
      <AdminHeader
        titulo="Editar comunicado"
        descripcion={comunicado.titulo}
      />
      <div className="p-6">
        <ComunicadoForm comunicado={comunicado} />
      </div>
    </AdminLayout>
  );
}
