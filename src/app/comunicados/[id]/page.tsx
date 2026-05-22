import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getConfiguracion, getComunicadoPorSlug } from "@/lib/supabase/queries";
import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import { formatearFecha } from "@/lib/utils";

export const revalidate = 60;

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ComunicadoDetallePage({ params }: Props) {
  const { id } = await params;
  const [config, comunicado] = await Promise.all([
    getConfiguracion(),
    getComunicadoPorSlug(id),
  ]);

  if (!comunicado) notFound();

  return (
    <>
      <Navbar logoUrl={config?.logo_url} nombreInstitucion={config?.nombre_institucion} />
      <main className="bg-white min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link
            href="/comunicados"
            className="inline-flex items-center gap-2 text-institucional-azul-claro text-sm hover:underline mb-8"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a comunicados
          </Link>

          <article>
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
                  Publicado
                </span>
                <span className="text-gray-400 text-sm">
                  {formatearFecha(comunicado.fecha_publicacion ?? comunicado.created_at)}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-institucional-azul leading-tight">
                {comunicado.titulo}
              </h1>
              {comunicado.extracto && (
                <p className="text-gray-500 text-lg mt-4 leading-relaxed">{comunicado.extracto}</p>
              )}
            </header>

            {comunicado.imagen_url && (
              <div className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
                <Image
                  src={comunicado.imagen_url}
                  alt={comunicado.titulo}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
              {comunicado.contenido}
            </div>
          </article>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link
              href="/comunicados"
              className="inline-flex items-center gap-2 bg-institucional-azul text-white px-6 py-3 rounded-xl font-medium hover:bg-institucional-azul-oscuro transition-colors"
            >
              ← Ver más comunicados
            </Link>
          </div>
        </div>
      </main>
      <Footer config={config} />
    </>
  );
}
