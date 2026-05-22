"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { portadaSchema, type PortadaFormData } from "@/lib/validations/infoSchema";
import type { ConfiguracionWeb } from "@/types/database";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageUploader from "@/components/admin/ImageUploader";

interface PortadaFormProps {
  config: ConfiguracionWeb;
}

export default function PortadaForm({ config }: PortadaFormProps) {
  const router = useRouter();
  const [portadaUrl, setPortadaUrl] = useState(config.portada_url ?? "");
  const [logoUrl, setLogoUrl] = useState(config.logo_url ?? "");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<PortadaFormData>({
    resolver: zodResolver(portadaSchema),
    defaultValues: {
      hero_titulo: config.hero_titulo ?? "",
      hero_subtitulo: config.hero_subtitulo ?? "",
      hero_boton_texto: config.hero_boton_texto ?? "",
      hero_boton_url: config.hero_boton_url ?? "",
    },
  });

  const onSubmit = async (data: PortadaFormData) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from("configuracion_web")
        .update({
          ...data,
          portada_url: portadaUrl || null,
          logo_url: logoUrl || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", config.id);
      if (error) throw error;
      router.refresh();
      alert("Portada actualizada correctamente.");
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : "Error al guardar");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-3xl">
      <div className="card p-6 space-y-4">
        <h3 className="font-semibold text-gray-800">Texto del Hero</h3>
        <Input
          label="Título principal *"
          placeholder="Colegio de Profesores de Ica"
          error={errors.hero_titulo?.message}
          {...register("hero_titulo")}
        />
        <Textarea
          label="Subtítulo"
          placeholder="Texto descriptivo debajo del título"
          rows={3}
          {...register("hero_subtitulo")}
        />
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Texto del botón principal"
            placeholder="Ver Comunicados"
            {...register("hero_boton_texto")}
          />
          <Input
            label="URL del botón principal"
            placeholder="/comunicados"
            {...register("hero_boton_url")}
          />
        </div>
      </div>

      <div className="card p-6 space-y-6">
        <h3 className="font-semibold text-gray-800">Imágenes</h3>
        <ImageUploader
          label="Imagen de portada (fondo del hero)"
          carpeta="portada"
          valorActual={config.portada_url}
          onUpload={(url) => setPortadaUrl(url)}
        />
        <ImageUploader
          label="Logo institucional"
          carpeta="logos"
          valorActual={config.logo_url}
          onUpload={(url) => setLogoUrl(url)}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" cargando={isSubmitting} tamano="lg">
          Guardar portada
        </Button>
      </div>
    </form>
  );
}
