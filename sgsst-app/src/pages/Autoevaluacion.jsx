import { useApp } from '../context/AppContext';
import { getEstandaresPorNivel, calcularPuntaje, getCalificacion, CICLOS } from '../data/estandares';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ReTooltip, ResponsiveContainer, Cell } from 'recharts';
import { Printer, Trophy, RotateCcw, Zap } from '../components/icons';
import Tooltip from '../components/Tooltip';
import { TOOLTIPS } from '../data/helpContent';

export default function Autoevaluacion() {
  const { perfil, nivel, completados, resetProgreso } = useApp();
  const estandares = getEstandaresPorNivel(nivel);
  const { puntajeObtenido, puntajeTotal, porcentaje } = calcularPuntaje(estandares, completados);
  const cal = getCalificacion(porcentaje);

  const barData = Object.entries(CICLOS).map(([key, c]) => {
    const est = estandares.filter(e => e.ciclo === key);
    const { puntajeObtenido: po, puntajeTotal: pt, porcentaje: pct } = calcularPuntaje(est, completados);
    return { ciclo: c.nombre, obtenido: parseFloat(po.toFixed(1)), total: parseFloat(pt.toFixed(1)), pct: Math.round(pct), color: c.color };
  });

  const ahora = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });
  const completadosAplicables = completados.filter(id => estandares.find(e => String(e.id) === String(id))).length;
  const semaforo = porcentaje <= 60 ? '#EF4444' : porcentaje <= 85 ? '#F59E0B' : '#10B981';

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Autoevaluación SG-SST</h1>
          <p className="text-slate-500 text-sm mt-1">Resolución 0312/2019 Art. 28 — Informe generado: {ahora}</p>
        </div>
        <div className="no-print">
          <button onClick={() => window.print()} className="btn-secondary text-sm flex items-center gap-2">
            <Printer className="w-4 h-4" /> Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Encabezado del reporte */}
      <div className="card bg-slate-800 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Empresa',          value: perfil.nombre || 'No configurado' },
            { label: 'Clase de Riesgo',  value: `${perfil.claseRiesgo} (Eléctrico)` },
            { label: 'Responsable SST',  value: perfil.responsableSST || '—' },
            { label: 'ARL',              value: perfil.arl || '—' },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-slate-400 text-xs">{label}</p>
              <p className="font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resultado principal */}
      <div className={`card border-4 ${cal.border} ${cal.bg}`}>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div
            className="w-36 h-36 rounded-full flex flex-col items-center justify-center text-white shadow-xl shrink-0"
            style={{ background: semaforo }}
          >
            <span className="text-4xl font-black">{porcentaje.toFixed(0)}%</span>
            <span className="text-sm opacity-90">Cumplimiento</span>
          </div>
          <div className="flex-1">
            <h2 className={`text-2xl font-extrabold ${cal.color} flex items-center gap-2`}>
              {cal.label}
              <Tooltip content={TOOLTIPS.calificacion} position="bottom" />
            </h2>
            <p className="text-slate-600 mt-1">{cal.accion}</p>
            <div className="mt-3 grid grid-cols-3 gap-4">
              {[
                { value: puntajeObtenido.toFixed(1), label: 'Puntos obtenidos' },
                { value: puntajeTotal.toFixed(1),    label: 'Puntos totales'   },
                { value: `${completadosAplicables}/${estandares.length}`, label: 'Estándares' },
              ].map(({ value, label }) => (
                <div key={label} className="text-center bg-white rounded-lg p-3 shadow-sm">
                  <p className="text-2xl font-bold text-slate-800">{value}</p>
                  <p className="text-xs text-slate-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gráfica por ciclo */}
      <div className="card">
        <h2 className="font-semibold text-slate-700 mb-4">Puntaje por Ciclo PHVA</h2>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={barData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ciclo" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <ReTooltip formatter={(v, n) => [v, n === 'obtenido' ? 'Obtenido' : 'Total']} />
            <Bar dataKey="total"   fill="#E2E8F0" radius={[4,4,0,0]} name="total" />
            <Bar dataKey="obtenido" radius={[4,4,0,0]} name="obtenido">
              {barData.map((d, i) => <Cell key={i} fill={d.color} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-4 mt-3">
          {barData.map(d => (
            <div key={d.ciclo} className="flex items-center gap-1.5 text-xs">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
              <span className="text-slate-600">{d.ciclo}: <strong>{d.pct}%</strong> ({d.obtenido}/{d.total} pts)</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabla detallada */}
      <div className="card overflow-x-auto">
        <h2 className="font-semibold text-slate-700 mb-3">Detalle por Ciclo PHVA</h2>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-xs">
              <th className="text-left py-2 px-3">Ciclo</th>
              <th className="text-right py-2 px-3">Estándares</th>
              <th className="text-right py-2 px-3">Completados</th>
              <th className="text-right py-2 px-3">Puntaje</th>
              <th className="text-right py-2 px-3">%</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {barData.map(d => (
              <tr key={d.ciclo}>
                <td className="py-2 px-3 font-medium">
                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                    {d.ciclo}
                  </span>
                </td>
                <td className="py-2 px-3 text-right text-slate-600">
                  {estandares.filter(e => CICLOS[e.ciclo]?.nombre === d.ciclo).length}
                </td>
                <td className="py-2 px-3 text-right text-slate-600">
                  {estandares.filter(e => CICLOS[e.ciclo]?.nombre === d.ciclo && completados.includes(String(e.id))).length}
                </td>
                <td className="py-2 px-3 text-right font-mono">{d.obtenido}/{d.total}</td>
                <td className="py-2 px-3 text-right font-bold" style={{ color: d.color }}>{d.pct}%</td>
              </tr>
            ))}
            <tr className="bg-slate-50 font-semibold">
              <td className="py-2 px-3">TOTAL</td>
              <td className="py-2 px-3 text-right">{estandares.length}</td>
              <td className="py-2 px-3 text-right">{completadosAplicables}</td>
              <td className="py-2 px-3 text-right font-mono">{puntajeObtenido.toFixed(1)}/{puntajeTotal.toFixed(1)}</td>
              <td className="py-2 px-3 text-right font-bold text-blue-600">{porcentaje.toFixed(1)}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Plan de mejora */}
      <div className="card">
        <h2 className="font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
          Plan de Mejora Automático
          <Tooltip content={TOOLTIPS.planMejora} position="bottom" />
        </h2>
        <div className="space-y-2">
          {Object.entries(CICLOS).map(([key, c]) => {
            const pendientes = estandares.filter(e => e.ciclo === key && !completados.includes(String(e.id)));
            if (pendientes.length === 0) return null;
            return (
              <div key={key} className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="flex items-center gap-2 p-3" style={{ backgroundColor: c.color + '20' }}>
                  <span className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: c.color }}>{key}</span>
                  <span className="font-medium text-slate-700">{c.nombre} — {pendientes.length} estándares pendientes</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {pendientes.map(e => (
                    <div key={e.id} className="flex items-center gap-3 px-4 py-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" />
                      <span className="flex-1 text-slate-600">{e.titulo}</span>
                      <span className="text-slate-400 text-xs">{e.puntaje} pts</span>
                      {e.electrico && (
                        <span className="badge bg-yellow-100 text-yellow-700 text-xs flex items-center gap-0.5">
                          <Zap className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          {completadosAplicables === estandares.length && (
            <div className="text-center py-6 text-emerald-600">
              <Trophy className="w-12 h-12 mx-auto mb-2 text-emerald-400" />
              <p className="font-semibold">¡Todos los estándares completados!</p>
              <p className="text-sm text-slate-500 mt-1">Mantener plan de mejora continua.</p>
            </div>
          )}
        </div>
      </div>

      {/* Acciones según calificación */}
      <div className={`card border-2 ${cal.border} ${cal.bg}`}>
        <h2 className={`font-bold ${cal.color} mb-3`}>Acciones Requeridas — {cal.label}</h2>
        <div className="space-y-2">
          {porcentaje <= 60 && [
            '1. Elaborar plan de mejoramiento inmediato (dentro de los 8 días hábiles siguientes)',
            '2. Reportar el resultado de la autoevaluación a la ARL inmediatamente',
            '3. Enviar plan de mejora al Ministerio del Trabajo',
            '4. Recibir acompañamiento de la ARL para subsanar las deficiencias',
            '5. Seguimiento semestral hasta alcanzar calificación aceptable',
          ].map((a, i) => <p key={i} className="text-sm text-slate-700 flex gap-2"><span className="text-red-500 shrink-0 font-bold">•</span>{a}</p>)}

          {porcentaje > 60 && porcentaje <= 85 && [
            '1. Elaborar plan de mejoramiento en los 3 meses siguientes',
            '2. Reportar el resultado de la autoevaluación a la ARL antes del 31 de octubre',
            '3. Seguimiento anual del plan de mejora',
            '4. Documentar avances en el plan de trabajo del siguiente año',
          ].map((a, i) => <p key={i} className="text-sm text-slate-700 flex gap-2"><span className="text-amber-500 shrink-0 font-bold">•</span>{a}</p>)}

          {porcentaje > 85 && [
            '1. Mantener el plan de mejora continua activo',
            '2. Enviar autoevaluación a la ARL antes del 31 de octubre',
            '3. Seguimiento anual con la alta dirección',
            '4. Identificar oportunidades de mejora aunque los estándares estén cumplidos',
          ].map((a, i) => <p key={i} className="text-sm text-slate-700 flex gap-2"><span className="text-emerald-500 shrink-0 font-bold">•</span>{a}</p>)}
        </div>
      </div>

      {/* Reset */}
      <div className="no-print">
        <button
          onClick={() => { if (confirm('¿Reiniciar todo el progreso? Esta acción no se puede deshacer.')) resetProgreso(); }}
          className="btn-secondary text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Reiniciar progreso
        </button>
      </div>
    </div>
  );
}
