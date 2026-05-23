export type EstadoComunicado = "borrador" | "publicado";

export interface Autoridad {
  id: string;
  nombre: string;
  cargo: string;
  descripcion: string | null;
  foto_url: string | null;
  orden: number;
  activo: boolean;
  created_at: string;
  updated_at: string;
}

export interface Comunicado {
  id: string;
  titulo: string;
  slug: string;
  extracto: string | null;
  contenido: string;
  imagen_url: string | null;
  estado: EstadoComunicado;
  fecha_publicacion: string | null;
  created_at: string;
  updated_at: string;
}

export interface GaleriaItem {
  id: string;
  titulo: string;
  descripcion: string | null;
  imagen_url: string;
  destacado: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConfiguracionWeb {
  id: string;
  nombre_institucion: string;
  descripcion: string | null;
  historia: string | null;
  mision: string | null;
  vision: string | null;
  valores: string | null;
  direccion: string | null;
  telefono: string | null;
  correo: string | null;
  facebook_url: string | null;
  logo_url: string | null;
  portada_url: string | null;
  hero_titulo: string | null;
  hero_subtitulo: string | null;
  hero_boton_texto: string | null;
  hero_boton_url: string | null;
  created_at: string;
  updated_at: string;
}

type ComunicadoInsert = Omit<Comunicado, "id" | "created_at" | "updated_at">;
type ComunicadoUpdate = Partial<ComunicadoInsert>;
type GaleriaInsert = Omit<GaleriaItem, "id" | "created_at" | "updated_at">;
type GaleriaUpdate = Partial<GaleriaInsert>;
type ConfiguracionInsert = Omit<ConfiguracionWeb, "id" | "created_at" | "updated_at">;
type ConfiguracionUpdate = Partial<ConfiguracionInsert>;
type AutoridadInsert = Omit<Autoridad, "id" | "created_at" | "updated_at">;
type AutoridadUpdate = Partial<AutoridadInsert>;

export interface Database {
  public: {
    Tables: {
      comunicados: {
        Row: Comunicado;
        Insert: ComunicadoInsert;
        Update: ComunicadoUpdate;
        Relationships: [];
      };
      galeria: {
        Row: GaleriaItem;
        Insert: GaleriaInsert;
        Update: GaleriaUpdate;
        Relationships: [];
      };
      configuracion_web: {
        Row: ConfiguracionWeb;
        Insert: ConfiguracionInsert;
        Update: ConfiguracionUpdate;
        Relationships: [];
      };
      autoridades: {
        Row: Autoridad;
        Insert: AutoridadInsert;
        Update: AutoridadUpdate;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
