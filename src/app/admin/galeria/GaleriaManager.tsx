"use client";

import { useState } from "react";
import Image from "next/image";
import { createClient } from "@/backend/lib/supabase/client";
import type { GaleriaItem } from "@/backend/types/database";
import Button from "@/frontend/components/ui/Button";
import Input from "@/frontend/components/ui/Input";
import Textarea from "@/frontend/components/ui/Textarea";
import Card from "@/frontend/components/ui/Card";
import ConfirmDeleteModal from "@/frontend/components/admin/ConfirmDeleteModal";
import ImageUploader from "@/frontend/components/admin/ImageUploader";

interface GaleriaManagerProps {
  galeriaInicial: GaleriaItem[];
}

export default function GaleriaManager({ galeriaInicial }: GaleriaManagerProps) {
  const [galeria, setGaleria] = useState(galeriaInicial);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [eliminandoId, setEliminandoId] = useState<string | null>(null);
  const [confirmarId, setConfirmarId] = useState<string | null>(null);

  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [destacado, setDestacado] = useState(false);
  const [imagenUrl, setImagenUrl] = useState("");

  const resetForm = () => {
    setTitulo(""); setDescripcion(""); setDestacado(false); setImagenUrl("");
    setMostrarForm(false);
  };

  const handleGuardar = async () => {
    if (!titulo.trim()) { alert("El título es requerido."); return; }
    if (!imagenUrl) { alert("Debes subir una imagen."); return; }

    setGuardando(true);
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("galeria")
        .insert({ titulo, descripcion: descripcion || null, imagen_url: imagenUrl, destacado })
        .select()
        .single();
      if (error) throw error;
      setGaleria((prev) => [data as GaleriaItem, ...prev]);
      resetForm();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id: string) => {
    setEliminandoId(id);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("galeria").delete().eq("id", id);
      if (error) throw error;
      setGaleria((prev) => prev.filter((i) => i.id !== id));
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error al eliminar");
    } finally {
      setEliminandoId(null);
      setConfirmarId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button onClick={() => setMostrarForm(!mostrarForm)}>
          {mostrarForm ? "Cancelar" : "Subir imagen"}
        </Button>
      </div>

      {mostrarForm && (
        <Card className="border-2 border-dashed border-institucional-azul/30">
          <h3 className="font-semibold text-gray-800 mb-4">Nueva imagen</h3>
          <div className="space-y-4">
            <ImageUploader
              label="Imagen *"
              carpeta="galeria"
              onUpload={(url) => setImagenUrl(url)}
            />
            <Input
              label="Título *"
              placeholder="Título de la imagen"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
            <Textarea
              label="Descripción"
              placeholder="Descripción breve"
              rows={2}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={destacado}
                onChange={(e) => setDestacado(e.target.checked)}
                className="w-4 h-4 accent-institucional-azul"
              />
              <span className="text-sm text-gray-700">Marcar como destacada</span>
            </label>
            <Button onClick={handleGuardar} cargando={guardando}>
              Guardar imagen
            </Button>
          </div>
        </Card>
      )}

      {galeria.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {galeria.map((item) => (
            <div key={item.id} className="group relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50">
              <div className="relative aspect-square">
                <Image src={item.imagen_url} alt={item.titulo} fill className="object-cover" />
                {item.destacado && (
                  <span className="absolute top-2 left-2 bg-institucional-dorado text-white text-xs px-2 py-0.5 rounded-full">
                    Destacada
                  </span>
                )}
                <button
                  onClick={() => setConfirmarId(item.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs hover:bg-red-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate">{item.titulo}</p>
                {item.descripcion && (
                  <p className="text-xs text-gray-400 truncate">{item.descripcion}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400">No hay imágenes en la galería.</p>
        </div>
      )}

      {confirmarId && (
        <ConfirmDeleteModal
          titulo="¿Eliminar imagen?"
          descripcion="La imagen se eliminará permanentemente."
          onConfirmar={() => handleEliminar(confirmarId)}
          onCancelar={() => setConfirmarId(null)}
          cargando={eliminandoId === confirmarId}
        />
      )}
    </div>
  );
}
