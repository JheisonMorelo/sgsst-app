import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getEstandaresPorNivel, calcularPuntaje, getCalificacion, CICLOS } from '../data/estandares';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip as ReTooltip } from 'recharts';
import { Zap, ScrollText, ClipboardList, ArrowRight } from '../components/icons';
import Tooltip from '../components/Tooltip';
import { TOOLTIPS } from '../data/helpContent';

export default function Dashboard() {
  const { perfil, nivel, completados } = useApp();
  const estandares = getEstandaresPorNivel(nivel);
  const { puntajeObtenido, puntajeTotal, porcentaje } = calcularPuntaje(estandares, completados);
  const cal = getCalificacion(porcentaje);

  const statsCiclo = Object.entries(CICLOS).map(([key, ciclo]) => {
    const est = estandares.filter(e => e.ciclo === key);
    const comp = est.filter(e => completados.includes(String(e.id)));
    const { porcentaje: pct } = calcularPuntaje(est, completados);
    return { ciclo: key, nombre: ciclo.nombre, color: ciclo.color, total: est.length, completados: comp.length, pct };
  });

  const radarData = statsCiclo.map(s => ({ ciclo: s.nombre, valor: Math.round(s.pct) }));
  const totalEstandares = estandares.length;
  const completadosAplicables = completados.filter(id => estandares.find(e => String(e.id) === String(id))).length;

  const pieData = [
    { name: 'Completados', value: completadosAplicables },
    { name: 'Pendientes',  value: totalEstandares - completadosAplicables },
  ];
  const PIE_COLORS = ['#10B981', '#E2E8F0'];

  const pendientesElectrico = estandares.filter(e => e.electrico && !completados.includes(String(e.id))).slice(0, 4);

  const semaforo = porcentaje <= 60 ? '#EF4444' : porcentaje <= 85 ? '#F59E0B' : '#10B981';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            {perfil.configurado ? perfil.nombre || 'Mi Empresa' : 'SG-SST — Ingeniería Eléctrica'}
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Decreto 1072/2015 · Resolución 0312/2019 · Clase de Riesgo: <strong>{perfil.claseRiesgo}</strong> · Nivel: <strong>{nivel}</strong>
          </p>
        </div>
        {!perfil.configurado && (
          <Link to="/perfil" className="btn-primary text-sm flex items-center gap-1.5">
            Configurar empresa <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Semáforo principal */}
      <div className={`card border-2 ${cal.border} ${cal.bg}`}>

        <div className="flex flex-col md:flex-row items-center gap-6">
          <div
            className="w-28 h-28 rounded-full flex flex-col items-center justify-center text-white shadow-lg shrink-0"
            style={{ backgroundColor: semaforo }}
          >
            <span className="text-3xl font-extrabold">{porcentaje.toFixed(0)}%</span>
            <span className="text-xs mt-1 opacity-90">Cumplimiento</span>
          </div>
          <div className="flex-1">
            <p className={`text-xl font-bold ${cal.color}`}>{cal.label}</p>
            <p className="text-slate-600 text-sm mt-1">{cal.accion}</p>
            <div className="mt-3 flex gap-4 text-sm">
              <span className="font-semibold text-slate-700">{completadosAplicables} / {totalEstandares} estándares</span>
              <span className="text-slate-500">{puntajeObtenido.toFixed(1)} / {puntajeTotal.toFixed(1)} puntos</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/checklist" className="btn-primary text-sm">Ver checklist</Link>
            <Link to="/autoevaluacion" className="btn-secondary text-sm">Autoevaluación</Link>
          </div>
        </div>
      </div>

      {/* Cards por ciclo PHVA */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statsCiclo.map(s => (
          <div key={s.ciclo} className="card text-center">
            <div
              className="w-12 h-12 rounded-full mx-auto flex items-center justify-center text-white font-bold text-lg mb-3"
              style={{ backgroundColor: s.color }}
            >
              {s.ciclo}
            </div>
            <p className="font-semibold text-slate-700">{s.nombre}</p>
            <p className="text-3xl font-extrabold mt-1" style={{ color: s.color }}>{Math.round(s.pct)}%</p>
            <p className="text-xs text-slate-500 mt-1">{s.completados}/{s.total} estándares</p>
            <div className="mt-2 w-full bg-slate-100 rounded-full h-1.5">
              <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-1.5">
            Radar PHVA <Tooltip content={TOOLTIPS.radarPhva} position="bottom" />
          </h2>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="ciclo" tick={{ fontSize: 12 }} />
              <Radar name="Cumplimiento" dataKey="valor" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.25} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <h2 className="font-semibold text-slate-700 mb-4 flex items-center gap-1.5">
            Estado de Estándares <Tooltip content={TOOLTIPS.pieEstandares} position="bottom" />
          </h2>
          <div className="flex items-center justify-center gap-8">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <ReTooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span className="text-sm text-slate-600">Completados: <strong>{completadosAplicables}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-200 inline-block" />
                <span className="text-sm text-slate-600">Pendientes: <strong>{totalEstandares - completadosAplicables}</strong></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pendientes eléctricos */}
      {pendientesElectrico.length > 0 && (
        <div className="card border-l-4 border-yellow-400">
          <h2 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            Estándares Eléctricos Pendientes
            <Tooltip content={TOOLTIPS.pendientesElectrico} position="bottom" />
          </h2>
          <div className="space-y-2">
            {pendientesElectrico.map(e => (
              <div key={e.id} className="flex items-center justify-between bg-yellow-50 rounded-lg p-3">
                <div>
                  <p className="text-sm font-medium text-slate-700">{e.titulo}</p>
                  <p className="text-xs text-slate-500">{e.grupo} · Ciclo {e.ciclo} · {e.puntaje} pts</p>
                </div>
                <Link to="/checklist" className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                  Ver <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Marco normativo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-blue-50 border-blue-200">
          <h3 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
            <ScrollText className="w-4 h-4" /> Decreto 1072 de 2015
          </h3>
          <p className="text-sm text-blue-700">Decreto Único Reglamentario del Sector Trabajo. Define la estructura, obligaciones y ciclo PHVA del SG-SST. Aplica a <strong>todos</strong> los empleadores colombianos.</p>
          <p className="text-xs text-blue-500 mt-2">Ministerio del Trabajo · 26 mayo 2015</p>
        </div>
        <div className="card bg-emerald-50 border-emerald-200">
          <h3 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
            <ClipboardList className="w-4 h-4" /> Resolución 0312 de 2019
          </h3>
          <p className="text-sm text-emerald-700">Establece los <strong>60 estándares mínimos</strong> verificables del SG-SST. Ingeniería eléctrica (Riesgo V) debe cumplir la totalidad.</p>
          <p className="text-xs text-emerald-500 mt-2">Ministerio del Trabajo · 13 febrero 2019</p>
        </div>
      </div>
    </div>
  );
}
