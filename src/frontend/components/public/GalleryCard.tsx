import Image from "next/image";
import type { GaleriaItem } from "@/backend/types/database";

interface GalleryCardProps {
  item: GaleriaItem;
}

export default function GalleryCard({ item }: GalleryCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl shadow-sm aspect-square cursor-pointer">
      <Image
        src={item.imagen_url}
        alt={item.titulo}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <h3 className="text-white font-semibold text-sm">{item.titulo}</h3>
        {item.descripcion && (
          <p className="text-white/80 text-xs mt-1 line-clamp-2">{item.descripcion}</p>
        )}
      </div>
      {item.destacado && (
        <div className="absolute top-3 right-3 bg-institucional-dorado text-white text-xs px-2 py-0.5 rounded-full font-medium">
          Destacado
        </div>
      )}
    </div>
  );
}
