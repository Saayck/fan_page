import { getConfiguracion, getComunicadosPublicados } from "@/lib/supabase/queries";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import ComunicadoCard from "@/components/public/ComunicadoCard";
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
                <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
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
