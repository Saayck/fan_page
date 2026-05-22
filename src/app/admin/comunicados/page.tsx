import Link from "next/link";
import { getComunicados } from "@/backend/lib/supabase/queries";
import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import Card from "@/frontend/components/ui/Card";
import Badge from "@/frontend/components/ui/Badge";
import Button from "@/frontend/components/ui/Button";
import { formatearFechaCorta } from "@/backend/lib/utils";
import ComunicadoActions from "./ComunicadoActions";

export default async function AdminComunicadosPage() {
  const comunicados = await getComunicados();

  return (
    <AdminLayout>
      <AdminHeader
        titulo="Comunicados"
        descripcion="Gestiona los comunicados institucionales"
        accion={
          <Link href="/admin/comunicados/nuevo">
            <Button tamano="sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Nuevo
            </Button>
          </Link>
        }
      />
      <div className="p-4 sm:p-6">
        <Card padding={false}>
          {comunicados.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider sm:px-6">
                      Título
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell sm:px-6">
                      Estado
                    </th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell sm:px-6">
                      Fecha
                    </th>
                    <th className="px-4 py-3 sm:px-6" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {comunicados.map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 sm:px-6">
                        <p className="font-medium text-gray-800 line-clamp-1">{c.titulo}</p>
                        <p className="text-xs text-gray-400 mt-0.5 sm:hidden">
                          {c.estado === "publicado" ? "✅ Publicado" : "⚪ Borrador"} ·{" "}
                          {formatearFechaCorta(c.created_at)}
                        </p>
                      </td>
                      <td className="px-4 py-4 hidden sm:table-cell sm:px-6">
                        <Badge
                          texto={c.estado === "publicado" ? "Publicado" : "Borrador"}
                          color={c.estado === "publicado" ? "verde" : "gris"}
                        />
                      </td>
                      <td className="px-4 py-4 text-gray-400 hidden md:table-cell sm:px-6">
                        {formatearFechaCorta(c.created_at)}
                      </td>
                      <td className="px-4 py-4 sm:px-6">
                        <ComunicadoActions comunicadoId={c.id} slug={c.slug} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 mb-4">No hay comunicados aún.</p>
              <Link href="/admin/comunicados/nuevo">
                <Button tamano="sm">Crear primer comunicado</Button>
              </Link>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
