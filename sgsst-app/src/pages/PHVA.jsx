import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CICLOS, getEstandaresPorNivel, calcularPuntaje } from '../data/estandares';
import { MapPin, HelpCircle, Search, CheckCircle2, Circle } from '../components/icons';

const CICLO_CONTENT = {
  P: {
    descripcion: 'Definir la política, los objetivos, identificar peligros, evaluar riesgos y planificar actividades del SG-SST.',
    actividades: [
      'Definir y documentar la política de SST firmada por el representante legal',
      'Establecer objetivos medibles del SG-SST con indicadores',
      'Realizar la evaluación inicial del sistema',
      'Elaborar el plan de trabajo anual con responsables y recursos',
      'Construir la matriz de identificación de peligros y evaluación de riesgos (IPER - GTC 45)',
      'Actualizar la matriz de requisitos legales (Decreto 1072, Resolución 0312, RETIE)',
      'Asignar el responsable del SG-SST con licencia SST vigente',
      'Conformar y registrar el COPASST ante el Ministerio del Trabajo',
      'Definir el presupuesto anual de SST aprobado por la gerencia',
    ],
    preguntasGerencia: [
      '¿Tenemos política SST firmada, publicada y conocida por todos los trabajadores?',
      '¿El responsable SST tiene curso de 50 horas y licencia vigente?',
      '¿El COPASST está activo con reuniones mensuales documentadas?',
      '¿Existe plan de trabajo anual aprobado con presupuesto?',
    ],
  },
  H: {
    descripcion: 'Implementar los controles, capacitar al personal, gestionar la salud de los trabajadores y preparar respuesta ante emergencias.',
    actividades: [
      'Implementar controles según jerarquía: eliminación → sustitución → ingeniería → administrativos → EPP',
      'Ejecutar programa de capacitación en SST (inducción, reinducción, específicas por riesgo)',
      'Aplicar procedimiento LOTO antes de cualquier intervención en instalaciones eléctricas',
      'Realizar exámenes médicos de ingreso, periódicos y de egreso',
      'Dotar de EPP certificado (guantes dieléctricos, careta de arco, ropa FR, casco Clase E)',
      'Ejecutar programa de mantenimiento preventivo de instalaciones y equipos eléctricos',
      'Mantener activa la brigada de emergencias con capacitación en primeros auxilios por electrocución',
      'Realizar inspecciones sistemáticas: tableros, transformadores, puestas a tierra, herramientas',
      'Gestionar residuos peligrosos (aceite dieléctrico, luminarias con mercurio)',
    ],
    preguntasGerencia: [
      '¿Todos los trabajadores eléctricos tienen EPP dieléctrico certificado y vigente?',
      '¿Existe procedimiento LOTO documentado y aplicado?',
      '¿Los exámenes médicos periódicos están al día según el perfil de riesgo?',
      '¿La brigada de emergencias está conformada, capacitada y dotada?',
    ],
  },
  V: {
    descripcion: 'Medir el desempeño del SG-SST, realizar auditorías y revisar los resultados con la alta dirección.',
    actividades: [
      'Calcular indicadores de estructura, proceso y resultado del SG-SST mensualmente',
      'Investigar todos los accidentes e incidentes de trabajo dentro de los 15 días calendario',
      'Realizar auditoría interna anual del SG-SST con informe y plan de mejora',
      'Presentar informe semestral de indicadores a la gerencia y al COPASST',
      'Revisar el SG-SST anualmente con la alta dirección (acta firmada por gerente)',
      'Reportar a la ARL la autoevaluación de estándares antes del 31 de octubre',
      'Comparar indicadores con las metas establecidas en el plan de trabajo',
    ],
    preguntasGerencia: [
      '¿Se calculan y revisan los indicadores de SST mensualmente?',
      '¿Se investigaron y cerraron todos los accidentes del año?',
      '¿La auditoría interna anual se realizó y tiene plan de mejora?',
      '¿La revisión por la alta dirección está documentada este año?',
    ],
  },
  A: {
    descripcion: 'Implementar acciones correctivas y preventivas, mejorar continuamente el sistema con base en los resultados.',
    actividades: [
      'Implementar acciones correctivas para cada no conformidad identificada en auditorías',
      'Cerrar efectivamente las causas raíz de los accidentes e incidentes investigados',
      'Actualizar procedimientos y controles basándose en lecciones aprendidas',
      'Reportar mejoras implementadas a la ARL y al Ministerio del Trabajo si es requerido',
      'Actualizar el plan de trabajo para el siguiente período con base en los resultados',
      'Documentar y difundir lecciones aprendidas de accidentes o cuasi-accidentes',
    ],
    preguntasGerencia: [
      '¿Las acciones correctivas de la auditoría anterior están cerradas?',
      '¿Las causas raíz de accidentes se eliminaron (no solo los síntomas)?',
      '¿El plan de mejora fue aprobado y tiene recursos asignados?',
    ],
  },
};

const FASE_COLORS = {
  P: 'bg-blue-600',
  H: 'bg-emerald-600',
  V: 'bg-amber-500',
  A: 'bg-red-500',
};

export default function PHVA() {
  const [activo, setActivo] = useState(null);
  const { nivel, completados } = useApp();
  const estandares = getEstandaresPorNivel(nivel);

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Ciclo PHVA — SG-SST</h1>
        <p className="text-slate-500 text-sm mt-1">
          Fundamento metodológico del Decreto 1072/2015. Haz clic en cada fase para explorarla.
        </p>
      </div>

      {/* Rueda PHVA */}
      <div className="card">
        <div className="flex flex-col items-center">
          <div className="relative w-56 h-56 sm:w-72 sm:h-72">
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-slate-800 flex flex-col items-center justify-center text-white text-center shadow-lg">
                <span className="text-[10px] sm:text-xs font-bold">SG-SST</span>
                <span className="text-[10px] sm:text-xs opacity-70">Mejora</span>
                <span className="text-[10px] sm:text-xs opacity-70">Continua</span>
              </div>
            </div>
            {Object.entries(CICLOS).map(([key, ciclo], idx) => {
              const est = estandares.filter(e => e.ciclo === key);
              const { porcentaje } = calcularPuntaje(est, completados);
              const positions = ['top-0 left-0','top-0 right-0','bottom-0 right-0','bottom-0 left-0'];
              const radii    = ['rounded-tl-full','rounded-tr-full','rounded-br-full','rounded-bl-full'];
              const isActive = activo === key;
              return (
                <button
                  key={key}
                  onClick={() => setActivo(activo === key ? null : key)}
                  className={`absolute w-24 h-24 sm:w-32 sm:h-32 flex flex-col items-center justify-center transition-all ${positions[idx]} ${radii[idx]} ${isActive ? 'scale-105 shadow-lg z-20' : 'hover:opacity-100'}`}
                  style={{ backgroundColor: ciclo.color, opacity: isActive ? 1 : 0.85 }}
                >
                  <span className="text-white text-xl sm:text-2xl font-extrabold">{key}</span>
                  <span className="text-white text-[10px] sm:text-xs font-medium opacity-90">{ciclo.nombre}</span>
                  <span className="text-white text-[10px] sm:text-xs opacity-80">{Math.round(porcentaje)}%</span>
                </button>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {Object.entries(CICLOS).map(([key, c]) => {
              const est = estandares.filter(e => e.ciclo === key);
              const { porcentaje } = calcularPuntaje(est, completados);
              return (
                <button key={key} onClick={() => setActivo(activo === key ? null : key)} className="flex items-center gap-2 text-sm">
                  <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: c.color }} />
                  <span className={`font-medium ${activo === key ? 'text-slate-900' : 'text-slate-600'}`}>
                    {key} — {c.nombre} ({Math.round(porcentaje)}%)
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detalle ciclo activo */}
      {activo && (() => {
        const ciclo   = CICLOS[activo];
        const content = CICLO_CONTENT[activo];
        const est     = estandares.filter(e => e.ciclo === activo);
        const { porcentaje } = calcularPuntaje(est, completados);
        return (
          <div className="card border-l-4" style={{ borderLeftColor: ciclo.color }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: ciclo.color }}>
                {activo}
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">{ciclo.nombre}</h2>
                <p className="text-sm text-slate-500">{ciclo.descripcion}</p>
              </div>
              <span className="ml-auto text-2xl font-extrabold" style={{ color: ciclo.color }}>{Math.round(porcentaje)}%</span>
            </div>
            <p className="text-slate-600 text-sm mb-4">{content.descripcion}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-slate-500" /> Actividades clave
                </h3>
                <ul className="space-y-2">
                  {content.actividades.map((a, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold" style={{ backgroundColor: ciclo.color }}>{i + 1}</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <HelpCircle className="w-4 h-4 text-slate-500" /> Preguntas para la gerencia
                </h3>
                <ul className="space-y-2">
                  {content.preguntasGerencia.map((p, i) => (
                    <li key={i} className="flex gap-2 text-sm text-slate-600 bg-slate-50 rounded-lg p-2">
                      <Search className="w-3.5 h-3.5 shrink-0 mt-0.5 text-slate-400" /> {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-4">
                  <h3 className="font-semibold text-slate-700 mb-2">Estándares en este ciclo</h3>
                  <div className="space-y-1 max-h-48 overflow-y-auto">
                    {est.map(e => (
                      <div key={e.id} className={`flex items-center gap-2 text-xs p-2 rounded ${completados.includes(String(e.id)) ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-50 text-slate-600'}`}>
                        {completados.includes(String(e.id))
                          ? <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-emerald-500" />
                          : <Circle className="w-3.5 h-3.5 shrink-0 text-slate-300" />
                        }
                        <span className="flex-1">{e.titulo}</span>
                        <span className="font-semibold">{e.puntaje}pts</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Tabla normativa */}
      <div className="card overflow-x-auto">
        <h2 className="font-semibold text-slate-700 mb-3">Base normativa del Ciclo PHVA</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-2 pr-4 text-slate-600">Fase</th>
              <th className="text-left py-2 pr-4 text-slate-600">Decreto 1072/2015</th>
              <th className="text-left py-2 text-slate-600">Resolución 0312/2019</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {[
              { key: 'P', color: '#3B82F6', fase: 'Planear',   dec: 'Arts. 2.2.4.6.3 – 2.2.4.6.11 (política, objetivos, planificación)', res: 'Estándares 1–18 (recursos, capacitación, política, plan anual)' },
              { key: 'H', color: '#10B981', fase: 'Hacer',     dec: 'Arts. 2.2.4.6.12 – 2.2.4.6.20 (implementación de controles)',       res: 'Estándares 19–38 (salud, peligros, emergencias)' },
              { key: 'V', color: '#F59E0B', fase: 'Verificar', dec: 'Arts. 2.2.4.6.21 – 2.2.4.6.31 (auditoría, indicadores, revisión)',   res: 'Estándares 39–42 (indicadores, auditoría, revisión gerencial)' },
              { key: 'A', color: '#EF4444', fase: 'Actuar',    dec: 'Arts. 2.2.4.6.32 – 2.2.4.6.37 (mejora continua, CAPA)',             res: 'Estándares 43–45 (acciones correctivas, mejora continua)' },
            ].map(r => (
              <tr key={r.key}>
                <td className="py-2 pr-4 font-medium">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: r.color }} />
                    {r.fase}
                  </span>
                </td>
                <td className="py-2 pr-4 text-slate-600">{r.dec}</td>
                <td className="py-2 text-slate-600">{r.res}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
