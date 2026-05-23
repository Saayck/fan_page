import Image from "next/image";
import { getConfiguracion, getAutoridades } from "@/backend/lib/supabase/queries";
import Navbar from "@/frontend/components/public/Navbar";
import Footer from "@/frontend/components/public/Footer";

export const revalidate = 60;

export default async function AutoridadesPage() {
  const [config, autoridades] = await Promise.all([
    getConfiguracion(),
    getAutoridades(),
  ]);

  const decana = autoridades[0] ?? null;
  const consejo = autoridades.slice(1);

  return (
    <>
      <Navbar logoUrl={config?.logo_url} nombreInstitucion={config?.nombre_institucion} />
      <main>
        <section className="bg-institucional-azul py-16 text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Autoridades</h1>
            <p className="text-blue-100 text-lg">
              Conoce a quienes nos representan y lideran nuestra institución
            </p>
          </div>
        </section>

        <section className="py-16 bg-institucional-gris">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {autoridades.length === 0 ? (
              <p className="text-center text-gray-400 text-lg py-16">
                No hay autoridades registradas aún.
              </p>
            ) : (
              <>
                {decana && (
                  <div className="mb-12">
                    <h2 className="section-title text-center mb-8">Decana Regional</h2>
                    <div className="card p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-center sm:items-start border-t-4 border-institucional-dorado max-w-2xl mx-auto">
                      <div className="flex-shrink-0">
                        {decana.foto_url ? (
                          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-institucional-dorado shadow-lg">
                            <Image
                              src={decana.foto_url}
                              alt={decana.nombre}
                              width={144}
                              height={144}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ) : (
                          <div className="w-36 h-36 rounded-full bg-institucional-azul border-4 border-institucional-dorado shadow-lg flex items-center justify-center">
                            <span className="text-white font-bold text-5xl">
                              {decana.nombre.charAt(0)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="text-center sm:text-left">
                        <span className="inline-block bg-institucional-dorado text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide mb-3">
                          {decana.cargo}
                        </span>
                        <h3 className="text-2xl font-bold text-institucional-azul mb-3">{decana.nombre}</h3>
                        {decana.descripcion && (
                          <p className="text-gray-600 leading-relaxed">{decana.descripcion}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {consejo.length > 0 && (
                  <div>
                    <h2 className="section-title text-center mb-8">Consejo Directivo</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {consejo.map((a) => (
                        <div key={a.id} className="card p-5 text-center">
                          <div className="flex justify-center mb-4">
                            {a.foto_url ? (
                              <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
                                <Image
                                  src={a.foto_url}
                                  alt={a.nombre}
                                  width={96}
                                  height={96}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ) : (
                              <div className="w-24 h-24 rounded-full bg-institucional-azul flex items-center justify-center">
                                <span className="text-white font-bold text-3xl">
                                  {a.nombre.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          <span className="inline-block bg-blue-50 text-institucional-azul text-xs font-semibold px-2 py-1 rounded-full mb-2">
                            {a.cargo}
                          </span>
                          <h4 className="font-bold text-gray-800 mb-2">{a.nombre}</h4>
                          {a.descripcion && (
                            <p className="text-gray-500 text-sm leading-relaxed line-clamp-4">{a.descripcion}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer config={config} />
    </>
  );
}
