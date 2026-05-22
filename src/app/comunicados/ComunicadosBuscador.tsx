"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ComunicadosBuscador({ valorInicial }: { valorInicial?: string }) {
  const [busqueda, setBusqueda] = useState(valorInicial ?? "");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (busqueda.trim()) params.set("q", busqueda.trim());
    router.push(`/comunicados?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 max-w-lg">
      <div className="flex-1 relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          placeholder="Buscar comunicado..."
          className="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-institucional-azul-claro"
        />
      </div>
      <button
        type="submit"
        className="bg-institucional-azul text-white px-5 py-3 rounded-xl text-sm font-medium hover:bg-institucional-azul-oscuro transition-colors"
      >
        Buscar
      </button>
      {busqueda && (
        <button
          type="button"
          onClick={() => {
            setBusqueda("");
            router.push("/comunicados");
          }}
          className="text-gray-400 hover:text-gray-600 px-2"
        >
          ✕
        </button>
      )}
    </form>
  );
}
