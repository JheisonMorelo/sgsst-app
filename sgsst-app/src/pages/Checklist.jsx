import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getEstandaresPorNivel, calcularPuntaje, CICLOS } from '../data/estandares';
import {
  Zap, Check, ChevronUp, ChevronDown,
  FileText, PenLine, AlertCircle,
} from '../components/icons';
import Tooltip from '../components/Tooltip';
import { TOOLTIPS } from '../data/helpContent';

export default function Checklist() {
  const { nivel, completados, toggleEstandar, notas, updateNota } = useApp();
  const estandares = getEstandaresPorNivel(nivel);
  const [filtroCiclo, setFiltroCiclo] = useState('todos');
  const [filtroElectrico, setFiltroElectrico] = useState(false);
  const [filtroPendiente, setFiltroPendiente] = useState(false);
  const [expandido, setExpandido] = useState(null);
  const { porcentaje, puntajeObtenido, puntajeTotal } = calcularPuntaje(estandares, completados);

  const filtrados = estandares.filter(e => {
    if (filtroCiclo !== 'todos' && e.ciclo !== filtroCiclo) return false;
    if (filtroElectrico && !e.electrico) return false;
    if (filtroPendiente && completados.includes(String(e.id))) return false;
    return true;
  });

  const barColor = porcentaje <= 60 ? '#EF4444' : porcentaje <= 85 ? '#F59E0B' : '#10B981';

  return (
    <div className="p-6 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Checklist SG-SST</h1>
        <p className="text-slate-500 text-sm mt-1">
          {estandares.length} estándares · Nivel {nivel} · {puntajeObtenido.toFixed(1)}/{puntajeTotal.toFixed(1)} puntos
        </p>
      </div>

      {/* Barra de progreso */}
      <div className="card">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-slate-600">Progreso total</span>
          <span className="text-lg font-extrabold text-blue-600">{porcentaje.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-3">
          <div className="h-3 rounded-full transition-all" style={{ width: `${porcentaje}%`, backgroundColor: barColor }} />
        </div>
        <div className="flex gap-4 mt-3 flex-wrap">
          {Object.entries(CICLOS).map(([key, c]) => {
            const est = estandares.filter(e => e.ciclo === key);
            const { porcentaje: pct } = calcularPuntaje(est, completados);
            return (
              <div key={key} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-slate-600">{c.nombre}: <strong>{Math.round(pct)}%</strong></span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setFiltroCiclo('todos')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filtroCiclo === 'todos' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
        >Todos</button>
        {Object.entries(CICLOS).map(([key, c]) => (
          <button
            key={key}
            onClick={() => setFiltroCiclo(filtroCiclo === key ? 'todos' : key)}
            className="px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
            style={{
              backgroundColor: filtroCiclo === key ? c.color : undefined,
              color: filtroCiclo === key ? 'white' : undefined,
            }}
          >
            {key} — {c.nombre}
          </button>
        ))}
        <button
          onClick={() => setFiltroElectrico(v => !v)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${filtroElectrico ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'}`}
        >
          <Zap className="w-3.5 h-3.5" /> Solo eléctrico
          <Tooltip content={TOOLTIPS.filtroElectrico} position="bottom" />
        </button>
        <button
          onClick={() => setFiltroPendiente(v => !v)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-1.5 ${filtroPendiente ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200'}`}
        >
          <AlertCircle className="w-3.5 h-3.5" /> Solo pendientes
        </button>
        <span className="ml-auto text-sm text-slate-500">{filtrados.length} estándares</span>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {filtrados.map(e => {
          const completado = completados.includes(String(e.id));
          const ciclo  = CICLOS[e.ciclo];
          const abierto = expandido === e.id;

          return (
            <div
              key={e.id}
              className={`rounded-xl border-2 transition-all ${completado ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white hover:border-slate-300'}`}
            >
              <div className="flex items-center gap-3 p-3">
                <button
                  onClick={() => toggleEstandar(e.id)}
                  className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${completado ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-emerald-400'}`}
                >
                  {completado && <Check className="w-3.5 h-3.5" />}
                </button>

                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: ciclo.color }}
                >{e.ciclo}</span>

                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-tight ${completado ? 'line-through text-slate-400' : 'text-slate-700'}`}>
                    {e.titulo}
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">{e.grupo}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {e.electrico && (
                    <span className="badge bg-yellow-100 text-yellow-700 flex items-center gap-0.5">
                      <Zap className="w-3 h-3" />
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-0.5">
                    {e.puntaje}pts
                    <Tooltip content={TOOLTIPS.puntajeEstandar} position="left" />
                  </span>
                  <button
                    onClick={() => setExpandido(abierto ? null : e.id)}
                    className="text-slate-400 hover:text-slate-600 p-1"
                  >
                    {abierto ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {abierto && (
                <div className="border-t border-slate-100 p-4 space-y-3">
                  <p className="text-sm text-slate-600">{e.descripcion}</p>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> EVIDENCIAS REQUERIDAS
                      <Tooltip content={TOOLTIPS.evidenciasRequeridas} position="right" />
                    </p>
                    <ul className="space-y-1">
                      {e.evidencias.map((ev, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                          <span className="text-blue-500 mt-0.5">•</span> {ev}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                      <PenLine className="w-3.5 h-3.5" /> NOTAS INTERNAS
                    </p>
                    <textarea
                      value={notas[e.id] || ''}
                      onChange={ev => updateNota(e.id, ev.target.value)}
                      placeholder="Agregar nota, responsable o fecha de cumplimiento..."
                      className="w-full text-xs border border-slate-200 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-400 resize-none"
                      rows={2}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
