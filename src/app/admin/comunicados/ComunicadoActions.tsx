"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

interface ComunicadoActionsProps {
  comunicadoId: string;
  slug: string;
}

export default function ComunicadoActions({ comunicadoId, slug }: ComunicadoActionsProps) {
  const router = useRouter();
  const [mostrarConfirm, setMostrarConfirm] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const handleDelete = async () => {
    setEliminando(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("comunicados").delete().eq("id", comunicadoId);
      if (error) throw error;
      router.refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setEliminando(false);
      setMostrarConfirm(false);
    }
  };

  return (
    <>
      <div className="flex items-center gap-2 justify-end">
        <Link href={`/comunicados/${slug}`} target="_blank">
          <Button variante="ghost" tamano="sm" title="Ver en web">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Button>
        </Link>
        <Link href={`/admin/comunicados/editar/${comunicadoId}`}>
          <Button variante="ghost" tamano="sm" title="Editar">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Button>
        </Link>
        <Button
          variante="ghost"
          tamano="sm"
          title="Eliminar"
          onClick={() => setMostrarConfirm(true)}
          className="text-red-400 hover:text-red-600 hover:bg-red-50"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>

      {mostrarConfirm && (
        <ConfirmDeleteModal
          titulo="¿Eliminar comunicado?"
          descripcion="Esta acción eliminará el comunicado permanentemente y no se puede deshacer."
          onConfirmar={handleDelete}
          onCancelar={() => setMostrarConfirm(false)}
          cargando={eliminando}
        />
      )}
    </>
  );
}
