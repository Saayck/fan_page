"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { clsx } from "@/backend/lib/utils";

const enlaces = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/comunicados", label: "Comunicados" },
  { href: "/galeria", label: "Galería" },
  { href: "/contacto", label: "Contacto" },
];

interface NavbarProps {
  logoUrl?: string | null;
  nombreInstitucion?: string;
}

export default function Navbar({
  logoUrl,
  nombreInstitucion = "Colegio de Profesores de Ica",
}: NavbarProps) {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="bg-institucional-azul shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3">
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Logo"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 bg-institucional-dorado rounded-full flex items-center justify-center text-white font-bold text-sm">
                CPI
              </div>
            )}
            <span className="text-white font-bold text-sm sm:text-base leading-tight hidden sm:block max-w-[200px]">
              {nombreInstitucion}
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className={clsx(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200",
                  pathname === enlace.href
                    ? "bg-white/20 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                )}
              >
                {enlace.label}
              </Link>
            ))}
          </div>

          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
            onClick={() => setMenuAbierto(!menuAbierto)}
            aria-label="Menú"
          >
            {menuAbierto ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {menuAbierto && (
        <div className="md:hidden bg-institucional-azul-oscuro border-t border-white/10">
          <div className="px-4 py-2 space-y-1">
            {enlaces.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                onClick={() => setMenuAbierto(false)}
                className={clsx(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                  pathname === enlace.href
                    ? "bg-white/20 text-white"
                    : "text-blue-100 hover:bg-white/10 hover:text-white"
                )}
              >
                {enlace.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
