"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { createClient } from "@/backend/lib/supabase/client";
import Button from "@/frontend/components/ui/Button";

interface ImageUploaderProps {
  valorActual?: string | null;
  carpeta?: string;
  onUpload: (url: string) => void;
  label?: string;
}

export default function ImageUploader({
  valorActual,
  carpeta = "general",
  onUpload,
  label = "Imagen",
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(valorActual ?? null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;

    if (!archivo.type.startsWith("image/")) {
      setError("Solo se permiten archivos de imagen.");
      return;
    }
    if (archivo.size > 5 * 1024 * 1024) {
      setError("La imagen no puede superar 5MB.");
      return;
    }

    setError(null);
    setCargando(true);

    const objectUrl = URL.createObjectURL(archivo);
    setPreview(objectUrl);

    try {
      const supabase = createClient();
      const extension = archivo.name.split(".").pop();
      const nombreArchivo = `${carpeta}/${Date.now()}.${extension}`;

      const { error: uploadError } = await supabase.storage
        .from("web-images")
        .upload(nombreArchivo, archivo, { upsert: false });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from("web-images")
        .getPublicUrl(nombreArchivo);

      onUpload(data.publicUrl);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Error al subir la imagen";
      setError(message);
      setPreview(valorActual ?? null);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="label">{label}</p>

      {preview && (
        <div className="relative w-full h-48 rounded-xl overflow-hidden border border-gray-200">
          <Image src={preview} alt="Vista previa" fill className="object-cover" />
          <button
            type="button"
            onClick={() => {
              setPreview(null);
              onUpload("");
            }}
            className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs hover:bg-red-700 transition-colors"
          >
            ✕
          </button>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      <Button
        type="button"
        variante="secondary"
        tamano="sm"
        cargando={cargando}
        onClick={() => inputRef.current?.click()}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        {cargando ? "Subiendo..." : preview ? "Cambiar imagen" : "Subir imagen"}
      </Button>

      {error && <p className="error-msg">{error}</p>}
    </div>
  );
}
