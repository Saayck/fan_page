import Link from "next/link";
import type { ConfiguracionWeb } from "@/types/database";

interface FooterProps {
  config: Partial<ConfiguracionWeb> | null;
}

export default function Footer({ config }: FooterProps) {
  const nombre = config?.nombre_institucion ?? "Colegio de Profesores de Ica";
  const anio = new Date().getFullYear();

  return (
    <footer className="bg-institucional-azul-oscuro text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-institucional-dorado font-bold text-lg mb-3">{nombre}</h3>
            <p className="text-blue-200 text-sm leading-relaxed">
              {config?.descripcion ??
                "Institución gremial que representa y defiende los derechos de los profesores de la región Ica."}
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Navegación</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Inicio" },
                { href: "/nosotros", label: "Nosotros" },
                { href: "/comunicados", label: "Comunicados" },
                { href: "/galeria", label: "Galería" },
                { href: "/contacto", label: "Contacto" },
              ].map((e) => (
                <li key={e.href}>
                  <Link
                    href={e.href}
                    className="text-blue-200 hover:text-white text-sm transition-colors"
                  >
                    {e.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Contacto</h4>
            <ul className="space-y-2 text-sm text-blue-200">
              {config?.direccion && (
                <li className="flex gap-2">
                  <span>📍</span>
                  <span>{config.direccion}</span>
                </li>
              )}
              {config?.telefono && (
                <li className="flex gap-2">
                  <span>📞</span>
                  <span>{config.telefono}</span>
                </li>
              )}
              {config?.correo && (
                <li className="flex gap-2">
                  <span>✉️</span>
                  <a href={`mailto:${config.correo}`} className="hover:text-white transition-colors">
                    {config.correo}
                  </a>
                </li>
              )}
              {config?.facebook_url && (
                <li className="flex gap-2">
                  <span>📘</span>
                  <a
                    href={config.facebook_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 text-center text-blue-300 text-sm">
          © {anio} {nombre}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
