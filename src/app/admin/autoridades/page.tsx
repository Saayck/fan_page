import Link from "next/link";
import Image from "next/image";
import { getAutoridadesAdmin } from "@/backend/lib/supabase/queries";
import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import Button from "@/frontend/components/ui/Button";
import AutoridadActions from "./AutoridadActions";

export default async function AdminAutoridadesPage() {
  const autoridades = await getAutoridadesAdmin();

  return (
    <AdminLayout>
      <AdminHeader
        titulo="Autoridades"
        descripcion="Gestiona el Consejo Directivo y la Decana"
        accion={
          <Link href="/admin/autoridades/nuevo">
            <Button tamano="sm">+ Nueva autoridad</Button>
          </Link>
        }
      />

      <div className="p-4 sm:p-6">
        {autoridades.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No hay autoridades registradas.</p>
            <Link href="/admin/autoridades/nuevo" className="text-institucional-azul-claro hover:underline text-sm mt-2 inline-block">
              Agregar la primera
            </Link>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">Directivo</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden sm:table-cell">Cargo</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600 hidden md:table-cell">Orden</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-600">Estado</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {autoridades.map((a) => (
                  <tr key={a.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {a.foto_url ? (
                          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-200">
                            <Image
                              src={a.foto_url}
                              alt={a.nombre}
                              width={40}
                              height={40}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-institucional-azul flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-bold text-sm">
                              {a.nombre.charAt(0)}
                            </span>
                          </div>
                        )}
                        <span className="font-medium text-gray-800">{a.nombre}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{a.cargo}</td>
                    <td className="px-4 py-3 text-center text-gray-500 hidden md:table-cell">{a.orden}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        a.activo
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}>
                        {a.activo ? "Visible" : "Oculto"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-4">
                        <AutoridadActions id={a.id} nombre={a.nombre} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
