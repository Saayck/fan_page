import Link from "next/link";
import { getConteos, getComunicados } from "@/backend/lib/supabase/queries";
import AdminLayout from "@/frontend/components/admin/AdminLayout";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import Card from "@/frontend/components/ui/Card";
import Badge from "@/frontend/components/ui/Badge";
import { formatearFechaCorta } from "@/backend/lib/utils";

export default async function DashboardPage() {
  const [conteos, ultimosComunicados] = await Promise.all([
    getConteos(),
    getComunicados(),
  ]);

  const recientes = ultimosComunicados.slice(0, 5);

  const stats = [
    {
      label: "Comunicados",
      valor: conteos.comunicados,
      color: "bg-blue-50 text-blue-700",
      icono: "📄",
      href: "/admin/comunicados",
    },
    {
      label: "Imágenes",
      valor: conteos.galeria,
      color: "bg-purple-50 text-purple-700",
      icono: "🖼️",
      href: "/admin/galeria",
    },
  ];

  const accesosRapidos = [
    { href: "/admin/comunicados/nuevo", label: "Nuevo comunicado", icono: "✏️" },
    { href: "/admin/galeria", label: "Subir imagen", icono: "📷" },
    { href: "/admin/informacion", label: "Editar información", icono: "ℹ️" },
    { href: "/admin/portada", label: "Editar portada", icono: "🖥️" },
  ];

  return (
    <AdminLayout>
      <AdminHeader titulo="Dashboard" descripcion="Panel de control general" />
      <div className="p-4 space-y-8 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:max-w-md">
          {stats.map((s) => (
            <Link key={s.href} href={s.href}>
              <Card className={`hover:shadow-md transition-shadow cursor-pointer ${s.color}`}>
                <div className="text-3xl mb-1">{s.icono}</div>
                <p className="text-3xl font-bold">{s.valor}</p>
                <p className="text-sm font-medium opacity-80">{s.label}</p>
              </Card>
            </Link>
          ))}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Accesos rápidos</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {accesosRapidos.map((a) => (
              <Link key={a.href} href={a.href}>
                <div className="card p-4 hover:shadow-md transition-shadow cursor-pointer text-center group">
                  <div className="text-2xl mb-2">{a.icono}</div>
                  <p className="text-sm font-medium text-gray-700 group-hover:text-institucional-azul transition-colors">
                    {a.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Últimos comunicados</h2>
          <Card padding={false}>
            {recientes.length > 0 ? (
              <ul className="divide-y divide-gray-100">
                {recientes.map((c) => (
                  <li key={c.id} className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                    <Link
                      href={`/admin/comunicados/editar/${c.id}`}
                      className="text-sm font-medium text-gray-800 hover:text-institucional-azul transition-colors sm:flex-1 sm:truncate"
                    >
                      {c.titulo}
                    </Link>
                    <div className="flex flex-wrap items-center gap-3 sm:flex-shrink-0">
                      <Badge
                        texto={c.estado === "publicado" ? "Publicado" : "Borrador"}
                        color={c.estado === "publicado" ? "verde" : "gris"}
                      />
                      <span className="text-xs text-gray-400">
                        {formatearFechaCorta(c.created_at)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-400 py-8 text-sm">No hay comunicados aún.</p>
            )}
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
