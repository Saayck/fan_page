"use client";

import { ButtonHTMLAttributes, ReactNode } from "react";
import { clsx } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: "primary" | "secondary" | "danger" | "ghost";
  tamano?: "sm" | "md" | "lg";
  cargando?: boolean;
  children: ReactNode;
}

export default function Button({
  variante = "primary",
  tamano = "md",
  cargando = false,
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 font-medium rounded-xl transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed";

  const variantes = {
    primary: "bg-institucional-azul text-white hover:bg-institucional-azul-oscuro",
    secondary:
      "bg-white text-institucional-azul border border-institucional-azul hover:bg-slate-50",
    danger: "bg-red-600 text-white hover:bg-red-700",
    ghost: "text-gray-600 hover:bg-gray-100",
  };

  const tamanos = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-7 py-3 text-base",
  };

  return (
    <button
      className={clsx(base, variantes[variante], tamanos[tamano], className)}
      disabled={disabled || cargando}
      {...props}
    >
      {cargando && (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      )}
      {children}
    </button>
  );
}
