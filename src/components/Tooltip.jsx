import { useState, useRef, useEffect } from 'react';
import { HelpCircle, X } from './icons';

// Trigger usa <span role="button"> para evitar <button> anidado dentro de <button>
export default function Tooltip({ content, position = 'top', className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const posClass = {
    top:    'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left:   'right-full top-1/2 -translate-y-1/2 mr-2',
    right:  'left-full top-1/2 -translate-y-1/2 ml-2',
  }[position] || 'bottom-full left-1/2 -translate-x-1/2 mb-2';

  return (
    <span ref={ref} className={`relative inline-flex items-center ${className}`}>
      {/* span[role=button] evita nesting inválido <button><button> */}
      <span
        role="button"
        tabIndex={0}
        onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
        onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setOpen(v => !v)}
        className="text-slate-400 hover:text-blue-500 transition-colors focus:outline-none cursor-pointer"
        aria-label="Ayuda"
        aria-expanded={open}
      >
        <HelpCircle className="w-4 h-4" />
      </span>

      {open && (
        <div className={`absolute ${posClass} z-50 w-72 bg-slate-900 text-white text-xs rounded-xl shadow-xl p-3 leading-relaxed`}>
          <span
            role="button"
            tabIndex={0}
            onClick={() => setOpen(false)}
            onKeyDown={e => e.key === 'Enter' && setOpen(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-3.5 h-3.5" />
          </span>
          <p className="pr-4">{content}</p>
          <span className={`absolute w-2 h-2 bg-slate-900 rotate-45 ${
            position === 'top'    ? 'top-full left-1/2 -translate-x-1/2 -mt-1' :
            position === 'bottom' ? 'bottom-full left-1/2 -translate-x-1/2 mb-[-1px]' :
            position === 'left'   ? 'left-full top-1/2 -translate-y-1/2 -ml-1' :
            'right-full top-1/2 -translate-y-1/2 mr-[-1px]'
          }`} />
        </div>
      )}
    </span>
  );
}
