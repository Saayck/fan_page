-- ============================================================
-- COLEGIO DE PROFESORES DE ICA — SCHEMA SQL
-- Ejecutar en Supabase SQL Editor
-- ============================================================

-- Tabla: comunicados
CREATE TABLE IF NOT EXISTS comunicados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  slug text UNIQUE NOT NULL,
  extracto text,
  contenido text NOT NULL,
  imagen_url text,
  estado text CHECK (estado IN ('borrador', 'publicado')) DEFAULT 'borrador',
  fecha_publicacion timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla: galeria
CREATE TABLE IF NOT EXISTS galeria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descripcion text,
  imagen_url text NOT NULL,
  destacado boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabla: configuracion_web
CREATE TABLE IF NOT EXISTS configuracion_web (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre_institucion text DEFAULT 'Colegio de Profesores de Ica',
  descripcion text,
  historia text,
  mision text,
  vision text,
  valores text,
  direccion text,
  telefono text,
  correo text,
  facebook_url text,
  logo_url text,
  portada_url text,
  hero_titulo text DEFAULT 'Colegio de Profesores de Ica',
  hero_subtitulo text,
  hero_boton_texto text DEFAULT 'Ver Comunicados',
  hero_boton_url text DEFAULT '/comunicados',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_comunicados_updated_at
  BEFORE UPDATE ON comunicados
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_galeria_updated_at
  BEFORE UPDATE ON galeria
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_configuracion_web_updated_at
  BEFORE UPDATE ON configuracion_web
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- HABILITAR ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE comunicados ENABLE ROW LEVEL SECURITY;
ALTER TABLE galeria ENABLE ROW LEVEL SECURITY;
ALTER TABLE configuracion_web ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- POLÍTICAS: comunicados
-- ============================================================

-- Lectura pública solo de comunicados publicados
CREATE POLICY "Lectura pública de comunicados publicados"
  ON comunicados FOR SELECT
  USING (estado = 'publicado');

-- Admins autenticados pueden leer todos
CREATE POLICY "Admin lee todos los comunicados"
  ON comunicados FOR SELECT
  TO authenticated
  USING (true);

-- Solo admins autenticados pueden insertar
CREATE POLICY "Admin inserta comunicados"
  ON comunicados FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Solo admins autenticados pueden actualizar
CREATE POLICY "Admin actualiza comunicados"
  ON comunicados FOR UPDATE
  TO authenticated
  USING (true);

-- Solo admins autenticados pueden eliminar
CREATE POLICY "Admin elimina comunicados"
  ON comunicados FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- POLÍTICAS: galeria
-- ============================================================

CREATE POLICY "Lectura pública de galería"
  ON galeria FOR SELECT
  USING (true);

CREATE POLICY "Admin inserta galería"
  ON galeria FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin actualiza galería"
  ON galeria FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Admin elimina galería"
  ON galeria FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- POLÍTICAS: configuracion_web
-- ============================================================

CREATE POLICY "Lectura pública de configuración"
  ON configuracion_web FOR SELECT
  USING (true);

CREATE POLICY "Admin inserta configuración"
  ON configuracion_web FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Admin actualiza configuración"
  ON configuracion_web FOR UPDATE
  TO authenticated
  USING (true);

-- ============================================================
-- STORAGE BUCKET: web-images
-- Crear manualmente en Supabase Storage o con la siguiente
-- instrucción si usas el CLI de Supabase:
-- ============================================================

-- Nota: los buckets se crean desde el panel de Supabase o con:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('web-images', 'web-images', true);

-- Políticas de storage para bucket "web-images":

-- Lectura pública de imágenes
CREATE POLICY "Lectura pública de imágenes"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'web-images');

-- Solo admins autenticados pueden subir imágenes
CREATE POLICY "Admin sube imágenes"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'web-images');

-- Solo admins autenticados pueden actualizar imágenes
CREATE POLICY "Admin actualiza imágenes"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'web-images');

-- Solo admins autenticados pueden eliminar imágenes
CREATE POLICY "Admin elimina imágenes"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'web-images');
