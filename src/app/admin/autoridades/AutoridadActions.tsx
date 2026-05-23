"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/backend/lib/supabase/client";
import ConfirmDeleteModal from "@/frontend/components/admin/ConfirmDeleteModal";

interface AutoridadActionsProps {
  id: string;
  nombre: string;
}

export default function AutoridadActions({ id, nombre }: AutoridadActionsProps) {
  const router = useRouter();
  const [confirmar, setConfirmar] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const handleEliminar = async () => {
    setEliminando(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("autoridades").delete().eq("id", id);
      if (error) throw error;
      router.refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setEliminando(false);
      setConfirmar(false);
    }
  };

  return (
    <>
      <Link
        href={`/admin/autoridades/editar/${id}`}
        className="text-institucional-azul-claro hover:underline text-sm font-medium"
      >
        Editar
      </Link>
      <button
        onClick={() => setConfirmar(true)}
        className="text-red-500 hover:underline text-sm font-medium"
      >
        Eliminar
      </button>
      {confirmar && (
        <ConfirmDeleteModal
          titulo="Eliminar autoridad"
          descripcion={`¿Seguro que deseas eliminar a "${nombre}"? Esta acción no se puede deshacer.`}
          cargando={eliminando}
          onConfirmar={handleEliminar}
          onCancelar={() => setConfirmar(false)}
        />
      )}
    </>
  );
}
