import Link from "next/link";
import type { ConfiguracionWeb } from "@/types/database";

interface HeroProps {
  config: Partial<ConfiguracionWeb> | null;
}

export default function Hero({ config }: HeroProps) {
  const titulo = config?.hero_titulo ?? "Colegio de Profesores de Ica";
  const subtitulo =
    config?.hero_subtitulo ??
    "Unidos en la defensa de los derechos del magisterio iqueño. Comprometidos con la educación de calidad.";
  const botonTexto = config?.hero_boton_texto ?? "Ver Comunicados";
  const botonUrl = config?.hero_boton_url ?? "/comunicados";
  const portadaUrl = config?.portada_url;

  return (
    <section
      className="relative min-h-[520px] md:min-h-[600px] flex items-center"
      style={
        portadaUrl
          ? {
              backgroundImage: `url(${portadaUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {}
      }
    >
      {portadaUrl && (
        <div className="absolute inset-0 bg-institucional-azul-oscuro/70" />
      )}
      {!portadaUrl && (
        <div className="absolute inset-0 bg-gradient-to-br from-institucional-azul-oscuro via-institucional-azul to-institucional-azul-claro" />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-institucional-dorado/20 border border-institucional-dorado/40 rounded-full px-4 py-1 mb-6">
            <span className="w-2 h-2 bg-institucional-dorado rounded-full" />
            <span className="text-institucional-dorado-claro text-sm font-medium">
              Institución Gremial Docente
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6">
            {titulo}
          </h1>

          <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-8">
            {subtitulo}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={botonUrl}
              className="bg-institucional-dorado hover:bg-institucional-dorado-claro text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
            >
              {botonTexto}
            </Link>
            <Link
              href="/contacto"
              className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200"
            >
              Contáctanos
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
