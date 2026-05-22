"use client";

import Button from "@/frontend/components/ui/Button";

interface ConfirmDeleteModalProps {
  titulo?: string;
  descripcion?: string;
  onConfirmar: () => void;
  onCancelar: () => void;
  cargando?: boolean;
}

export default function ConfirmDeleteModal({
  titulo = "¿Eliminar elemento?",
  descripcion = "Esta acción no se puede deshacer.",
  onConfirmar,
  onCancelar,
  cargando = false,
}: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{titulo}</h3>
            <p className="text-sm text-gray-500">{descripcion}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variante="ghost" tamano="sm" onClick={onCancelar} disabled={cargando}>
            Cancelar
          </Button>
          <Button variante="danger" tamano="sm" onClick={onConfirmar} cargando={cargando}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}
