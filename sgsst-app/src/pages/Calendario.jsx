import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { OBLIGACIONES_ANUALES, MESES, TIPO_COLORES } from '../data/calendario';
import { AlertOctagon, Check, ClipboardList } from '../components/icons';

export default function Calendario() {
  const { calendario, toggleCalendario } = useApp();
  const [mesActivo, setMesActivo] = useState(new Date().getMonth() + 1);

  const oblMes        = OBLIGACIONES_ANUALES.filter(o => o.mes === mesActivo);
  const totalMes      = oblMes.length;
  const completadasMes = oblMes.filter(o => calendario[`${o.mes}-${o.dia}-${o.titulo}`]).length;

  const resumenMeses = MESES.map((nombre, i) => {
    const mes  = i + 1;
    const obl  = OBLIGACIONES_ANUALES.filter(o => o.mes === mes);
    const comp = obl.filter(o => calendario[`${o.mes}-${o.dia}-${o.titulo}`]).length;
    return {
      mes, nombre,
      total: obl.length, comp,
      tieneObligaciones:        obl.length > 0,
      tieneObligatoriasLegales: obl.some(o => o.tipo === 'Legal'),
    };
  });

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-5">
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-slate-800">Calendario de Obligaciones SST</h1>
        <p className="text-slate-500 text-sm mt-1">Obligaciones anuales según Decreto 1072/2015 y Resolución 0312/2019</p>
      </div>

      {/* Alerta octubre */}
      <div className="card bg-red-50 border-red-300 border-2">
        <div className="flex items-start gap-3">
          <AlertOctagon className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-red-800">31 de Octubre — Reporte obligatorio a la ARL</p>
            <p className="text-sm text-red-700">Antes del 31 de octubre de cada año debe enviarse el resultado de la autoevaluación de estándares mínimos a la ARL. Incumplimiento = multa.</p>
            <p className="text-xs text-red-500 mt-1">Resolución 0312/2019 Art. 28</p>
          </div>
        </div>
      </div>

      {/* Grid de meses */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {resumenMeses.map(({ mes, nombre, total, comp, tieneObligaciones, tieneObligatoriasLegales }) => (
          <button
            key={mes}
            onClick={() => setMesActivo(mes)}
            className={`rounded-xl p-3 text-center transition-all border-2 ${
              mesActivo === mes             ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : tieneObligatoriasLegales   ? 'border-red-300 bg-red-50 hover:bg-red-100'
              : tieneObligaciones          ? 'border-slate-200 bg-white hover:bg-slate-50'
              : 'border-slate-100 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <p className={`text-xs font-bold ${mesActivo === mes ? 'text-white' : 'text-slate-700'}`}>{nombre}</p>
            {tieneObligaciones ? (
              <div className="mt-1.5 flex justify-center gap-1 flex-wrap">
                {total - comp > 0 && (
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${mesActivo === mes ? 'bg-white text-blue-600' : 'bg-slate-200 text-slate-600'}`}>
                    {total - comp} pend.
                  </span>
                )}
                {comp > 0 && (
                  <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${mesActivo === mes ? 'bg-emerald-400 text-white' : 'bg-emerald-100 text-emerald-700'}`}>
                    {comp} ✓
                  </span>
                )}
              </div>
            ) : (
              <p className={`text-xs mt-1 ${mesActivo === mes ? 'text-blue-200' : 'text-slate-400'}`}>—</p>
            )}
          </button>
        ))}
      </div>

      {/* Obligaciones del mes */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-slate-800 text-lg">{MESES[mesActivo - 1]}</h2>
          {totalMes > 0 && (
            <span className="text-sm text-slate-500">{completadasMes}/{totalMes} completadas</span>
          )}
        </div>

        {oblMes.length === 0 ? (
          <div className="card text-center py-8 text-slate-400">
            <Check className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p>Sin obligaciones programadas para este mes</p>
          </div>
        ) : (
          <div className="space-y-3">
            {[...oblMes].sort((a, b) => a.dia - b.dia).map(obl => {
              const key   = `${obl.mes}-${obl.dia}-${obl.titulo}`;
              const hecho = Boolean(calendario[key]);
              const col   = TIPO_COLORES[obl.tipo] || TIPO_COLORES['Gestión'];
              return (
                <div key={key} className={`card flex items-start gap-4 border-2 ${hecho ? 'border-emerald-200 opacity-70' : col.border}`}>
                  <div className="shrink-0">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${hecho ? 'bg-emerald-100 text-emerald-600' : `${col.bg} ${col.text}`}`}>
                      {obl.dia}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`badge text-xs ${col.bg} ${col.text}`}>{obl.tipo}</span>
                      {hecho && (
                        <span className="badge bg-emerald-100 text-emerald-600 text-xs flex items-center gap-1">
                          <Check className="w-3 h-3" /> Completado
                        </span>
                      )}
                    </div>
                    <p className={`font-medium text-sm ${hecho ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {obl.titulo}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{obl.descripcion}</p>
                    <p className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                      <ClipboardList className="w-3 h-3" /> {obl.norma}
                    </p>
                  </div>
                  <button
                    onClick={() => toggleCalendario(key)}
                    className={`shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${hecho ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-300 hover:border-emerald-400'}`}
                  >
                    {hecho && <Check className="w-3.5 h-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
