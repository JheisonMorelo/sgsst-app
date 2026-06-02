import { Zap } from './icons';

export default function LoadingScreen({ error }) {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 rounded-2xl bg-yellow-500 flex items-center justify-center animate-pulse">
        <Zap className="w-9 h-9 text-white" />
      </div>
      {error ? (
        <div className="text-center max-w-md px-4">
          <p className="text-red-400 font-semibold text-lg mb-2">No se pudo conectar al servidor</p>
          <p className="text-slate-400 text-sm mb-4">{error}</p>
          <div className="bg-slate-800 rounded-lg p-4 text-left text-xs text-slate-300 space-y-1 font-mono">
            <p className="text-slate-500 mb-2"># Iniciar el backend:</p>
            <p>cd sgsst-backend</p>
            <p>npm install</p>
            <p>cp .env.example .env  <span className="text-slate-500"># editar credenciales</span></p>
            <p>node src/db-init.js  <span className="text-slate-500"># crear tablas</span></p>
            <p>npm run dev</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-5 rounded-lg transition-colors"
          >
            Reintentar conexión
          </button>
        </div>
      ) : (
        <p className="text-slate-400 text-sm">Conectando con el servidor...</p>
      )}
    </div>
  );
}
