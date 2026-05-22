export default function Loading({ mensaje = "Cargando..." }: { mensaje?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="w-10 h-10 border-4 border-institucional-azul border-t-transparent rounded-full animate-spin" />
      <p className="text-gray-500 text-sm">{mensaje}</p>
    </div>
  );
}

export function LoadingInline() {
  return (
    <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
  );
}
