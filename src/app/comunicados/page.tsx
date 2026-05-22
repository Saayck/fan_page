import { getConfiguracion, getComunicadosPublicados } from "@/backend/lib/supabase/queries";
import Navbar from "@/frontend/components/public/Navbar";
import Footer from "@/frontend/components/public/Footer";
import ComunicadoCard from "@/frontend/components/public/ComunicadoCard";
import ComunicadosBuscador from "./ComunicadosBuscador";

export const revalidate = 60;

export default async function ComunicadosPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [config, comunicados] = await Promise.all([
    getConfiguracion(),
    getComunicadosPublicados(),
  ]);

  const filtrados = comunicados.filter((c) =>
    q ? c.titulo.toLowerCase().includes(q.toLowerCase()) : true
  );

  return (
    <>
      <Navbar logoUrl={config?.logo_url} nombreInstitucion={config?.nombre_institucion} />
      <main>
        <section className="bg-institucional-azul py-12 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Comunicados</h1>
            <p className="text-blue-100">Información oficial del Colegio de Profesores de Ica</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <ComunicadosBuscador valorInicial={q} />
            </div>

            {filtrados.length > 0 ? (
              <>
                <p className="text-sm text-gray-400 mb-6">
                  {filtrados.length} comunicado{filtrados.length !== 1 ? "s" : ""} encontrado{filtrados.length !== 1 ? "s" : ""}
                  {q ? ` para "${q}"` : ""}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtrados.map((c) => (
                    <ComunicadoCard key={c.id} comunicado={c} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  {q ? `No se encontraron comunicados para "${q}"` : "No hay comunicados disponibles."}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
