import { getConfiguracion } from "@/lib/supabase/queries";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export const revalidate = 60;

export default async function NosotrosPage() {
  const config = await getConfiguracion();

  return (
    <>
      <Navbar logoUrl={config?.logo_url} nombreInstitucion={config?.nombre_institucion} />
      <main>
        <section className="bg-institucional-azul py-16 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Nosotros</h1>
            <p className="text-blue-100 text-lg">
              Conoce nuestra historia, misión y valores institucionales
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {config?.historia && (
              <div>
                <h2 className="text-2xl font-bold text-institucional-azul mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-institucional-dorado rounded-lg flex items-center justify-center text-white text-sm">H</span>
                  Historia
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{config.historia}</p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {config?.mision && (
                <div className="card p-6 border-t-4 border-institucional-azul">
                  <h3 className="text-lg font-bold text-institucional-azul mb-3">Misión</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{config.mision}</p>
                </div>
              )}
              {config?.vision && (
                <div className="card p-6 border-t-4 border-institucional-dorado">
                  <h3 className="text-lg font-bold text-institucional-azul mb-3">Visión</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{config.vision}</p>
                </div>
              )}
              {config?.valores && (
                <div className="card p-6 border-t-4 border-institucional-celeste">
                  <h3 className="text-lg font-bold text-institucional-azul mb-3">Valores</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{config.valores}</p>
                </div>
              )}
            </div>

            {!config?.mision && !config?.vision && !config?.historia && (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">
                  Información institucional próximamente disponible.
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
