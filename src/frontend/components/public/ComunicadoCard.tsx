import Link from "next/link";
import Image from "next/image";
import type { Comunicado } from "@/backend/types/database";
import { formatearFecha, truncarTexto } from "@/backend/lib/utils";
import Badge from "@/frontend/components/ui/Badge";

interface ComunicadoCardProps {
  comunicado: Comunicado;
}

export default function ComunicadoCard({ comunicado }: ComunicadoCardProps) {
  return (
    <article className="card hover:shadow-md transition-shadow duration-200 group flex flex-col">
      {comunicado.imagen_url && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={comunicado.imagen_url}
            alt={comunicado.titulo}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <Badge
            texto={comunicado.estado === "publicado" ? "Publicado" : "Borrador"}
            color={comunicado.estado === "publicado" ? "verde" : "gris"}
          />
          <span className="text-xs text-gray-400">
            {formatearFecha(comunicado.fecha_publicacion ?? comunicado.created_at)}
          </span>
        </div>

        <h3 className="font-bold text-institucional-azul text-lg mb-2 leading-snug line-clamp-2 group-hover:text-institucional-azul-claro transition-colors">
          {comunicado.titulo}
        </h3>

        {comunicado.extracto && (
          <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
            {truncarTexto(comunicado.extracto, 150)}
          </p>
        )}

        <Link
          href={`/comunicados/${comunicado.slug}`}
          className="mt-auto text-institucional-azul-claro font-medium text-sm hover:underline inline-flex items-center gap-1"
        >
          Leer más
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
