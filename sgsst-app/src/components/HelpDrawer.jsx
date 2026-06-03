import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HelpCircle, X, ChevronRight, BookOpen, ExternalLink } from './icons';
import { HELP_PAGES } from '../data/helpContent';

export default function HelpDrawer() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Cerrar al cambiar de página
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const help = HELP_PAGES[location.pathname] || HELP_PAGES['/'];

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setOpen(v => !v)}
        className={`no-print fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all ${
          open ? 'bg-slate-800 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        aria-label="Ayuda"
        title="Ayuda contextual"
      >
        {open ? <X className="w-5 h-5" /> : <HelpCircle className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="no-print fixed inset-0 bg-black/30 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Panel lateral */}
      <aside className={`no-print fixed top-0 right-0 h-full w-96 max-w-full bg-white shadow-2xl z-40 flex flex-col transform transition-transform duration-300 ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-800 text-white shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <div>
              <p className="font-bold text-sm leading-tight">{help.titulo}</p>
              <p className="text-xs text-slate-400 mt-0.5">{help.descripcion}</p>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white shrink-0 ml-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Contenido scrollable */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Cómo usar */}
          {help.pasos?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Cómo usar este módulo
              </h3>
              <ol className="space-y-2">
                {help.pasos.map((paso, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <span className="shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {paso}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Secciones */}
          {help.secciones?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Conceptos clave
              </h3>
              <div className="space-y-3">
                {help.secciones.map((s, i) => (
                  <details key={i} className="group rounded-lg border border-slate-200 overflow-hidden">
                    <summary className="flex items-center justify-between p-3 cursor-pointer text-sm font-medium text-slate-700 hover:bg-slate-50 list-none">
                      {s.titulo}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition-transform shrink-0" />
                    </summary>
                    <div className="px-3 pb-3 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50 pt-2">
                      {s.contenido}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* Normativa */}
          {help.normativa?.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Normativa aplicable
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {help.normativa.map((n, i) => (
                  <span key={i} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-2.5 py-0.5">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Link a página de ayuda completa */}
          {location.pathname !== '/ayuda' && (
            <Link
              to="/ayuda"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium pt-2 border-t border-slate-100"
            >
              <ExternalLink className="w-4 h-4" />
              Ver documentación completa
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
