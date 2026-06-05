import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ScrollText, Archive, Check, Zap, BookOpen } from '../components/icons';
import Tooltip from '../components/Tooltip';
import { TOOLTIPS } from '../data/helpContent';

const DOCUMENTOS_REQUERIDOS = [
  { id: 'd1',  categoria: 'Política y Objetivos', titulo: 'Política de SST firmada y publicada',                                     norma: 'Decreto 1072 Art. 2.2.4.6.3',  conservacion: 'Mientras esté vigente',               obligatorio: true  },
  { id: 'd2',  categoria: 'Política y Objetivos', titulo: 'Objetivos del SG-SST con indicadores',                                    norma: 'Decreto 1072 Art. 2.2.4.6.9',  conservacion: 'Mientras esté vigente',               obligatorio: true  },
  { id: 'd3',  categoria: 'Planificación',         titulo: 'Evaluación inicial del SG-SST',                                          norma: 'Decreto 1072 Art. 2.2.4.6.16', conservacion: 'Actualización anual',                 obligatorio: true  },
  { id: 'd4',  categoria: 'Planificación',         titulo: 'Plan de trabajo anual SG-SST',                                           norma: 'Decreto 1072 Art. 2.2.4.6.17', conservacion: 'Actualización anual',                 obligatorio: true  },
  { id: 'd5',  categoria: 'Planificación',         titulo: 'Matriz IPER - GTC 45',                                                   norma: 'Decreto 1072 Art. 2.2.4.6.8',  conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd6',  categoria: 'Planificación',         titulo: 'Matriz de requisitos legales actualizada',                               norma: 'Decreto 1072 / Res. 0312',      conservacion: 'Actualización semestral',             obligatorio: true  },
  { id: 'd7',  categoria: 'COPASST',               titulo: 'Acta de conformación del COPASST',                                       norma: 'Decreto 1072 Art. 2.2.4.6.8',  conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd8',  categoria: 'COPASST',               titulo: 'Actas de reuniones mensuales COPASST',                                   norma: 'Decreto 1072',                  conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd9',  categoria: 'Capacitación',          titulo: 'Programa de capacitación anual en SST',                                  norma: 'Res. 0312 Estándar 5',          conservacion: 'Actualización anual',                 obligatorio: true  },
  { id: 'd10', categoria: 'Capacitación',          titulo: 'Registros de inducción y reinducción',                                   norma: 'Decreto 1072',                  conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd11', categoria: 'Salud Ocupacional',     titulo: 'Diagnóstico de condiciones de salud (perfil sociodemográfico)',          norma: 'Res. 0312 Estándar 19',         conservacion: 'Anual',                               obligatorio: true  },
  { id: 'd12', categoria: 'Salud Ocupacional',     titulo: 'Registros de exámenes médicos ocupacionales',                           norma: 'Decreto 1072 Art. 2.2.4.6.4',  conservacion: '20 años post-retiro',                 obligatorio: true  },
  { id: 'd13', categoria: 'Salud Ocupacional',     titulo: 'Programa de vigilancia epidemiológica',                                  norma: 'Decreto 1072',                  conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd14', categoria: 'Emergencias',           titulo: 'Plan de prevención y respuesta a emergencias',                           norma: 'Res. 0312 Estándar 37',         conservacion: 'Actualización anual',                 obligatorio: true  },
  { id: 'd15', categoria: 'Emergencias',           titulo: 'Registros de simulacros de emergencia',                                  norma: 'Decreto 1072',                  conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd16', categoria: 'Accidentalidad',        titulo: 'Registros de accidentes e incidentes de trabajo',                       norma: 'Decreto 1072 Art. 2.2.4.6.32', conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd17', categoria: 'Accidentalidad',        titulo: 'Informes de investigación de AT/EL',                                    norma: 'Decreto 1072 Art. 2.2.4.6.32', conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd18', categoria: 'Auditoría',             titulo: 'Informe de auditoría interna anual',                                    norma: 'Res. 0312 Estándar 40',         conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd19', categoria: 'Auditoría',             titulo: 'Acta de revisión por la alta dirección',                                norma: 'Res. 0312 Estándar 41',         conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'd20', categoria: 'Auditoría',             titulo: 'Plan de mejora con seguimiento (CAPA)',                                  norma: 'Res. 0312 Estándar 43',         conservacion: 'Mínimo 20 años',                      obligatorio: true  },
  { id: 'de1', categoria: 'Eléctrico',             titulo: 'Procedimiento LOTO documentado',                                        norma: 'RETIE / NFPA 70E / OSHA 1910.147', conservacion: 'Vigente + 5 años versiones anteriores', obligatorio: true  },
  { id: 'de2', categoria: 'Eléctrico',             titulo: 'Estudio de arco eléctrico (IEEE 1584)',                                 norma: 'NFPA 70E 2024',                 conservacion: 'Actualización cada 5 años o tras cambio',obligatorio: true  },
  { id: 'de3', categoria: 'Eléctrico',             titulo: 'Registros de pruebas dieléctricas de EPP',                             norma: 'ASTM D120',                     conservacion: 'Semestral + historial',               obligatorio: true  },
  { id: 'de4', categoria: 'Eléctrico',             titulo: 'Informe de termografía infrarroja instalaciones',                       norma: 'RETIE',                         conservacion: 'Anual + historial',                   obligatorio: false },
  { id: 'de5', categoria: 'Eléctrico',             titulo: 'Certificado de resistencia de puesta a tierra (<5Ω)',                  norma: 'RETIE Art. 15 / NTC 2050 Art. 250', conservacion: 'Anual + historial',               obligatorio: true  },
  { id: 'de6', categoria: 'Eléctrico',             titulo: 'Registro de medición de resistencia de aislamiento (megger)',          norma: 'RETIE',                         conservacion: 'Semestral + historial',               obligatorio: false },
  { id: 'de7', categoria: 'Eléctrico',             titulo: 'Permisos de trabajo eléctrico diligenciados',                          norma: 'RETIE / Decreto 1072',          conservacion: 'Mínimo 5 años',                       obligatorio: true  },
  { id: 'de8', categoria: 'Eléctrico',             titulo: 'Inventario de EPP dieléctrico con hojas de vida',                      norma: 'ASTM D120 / NFPA 70E',          conservacion: 'Vigente',                             obligatorio: true  },
  // ─── Resolución 5018 de 2019 ────────────────────────────────────────────────
  { id: 'r5001', categoria: 'Res. 5018',            titulo: 'Procedimiento de Las Cinco Reglas de Oro (trabajo sin tensión)',        norma: 'Res. 5018/2019 Art. 5',         conservacion: 'Vigente + versiones anteriores',      obligatorio: true  },
  { id: 'r5002', categoria: 'Res. 5018',            titulo: 'Permiso de trabajo con tensión (TCT) — formato diligenciado',          norma: 'Res. 5018/2019 Art. 6–8',       conservacion: 'Mínimo 5 años',                       obligatorio: true  },
  { id: 'r5003', categoria: 'Res. 5018',            titulo: 'Registro de habilitación del personal eléctrico (TCT)',                norma: 'Res. 5018/2019 Art. 33',        conservacion: 'Vigente + 5 años tras retiro',        obligatorio: true  },
  { id: 'r5004', categoria: 'Res. 5018',            titulo: 'Plan de trabajo eléctrico (diagnóstico, planificación, programación)', norma: 'Res. 5018/2019 Art. 10',        conservacion: 'Mínimo 5 años',                       obligatorio: true  },
  { id: 'r5005', categoria: 'Res. 5018',            titulo: 'Registro de charlas preoperacionales (ejecución)',                    norma: 'Res. 5018/2019 Art. 10',        conservacion: 'Mínimo 5 años',                       obligatorio: true  },
  { id: 'r5006', categoria: 'Res. 5018',            titulo: 'Matriz de distancias mínimas de seguridad por nivel de tensión',      norma: 'Res. 5018/2019 Art. 11',        conservacion: 'Vigente',                             obligatorio: true  },
  { id: 'r5007', categoria: 'Res. 5018',            titulo: 'Procedimientos de operación y mantenimiento de subestaciones',        norma: 'Res. 5018/2019 Art. 13',        conservacion: 'Vigente + versiones anteriores',      obligatorio: true  },
  { id: 'r5008', categoria: 'Res. 5018',            titulo: 'Diagrama unifilar actualizado de cada subestación/instalación',       norma: 'Res. 5018/2019 Art. 13',        conservacion: 'Vigente (actualización tras cambios)', obligatorio: true  },
  { id: 'r5009', categoria: 'Res. 5018',            titulo: 'Protocolo de transferencia de responsabilidad operativa (turnos)',    norma: 'Res. 5018/2019 Art. 13',        conservacion: 'Mínimo 5 años',                       obligatorio: true  },
  { id: 'r5010', categoria: 'Res. 5018',            titulo: 'Registro de inspección EPP dieléctrico (antes y después de uso)',     norma: 'Res. 5018/2019 Art. 32',        conservacion: 'Mínimo 2 años',                       obligatorio: true  },
  { id: 'r5011', categoria: 'Res. 5018',            titulo: 'Análisis de arco eléctrico (Arc Flash Study) — IEEE 1584',           norma: 'Res. 5018/2019 Art. 32 / NFPA 70E', conservacion: 'Actualización cada 5 años o tras cambio', obligatorio: true },
  { id: 'r5012', categoria: 'Res. 5018',            titulo: 'Programa de capacitación en SST impartido por licenciado SST',       norma: 'Res. 5018/2019 Art. 1 Pár. 1', conservacion: 'Anual + historial',                   obligatorio: true  },
];

const CATEGORIAS = [...new Set(DOCUMENTOS_REQUERIDOS.map(d => d.categoria))];

export default function Documentos() {
  const { documentos, updateDocumento } = useApp();
  const [categoriaActiva, setCategoriaActiva] = useState('todas');

  const filtrados = categoriaActiva === 'todas'
    ? DOCUMENTOS_REQUERIDOS
    : DOCUMENTOS_REQUERIDOS.filter(d => d.categoria === categoriaActiva);

  const totalObligatorios = DOCUMENTOS_REQUERIDOS.filter(d => d.obligatorio).length;
  const conFecha = DOCUMENTOS_REQUERIDOS.filter(d => documentos[d.id]?.fecha).length;
  const porcentaje = Math.round((conFecha / totalObligatorios) * 100);

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Gestión Documental SG-SST</h1>
        <p className="text-slate-500 text-sm mt-1">Documentos requeridos por Decreto 1072/2015 y Resolución 0312/2019</p>
      </div>

      <div className="card">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-slate-600">Documentos registrados</span>
          <span className="font-bold text-blue-600">{conFecha}/{totalObligatorios}</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2">
          <div className="h-2 rounded-full bg-blue-500 transition-all" style={{ width: `${porcentaje}%` }} />
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoriaActiva('todas')}
          className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${categoriaActiva === 'todas' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >Todas</button>
        {CATEGORIAS.map(c => (
          <button
            key={c}
            onClick={() => setCategoriaActiva(c)}
            className={`px-3 py-1.5 rounded-lg text-sm transition-colors flex items-center gap-1.5 ${
              categoriaActiva === c
                ? c === 'Eléctrico'   ? 'bg-yellow-500 text-white'
                : c === 'Res. 5018'  ? 'bg-orange-500 text-white'
                : 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {c === 'Eléctrico'  && <Zap      className="w-3.5 h-3.5" />}
            {c === 'Res. 5018' && <BookOpen  className="w-3.5 h-3.5" />}
            {c}
          </button>
        ))}
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {filtrados.map(doc => {
          const data = documentos[doc.id] || {};
          const tieneFecha = !!data.fecha;
          return (
            <div key={doc.id} className={`card border-l-4 ${tieneFecha ? 'border-emerald-400' : doc.obligatorio ? 'border-red-300' : 'border-slate-200'}`}>
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className={`badge text-xs flex items-center gap-1 ${
                      doc.categoria === 'Eléctrico'  ? 'bg-yellow-100 text-yellow-700' :
                      doc.categoria === 'Res. 5018' ? 'bg-orange-100 text-orange-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {doc.categoria === 'Eléctrico'  && <Zap      className="w-3 h-3" />}
                      {doc.categoria === 'Res. 5018' && <BookOpen  className="w-3 h-3" />}
                      {doc.categoria}
                    </span>
                    {doc.obligatorio && <span className="badge bg-red-100 text-red-600 text-xs">Obligatorio</span>}
                    {tieneFecha && (
                      <span className="badge bg-emerald-100 text-emerald-600 text-xs flex items-center gap-1">
                        <Check className="w-3 h-3" /> Registrado
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-slate-700">{doc.titulo}</p>
                  <div className="flex gap-3 mt-1 flex-wrap">
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <ScrollText className="w-3 h-3" /> {doc.norma}
                    </p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <Archive className="w-3 h-3" /> {doc.conservacion}
                      <Tooltip content={TOOLTIPS.conservacion} position="top" />
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-1 shrink-0 md:w-72">
                  <div className="flex gap-2 items-center">
                    <label className="text-xs text-slate-500 w-20 shrink-0">Vigente al:</label>
                    <input
                      type="date"
                      value={data.fecha || ''}
                      onChange={e => updateDocumento(doc.id, { fecha: e.target.value })}
                      className="flex-1 text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                  <div className="flex gap-2 items-center">
                    <label className="text-xs text-slate-500 w-20 shrink-0">Responsable:</label>
                    <input
                      type="text"
                      value={data.responsable || ''}
                      onChange={e => updateDocumento(doc.id, { responsable: e.target.value })}
                      placeholder="Nombre"
                      className="flex-1 text-xs border border-slate-200 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
