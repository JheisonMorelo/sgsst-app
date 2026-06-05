// Resolución 5018 de 2019 — Lineamientos SST sector eléctrico (Ministerio del Trabajo)
// Vigente: aplica a generación, transmisión, distribución y comercialización de energía eléctrica
// Deroga: Resolución 1348 de 2009

export const RES5018_INFO = {
  numero: 'Resolución 5018 de 2019',
  fecha: '20 de noviembre de 2019',
  entidad: 'Ministerio del Trabajo',
  objeto: 'Lineamientos en Seguridad y Salud en el Trabajo para actividades ejecutadas en generación, transmisión, distribución y comercialización de energía eléctrica.',
  alcance: 'Empresas públicas y privadas, contratistas, trabajadores independientes y toda persona que preste servicios en procesos con riesgo eléctrico en el sistema eléctrico colombiano.',
  deroga: 'Resolución 1348 de 2009',
  transicion: '24 meses desde publicación (venció noviembre 2021)',
  sanciones: 'Decreto 1295/1994 Art. 91 · Ley 1562/2012 Art. 13 · Decreto 1072/2015 Cap. 11',
};

// Artículo 5 — Las Cinco Reglas de Oro (trabajo sin tensión)
export const CINCO_REGLAS_ORO = [
  {
    orden: 1,
    titulo: 'Desconexión visible',
    descripcion: 'Desconectar de forma visible todas las fuentes de tensión mediante interruptores y/o seccionadores de corte al aire, cuchillas desconectadoras u otros dispositivos de corte. En subestaciones: seccionadores o puentes removibles; los interruptores requieren extracción de las barras.',
    articulo: 'Art. 5, literal a)',
  },
  {
    orden: 2,
    titulo: 'Bloquear, enclavijar y señalizar',
    descripcion: 'Bloquear y encadenar en posición de apertura los aparatos de corte utilizando candados. Señalizar con tarjeta "NO OPERAR" en cada punto de maniobra bloqueado.',
    articulo: 'Art. 5, literal b)',
  },
  {
    orden: 3,
    titulo: 'Verificar ausencia de tensión',
    descripcion: 'Comprobar la ausencia de tensión en cada una de las fases usando detector luminoso y sonoro (o de contacto). Verificar el funcionamiento del detector antes y después de la prueba en fuente conocida.',
    articulo: 'Art. 5, literal c)',
  },
  {
    orden: 4,
    titulo: 'Poner a tierra y en cortocircuito',
    descripcion: 'Instalar equipos de puesta a tierra y cortocircuito en todos los puntos de posible alimentación, con sección de conductor adecuada. En subestaciones: ubicar el punto de malla de tierra más cercano al área de trabajo.',
    articulo: 'Art. 5, literal d)',
  },
  {
    orden: 5,
    titulo: 'Señalizar y demarcar la zona de trabajo',
    descripcion: 'Delimitar el área de trabajo con barreras y señales de advertencia conforme a normas nacionales e internacionales, distinguiendo claramente las partes desenergizadas de las partes que permanecen energizadas.',
    articulo: 'Art. 5, literal e)',
  },
];

// Artículo 10 — Fases del trabajo eléctrico (con y sin tensión)
export const FASES_TRABAJO_ELECTRICO = [
  {
    fase: 'Diagnóstico',
    icono: 'Search',
    descripcion: 'Identificación escrita de peligros y evaluación de riesgos; definición de condiciones controladas; procedimientos de emergencia y listas de verificación para personal en campo.',
    actividades: [
      'Identificación escrita de peligros del sitio',
      'Evaluación y valoración de riesgos específicos',
      'Definición de condiciones controladas de trabajo',
      'Elaboración de procedimientos de emergencia',
      'Preparación de listas de chequeo para campo',
    ],
  },
  {
    fase: 'Planificación',
    icono: 'ClipboardList',
    descripcion: 'Interpretación de diagramas eléctricos actualizados; determinación del método de trabajo; cálculo de duración incluyendo procedimientos de seguridad; solicitud de consignación.',
    actividades: [
      'Lectura e interpretación de diagramas eléctricos vigentes',
      'Determinación del método de trabajo a aplicar',
      'Cálculo de duración total (trabajo + seguridad)',
      'Solicitud de consignación a la entidad operadora',
      'Coordinación con centros de control si aplica',
    ],
  },
  {
    fase: 'Programación',
    icono: 'Calendar',
    descripcion: 'Designar supervisor principal y suplente; documentar identificación del equipo/instalación, nivel de tensión, fechas, horario, actividades paso a paso y medidas de seguridad. Verificar competencias del personal asignado.',
    actividades: [
      'Designar supervisor principal y supervisor suplente',
      'Documentar ID de instalación o equipo',
      'Registrar nivel de tensión y fechas programadas',
      'Detallar actividades paso a paso con medidas de seguridad',
      'Verificar habilitación y competencias de cada trabajador',
    ],
  },
  {
    fase: 'Ejecución',
    icono: 'Zap',
    descripcion: 'Charla preoperacional con riesgos específicos del sitio y plan de emergencia; revisión de condiciones de la instalación; demarcación y señalización de la zona.',
    actividades: [
      'Charla preoperacional con todo el equipo de trabajo',
      'Revisar condiciones reales de la instalación (estructuras, cajas, ambiente)',
      'Demarcar y señalizar la zona de trabajo',
      'Aplicar las Cinco Reglas de Oro (trabajo sin tensión) o TCT (trabajo con tensión)',
      'Documentar el estado del equipo al finalizar',
    ],
  },
  {
    fase: 'Supervisión y Control',
    icono: 'Shield',
    descripcion: 'Hacer cumplir procedimientos estrictamente; inspeccionar herramientas y EPP antes y después; verificar demarcación permanente; retirar trabajadores que no puedan laborar con seguridad; suspender si las condiciones no garantizan seguridad.',
    actividades: [
      'Verificar cumplimiento estricto de procedimientos',
      'Inspeccionar herramientas y EPP antes y después de usar',
      'Mantener la demarcación del área durante toda la tarea',
      'Retirar al trabajador que no pueda actuar con seguridad',
      'Suspender la actividad si se compromete la seguridad de personas, comunidad o entorno',
    ],
  },
];

// Artículo 11 — Distancias mínimas de seguridad
export const DISTANCIAS_SEGURIDAD = [
  { tension: 'Hasta 1 kV',    calificado: '0,40 m', noCalificadoAislado: '0,40 m', noCalificado: '—' },
  { tension: '7,6 – 13,8 kV', calificado: '0,95 m', noCalificadoAislado: '—',     noCalificado: '3 m' },
  { tension: '33 – 34,5 kV',  calificado: '1,10 m', noCalificadoAislado: '—',     noCalificado: '3 m' },
  { tension: '44 kV',          calificado: '1,20 m', noCalificadoAislado: '—',     noCalificado: '3 m' },
  { tension: '57,5 – 66 kV',  calificado: '1,40 m', noCalificadoAislado: '—',     noCalificado: '4 m' },
  { tension: '110 – 115 kV',  calificado: '1,80 m', noCalificadoAislado: '—',     noCalificado: '4 m' },
  { tension: '220 – 230 kV',  calificado: '2,80 m', noCalificadoAislado: '—',     noCalificado: '5 m' },
  { tension: '500 kV',         calificado: '5,50 m', noCalificadoAislado: '—',     noCalificado: '8 m' },
];

// Artículo 33 — Requisitos de habilitación del personal
export const REQUISITOS_HABILITACION = [
  {
    requisito: 'Formación y entrenamiento',
    descripcion: 'Capacitación teórico-práctica específica para el tipo de trabajo. Sesiones mínimo de 2 horas continuas. Cobertura a todos los niveles jerárquicos involucrados en operaciones.',
    periodicidad: 'Anual o ante cambios de procedimiento',
  },
  {
    requisito: 'Experiencia documentada',
    descripcion: 'Historial verificable de trabajo en actividades de la misma naturaleza, registrado en hoja de vida laboral.',
    periodicidad: 'Evaluación en cada habilitación',
  },
  {
    requisito: 'Certificación laboral por competencias',
    descripcion: 'Certificado vigente expedido por entidad acreditada conforme a estándares nacionales para trabajo con tensión.',
    periodicidad: 'Según vigencia del certificado',
  },
  {
    requisito: 'Autorización escrita de la empresa',
    descripcion: 'Habilitación escrita del empleador, específica por tipo de tarea eléctrica. Renovable máximo cada año.',
    periodicidad: 'Máximo cada 12 meses',
  },
  {
    requisito: 'Aptitud médica con énfasis eléctrico',
    descripcion: 'Examen médico ocupacional con evaluación de sistemas propioceptivo y vestibular, coordinación visomotora, capacidad de concentración y manejo del riesgo eléctrico.',
    periodicidad: 'Anual o ante cambio de actividad',
  },
  {
    requisito: 'Capacitador con licencia SST',
    descripcion: 'Toda capacitación en SST del sector eléctrico debe ser impartida por personal con licencia vigente en SST (Res. 4502/2012 o Res. 0312/2019).',
    periodicidad: 'Verificar en cada capacitación',
  },
];

// Artículo 13–14 — Requisitos de subestaciones
export const REQUISITOS_SUBESTACION = [
  { categoria: 'Procedimientos', items: [
    'Procedimientos de mantenimiento y operación para todos los equipos con diagramas eléctricos actualizados',
    'Protocolos de transferencia de responsabilidad operativa entre turnos',
    'Copias actualizadas de procedimientos incluyendo diagramas y manuales de equipos',
    'Diagrama unifilar en la cara interior de las puertas/tapas de los paneles principales',
  ]},
  { categoria: 'Identificación y señalización', items: [
    'Identificación y rotulación completa de todos los equipos',
    'Asumir todo equipo como energizado hasta demostrar lo contrario',
    'Señalización internacional en circuitos para comunicar advertencias de peligro',
    'Todas las fases identificadas con código de colores según norma vigente',
    'Celdas de transformadores claramente identificadas en frente y posterior',
  ]},
  { categoria: 'EPP y seguridad física', items: [
    'Prohibición de elementos metálicos personales dentro de la subestación',
    'EPP apropiado según nivel de tensión: casco, botas dieléctricas, ropa de trabajo para circulación en patio',
    'Kit de elementos para trabajo sin tensión disponibles para la magnitud de los sistemas existentes',
    'Inducción al personal de actividades complementarias (vigilancia, obra civil, aseo)',
  ]},
  { categoria: 'Infraestructura del patio', items: [
    'Capa de grava mínimo 10 cm en el patio para aislamiento eléctrico y protección contra incendio',
    'Sistemas de drenaje funcionando con rejillas apropiadas en buen estado',
    'Cerramiento perimetral en buen estado y correctamente aterrizado',
    'Control periódico de plagas y vegetación',
    'Puertas de acceso y cubiertas de equipos en buen estado',
    'Capacidad de comunicación del personal que realiza maniobras',
  ]},
];

// Artículo 32 — Requisitos EPP para sector eléctrico
export const EPP_RES5018 = [
  { item: 'Ropa de trabajo', requisito: 'Algodón 100%, sin accesorios metálicos (botones, cremalleras, hebillas). Categoría Cero según NFPA 70E. No sintéticos.' },
  { item: 'Análisis de arco eléctrico', requisito: 'Obligatorio para todos los niveles de tensión antes de seleccionar EPP. Según norma IEEE 1584 y NFPA 70E 2024.' },
  { item: 'EPP según categoría de arco', requisito: 'El EPP debe corresponder a la categoría de riesgo de arco determinada por el estudio. Ver tabla NFPA 70E Tabla 130.7.' },
  { item: 'Pruebas dieléctricas', requisito: 'Verificación de rigidez dieléctrica por laboratorio acreditado (RETIE). Registro individual por elemento.' },
  { item: 'Inspección antes/después', requisito: 'Responsabilidad del trabajador inspeccionar cada elemento antes y después de cada uso. Retirar inmediatamente elementos defectuosos.' },
  { item: 'Escaleras', requisito: 'Exclusivamente fibra de vidrio para trabajo en instalaciones con riesgo eléctrico. Escaleras dañadas deben retirarse de servicio inmediatamente.' },
];
