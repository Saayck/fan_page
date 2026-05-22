"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/backend/lib/supabase/client";
import { comunicadoSchema, type ComunicadoFormData } from "@/backend/lib/validations/comunicadoSchema";
import { generarSlug } from "@/backend/lib/utils";
import type { Comunicado } from "@/backend/types/database";
import Input from "@/frontend/components/ui/Input";
import Textarea from "@/frontend/components/ui/Textarea";
import Button from "@/frontend/components/ui/Button";
import ImageUploader from "./ImageUploader";

interface ComunicadoFormProps {
  comunicado?: Comunicado;
}

export default function ComunicadoForm({ comunicado }: ComunicadoFormProps) {
  const router = useRouter();
  const esEdicion = !!comunicado;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ComunicadoFormData>({
    resolver: zodResolver(comunicadoSchema),
    defaultValues: {
      titulo: comunicado?.titulo ?? "",
      slug: comunicado?.slug ?? "",
      extracto: comunicado?.extracto ?? "",
      contenido: comunicado?.contenido ?? "",
      imagen_url: comunicado?.imagen_url ?? "",
      estado: comunicado?.estado ?? "borrador",
      fecha_publicacion: comunicado?.fecha_publicacion
        ? comunicado.fecha_publicacion.slice(0, 16)
        : "",
    },
  });

  const titulo = watch("titulo");

  useEffect(() => {
    if (!esEdicion && titulo) {
      setValue("slug", generarSlug(titulo));
    }
  }, [titulo, esEdicion, setValue]);

  const onSubmit = async (data: ComunicadoFormData) => {
    try {
      const supabase = createClient();
      const slug = data.slug || generarSlug(data.titulo);

      const payload = {
        titulo: data.titulo,
        slug,
        extracto: data.extracto || null,
        contenido: data.contenido,
        imagen_url: data.imagen_url || null,
        estado: data.estado,
        fecha_publicacion:
          data.estado === "publicado"
            ? data.fecha_publicacion || new Date().toISOString()
            : null,
        updated_at: new Date().toISOString(),
      };

      if (esEdicion) {
        const { error } = await supabase
          .from("comunicados")
          .update(payload)
          .eq("id", comunicado.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("comunicados").insert(payload);
        if (error) throw error;
      }

      router.push("/admin/comunicados");
      router.refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error al guardar el comunicado");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <Input
            label="Título *"
            placeholder="Título del comunicado"
            error={errors.titulo?.message}
            {...register("titulo")}
          />
        </div>

        <div>
          <Input
            label="Slug (URL)"
            placeholder="url-del-comunicado"
            error={errors.slug?.message}
            {...register("slug")}
          />
          <p className="text-xs text-gray-400 mt-1">Se genera automáticamente desde el título.</p>
        </div>

        <div>
          <label className="label">Estado *</label>
          <select className="input-field" {...register("estado")}>
            <option value="borrador">Borrador</option>
            <option value="publicado">Publicado</option>
          </select>
          {errors.estado && <p className="error-msg">{errors.estado.message}</p>}
        </div>

        <div>
          <Input
            label="Fecha de publicación"
            type="datetime-local"
            {...register("fecha_publicacion")}
          />
        </div>
      </div>

      <Textarea
        label="Extracto"
        placeholder="Breve descripción del comunicado (máx. 500 caracteres)"
        rows={2}
        error={errors.extracto?.message}
        {...register("extracto")}
      />

      <Textarea
        label="Contenido *"
        placeholder="Escribe el contenido completo del comunicado..."
        rows={10}
        error={errors.contenido?.message}
        {...register("contenido")}
      />

      <ImageUploader
        label="Imagen principal"
        carpeta="comunicados"
        valorActual={comunicado?.imagen_url}
        onUpload={(url) => setValue("imagen_url", url)}
      />

      <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 sm:flex-row">
        <Button type="submit" cargando={isSubmitting} tamano="lg" className="w-full sm:w-auto">
          {esEdicion ? "Guardar cambios" : "Crear comunicado"}
        </Button>
        <Button
          type="button"
          variante="secondary"
          tamano="lg"
          onClick={() => router.push("/admin/comunicados")}
          className="w-full sm:w-auto"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
