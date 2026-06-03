// Contenido de ayuda centralizado para toda la app.
// Cada clave corresponde a una ruta de React Router.

export const HELP_PAGES = {
  '/': {
    titulo: 'Dashboard — Panel Principal',
    descripcion: 'Vista central del estado de cumplimiento del SG-SST. Muestra el porcentaje global, el avance por ciclo PHVA y los estándares eléctricos pendientes.',
    secciones: [
      {
        titulo: 'Semáforo de Cumplimiento',
        contenido: 'Círculo central que muestra el porcentaje de cumplimiento según la autoevaluación de la Resolución 0312/2019. Los colores significan: ROJO ≤60% (crítico), AMARILLO 61-85% (moderado), VERDE >85% (aceptable).',
      },
      {
        titulo: 'Tarjetas PHVA',
        contenido: 'Muestran el avance en cada fase del ciclo (Planear, Hacer, Verificar, Actuar). Cada porcentaje se calcula con base en el puntaje ponderado de los estándares de esa fase.',
      },
      {
        titulo: 'Radar PHVA',
        contenido: 'Gráfica de araña que permite identificar de un vistazo en qué fase del ciclo hay más debilidad. Un radar perfectamente equilibrado indica avance parejo en las 4 fases.',
      },
      {
        titulo: 'Estándares Eléctricos Pendientes',
        contenido: 'Muestra los estándares específicos de riesgo eléctrico (marcados con ⚡) que aún no han sido completados. Son prioritarios por la clase de riesgo V de la empresa.',
      },
    ],
    pasos: [
      'Verifica que el perfil de la empresa esté configurado (Clase Riesgo V para ingeniería eléctrica).',
      'Observa el semáforo: si está en rojo, debes presentar plan de mejora inmediato a la ARL.',
      'Usa las tarjetas PHVA para identificar qué fase del ciclo necesita más atención.',
      'Completa los estándares eléctricos pendientes con prioridad — son los de mayor riesgo.',
    ],
    normativa: ['Resolución 0312/2019 Art. 28', 'Decreto 1072/2015 Art. 2.2.4.6'],
  },

  '/perfil': {
    titulo: 'Perfil de la Empresa',
    descripcion: 'Configuración inicial que determina qué estándares aplican según el tamaño y la clase de riesgo de la empresa.',
    secciones: [
      {
        titulo: '¿Por qué importa la Clase de Riesgo?',
        contenido: 'La Resolución 0312/2019 clasifica las empresas en 3 niveles según trabajadores y riesgo. Las empresas de ingeniería eléctrica clasifican siempre como Riesgo V (el más alto), lo que las obliga a cumplir los 60 estándares completos sin importar el número de trabajadores.',
      },
      {
        titulo: 'Clases de Riesgo',
        contenido: 'Clase I-II: oficinas, laboratorios. Clase III: construcción liviana. Clase IV: minería superficial. Clase V: ingeniería eléctrica, minería subterránea, manejo de explosivos. Las empresas de Clase IV o V siempre aplican Nivel III (60 estándares).',
      },
      {
        titulo: 'Número de Trabajadores',
        contenido: 'Incluye trabajadores directos, contratistas permanentes y trabajadores en misión. Para Clase V, el número no cambia los estándares requeridos (siempre son 60), pero sí afecta el monto de las multas por incumplimiento.',
      },
    ],
    pasos: [
      'Ingresa el nombre legal y NIT de la empresa.',
      'Selecciona Clase de Riesgo V para ingeniería eléctrica.',
      'Ingresa el número total de trabajadores incluyendo contratistas.',
      'Registra el nombre del responsable del SG-SST (debe tener licencia SST vigente).',
      'Guarda el perfil — la app calculará automáticamente el nivel de estándares aplicables.',
    ],
    normativa: ['Resolución 0312/2019 Art. 3, 16, 27', 'Decreto 1295/1994 — Tabla de Clases de Riesgo'],
  },

  '/phva': {
    titulo: 'Ciclo PHVA — Planear, Hacer, Verificar, Actuar',
    descripcion: 'Metodología de mejora continua que estructura el SG-SST según el Decreto 1072/2015. Cada fase contiene obligaciones específicas del sistema.',
    secciones: [
      {
        titulo: '¿Qué es el ciclo PHVA?',
        contenido: 'Es el modelo de gestión obligatorio del SG-SST (Decreto 1072/2015 Capítulo 6). Basado en el Ciclo de Deming: Planear (definir política y objetivos), Hacer (implementar controles), Verificar (medir y auditar), Actuar (mejorar). El ciclo se repite anualmente.',
      },
      {
        titulo: 'Cómo usar la rueda interactiva',
        contenido: 'Haz clic en cualquier cuadrante de la rueda para expandir el detalle de esa fase. Verás las actividades clave, preguntas para la gerencia y los estándares asociados con su estado de cumplimiento.',
      },
      {
        titulo: 'PLANEAR (P) — 25 puntos',
        contenido: 'Definir política SST, objetivos medibles, evaluación inicial, plan de trabajo anual, matriz IPER (GTC-45), matriz de requisitos legales (incluye RETIE), conformación COPASST. Base documental obligatoria.',
      },
      {
        titulo: 'HACER (H) — 60 puntos',
        contenido: 'Implementar los controles identificados: capacitación, exámenes médicos, dotación de EPP dieléctrico, inspecciones, mantenimiento, vigilancia epidemiológica, plan de emergencias. Es la fase con más peso en el puntaje.',
      },
      {
        titulo: 'VERIFICAR (V) — 5 puntos',
        contenido: 'Medir el desempeño: indicadores mensuales, investigación de AT/EL en 15 días, auditoría interna anual, revisión por la alta dirección. Sin verificación no hay mejora.',
      },
      {
        titulo: 'ACTUAR (A) — 10 puntos',
        contenido: 'Cerrar brechas: acciones correctivas con causa raíz, mejoras derivadas de la revisión gerencial, lecciones aprendidas de accidentes. Retroalimenta el ciclo siguiente.',
      },
    ],
    pasos: [
      'Selecciona cada fase para ver sus actividades específicas.',
      'Responde las preguntas de gerencia — si la respuesta es NO, es un incumplimiento.',
      'Revisa los estándares de la fase y márcalos como completados en el Checklist.',
      'Usa la tabla normativa al final para identificar los artículos legales aplicables.',
    ],
    normativa: ['Decreto 1072/2015 Arts. 2.2.4.6.3 – 2.2.4.6.37'],
  },

  '/checklist': {
    titulo: 'Checklist de Estándares SG-SST',
    descripcion: 'Lista completa de los 60 estándares mínimos de la Resolución 0312/2019. Marca cada estándar cuando tengas la evidencia documental que lo soporta.',
    secciones: [
      {
        titulo: '¿Cuándo marcar un estándar como completado?',
        contenido: 'Solo cuando tengas la evidencia documental en físico o digital. No marques como completado si el documento no existe aún. Las evidencias requeridas se muestran al expandir cada estándar con la flecha ▼.',
      },
      {
        titulo: 'Sistema de puntaje',
        contenido: 'Cada estándar tiene un peso en puntos (total = 100). Los estándares de HACER pesan más porque son los de implementación real. El porcentaje final determina tu calificación: ≤60% crítico, 61-85% moderado, >85% aceptable.',
      },
      {
        titulo: 'Filtros disponibles',
        contenido: 'Por ciclo PHVA (ver solo los de Planear, Hacer, etc.), por riesgo eléctrico (estándares específicos de ingeniería eléctrica marcados con ⚡), o solo los pendientes. Úsalos para enfocar el trabajo por área.',
      },
      {
        titulo: 'Notas internas',
        contenido: 'Cada estándar tiene un campo de notas donde puedes registrar: nombre del responsable, fecha límite de cumplimiento, observaciones o referencias a documentos específicos. Las notas se guardan en la base de datos.',
      },
      {
        titulo: 'Estándares eléctricos ⚡',
        contenido: 'Marcados con el ícono ⚡, son los estándares que tienen relevancia específica para ingeniería eléctrica: LOTO, EPP dieléctrico, matriz IPER con riesgo eléctrico, emergencias eléctricas, gestión de residuos peligrosos (aceite dieléctrico).',
      },
    ],
    pasos: [
      'Filtra por "Solo pendientes" para ver qué falta.',
      'Expande cada estándar (flecha ▼) para ver las evidencias requeridas.',
      'Reúne o crea el documento/evidencia correspondiente.',
      'Marca el estándar como completado y agrega una nota con la referencia documental.',
      'Prioriza los estándares eléctricos ⚡ — son los de mayor riesgo para tu empresa.',
    ],
    normativa: ['Resolución 0312/2019 — Anexo técnico', 'Decreto 1072/2015 Art. 2.2.4.6'],
  },

  '/electrico': {
    titulo: 'Riesgos Eléctricos',
    descripcion: 'Matriz de peligros específicos de ingeniería eléctrica con controles, EPP requerido y referencia normativa. Aplica directamente a la implementación del estándar IPER (Estándar 28).',
    secciones: [
      {
        titulo: 'Matriz de Riesgos',
        contenido: 'Muestra los 6 peligros principales de la actividad eléctrica: contacto directo/indirecto, arco eléctrico, trabajo en alturas, incendio eléctrico y campos electromagnéticos. Cada uno incluye causas típicas y controles según jerarquía (eliminación → ingeniería → administrativo → EPP).',
      },
      {
        titulo: 'Jerarquía de controles',
        contenido: 'La ley exige aplicar controles en este orden: 1) Eliminación (desenergizar), 2) Sustitución, 3) Controles de ingeniería (enclavamientos, distancias), 4) Administrativos (procedimientos, permisos), 5) EPP (último recurso). Nunca iniciar con EPP.',
      },
      {
        titulo: 'EPP Dieléctrico — Clases de tensión',
        contenido: 'Los guantes dieléctricos tienen clases por nivel de tensión: Clase 00 (500V), Clase 0 (1kV), Clase 1 (7.5kV), Clase 2 (17kV), Clase 3 (26.5kV), Clase 4 (36kV). Usar la clase incorrecta equivale a no usar EPP. Requieren prueba dieléctrica semestral.',
      },
      {
        titulo: 'Procedimiento LOTO',
        contenido: 'Lockout/Tagout: bloqueo y etiquetado de fuentes de energía antes de intervenir equipos. Es el control más efectivo contra contacto eléctrico. Cada trabajador pone su propio candado — nadie puede quitarlo sin autorización. Norma: OSHA 29 CFR 1910.147 / NTC 4120.',
      },
      {
        titulo: 'Arco Eléctrico (Arc Flash)',
        contenido: 'El riesgo más subestimado en ingeniería eléctrica. Genera temperatura >20,000°C en microsegundos. Requiere estudio de energía incidente (IEEE 1584) para determinar la categoría de EPP necesaria (careta y ropa FR por cal/cm²). Norma: NFPA 70E.',
      },
    ],
    pasos: [
      'Revisa la matriz de riesgos y verifica que estén documentados en tu IPER empresarial.',
      'En EPP Dieléctrico: verifica que los guantes sean de la clase correcta para la tensión de trabajo.',
      'En LOTO: asegúrate de tener el procedimiento escrito y que todos los trabajadores lo conozcan.',
      'En Marco Normativo: usa esta sección como referencia para construir la matriz legal del SG-SST.',
    ],
    normativa: ['RETIE — Res. 90708/2013', 'NFPA 70E 2024', 'NTC 2050', 'Resolución 4272/2021'],
  },

  '/documentos': {
    titulo: 'Gestión Documental SG-SST',
    descripcion: 'Registro de los documentos obligatorios según Decreto 1072/2015 y Resolución 0312/2019, con tiempos de conservación legales y control de vigencias.',
    secciones: [
      {
        titulo: '¿Por qué registrar los documentos aquí?',
        contenido: 'El Decreto 1072/2015 exige conservar la mayoría de documentos SST por mínimo 20 años. Durante una inspección del Ministerio del Trabajo o en caso de accidente, debes poder demostrar que los documentos existían y estaban vigentes. Este módulo sirve como inventario documental.',
      },
      {
        titulo: 'Campos: Vigente al / Responsable',
        contenido: '"Vigente al" = fecha hasta la cual el documento está actualizado (ej: el plan de trabajo 2026 vence el 31-dic-2026). "Responsable" = persona que elaboró o aprobó el documento. Ambos campos son para tu control interno — no se reportan al Ministerio.',
      },
      {
        titulo: 'Documentos eléctricos específicos',
        contenido: 'Además de los documentos SST generales, la categoría Eléctrico contiene los obligatorios por RETIE y NFPA 70E: procedimiento LOTO, estudio de arco eléctrico (cada 5 años), pruebas dieléctricas de EPP (semestral), medición de puesta a tierra (anual), permisos de trabajo eléctrico.',
      },
      {
        titulo: 'Borde rojo vs borde verde',
        contenido: 'Borde rojo = documento obligatorio sin fecha registrada (pendiente). Borde verde = documento con fecha de vigencia registrada. Borde gris = documento opcional sin registrar. El objetivo es que todos los documentos obligatorios tengan borde verde.',
      },
    ],
    pasos: [
      'Filtra por categoría para trabajar sección por sección.',
      'Para cada documento: ingresa la fecha hasta la que está vigente y el responsable.',
      'Prioriza los documentos con borde rojo — son obligatorios y no tienen fecha.',
      'Revisa los documentos eléctricos — son los más específicos y frecuentemente olvidados.',
      'Actualiza las fechas cuando renueves o actualices cada documento.',
    ],
    normativa: ['Decreto 1072/2015 Art. 2.2.4.6.12', 'RETIE Art. 7', 'NFPA 70E — Registro de pruebas'],
  },

  '/calendario': {
    titulo: 'Calendario de Obligaciones SST',
    descripcion: 'Cronograma anual de todas las actividades obligatorias del SG-SST según Decreto 1072/2015 y Resolución 0312/2019, con alertas para fechas críticas.',
    secciones: [
      {
        titulo: '⚠️ Fecha más crítica: 31 de octubre',
        contenido: 'Antes del 31 de octubre de cada año, la empresa DEBE enviar el resultado de la autoevaluación de estándares mínimos a la ARL. Es una obligación legal de la Resolución 0312/2019 Art. 28. Incumplimiento: multa de hasta 500 SMMLV. Sin excusas.',
      },
      {
        titulo: 'Colores por tipo de obligación',
        contenido: 'ROJO = Legal (incumplimiento genera sanción directa). AZUL = Gestión (administración del sistema). VERDE = Salud (medicina del trabajo). MORADO = COPASST. AMARILLO = Eléctrico (específico de ingeniería eléctrica). NARANJA = Emergencias.',
      },
      {
        titulo: 'Meses con borde rojo',
        contenido: 'Los meses con borde rojo en la grilla tienen al menos una obligación de tipo Legal — son los de mayor riesgo de sanción si se incumplen. Enero, agosto y octubre siempre tienen obligaciones críticas.',
      },
      {
        titulo: 'Marcar como completado',
        contenido: 'Al completar una actividad, haz clic en el círculo de la derecha. La obligación queda tachada y el contador del mes se actualiza. El estado se guarda en la base de datos.',
      },
    ],
    pasos: [
      'Al inicio del año: revisa todos los meses y asigna responsables para cada obligación.',
      'En octubre: prioridad máxima al reporte de autoevaluación a la ARL (31 oct).',
      'Cada mes: verifica las obligaciones del mes actual y márcalas al completarlas.',
      'Las obligaciones eléctricas (amarillo) son adicionales a las SST generales — no omitirlas.',
    ],
    normativa: ['Resolución 0312/2019 Art. 28', 'Decreto 1072/2015 — Plan anual', 'RETIE — Periodicidades de inspección'],
  },

  '/autoevaluacion': {
    titulo: 'Autoevaluación SG-SST',
    descripcion: 'Informe oficial de cumplimiento según la Resolución 0312/2019. Calcula el puntaje ponderado, determina la calificación y genera el plan de mejora automático.',
    secciones: [
      {
        titulo: '¿Qué es la autoevaluación?',
        contenido: 'Es el proceso de medición anual del SG-SST establecido en el Art. 28 de la Resolución 0312/2019. La empresa evalúa cada uno de los 60 estándares, asigna el puntaje correspondiente y reporta el resultado a la ARL antes del 31 de octubre.',
      },
      {
        titulo: 'Cómo se calcula el puntaje',
        contenido: 'Cada estándar tiene un peso porcentual. La suma de los estándares completados sobre el total posible da el porcentaje final (escala 0-100). No es simplemente contar estándares — un estándar de 4 puntos pesa 8 veces más que uno de 0.5 puntos.',
      },
      {
        titulo: 'Rangos de calificación',
        contenido: 'CRÍTICO (≤60%): plan de mejora inmediato, reporte a ARL en 8 días hábiles, seguimiento semestral. MODERADAMENTE ACEPTABLE (61-85%): plan de mejora en 3 meses, seguimiento anual. ACEPTABLE (>85%): mantener mejora continua, seguimiento anual.',
      },
      {
        titulo: 'Plan de mejora automático',
        contenido: 'La sección "Plan de Mejora Automático" lista todos los estándares pendientes agrupados por ciclo PHVA. Úsala para asignar responsables y fechas en tu plan de trabajo. Los marcados con ⚡ son prioritarios por el riesgo eléctrico.',
      },
      {
        titulo: 'Imprimir / exportar PDF',
        contenido: 'El botón "Imprimir / PDF" activa la impresión del navegador. Para exportar como PDF: en el diálogo de impresión, selecciona "Guardar como PDF" como destino. El informe incluye todos los datos de la empresa y el detalle por ciclo.',
      },
    ],
    pasos: [
      'Asegúrate de haber completado el Checklist con todos los estándares que aplican.',
      'Verifica que el perfil de la empresa esté correcto (nombre, responsable SST, ARL).',
      'Revisa el plan de mejora automático e identifica los estándares pendientes.',
      'Imprime o exporta el informe como PDF para enviarlo a la ARL.',
      'Antes del 31 de octubre: enviar el resultado a la ARL sin excepción.',
    ],
    normativa: ['Resolución 0312/2019 Art. 28', 'Ley 1562/2012 Art. 13 (sanciones)'],
  },

  '/ayuda': {
    titulo: 'Centro de Ayuda',
    descripcion: 'Documentación completa de la aplicación SG-SST para Ingeniería Eléctrica.',
    secciones: [],
    pasos: [],
    normativa: [],
  },
};

// Tooltips inline por sección/elemento de cada página
export const TOOLTIPS = {
  // Dashboard
  semaforo: 'Porcentaje de cumplimiento del SG-SST según la Resolución 0312/2019. Rojo ≤60% (crítico), Amarillo 61-85% (moderado), Verde >85% (aceptable). Debe reportarse a la ARL antes del 31 de octubre.',
  radarPhva: 'Gráfica de araña que muestra el cumplimiento en cada fase PHVA. Un radar desequilibrado indica fases descuidadas. Idealmente todas las fases deben superar el 85%.',
  pieEstandares: 'Distribución de estándares completados vs pendientes de los 60 estándares mínimos de la Resolución 0312/2019.',
  pendientesElectrico: 'Estándares específicos de ingeniería eléctrica aún no completados. Son prioritarios porque corresponden al perfil de Clase Riesgo V de la empresa.',

  // Checklist
  puntajeEstandar: 'Peso porcentual de este estándar en el puntaje total (100 puntos). Completar estándares de mayor puntaje impacta más el resultado final.',
  evidenciasRequeridas: 'Documentos o registros que debes tener para considerar este estándar cumplido. Sin evidencia = incumplimiento ante una inspección.',
  filtroElectrico: 'Filtra solo los estándares con relevancia específica para ingeniería eléctrica (IPER con riesgo eléctrico, EPP dieléctrico, LOTO, emergencias eléctricas).',

  // Perfil
  claseRiesgo: 'La clase de riesgo determina cuántos estándares debe cumplir la empresa. Ingeniería eléctrica = Clase V = 60 estándares obligatorios sin importar el tamaño.',
  nivelResultante: 'Nivel calculado automáticamente según tus datos. Clase V o más de 50 trabajadores = siempre Nivel III (60 estándares).',

  // Documentos
  conservacion: 'Tiempo mínimo de conservación exigido por el Decreto 1072/2015. La mayoría de documentos SST deben conservarse 20 años. En caso de demanda o accidente, estos documentos son la principal defensa legal.',
  borderRojo: 'Documento obligatorio que aún no tiene fecha de vigencia registrada. Prioridad alta para completar.',

  // Autoevaluación
  calificacion: 'Calificación final según la Resolución 0312/2019: Crítico ≤60%, Moderadamente Aceptable 61-85%, Aceptable >85%. Esta calificación determina las acciones que debes tomar y reportar a la ARL.',
  planMejora: 'Lista automática de todos los estándares pendientes. Úsala como base para elaborar el plan de mejoramiento requerido por la normativa.',

  // PHVA
  fasePlanear: 'Define el marco del sistema: política, objetivos, identificación de peligros y planificación. Es la base sobre la que se construyen las demás fases.',
  faseHacer: 'Implementación real de todos los controles. Con 60 puntos es la fase de mayor peso — aquí se ejecutan las acciones de seguridad en campo.',
  faseVerificar: 'Medición y auditoría del sistema. Sin verificación no existe la mejora continua exigida por el Decreto 1072/2015.',
  faseActuar: 'Cierre del ciclo: tomar acciones correctivas y retroalimentar el próximo ciclo de planificación.',

  // Calendario
  oct31: 'Fecha límite obligatoria para reportar la autoevaluación a la ARL. Incumplimiento = multa de hasta 500 SMMLV según la Ley 1562/2012 Art. 13.',
  pruebasDielec: 'Los guantes dieléctricos y demás EPP de aislamiento deben someterse a prueba dieléctrica cada 6 meses en laboratorio certificado. Sin certificado de prueba = EPP no válido legalmente.',
};

// Contenido del modal de bienvenida (4 pasos)
export const WELCOME_STEPS = [
  {
    titulo: 'Bienvenido al SG-SST',
    subtitulo: 'Sistema de Gestión de Seguridad y Salud en el Trabajo',
    contenido: 'Esta aplicación te guía para cumplir el Decreto 1072 de 2015 y la Resolución 0312 de 2019 — las dos normas fundamentales del SG-SST en Colombia, específicamente adaptadas para empresas de ingeniería eléctrica (Clase Riesgo V).',
    icono: '⚡',
    color: 'bg-yellow-500',
  },
  {
    titulo: 'Paso 1: Configura tu empresa',
    subtitulo: 'Perfil → Clase de Riesgo → Nivel de estándares',
    contenido: 'Empieza en "Perfil Empresa". Selecciona Clase de Riesgo V (ingeniería eléctrica) — esto activa los 60 estándares obligatorios de la Resolución 0312/2019. El sistema calculará automáticamente qué aplica a tu empresa.',
    icono: '🏢',
    color: 'bg-blue-600',
    accion: { label: 'Ir a Perfil', ruta: '/perfil' },
  },
  {
    titulo: 'Paso 2: Completa el Checklist',
    subtitulo: '60 estándares — marca los que ya tienes documentados',
    contenido: 'En el Checklist encontrarás los 60 estándares mínimos. Para cada uno se muestran las evidencias requeridas. Márcalos solo cuando tengas el documento en mano. El puntaje se calcula automáticamente y alimenta la Autoevaluación.',
    icono: '✅',
    color: 'bg-emerald-600',
    accion: { label: 'Ir al Checklist', ruta: '/checklist' },
  },
  {
    titulo: 'Paso 3: Genera la Autoevaluación',
    subtitulo: 'Informe oficial para reportar a la ARL antes del 31 de octubre',
    contenido: 'La Autoevaluación calcula tu puntaje final, determina la calificación (Crítico / Moderado / Aceptable) y genera el plan de mejora automático. Este informe es el que debes enviar a la ARL. Úsalo también para gestionar Documentos y el Calendario de obligaciones.',
    icono: '📋',
    color: 'bg-purple-600',
    accion: { label: 'Ir a Autoevaluación', ruta: '/autoevaluacion' },
  },
];
