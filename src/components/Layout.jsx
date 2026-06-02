import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getEstandaresPorNivel, calcularPuntaje, getCalificacion } from '../data/estandares';
import {
  BarChart2, Building2, RefreshCw, ClipboardCheck, Zap,
  FolderOpen, CalendarDays, ClipboardList, BookOpen,
} from './icons';
import HelpDrawer from './HelpDrawer';

const NAV = [
  { to: '/',               label: 'Dashboard',          Icon: BarChart2     },
  { to: '/perfil',         label: 'Perfil Empresa',      Icon: Building2     },
  { to: '/phva',           label: 'Ciclo PHVA',          Icon: RefreshCw     },
  { to: '/checklist',      label: 'Checklist SG-SST',    Icon: ClipboardCheck},
  { to: '/electrico',      label: 'Riesgos Eléctricos',  Icon: Zap           },
  { to: '/documentos',     label: 'Documentos',          Icon: FolderOpen    },
  { to: '/calendario',     label: 'Calendario',          Icon: CalendarDays  },
  { to: '/autoevaluacion', label: 'Autoevaluación',      Icon: ClipboardList },
];

const NAV_BOTTOM = [
  { to: '/ayuda', label: 'Centro de Ayuda', Icon: BookOpen },
];

export default function Layout({ children }) {
  const { perfil, nivel, completados } = useApp();
  const estandares = getEstandaresPorNivel(nivel);
  const { porcentaje } = calcularPuntaje(estandares, completados);
  const cal = getCalificacion(porcentaje);

  const barColor = cal.label === 'CRÍTICO' ? '#EF4444'
    : cal.label === 'MODERADAMENTE ACEPTABLE' ? '#F59E0B'
    : '#10B981';

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="no-print w-64 bg-slate-900 text-white flex flex-col shrink-0">
        {/* Logo */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">SG-SST</p>
              <p className="text-xs text-slate-400">Ingeniería Eléctrica</p>
            </div>
          </div>
          {perfil.configurado && (
            <p className="text-xs text-slate-300 mt-2 truncate">{perfil.nombre || 'Mi Empresa'}</p>
          )}
        </div>

        {/* Progreso global */}
        <div className="p-4 border-b border-slate-700">
          <p className="text-xs text-slate-400 mb-1">Cumplimiento SG-SST</p>
          <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
            <div
              className="h-2 rounded-full transition-all"
              style={{ width: `${porcentaje}%`, backgroundColor: barColor }}
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold">{porcentaje.toFixed(1)}%</span>
            <span className={`text-xs font-semibold ${
              cal.label === 'CRÍTICO' ? 'text-red-400' :
              cal.label === 'MODERADAMENTE ACEPTABLE' ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              {cal.label === 'MODERADAMENTE ACEPTABLE' ? 'MOD. ACEPTABLE' : cal.label}
            </span>
          </div>
        </div>

        {/* Navegación */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {NAV.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Nav inferior: Ayuda */}
        <div className="p-3 border-t border-slate-700 space-y-0.5">
          {NAV_BOTTOM.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white font-medium'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
          <p className="text-xs text-slate-500 px-3 pt-1">Dec. 1072/2015 · Res. 0312/2019</p>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Help Drawer flotante */}
      <HelpDrawer />
    </div>
  );
}
