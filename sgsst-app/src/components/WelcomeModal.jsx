import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, ChevronLeft, Zap } from './icons';
import { WELCOME_STEPS } from '../data/helpContent';

const LS_KEY = 'sgsst_welcome_done';

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);
  const [step, setStep]       = useState(0);
  const [noMostrar, setNoMostrar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(LS_KEY)) setVisible(true);
  }, []);

  function cerrar() {
    if (noMostrar) localStorage.setItem(LS_KEY, '1');
    setVisible(false);
  }

  function irYCerrar(ruta) {
    localStorage.setItem(LS_KEY, '1');
    setVisible(false);
    navigate(ruta);
  }

  if (!visible) return null;

  const current = WELCOME_STEPS[step];
  const isLast  = step === WELCOME_STEPS.length - 1;
  const isFirst = step === 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header con color dinámico */}
        <div className={`${current.color} p-6 text-white relative`}>
          <button
            onClick={cerrar}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Ícono */}
          <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
            {step === 0
              ? <Zap className="w-8 h-8 text-white" />
              : <span className="text-3xl">{current.icono}</span>
            }
          </div>

          <h2 className="text-xl font-extrabold leading-tight">{current.titulo}</h2>
          <p className="text-white/80 text-sm mt-1">{current.subtitulo}</p>

          {/* Dots de progreso */}
          <div className="flex gap-1.5 mt-4">
            {WELCOME_STEPS.map((_, i) => (
              <button
                key={i}
                onClick={() => setStep(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'bg-white w-6' : 'bg-white/40 w-1.5'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          <p className="text-slate-600 text-sm leading-relaxed">{current.contenido}</p>

          {/* Acción rápida */}
          {current.accion && (
            <button
              onClick={() => irYCerrar(current.accion.ruta)}
              className="mt-4 w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-sm py-2.5 rounded-lg transition-colors"
            >
              {current.accion.label} <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* Navegación */}
          <div className="flex items-center justify-between mt-5">
            <button
              onClick={() => setStep(s => s - 1)}
              disabled={isFirst}
              className={`flex items-center gap-1 text-sm font-medium transition-colors ${
                isFirst ? 'text-slate-300 cursor-not-allowed' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" /> Anterior
            </button>

            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={noMostrar}
                onChange={e => setNoMostrar(e.target.checked)}
                className="rounded"
              />
              No mostrar de nuevo
            </label>

            {isLast ? (
              <button
                onClick={cerrar}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-4 rounded-lg transition-colors"
              >
                Comenzar
              </button>
            ) : (
              <button
                onClick={() => setStep(s => s + 1)}
                className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
              >
                Siguiente <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
