import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { getNivelEmpresa, NIVELES_EMPRESA } from '../data/estandares';
import Tooltip from '../components/Tooltip';
import { TOOLTIPS } from '../data/helpContent';

const RIESGOS = [
  { clase: 'I',   descripcion: 'Oficinas, call centers, comercio al detal',           color: 'bg-green-100 border-green-400' },
  { clase: 'II',  descripcion: 'Laboratorios, manufactura liviana',                   color: 'bg-lime-100 border-lime-400' },
  { clase: 'III', descripcion: 'Construcción liviana, transporte, manufactura media', color: 'bg-yellow-100 border-yellow-400' },
  { clase: 'IV',  descripcion: 'Construcción pesada, minería de superficie',          color: 'bg-orange-100 border-orange-400' },
  { clase: 'V',   descripcion: 'Ingeniería eléctrica, minería subterránea, explosivos', color: 'bg-red-100 border-red-400' },
];

export default function PerfilEmpresa() {
  const { perfil, setPerfil } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState(perfil);
  const [saving, setSaving] = useState(false);

  const nivelCalculado = getNivelEmpresa(Number(form.trabajadores), form.claseRiesgo);
  const nivelInfo = NIVELES_EMPRESA.find(n => n.nivel === nivelCalculado);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await setPerfil({ ...form, trabajadores: Number(form.trabajadores), configurado: true });
      navigate('/');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-slate-800 mb-1">Perfil de la Empresa</h1>
      <p className="text-slate-500 text-sm mb-6">Esta información determina qué estándares aplican según la Resolución 0312/2019.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Datos básicos */}
        <div className="card space-y-4">
          <h2 className="font-semibold text-slate-700">Datos Generales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Nombre de la empresa</label>
              <input
                type="text" name="nombre" value={form.nombre} onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Electro Ingeniería S.A.S."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">NIT</label>
              <input
                type="text" name="nit" value={form.nit} onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="900.123.456-7"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Responsable SG-SST</label>
              <input
                type="text" name="responsableSST" value={form.responsableSST} onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del responsable"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">ARL</label>
              <input
                type="text" name="arl" value={form.arl} onChange={handleChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ej: Sura, Colmena, Positiva..."
              />
            </div>
          </div>
        </div>

        {/* Número de trabajadores */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 mb-3">Número de Trabajadores</h2>
          <input
            type="number" name="trabajadores" value={form.trabajadores} onChange={handleChange}
            min="1" max="9999"
            className="w-48 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-slate-500 mt-2">Incluir trabajadores directos, contratistas permanentes y en misión.</p>
        </div>

        {/* Clase de riesgo */}
        <div className="card">
          <h2 className="font-semibold text-slate-700 mb-3 flex items-center gap-1.5">
            Clase de Riesgo
            <Tooltip content={TOOLTIPS.claseRiesgo} position="right" />
          </h2>
          <div className="grid grid-cols-1 gap-2">
            {RIESGOS.map(r => (
              <label
                key={r.clase}
                className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                  form.claseRiesgo === r.clase ? r.color + ' font-semibold' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio" name="claseRiesgo" value={r.clase}
                  checked={form.claseRiesgo === r.clase}
                  onChange={handleChange}
                  className="hidden"
                />
                <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  form.claseRiesgo === r.clase ? 'bg-white border-slate-500' : 'border-slate-300 bg-slate-50'
                }`}>{r.clase}</span>
                <span className="text-sm text-slate-700">{r.descripcion}</span>
                {r.clase === 'V' && (
                  <span className="ml-auto badge bg-red-100 text-red-700">⚡ Eléctrico</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Nivel resultante */}
        <div className={`card border-2 ${
          nivelCalculado === 3 ? 'border-red-300 bg-red-50' :
          nivelCalculado === 2 ? 'border-amber-300 bg-amber-50' : 'border-green-300 bg-green-50'
        }`}>
          <h2 className="font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
            Nivel de Estándares Aplicable
            <Tooltip content={TOOLTIPS.nivelResultante} position="right" />
          </h2>
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-extrabold text-2xl ${
              nivelCalculado === 3 ? 'bg-red-500' : nivelCalculado === 2 ? 'bg-amber-500' : 'bg-green-500'
            }`}>
              {nivelInfo?.totalEstandares}
            </div>
            <div>
              <p className="font-bold text-slate-800">{nivelInfo?.label}</p>
              <p className="text-sm text-slate-600">{nivelInfo?.descripcion}</p>
              {nivelCalculado === 3 && (
                <p className="text-xs text-red-600 font-medium mt-1">⚠️ Riesgo V — debe cumplir los 60 estándares completos</p>
              )}
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full py-3 disabled:opacity-60">
          {saving ? 'Guardando...' : 'Guardar perfil y continuar →'}
        </button>
      </form>
    </div>
  );
}
