"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/backend/lib/supabase/client";
import { infoSchema, type InfoFormData } from "@/backend/lib/validations/infoSchema";
import type { ConfiguracionWeb } from "@/backend/types/database";
import Input from "@/frontend/components/ui/Input";
import Textarea from "@/frontend/components/ui/Textarea";
import Button from "@/frontend/components/ui/Button";

interface InfoFormProps {
  config: ConfiguracionWeb;
}

export default function InfoForm({ config }: InfoFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<InfoFormData>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      nombre_institucion: config.nombre_institucion ?? "",
      descripcion: config.descripcion ?? "",
      historia: config.historia ?? "",
      mision: config.mision ?? "",
      vision: config.vision ?? "",
      valores: config.valores ?? "",
      direccion: config.direccion ?? "",
      telefono: config.telefono ?? "",
      correo: config.correo ?? "",
      facebook_url: config.facebook_url ?? "",
    },
  });

  const onSubmit = async (data: InfoFormData) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("configuracion_web")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", config.id);
      if (error) throw error;
      router.refresh();
      alert("Información actualizada correctamente.");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Información General</h3>
        <Input
          label="Nombre de la institución *"
          error={errors.nombre_institucion?.message}
          {...register("nombre_institucion")}
        />
        <Textarea
          label="Descripción"
          rows={3}
          error={errors.descripcion?.message}
          {...register("descripcion")}
        />
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Historia y Valores</h3>
        <Textarea label="Historia" rows={5} {...register("historia")} />
        <Textarea label="Misión" rows={4} {...register("mision")} />
        <Textarea label="Visión" rows={4} {...register("vision")} />
        <Textarea label="Valores" rows={4} {...register("valores")} />
      </div>

      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Datos de Contacto</h3>
        <Input label="Dirección" {...register("direccion")} />
        <Input label="Teléfono" {...register("telefono")} />
        <Input
          label="Correo electrónico"
          type="email"
          error={errors.correo?.message}
          {...register("correo")}
        />
        <Input
          label="URL de Facebook"
          type="url"
          placeholder="https://facebook.com/..."
          error={errors.facebook_url?.message}
          {...register("facebook_url")}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" cargando={isSubmitting} disabled={!isDirty} tamano="lg">
          Guardar cambios
        </Button>
      </div>
    </form>
  );
}
