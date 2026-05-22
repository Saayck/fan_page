import { getConfiguracion, getGaleria } from "@/lib/supabase/queries";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import GalleryCard from "@/components/public/GalleryCard";

export const revalidate = 60;

export default async function GaleriaPage() {
  const [config, galeria] = await Promise.all([
    getConfiguracion(),
    getGaleria(),
  ]);

  return (
    <>
      <Navbar logoUrl={config?.logo_url} nombreInstitucion={config?.nombre_institucion} />
      <main>
        <section className="bg-institucional-azul py-12 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-2">Galería</h1>
            <p className="text-blue-100">Momentos e imágenes de nuestras actividades</p>
          </div>
        </section>

        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {galeria.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galeria.map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-400 text-lg">No hay imágenes en la galería todavía.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
