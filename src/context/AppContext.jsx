import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getNivelEmpresa } from '../data/estandares';
import {
  getPerfil, savePerfil,
  getCompletados, marcarCompletado, desmarcarCompletado,
  getDocumentos, saveDocumento,
  getNotas, saveNota,
  getCalendario, marcarObligacion, desmarcarObligacion,
  checkHealth,
} from '../services/api';

const AppContext = createContext(null);

const DEFAULT_PERFIL = {
  nombre: '', nit: '', trabajadores: 50, claseRiesgo: 'V',
  arl: '', responsableSST: '', configurado: false,
};

export function AppProvider({ children }) {
  const [loading,  setLoading]  = useState(true);
  const [apiError, setApiError] = useState(null);

  const [perfil,      setPerfil]      = useState(DEFAULT_PERFIL);
  const [completados, setCompletados] = useState([]);
  const [documentos,  setDocumentos]  = useState({});
  const [notas,       setNotas]       = useState({});
  const [calendario,  setCalendario]  = useState({});

  const nivel = getNivelEmpresa(perfil.trabajadores, perfil.claseRiesgo);

  // ─── Carga inicial ───────────────────────────────────────────────────────
  useEffect(() => {
    async function loadAll() {
      try {
        await checkHealth();
        const [p, c, d, n, cal] = await Promise.all([
          getPerfil(),
          getCompletados(),
          getDocumentos(),
          getNotas(),
          getCalendario(),
        ]);
        setPerfil(p);
        setCompletados(c.map(String));
        setDocumentos(d);
        setNotas(n);
        setCalendario(cal);
        setApiError(null);
      } catch (err) {
        setApiError(err.message || 'Error de conexión');
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  // ─── Perfil ───────────────────────────────────────────────────────────────
  const updatePerfil = useCallback(async (data) => {
    const nuevo = { ...data, configurado: true };
    setPerfil(nuevo);
    await savePerfil(nuevo);
  }, []);

  // ─── Estándares completados ───────────────────────────────────────────────
  const toggleEstandar = useCallback(async (id) => {
    const sid = String(id);
    const yaCompletado = completados.includes(sid);

    // Actualización optimista
    setCompletados(prev =>
      yaCompletado ? prev.filter(x => x !== sid) : [...prev, sid]
    );

    try {
      if (yaCompletado) await desmarcarCompletado(sid);
      else              await marcarCompletado(sid);
    } catch {
      // Revertir si falla
      setCompletados(prev =>
        yaCompletado ? [...prev, sid] : prev.filter(x => x !== sid)
      );
    }
  }, [completados]);

  // ─── Documentos ───────────────────────────────────────────────────────────
  const updateDocumento = useCallback(async (id, data) => {
    setDocumentos(prev => ({ ...prev, [id]: { ...prev[id], ...data } }));
    await saveDocumento(id, data);
  }, []);

  // ─── Notas ────────────────────────────────────────────────────────────────
  const updateNota = useCallback(async (id, texto) => {
    setNotas(prev => ({ ...prev, [id]: texto }));
    await saveNota(id, texto);
  }, []);

  // ─── Calendario ───────────────────────────────────────────────────────────
  const toggleCalendario = useCallback(async (key) => {
    const yaHecho = Boolean(calendario[key]);

    setCalendario(prev => {
      const next = { ...prev };
      if (yaHecho) delete next[key];
      else next[key] = true;
      return next;
    });

    try {
      if (yaHecho) await desmarcarObligacion(key);
      else         await marcarObligacion(key);
    } catch {
      // Revertir
      setCalendario(prev => {
        const next = { ...prev };
        if (yaHecho) next[key] = true;
        else delete next[key];
        return next;
      });
    }
  }, [calendario]);

  // ─── Reset ────────────────────────────────────────────────────────────────
  const resetProgreso = useCallback(async () => {
    // Borrar todos los completados uno a uno en la BD
    await Promise.all(completados.map(id => desmarcarCompletado(id).catch(() => {})));
    setCompletados([]);
    setDocumentos({});
    setNotas({});
    setCalendario({});
  }, [completados]);

  return (
    <AppContext.Provider value={{
      loading, apiError,
      perfil,      setPerfil: updatePerfil,
      nivel,
      completados, toggleEstandar,
      documentos,  updateDocumento,
      notas,       updateNota,
      calendario,  toggleCalendario,
      resetProgreso,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
