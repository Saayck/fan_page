# Colegio de Profesores de Ica — Sitio Web Institucional

Página web institucional y panel administrativo para el Colegio de Profesores de Ica, construida con Next.js, Supabase y Tailwind CSS.

## Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS
- **Backend / DB**: Supabase (PostgreSQL)
- **Autenticación**: Supabase Auth
- **Storage**: Supabase Storage
- **Deploy**: Vercel

## Instalación

```bash
git clone <repo>
cd colegio-profesores-ica
npm install
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Estos valores los encuentras en tu proyecto de Supabase en **Settings > API**.

## Configurar Supabase

### 1. Crear tablas (schema)

1. Ve a tu proyecto en [supabase.com](https://supabase.com)
2. Abre el **SQL Editor**
3. Copia y pega el contenido de `supabase/schema.sql`
4. Ejecuta el script

### 2. Cargar datos de prueba (opcional)

En el mismo SQL Editor, ejecuta el contenido de `supabase/seed.sql`.

### 3. Crear el bucket de imágenes

1. Ve a **Storage** en el panel de Supabase
2. Clic en **New bucket**
3. Nombre: `web-images`
4. Marca la opción **Public bucket**
5. Guarda

### 4. Crear usuario administrador

1. Ve a **Authentication > Users** en Supabase
2. Clic en **Add user**
3. Ingresa el email y contraseña del administrador
4. El usuario podrá ingresar en `/admin/login`

## Ejecutar en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

Panel admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## Estructura del proyecto

```
src/
  app/
    page.tsx                    # Inicio
    nosotros/                   # Página institucional
    comunicados/                # Listado y detalle
    galeria/                    # Galería pública
    contacto/                   # Contacto
    admin/
      login/                    # Login admin
      dashboard/                # Panel principal
      comunicados/              # CRUD comunicados
      galeria/                  # Gestión galería
      informacion/              # Info institucional
      portada/                  # Hero y portada
  components/
    public/                     # Componentes del sitio público
    admin/                      # Componentes del panel admin
    ui/                         # Componentes reutilizables
  lib/
    supabase/                   # Clientes de Supabase
    validations/                # Esquemas Zod
    utils.ts
  types/
    database.ts                 # Tipos TypeScript
  middleware.ts                 # Protección de rutas admin
supabase/
  schema.sql                    # Tablas y políticas RLS
  seed.sql                      # Datos de prueba
```

## Despliegue en Vercel

1. Conecta el repositorio a [Vercel](https://vercel.com)
2. En **Environment Variables**, agrega:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Deploy automático en cada push a `main`

## Páginas públicas

| Ruta | Descripción |
|------|-------------|
| `/` | Página de inicio con hero, comunicados y galería |
| `/nosotros` | Historia, misión, visión y valores |
| `/comunicados` | Listado con buscador |
| `/comunicados/[slug]` | Detalle del comunicado |
| `/galeria` | Galería de imágenes |
| `/contacto` | Información de contacto y formulario |

## Panel administrativo

| Ruta | Descripción |
|------|-------------|
| `/admin/login` | Login con Supabase Auth |
| `/admin/dashboard` | Estadísticas y accesos rápidos |
| `/admin/comunicados` | Listar, crear, editar, eliminar |
| `/admin/galeria` | Subir y eliminar imágenes |
| `/admin/informacion` | Editar datos institucionales |
| `/admin/portada` | Editar hero, logo e imágenes |
