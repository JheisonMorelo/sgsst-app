import { useState } from 'react';
import { RIESGOS_ELECTRICOS, EPP_ELECTRICO, PROCEDIMIENTO_LOTO } from '../data/riesgosElectricos';
import {
  AlertTriangle, ShieldCheck, Lock, ScrollText,
  ChevronUp, ChevronDown, Shield, Ban, Search,
  ClipboardList, Zap, PlugZap, Flame, ArrowUpToLine, Radio, Hand, HardHat, Shirt,
} from '../components/icons';

// Mapa de nombre-string → componente Lucide para íconos de riesgos y EPP
const RISK_ICON_MAP = {
  Zap, PlugZap, Flame, ArrowUpToLine, Radio,
  Hand, HardHat, Shirt, Shield, ShieldCheck,
};

function RiskIcon({ name, className = 'w-6 h-6' }) {
  const Comp = RISK_ICON_MAP[name];
  return Comp ? <Comp className={className} /> : null;
}

const NIVEL_COLORS = {
  Crítico: { bg: 'bg-red-100',    border: 'border-red-400',    text: 'text-red-700',    badge: 'bg-red-500'    },
  Alto:    { bg: 'bg-orange-100', border: 'border-orange-400', text: 'text-orange-700', badge: 'bg-orange-500' },
  Medio:   { bg: 'bg-yellow-100', border: 'border-yellow-400', text: 'text-yellow-700', badge: 'bg-yellow-500' },
};

const TIPO_CONTROL_COLOR = {
  'Eliminación':   'bg-emerald-100 text-emerald-700',
  'Ingeniería':    'bg-blue-100 text-blue-700',
  'Administrativo':'bg-purple-100 text-purple-700',
  'EPP':           'bg-orange-100 text-orange-700',
  'EPP/Respuesta': 'bg-orange-100 text-orange-700',
};

const TABS = [
  { key: 'riesgos', label: 'Matriz de Riesgos',   Icon: AlertTriangle },
  { key: 'epp',     label: 'EPP Dieléctrico',      Icon: ShieldCheck   },
  { key: 'loto',    label: 'Procedimiento LOTO',   Icon: Lock          },
  { key: 'retie',   label: 'Marco Normativo',      Icon: ScrollText    },
];

export default function RiesgosElectricos() {
  const [riesgoActivo, setRiesgoActivo] = useState(null);
  const [tab, setTab] = useState('riesgos');

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Riesgos Eléctricos</h1>
        <p className="text-slate-500 text-sm mt-1">
          Identificación, controles y EPP específico para ingeniería eléctrica · Clase Riesgo V
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-slate-200 overflow-x-auto scrollbar-none">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors whitespace-nowrap shrink-0 ${
              tab === key ? 'border-blue-500 text-blue-600' : 'border-transparent text-slate-500 hover:text-slate-700'
            }`}
          >
            <Icon className="w-4 h-4" /> <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{key === 'riesgos' ? 'Riesgos' : key === 'epp' ? 'EPP' : key === 'loto' ? 'LOTO' : 'Normas'}</span>
          </button>
        ))}
      </div>

      {/* Riesgos */}
      {tab === 'riesgos' && (
        <div className="space-y-3">
          {RIESGOS_ELECTRICOS.map(r => {
            const col    = NIVEL_COLORS[r.nivel] || NIVEL_COLORS.Medio;
            const abierto = riesgoActivo === r.id;
            return (
              <div key={r.id} className={`rounded-xl border-2 ${col.border} transition-all`}>
                <button
                  className="w-full flex items-center gap-4 p-4 text-left"
                  onClick={() => setRiesgoActivo(abierto ? null : r.id)}
                >
                  <div className={`w-12 h-12 rounded-xl ${col.bg} flex items-center justify-center shrink-0`}>
                    <RiskIcon name={r.icono} className={`w-6 h-6 ${col.text}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-slate-800">{r.nombre}</span>
                      <span className={`badge text-white text-xs ${col.badge}`}>{r.nivel}</span>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-1">{r.descripcion}</p>
                  </div>
                  <div className="text-right shrink-0 flex flex-col items-end gap-1">
                    <p className="text-xs text-slate-400">Inspección: {r.periodicidadInspeccion}</p>
                    {abierto ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </div>
                </button>

                {abierto && (
                  <div className={`border-t-2 ${col.border} ${col.bg} p-4 rounded-b-xl space-y-4`}>
                    <p className="text-sm text-slate-700">{r.descripcion}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4 text-red-500" /> Causas principales
                        </h3>
                        <ul className="space-y-1">
                          {r.causas.map((c, i) => (
                            <li key={i} className="flex gap-2 text-sm text-slate-600">
                              <span className="text-red-500 shrink-0">•</span> {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                          <Shield className="w-4 h-4 text-blue-500" /> Controles (jerarquía)
                        </h3>
                        <div className="space-y-1.5">
                          {r.controles.map((c, i) => (
                            <div key={i} className="flex gap-2 items-start">
                              <span className={`badge text-xs shrink-0 ${TIPO_CONTROL_COLOR[c.tipo] || 'bg-slate-100 text-slate-600'}`}>{c.tipo}</span>
                              <span className="text-sm text-slate-600">{c.descripcion}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                        <ClipboardList className="w-4 h-4 text-slate-500" /> Normativa aplicable
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {r.normativa.map((n, i) => (
                          <span key={i} className="badge bg-slate-100 text-slate-600 text-xs">{n}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* EPP */}
      {tab === 'epp' && (
        <div className="space-y-4">
          <div className="card bg-yellow-50 border-yellow-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
            <p className="text-sm text-yellow-800 font-medium">
              El EPP dieléctrico debe estar certificado por laboratorio acreditado. Verificar fecha de prueba dieléctrica antes de cada uso.
            </p>
          </div>
          {EPP_ELECTRICO.map(epp => (
            <div key={epp.nombre} className="card space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                  <RiskIcon name={epp.icono} className="w-6 h-6 text-slate-600" />
                </div>
                <div>
                  <h2 className="font-bold text-slate-800">{epp.nombre}</h2>
                  <p className="text-xs text-slate-500">Norma: <strong>{epp.norma}</strong></p>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-slate-50">
                      <th className="text-left py-2 px-3 text-slate-600 font-medium">Clase</th>
                      <th className="text-left py-2 px-3 text-slate-600 font-medium">
                        {epp.clases[0].tension ? 'Tensión máxima' : 'Energía incidente'}
                      </th>
                      <th className="text-left py-2 px-3 text-slate-600 font-medium">Uso / Color</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {epp.clases.map((c, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-semibold text-blue-700">{c.clase}</td>
                        <td className="py-2 px-3 text-slate-700">{c.tension || c.energia}</td>
                        <td className="py-2 px-3 text-slate-600">{c.color || c.uso}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
                <Search className="w-4 h-4 text-blue-500 shrink-0" />
                <p className="text-xs text-blue-700"><strong>Inspección:</strong> {epp.inspeccion}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LOTO */}
      {tab === 'loto' && (
        <div className="space-y-4">
          <div className="card">
            <h2 className="font-bold text-slate-800 text-lg mb-1">{PROCEDIMIENTO_LOTO.nombre}</h2>
            <p className="text-sm text-slate-600 mb-2">{PROCEDIMIENTO_LOTO.descripcion}</p>
            <span className="badge bg-slate-100 text-slate-600 text-xs">{PROCEDIMIENTO_LOTO.normativa}</span>
          </div>
          <div className="relative">
            <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-blue-200 z-0" />
            <div className="space-y-3 relative z-10">
              {PROCEDIMIENTO_LOTO.pasos.map(paso => (
                <div key={paso.orden} className="flex gap-4">
                  <div className="shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
                    {paso.orden}
                  </div>
                  <div className="flex-1 card mt-1">
                    <h3 className="font-semibold text-slate-800">{paso.titulo}</h3>
                    <p className="text-sm text-slate-600 mt-1">{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card bg-red-50 border-red-200">
            <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
              <Ban className="w-4 h-4" /> NUNCA hacer sin LOTO:
            </h3>
            <ul className="space-y-1 text-sm text-red-700">
              <li>• Intervenir tableros eléctricos sin bloquear el interruptor principal</li>
              <li>• Cambiar fusibles con el circuito energizado</li>
              <li>• Trabajar en motores o maquinaria sin bloquear el arrancador</li>
              <li>• Confiar en que "alguien más" puso el candado — cada trabajador pone el suyo</li>
              <li>• Quitar un candado ajeno sin autorización del dueño</li>
            </ul>
          </div>
        </div>
      )}

      {/* Marco normativo */}
      {tab === 'retie' && (
        <div className="space-y-4">
          {[
            { norma: 'RETIE — Resolución 90708 de 2013',              color: 'blue',   descripcion: 'Reglamento Técnico de Instalaciones Eléctricas. Define requisitos técnicos y de seguridad para instalaciones en Colombia.',                     articulos: ['Art. 7: Seguridad en trabajo eléctrico','Art. 15: Sistemas de puesta a tierra','Art. 17: Protecciones contra incendio','Art. 50+: Marcado y señalización eléctrica'] },
            { norma: 'NTC 2050 — Código Eléctrico Colombiano',        color: 'emerald',descripcion: 'Equivalente al NEC americano. Regula instalaciones eléctricas en edificaciones.',                                                                   articulos: ['Art. 110: Condiciones de instalación','Art. 250: Puesta a tierra y unión','Art. 500+: Lugares clasificados (peligrosos)','Art. 700+: Sistemas de emergencia'] },
            { norma: 'NFPA 70E — Electrical Safety in the Workplace', color: 'red',    descripcion: 'Estándar internacional para seguridad eléctrica en el trabajo. Arco eléctrico, EPP y procedimientos.',                                             articulos: ['Art. 120: Condición eléctricamente segura','Art. 130: Trabajo cerca de partes eléctricas','Tabla 130.7: Categorías EPP para arco eléctrico','Anexo D: Cálculo de energía incidente'] },
            { norma: 'Resolución 4272 de 2021',                       color: 'purple', descripcion: 'Reglamento trabajo en alturas en Colombia. Reemplaza Resolución 1409 de 2012 en materia de capacitación.',                                          articulos: ['Art. 9: Obligaciones del empleador','Art. 12: Capacitación y certificación','Art. 20: Sistemas de protección contra caídas','Art. 35: Plan de rescate'] },
            { norma: 'Decreto 1072 de 2015 — Cap. 6',                 color: 'slate',  descripcion: 'Marco general del SG-SST. Obligaciones del empleador, trabajadores, COPASST y ciclo PHVA.',                                                        articulos: ['Art. 2.2.4.6.4: Obligaciones del empleador','Art. 2.2.4.6.5: Obligaciones del trabajador','Art. 2.2.4.6.8: Gestión de peligros y riesgos','Art. 2.2.4.6.16: Investigación AT/EL'] },
            { norma: 'Resolución 0312 de 2019',                       color: 'indigo', descripcion: 'Estándares mínimos del SG-SST. Ingeniería eléctrica = Riesgo V = 60 estándares obligatorios.',                                                     articulos: ['Art. 3: Estándares ≤10 trabajadores (7 est.)','Art. 16: Estándares 11–50 (21 est.)','Art. 27: Estándares >50 o riesgo IV/V (60 est.)','Art. 28: Autoevaluación anual — reporte ARL'] },
          ].map(item => (
            <div key={item.norma} className={`card border-l-4 border-${item.color}-500`}>
              <h2 className={`font-bold text-${item.color}-800 mb-1`}>{item.norma}</h2>
              <p className="text-sm text-slate-600 mb-3">{item.descripcion}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                {item.articulos.map((a, i) => (
                  <div key={i} className="flex gap-2 text-xs text-slate-600 bg-slate-50 rounded px-2 py-1">
                    <ClipboardList className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" /> {a}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
