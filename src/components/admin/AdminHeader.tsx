"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

interface AdminHeaderProps {
  titulo: string;
  descripcion?: string;
  accion?: React.ReactNode;
}

export default function AdminHeader({ titulo, descripcion, accion }: AdminHeaderProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">{titulo}</h1>
          {descripcion && (
            <p className="text-sm text-gray-500 mt-0.5">{descripcion}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {accion}
          <Button
            variante="ghost"
            tamano="sm"
            onClick={handleLogout}
            className="text-gray-500 hover:text-red-600"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Salir
          </Button>
        </div>
      </div>
    </header>
  );
}
