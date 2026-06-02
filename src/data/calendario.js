export const OBLIGACIONES_ANUALES = [
  // Enero
  { mes: 1, dia: 31, titulo: 'Autoevaluación SG-SST año anterior', tipo: 'Legal', descripcion: 'Completar y documentar la autoevaluación de estándares mínimos del año que terminó.', norma: 'Resolución 0312/2019 Art. 28' },
  { mes: 1, dia: 15, titulo: 'Planificación anual SG-SST', tipo: 'Gestión', descripcion: 'Definir plan de trabajo anual, cronograma de capacitaciones y presupuesto SST.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.11' },

  // Febrero
  { mes: 2, dia: 28, titulo: 'Exámenes médicos periódicos Q1', tipo: 'Salud', descripcion: 'Inicio del ciclo de exámenes médicos periódicos programados para el año.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.4' },

  // Marzo
  { mes: 3, dia: 31, titulo: 'Reunión COPASST — Seguimiento T1', tipo: 'COPASST', descripcion: 'Reunión mensual obligatoria. Revisión de AT/EL, inspecciones e indicadores del primer trimestre.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.8' },
  { mes: 3, dia: 15, titulo: 'Inspección EPP dieléctrico', tipo: 'Eléctrico', descripcion: 'Prueba dieléctrica semestral de guantes y herramientas aisladas. Verificar vigencia de certificaciones.', norma: 'ASTM D120 / RETIE' },

  // Abril
  { mes: 4, dia: 30, titulo: 'Inspección termográfica instalaciones', tipo: 'Eléctrico', descripcion: 'Termografía de tableros eléctricos, conexiones y transformadores para detectar puntos calientes.', norma: 'RETIE / NFPA 70E' },
  { mes: 4, dia: 15, titulo: 'Capacitación SST Q2', tipo: 'Capacitación', descripcion: 'Capacitación trimestral en SST. Tema sugerido: trabajo seguro en instalaciones eléctricas y RETIE.', norma: 'Resolución 0312/2019 Estándar 5' },

  // Mayo
  { mes: 5, dia: 31, titulo: 'Actualización matriz de peligros (IPER)', tipo: 'Gestión', descripcion: 'Revisar y actualizar la matriz IPER si hubo cambios en procesos, equipos o personal.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.8' },

  // Junio
  { mes: 6, dia: 30, titulo: 'Simulacro de emergencia semestral', tipo: 'Emergencias', descripcion: 'Simulacro que incluya emergencia eléctrica (electrocución o incendio eléctrico). Evaluar y documentar.', norma: 'Resolución 0312/2019 Estándar 37' },
  { mes: 6, dia: 15, titulo: 'Prueba dieléctrica EPP (2° ciclo)', tipo: 'Eléctrico', descripcion: 'Segunda prueba semestral de guantes dieléctricos y equipos de protección eléctrica.', norma: 'ASTM D120' },
  { mes: 6, dia: 30, titulo: 'Revisión semestral brigada de emergencias', tipo: 'Emergencias', descripcion: 'Verificar vigencia de capacitaciones de brigadistas, dotación y equipos de emergencia.', norma: 'Resolución 0312/2019 Estándar 38' },

  // Julio
  { mes: 7, dia: 31, titulo: 'Informe semestral de indicadores SST', tipo: 'Gestión', descripcion: 'Calcular y documentar indicadores: tasa de accidentalidad, ausentismo, frecuencia y severidad.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.20' },
  { mes: 7, dia: 15, titulo: 'Capacitación arco eléctrico y LOTO', tipo: 'Eléctrico', descripcion: 'Capacitación específica en procedimiento LOTO y riesgo de arco eléctrico para personal técnico.', norma: 'NFPA 70E / RETIE' },

  // Agosto
  { mes: 8, dia: 31, titulo: 'Auditoría interna SG-SST', tipo: 'Legal', descripcion: 'Realizar auditoría interna anual del SG-SST con informe y plan de mejora.', norma: 'Resolución 0312/2019 Art. 29 / Decreto 1072 Art. 2.2.4.6.29' },

  // Septiembre
  { mes: 9, dia: 30, titulo: 'Capacitación trabajo en alturas', tipo: 'Capacitación', descripcion: 'Actualización de competencias para trabajadores certificados en trabajo en alturas (Resolución 4272/2021).', norma: 'Resolución 4272 de 2021' },
  { mes: 9, dia: 15, titulo: 'Inspección sistema puesta a tierra', tipo: 'Eléctrico', descripcion: 'Medición de resistencia de puesta a tierra de las instalaciones. Debe ser < 5 Ω según RETIE.', norma: 'RETIE Art. 15 / NTC 2050' },

  // Octubre
  { mes: 10, dia: 31, titulo: 'Reporte autoevaluación a ARL', tipo: 'Legal', descripcion: 'Enviar a la ARL el resultado de la autoevaluación de estándares mínimos antes del 31 de octubre.', norma: 'Resolución 0312/2019 Art. 28 — OBLIGATORIO' },
  { mes: 10, dia: 15, titulo: 'Revisión por alta dirección', tipo: 'Gestión', descripcion: 'Reunión gerencial para revisar resultados del SG-SST, aprobar mejoras y recursos para el año siguiente.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.31' },

  // Noviembre
  { mes: 11, dia: 30, titulo: 'Exámenes médicos periódicos Q4', tipo: 'Salud', descripcion: 'Cierre del ciclo de exámenes médicos anuales. Consolidar resultados.', norma: 'Decreto 1072/2015' },
  { mes: 11, dia: 15, titulo: 'Elecciones COPASST (si vence período)', tipo: 'COPASST', descripcion: 'Verificar si el período del COPASST vence este año. De ser así, convocar y realizar elecciones.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.8' },

  // Diciembre
  { mes: 12, dia: 15, titulo: 'Evaluación plan de trabajo anual', tipo: 'Gestión', descripcion: 'Evaluar el cumplimiento del plan de trabajo SST del año, documentar lecciones aprendidas.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.17' },
  { mes: 12, dia: 31, titulo: 'Rendición de cuentas SG-SST', tipo: 'Legal', descripcion: 'Rendición de cuentas anual del SG-SST ante todos los niveles de la organización.', norma: 'Decreto 1072/2015 Art. 2.2.4.6.6' },
];

export const MESES = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

export const TIPO_COLORES = {
  Legal:      { bg: 'bg-red-100',    text: 'text-red-700',    border: 'border-red-300'    },
  Gestión:    { bg: 'bg-blue-100',   text: 'text-blue-700',   border: 'border-blue-300'   },
  Salud:      { bg: 'bg-emerald-100',text: 'text-emerald-700',border: 'border-emerald-300'},
  COPASST:    { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-300' },
  Eléctrico:  { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' },
  Capacitación:{ bg: 'bg-sky-100',   text: 'text-sky-700',    border: 'border-sky-300'    },
  Emergencias:{ bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-300' },
};
