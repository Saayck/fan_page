"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/backend/lib/supabase/client";
import { autoridadSchema, type AutoridadFormData } from "@/backend/lib/validations/autoridadSchema";
import type { Autoridad } from "@/backend/types/database";
import Input from "@/frontend/components/ui/Input";
import Textarea from "@/frontend/components/ui/Textarea";
import Button from "@/frontend/components/ui/Button";
import ImageUploader from "@/frontend/components/admin/ImageUploader";

interface AutoridadFormProps {
  autoridad?: Autoridad;
}

export default function AutoridadForm({ autoridad }: AutoridadFormProps) {
  const router = useRouter();
  const esEdicion = !!autoridad;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<AutoridadFormData>({
    resolver: zodResolver(autoridadSchema),
    defaultValues: {
      nombre: autoridad?.nombre ?? "",
      cargo: autoridad?.cargo ?? "",
      descripcion: autoridad?.descripcion ?? "",
      foto_url: autoridad?.foto_url ?? "",
      orden: autoridad?.orden ?? 0,
      activo: autoridad?.activo ?? true,
    },
  });

  const fotoUrl = watch("foto_url");

  const onSubmit = async (data: AutoridadFormData) => {
    try {
      const supabase = createClient();
      const payload = {
        nombre: data.nombre,
        cargo: data.cargo,
        descripcion: data.descripcion || null,
        foto_url: data.foto_url || null,
        orden: data.orden,
        activo: data.activo,
        updated_at: new Date().toISOString(),
      };

      if (esEdicion) {
        const { error } = await supabase.from("autoridades").update(payload).eq("id", autoridad.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("autoridades").insert(payload);
        if (error) throw error;
      }

      router.push("/admin/autoridades");
      router.refresh();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="card p-4 space-y-4 sm:p-6">
        <h3 className="font-semibold text-gray-800">Foto de perfil</h3>
        <Controller
          name="foto_url"
          control={control}
          render={() => (
            <ImageUploader
              valorActual={fotoUrl || null}
              carpeta="autoridades"
              label="Foto del directivo"
              onUpload={(url) => setValue("foto_url", url, { shouldDirty: true })}
            />
          )}
        />
      </div>

      <div className="card p-4 space-y-4 sm:p-6">
        <h3 className="font-semibold text-gray-800">Datos personales</h3>
        <Input
          label="Nombre completo *"
          placeholder="Mg. Rosa María Huamán Quispe"
          error={errors.nombre?.message}
          {...register("nombre")}
        />

        <div className="w-full">
          <label htmlFor="cargo" className="label">Cargo *</label>
          <input
            id="cargo"
            list="cargos-list"
            placeholder="Decana Regional"
            className={`input-field ${errors.cargo ? "border-red-400 focus:ring-red-400" : ""}`}
            {...register("cargo")}
          />
          <datalist id="cargos-list">
            <option value="Decana Regional" />
            <option value="Decano Regional" />
            <option value="Vice Decana" />
            <option value="Vice Decano" />
            <option value="Secretaria General" />
            <option value="Secretario General" />
            <option value="Tesorera" />
            <option value="Tesorero" />
            <option value="Directora de Defensa Profesional" />
            <option value="Director de Defensa Profesional" />
            <option value="Directora de Bienestar Social" />
            <option value="Director de Bienestar Social" />
            <option value="Directora de Imagen Institucional" />
            <option value="Director de Imagen Institucional" />
            <option value="Vocal" />
          </datalist>
          {errors.cargo && <p className="error-msg">{errors.cargo.message}</p>}
        </div>

        <Textarea
          label="Descripción / Biografía"
          rows={5}
          placeholder="Breve descripción o biografía del directivo..."
          {...register("descripcion")}
        />
      </div>

      <div className="card p-4 space-y-4 sm:p-6">
        <h3 className="font-semibold text-gray-800">Configuración</h3>
        <Input
          label="Orden de aparición (1 = primero)"
          type="number"
          min={0}
          placeholder="1"
          error={errors.orden?.message}
          {...register("orden")}
        />
        <div className="flex items-center gap-3">
          <Controller
            name="activo"
            control={control}
            render={({ field }) => (
              <input
                type="checkbox"
                id="activo"
                checked={field.value}
                onChange={field.onChange}
                className="w-4 h-4 accent-institucional-azul"
              />
            )}
          />
          <label htmlFor="activo" className="text-sm font-medium text-gray-700">
            Mostrar en el sitio web
          </label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variante="secondary"
          onClick={() => router.push("/admin/autoridades")}
        >
          Cancelar
        </Button>
        <Button type="submit" cargando={isSubmitting} disabled={!isDirty} tamano="lg">
          {esEdicion ? "Guardar cambios" : "Crear autoridad"}
        </Button>
      </div>
    </form>
  );
}
