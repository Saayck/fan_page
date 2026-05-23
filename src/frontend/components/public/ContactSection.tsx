"use client";

import { useState } from "react";
import type { ConfiguracionWeb } from "@/backend/types/database";
import Button from "@/frontend/components/ui/Button";
import Input from "@/frontend/components/ui/Input";
import Textarea from "@/frontend/components/ui/Textarea";

interface ContactSectionProps {
  config: Partial<ConfiguracionWeb> | null;
}

interface FormData {
  nombre: string;
  correo: string;
  asunto: string;
  mensaje: string;
}

const initialForm: FormData = { nombre: "", correo: "", asunto: "", mensaje: "" };

export default function ContactSection({ config }: ContactSectionProps) {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(initialForm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);

    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Error al enviar el mensaje.");
      } else {
        setEnviado(true);
        setForm(initialForm);
      }
    } catch {
      setError("Error de conexión. Verifica tu internet e inténtalo de nuevo.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="py-16 bg-institucional-gris">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="section-title">Contacto</h2>
          <p className="section-subtitle">Estamos aquí para atenderte</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-institucional-azul">Información de contacto</h3>

            <div className="space-y-4">
              {config?.direccion && (
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-institucional-azul rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Dirección</p>
                    <p className="text-gray-500 text-sm">{config.direccion}</p>
                  </div>
                </div>
              )}

              {config?.telefono && (
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-institucional-azul rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Teléfono</p>
                    <p className="text-gray-500 text-sm">{config.telefono}</p>
                  </div>
                </div>
              )}

              {config?.correo && (
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-institucional-azul rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Correo</p>
                    <a href={`mailto:${config.correo}`} className="text-institucional-azul-claro text-sm hover:underline">
                      {config.correo}
                    </a>
                  </div>
                </div>
              )}

              {config?.facebook_url && (
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">f</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">Facebook</p>
                    <a
                      href={config.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-institucional-azul-claro text-sm hover:underline"
                    >
                      Ver página
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card p-4 sm:p-6">
            {enviado ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Mensaje enviado!</h3>
                <p className="text-gray-500">Nos pondremos en contacto contigo pronto.</p>
                <button
                  onClick={() => setEnviado(false)}
                  className="mt-4 text-institucional-azul-claro text-sm hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
                <h3 className="text-lg font-semibold text-institucional-azul mb-4">
                  Envíanos un mensaje
                </h3>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                    {error}
                  </div>
                )}

                <Input
                  label="Correo electrónico"
                  name="correo"
                  type="email"
                  placeholder="tu@correo.com"
                  value={form.correo}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                <Input
                  label="Nombre completo"
                  name="nombre"
                  placeholder="Tu nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
                <Input
                  label="Asunto"
                  name="asunto"
                  placeholder="¿En qué podemos ayudarte?"
                  value={form.asunto}
                  onChange={handleChange}
                  required
                />
                <Textarea
                  label="Mensaje"
                  name="mensaje"
                  placeholder="Escribe tu mensaje aquí..."
                  rows={4}
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" cargando={enviando} tamano="lg" className="w-full">
                  Enviar mensaje
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
