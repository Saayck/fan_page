import { getConfiguracion } from "@/backend/lib/supabase/queries";
import Navbar from "@/frontend/components/public/Navbar";
import Footer from "@/frontend/components/public/Footer";
import Link from "next/link";

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
              Conoce nuestra historia, misión, visión y valores
            </p>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
            {config?.historia && (
              <div>
                <h2 className="text-2xl font-bold text-institucional-azul mb-4 flex items-center gap-3">
                  <span className="w-8 h-8 bg-institucional-dorado rounded-lg flex items-center justify-center text-white text-sm font-bold">H</span>
                  Historia
                </h2>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{config.historia}</p>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-6">
              {config?.mision && (
                <div className="card p-4 border-t-4 border-institucional-azul sm:p-6">
                  <h3 className="text-lg font-bold text-institucional-azul mb-3">Misión</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{config.mision}</p>
                </div>
              )}
              {config?.vision && (
                <div className="card p-4 border-t-4 border-institucional-dorado sm:p-6">
                  <h3 className="text-lg font-bold text-institucional-azul mb-3">Visión</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{config.vision}</p>
                </div>
              )}
              {config?.valores && (
                <div className="card p-4 border-t-4 border-institucional-celeste sm:p-6">
                  <h3 className="text-lg font-bold text-institucional-azul mb-3">Valores</h3>
                  <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{config.valores}</p>
                </div>
              )}
            </div>

            <div className="text-center pt-4">
              <Link
                href="/autoridades"
                className="inline-flex items-center gap-2 bg-institucional-azul text-white px-6 py-3 rounded-xl font-medium hover:bg-institucional-azul-oscuro transition-colors"
              >
                Conoce a nuestras Autoridades
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
