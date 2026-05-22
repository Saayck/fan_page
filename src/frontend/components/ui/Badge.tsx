import { clsx } from "@/backend/lib/utils";

interface BadgeProps {
  texto: string;
  color?: "azul" | "verde" | "amarillo" | "rojo" | "gris";
  className?: string;
}

export default function Badge({ texto, color = "azul", className }: BadgeProps) {
  const colores = {
    azul: "bg-blue-100 text-blue-800",
    verde: "bg-green-100 text-green-800",
    amarillo: "bg-yellow-100 text-yellow-800",
    rojo: "bg-red-100 text-red-800",
    gris: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colores[color],
        className
      )}
    >
      {texto}
    </span>
  );
}
