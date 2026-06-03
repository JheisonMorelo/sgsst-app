import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getEstandaresPorNivel, calcularPuntaje, getCalificacion } from '../data/estandares';
import {
  BarChart2, Building2, RefreshCw, ClipboardCheck, Zap,
  FolderOpen, CalendarDays, ClipboardList, BookOpen, Menu, X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { perfil, nivel, completados } = useApp();
  const estandares = getEstandaresPorNivel(nivel);
  const { porcentaje } = calcularPuntaje(estandares, completados);
  const cal = getCalificacion(porcentaje);

  const barColor = cal.label === 'CRÍTICO' ? '#EF4444'
    : cal.label === 'MODERADAMENTE ACEPTABLE' ? '#F59E0B'
    : '#10B981';

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex min-h-screen">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`no-print fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-white flex flex-col shrink-0 transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:translate-x-0`}>
        {/* Logo + close btn (mobile) */}
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-yellow-500 flex items-center justify-center shrink-0">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">SG-SST</p>
              <p className="text-xs text-slate-400">Ingeniería Eléctrica</p>
            </div>
          </div>
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Cerrar menú"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {perfil.configurado && (
          <div className="px-4 py-2 border-b border-slate-700">
            <p className="text-xs text-slate-300 truncate">{perfil.nombre || 'Mi Empresa'}</p>
          </div>
        )}

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
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
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
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
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

      {/* Área principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Barra superior mobile */}
        <header className="no-print lg:hidden sticky top-0 z-30 bg-white border-b border-slate-200 flex items-center gap-3 px-4 h-14 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5 text-slate-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-yellow-500 flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-sm text-slate-800">SG-SST</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="w-14 bg-slate-200 rounded-full h-1.5">
              <div className="h-1.5 rounded-full transition-all" style={{ width: `${porcentaje}%`, backgroundColor: barColor }} />
            </div>
            <span className="text-xs font-bold text-slate-600">{porcentaje.toFixed(0)}%</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Help Drawer flotante */}
      <HelpDrawer />
    </div>
  );
}
