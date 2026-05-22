import Link from "next/link";
import { getConfiguracion, getComunicadosPublicados, getGaleriaDestacada } from "@/backend/lib/supabase/queries";
import Navbar from "@/frontend/components/public/Navbar";
import Footer from "@/frontend/components/public/Footer";
import Hero from "@/frontend/components/public/Hero";
import ComunicadoCard from "@/frontend/components/public/ComunicadoCard";
import GalleryCard from "@/frontend/components/public/GalleryCard";

export const revalidate = 60;

export default async function HomePage() {
  const [config, comunicados, galeria] = await Promise.all([
    getConfiguracion(),
    getComunicadosPublicados(3),
    getGaleriaDestacada(4),
  ]);

  return (
    <>
      <Navbar logoUrl={config?.logo_url} nombreInstitucion={config?.nombre_institucion} />
      <main>
        <Hero config={config} />

        {comunicados.length > 0 && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="section-title">Últimos Comunicados</h2>
                  <p className="section-subtitle">Mantente informado sobre las novedades</p>
                </div>
                <Link
                  href="/comunicados"
                  className="text-institucional-azul-claro font-medium text-sm hover:underline hidden sm:block"
                >
                  Ver todos →
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {comunicados.map((c) => (
                  <ComunicadoCard key={c.id} comunicado={c} />
                ))}
              </div>
              <div className="mt-8 text-center sm:hidden">
                <Link href="/comunicados" className="btn-secondary">
                  Ver todos los comunicados
                </Link>
              </div>
            </div>
          </section>
        )}

        {galeria.length > 0 && (
          <section className="py-16 bg-institucional-gris">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <h2 className="section-title">Galería</h2>
                  <p className="section-subtitle">Momentos de nuestra institución</p>
                </div>
                <Link
                  href="/galeria"
                  className="text-institucional-azul-claro font-medium text-sm hover:underline hidden sm:block"
                >
                  Ver galería completa →
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {galeria.map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="py-16 bg-institucional-azul text-white text-center">
          <div className="max-w-2xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">Juntos por una educación de calidad</h2>
            <p className="text-blue-100 text-lg mb-8">
              El Colegio de Profesores de Ica trabaja incansablemente por los derechos del magisterio.
            </p>
            <Link
              href="/nosotros"
              className="bg-institucional-dorado hover:bg-institucional-dorado-claro text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 inline-block"
            >
              Conocer más sobre nosotros
            </Link>
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
