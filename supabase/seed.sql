-- ============================================================
-- DATOS DE PRUEBA — COLEGIO DE PROFESORES DE ICA
-- Ejecutar después de schema.sql
-- ============================================================

-- Configuración inicial
INSERT INTO configuracion_web (
  nombre_institucion,
  descripcion,
  historia,
  mision,
  vision,
  valores,
  direccion,
  telefono,
  correo,
  facebook_url,
  hero_titulo,
  hero_subtitulo,
  hero_boton_texto,
  hero_boton_url
) VALUES (
  'Colegio de Profesores de Ica',
  'Institución gremial que representa y defiende los derechos de los profesores de la región Ica, promoviendo la superación profesional y el bienestar del magisterio iqueño.',
  'El Colegio de Profesores de Ica fue fundado con el propósito de agrupar y representar a los docentes de la región. A lo largo de los años ha sido un pilar fundamental en la defensa de los derechos laborales y profesionales del magisterio iqueño, participando activamente en la formulación de políticas educativas regionales y nacionales.',
  'Representar, defender y promover los derechos e intereses profesionales, laborales y sociales de los docentes de la región Ica, contribuyendo al desarrollo de una educación de calidad y al fortalecimiento del magisterio.',
  'Ser la institución gremial de referencia en la región Ica, reconocida por su transparencia, representatividad y compromiso con el desarrollo profesional docente y la calidad educativa.',
  'Compromiso con la educación
Integridad y transparencia
Solidaridad gremial
Respeto a la diversidad
Responsabilidad social
Innovación pedagógica',
  'Av. Los Maestros 123, Ica, Perú',
  '(056) 234-567',
  'secretaria@colegioprofesoresica.pe',
  'https://facebook.com/colegioprofesoresica',
  'Colegio de Profesores de Ica',
  'Unidos en la defensa de los derechos del magisterio iqueño. Comprometidos con una educación de calidad para todos.',
  'Ver Comunicados',
  '/comunicados'
);

-- Comunicados de ejemplo
INSERT INTO comunicados (titulo, slug, extracto, contenido, estado, fecha_publicacion) VALUES
(
  'Convocatoria a Asamblea General Ordinaria',
  'convocatoria-asamblea-general-ordinaria',
  'Se convoca a todos los colegiados a participar de la Asamblea General Ordinaria programada para el próximo mes.',
  'El Colegio de Profesores de Ica convoca a todos sus colegiados a participar de la Asamblea General Ordinaria que se llevará a cabo el día 15 del presente mes, a las 10:00 a.m., en el auditorio principal de nuestra sede institucional.

La agenda a tratar incluye:
1. Informe de gestión del Consejo Directivo
2. Aprobación del presupuesto anual
3. Elección de delegados regionales
4. Proposiciones y pedidos

Se solicita la asistencia puntual de todos los colegiados. Traer DNI vigente y carné de colegiado actualizado.

Para mayor información, comunicarse a nuestras oficinas de lunes a viernes de 8:00 a.m. a 5:00 p.m.',
  'publicado',
  now() - interval '3 days'
),
(
  'Taller de Capacitación: Metodologías Activas en el Aula',
  'taller-capacitacion-metodologias-activas',
  'Participa en nuestro taller gratuito sobre metodologías activas de aprendizaje, orientado a docentes de todos los niveles.',
  'El Colegio de Profesores de Ica, en coordinación con la Dirección Regional de Educación de Ica, organiza el Taller de Capacitación "Metodologías Activas en el Aula" dirigido a docentes de educación básica regular de todos los niveles.

Detalles del evento:
- Fecha: 20 y 21 del presente mes
- Horario: 9:00 a.m. a 1:00 p.m.
- Modalidad: Presencial
- Lugar: Salón de usos múltiples, sede del Colegio de Profesores de Ica
- Costo: Gratuito para colegiados

Temas a desarrollar:
• Aprendizaje basado en proyectos
• Gamificación en el aula
• Evaluación formativa
• Uso de tecnología educativa

Los participantes recibirán certificado con valor curricular. Inscripciones hasta el 18 del presente mes en nuestras oficinas o a través de nuestro correo institucional.',
  'publicado',
  now() - interval '7 days'
),
(
  'Comunicado sobre Beneficios para Colegiados 2024',
  'beneficios-colegiados-2024',
  'Informamos a nuestros colegiados sobre los nuevos beneficios y convenios institucionales vigentes para el presente año.',
  'El Consejo Directivo del Colegio de Profesores de Ica tiene el agrado de informar a todos sus colegiados sobre los nuevos beneficios y convenios institucionales gestionados para el año en curso.

NUEVOS CONVENIOS VIGENTES:

1. Descuentos en centros de salud privados
Los colegiados hábiles podrán acceder a descuentos del 20% al 30% en consultas médicas y exámenes de laboratorio en las clínicas afiliadas.

2. Convenio con institutos de idiomas
Acceso a tarifas preferenciales en cursos de inglés, portugués y otras lenguas, con descuentos de hasta el 40%.

3. Seguro de vida complementario
Se ha gestionado la incorporación de un seguro de vida complementario con cobertura ampliada para colegiados y sus familias.

4. Acceso a biblioteca virtual
Los colegiados podrán acceder de manera gratuita a una biblioteca virtual con más de 50,000 recursos educativos y libros especializados.

Para hacer uso de estos beneficios, acercase a nuestras oficinas con su carné de colegiado vigente.',
  'publicado',
  now() - interval '14 days'
);

-- Imágenes de galería de ejemplo
INSERT INTO galeria (titulo, descripcion, imagen_url, destacado) VALUES
(
  'Asamblea General 2024',
  'Reunión anual de colegiados en el auditorio principal',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
  true
),
(
  'Taller Pedagógico Regional',
  'Capacitación docente en nuevas metodologías educativas',
  'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800',
  true
),
(
  'Sede Institucional',
  'Instalaciones del Colegio de Profesores de Ica',
  'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800',
  true
),
(
  'Ceremonia de Colegiación',
  'Ceremonia de incorporación de nuevos colegiados',
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
  true
);
