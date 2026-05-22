import { getConfiguracion, getGaleria } from "@/backend/lib/supabase/queries";
import Navbar from "@/frontend/components/public/Navbar";
import Footer from "@/frontend/components/public/Footer";
import GalleryCard from "@/frontend/components/public/GalleryCard";

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
              <div className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                {galeria.map((item) => (
                  <GalleryCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
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
