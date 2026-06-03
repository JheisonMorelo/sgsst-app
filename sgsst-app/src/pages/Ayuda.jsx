import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HELP_PAGES } from '../data/helpContent';
import { Search, ChevronRight, BookOpen, ExternalLink, Zap } from '../components/icons';

const MODULOS = [
  { ruta: '/',               icono: '📊', color: 'blue'   },
  { ruta: '/perfil',         icono: '🏢', color: 'indigo' },
  { ruta: '/phva',           icono: '🔄', color: 'violet' },
  { ruta: '/checklist',      icono: '✅', color: 'emerald' },
  { ruta: '/electrico',      icono: '⚡', color: 'yellow' },
  { ruta: '/documentos',     icono: '📁', color: 'orange' },
  { ruta: '/calendario',     icono: '📅', color: 'red'    },
  { ruta: '/autoevaluacion', icono: '📋', color: 'purple' },
];

const COLOR_MAP = {
  blue:   { bg: 'bg-blue-50',   border: 'border-blue-200',   text: 'text-blue-700',   badge: 'bg-blue-100 text-blue-700'   },
  indigo: { bg: 'bg-indigo-50', border: 'border-indigo-200', text: 'text-indigo-700', badge: 'bg-indigo-100 text-indigo-700' },
  violet: { bg: 'bg-violet-50', border: 'border-violet-200', text: 'text-violet-700', badge: 'bg-violet-100 text-violet-700' },
  emerald:{ bg: 'bg-emerald-50',border: 'border-emerald-200',text: 'text-emerald-700',badge: 'bg-emerald-100 text-emerald-700'},
  yellow: { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-yellow-700', badge: 'bg-yellow-100 text-yellow-700' },
  orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
  red:    { bg: 'bg-red-50',    border: 'border-red-200',    text: 'text-red-700',    badge: 'bg-red-100 text-red-700'     },
  purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
};

export default function Ayuda() {
  const [busqueda, setBusqueda] = useState('');
  const [moduloActivo, setModuloActivo] = useState(null);

  const modulos = MODULOS.map(m => ({ ...m, help: HELP_PAGES[m.ruta] }));

  const resultados = busqueda.trim().length < 2 ? [] : modulos.flatMap(m => {
    const q = busqueda.toLowerCase();
    const matches = [];

    if (m.help.titulo.toLowerCase().includes(q) || m.help.descripcion.toLowerCase().includes(q)) {
      matches.push({ tipo: 'modulo', ruta: m.ruta, icono: m.icono, color: m.color, titulo: m.help.titulo, texto: m.help.descripcion });
    }
    m.help.secciones?.forEach(s => {
      if (s.titulo.toLowerCase().includes(q) || s.contenido.toLowerCase().includes(q)) {
        matches.push({ tipo: 'seccion', ruta: m.ruta, icono: m.icono, color: m.color, titulo: s.titulo, texto: s.contenido, modulo: m.help.titulo });
      }
    });
    m.help.pasos?.forEach((p, i) => {
      if (p.toLowerCase().includes(q)) {
        matches.push({ tipo: 'paso', ruta: m.ruta, icono: m.icono, color: m.color, titulo: `Paso ${i + 1}`, texto: p, modulo: m.help.titulo });
      }
    });
    return matches;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-blue-600" /> Centro de Ayuda
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Documentación completa de la aplicación SG-SST para Ingeniería Eléctrica
          </p>
        </div>
        <button onClick={() => window.print()} className="btn-secondary text-sm no-print">
          🖨️ Imprimir
        </button>
      </div>

      {/* Buscador */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar en la documentación... (ej: LOTO, autoevaluación, EPP)"
          className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {busqueda && (
          <button onClick={() => setBusqueda('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs">
            ✕
          </button>
        )}
      </div>

      {/* Resultados de búsqueda */}
      {busqueda.trim().length >= 2 && (
        <div className="space-y-2">
          <p className="text-xs text-slate-500 font-medium">{resultados.length} resultado{resultados.length !== 1 ? 's' : ''} para "{busqueda}"</p>
          {resultados.length === 0 ? (
            <div className="card text-center py-6 text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm">Sin resultados. Intenta con otro término.</p>
            </div>
          ) : (
            resultados.slice(0, 12).map((r, i) => {
              const col = COLOR_MAP[r.color] || COLOR_MAP.blue;
              return (
                <Link
                  key={i}
                  to={r.ruta}
                  onClick={() => setBusqueda('')}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${col.border} ${col.bg} hover:shadow-sm transition-shadow`}
                >
                  <span className="text-xl shrink-0">{r.icono}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      {r.modulo && <span className={`text-xs px-2 py-0.5 rounded-full ${col.badge}`}>{r.modulo}</span>}
                      <span className={`text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-500`}>{r.tipo}</span>
                    </div>
                    <p className={`text-sm font-medium ${col.text}`}>{r.titulo}</p>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{r.texto}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 shrink-0 mt-1" />
                </Link>
              );
            })
          )}
        </div>
      )}

      {/* Grid de módulos */}
      {!busqueda && (
        <>
          {/* Inicio rápido */}
          <div className="card bg-gradient-to-r from-slate-800 to-slate-700 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-500 flex items-center justify-center shrink-0">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">Flujo de trabajo recomendado</h2>
                <p className="text-slate-300 text-sm mt-1 mb-3">Sigue estos 5 pasos para implementar el SG-SST correctamente:</p>
                <ol className="space-y-1">
                  {[
                    '① Configura el perfil de la empresa (Clase Riesgo V)',
                    '② Estudia el Ciclo PHVA — base del Decreto 1072/2015',
                    '③ Completa el Checklist con evidencias documentales reales',
                    '④ Registra los documentos en Gestión Documental',
                    '⑤ Genera y envía la Autoevaluación a la ARL (antes del 31 oct)',
                  ].map((p, i) => (
                    <li key={i} className="text-sm text-slate-300 flex gap-2">{p}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Cards de módulos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {modulos.filter(m => m.ruta !== '/ayuda').map(m => {
              const col = COLOR_MAP[m.color] || COLOR_MAP.blue;
              const isOpen = moduloActivo === m.ruta;
              return (
                <div key={m.ruta} className={`rounded-xl border-2 ${col.border} overflow-hidden`}>
                  {/* Header del módulo */}
                  <button
                    onClick={() => setModuloActivo(isOpen ? null : m.ruta)}
                    className={`w-full flex items-center gap-3 p-4 text-left transition-colors ${col.bg} hover:brightness-95`}
                  >
                    <span className="text-2xl">{m.icono}</span>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${col.text}`}>{m.help.titulo}</p>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{m.help.descripcion}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={m.ruta}
                        onClick={e => e.stopPropagation()}
                        className={`text-xs ${col.badge} px-2 py-0.5 rounded-full flex items-center gap-1 hover:opacity-80`}
                      >
                        Ir <ExternalLink className="w-3 h-3" />
                      </Link>
                      <ChevronRight className={`w-4 h-4 ${col.text} transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                    </div>
                  </button>

                  {/* Detalle expandido */}
                  {isOpen && (
                    <div className="border-t-2 border-slate-100 bg-white">
                      {/* Pasos */}
                      {m.help.pasos?.length > 0 && (
                        <div className="p-4 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cómo usar</p>
                          <ol className="space-y-1.5">
                            {m.help.pasos.map((p, i) => (
                              <li key={i} className="flex gap-2 text-sm text-slate-600">
                                <span className={`shrink-0 w-5 h-5 rounded-full ${col.badge} text-xs font-bold flex items-center justify-center`}>{i + 1}</span>
                                {p}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Secciones acordeón */}
                      {m.help.secciones?.length > 0 && (
                        <div className="p-4 border-b border-slate-100">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Conceptos</p>
                          <div className="space-y-1.5">
                            {m.help.secciones.map((s, i) => (
                              <details key={i} className="group rounded-lg border border-slate-200">
                                <summary className="flex items-center justify-between p-2.5 cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-50 list-none">
                                  {s.titulo}
                                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                                </summary>
                                <div className="px-3 pb-3 pt-2 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50">
                                  {s.contenido}
                                </div>
                              </details>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Normativa */}
                      {m.help.normativa?.length > 0 && (
                        <div className="p-4">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Normativa</p>
                          <div className="flex flex-wrap gap-1.5">
                            {m.help.normativa.map((n, i) => (
                              <span key={i} className={`text-xs px-2 py-0.5 rounded-full border ${col.border} ${col.text} bg-white`}>{n}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sección normativa rápida */}
          <div className="card">
            <h2 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Marco normativo del SG-SST
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { norma: 'Decreto 1072 de 2015', desc: 'Decreto Único Reglamentario del Sector Trabajo. Define estructura, obligaciones y ciclo PHVA del SG-SST. Aplica a todos los empleadores colombianos.', color: 'blue' },
                { norma: 'Resolución 0312 de 2019', desc: '60 estándares mínimos verificables. Riesgo V = todos los estándares. Autoevaluación anual obligatoria antes del 31 de octubre.', color: 'emerald' },
                { norma: 'RETIE — Res. 90708/2013', desc: 'Reglamento Técnico de Instalaciones Eléctricas. Requisitos de seguridad específicos para instalaciones y trabajo eléctrico en Colombia.', color: 'yellow' },
                { norma: 'NFPA 70E 2024', desc: 'Estándar internacional de seguridad eléctrica. Arco eléctrico, categorías de EPP, distancias de acercamiento y procedimientos de trabajo seguro.', color: 'red' },
                { norma: 'NTC 2050', desc: 'Código Eléctrico Colombiano. Equivalent del NEC americano. Instalaciones en edificaciones, puesta a tierra, protecciones.', color: 'orange' },
                { norma: 'Resolución 4272 de 2021', desc: 'Reglamento trabajo en alturas en Colombia. Obligatoria para trabajo en postes, torres, cubiertas con instalaciones eléctricas.', color: 'purple' },
              ].map(n => {
                const col = COLOR_MAP[n.color] || COLOR_MAP.blue;
                return (
                  <div key={n.norma} className={`rounded-lg border ${col.border} ${col.bg} p-3`}>
                    <p className={`font-semibold text-sm ${col.text}`}>{n.norma}</p>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Preguntas frecuentes */}
          <div className="card">
            <h2 className="font-bold text-slate-800 mb-4">Preguntas frecuentes</h2>
            <div className="space-y-2">
              {[
                { p: '¿Con qué frecuencia debo hacer la autoevaluación?', r: 'Una vez al año, y debes reportar el resultado a tu ARL antes del 31 de octubre. Es obligatorio según el Art. 28 de la Resolución 0312/2019.' },
                { p: '¿Qué pasa si obtengo calificación crítica (≤60%)?', r: 'Debes elaborar un plan de mejoramiento inmediato, reportarlo a la ARL en 8 días hábiles, y hacer seguimiento semestral. Si no lo haces, el Ministerio del Trabajo puede multar hasta 500 SMMLV.' },
                { p: '¿Por qué ingeniería eléctrica es siempre Clase Riesgo V?', r: 'Por la exposición permanente a energía eléctrica de alta tensión, riesgo de arco eléctrico y trabajo en alturas. El Decreto 1295/1994 clasifica estas actividades en la clase de mayor riesgo.' },
                { p: '¿Puedo usar esta app para empresas con menos de 10 trabajadores?', r: 'Sí. Si la empresa es de ingeniería eléctrica (Clase Riesgo V), siempre aplican los 60 estándares sin importar el número de trabajadores. Configura el perfil con Clase V.' },
                { p: '¿Qué es el COPASST y cuándo es obligatorio?', r: 'Comité Paritario de Seguridad y Salud en el Trabajo. Obligatorio en empresas con 10 o más trabajadores. En empresas con menos de 10, se nombra un Vigía de SST (1 persona). Período: 2 años.' },
                { p: '¿Cada cuánto se deben hacer los exámenes médicos?', r: 'El médico ocupacional define la periodicidad según los peligros del cargo. Para ingeniería eléctrica: generalmente anual para cargos expuestos a alta tensión, con enfoque en sistema nervioso y cardiovascular.' },
              ].map((faq, i) => (
                <details key={i} className="group rounded-lg border border-slate-200">
                  <summary className="flex items-center justify-between p-3 cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-50 list-none">
                    {faq.p}
                    <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0 ml-2" />
                  </summary>
                  <div className="px-4 pb-3 pt-2 text-sm text-slate-600 border-t border-slate-100 bg-slate-50 leading-relaxed">
                    {faq.r}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
