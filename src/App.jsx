import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import LoadingScreen from './components/LoadingScreen';
import WelcomeModal from './components/WelcomeModal';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import PerfilEmpresa from './pages/PerfilEmpresa';
import PHVA from './pages/PHVA';
import Checklist from './pages/Checklist';
import RiesgosElectricos from './pages/RiesgosElectricos';
import Documentos from './pages/Documentos';
import Calendario from './pages/Calendario';
import Autoevaluacion from './pages/Autoevaluacion';
import Ayuda from './pages/Ayuda';

function AppRoutes() {
  const { loading, apiError } = useApp();

  if (loading || apiError) {
    return <LoadingScreen error={apiError} />;
  }

  return (
    <BrowserRouter>
      <WelcomeModal />
      <Layout>
        <Routes>
          <Route path="/"               index element={<Dashboard />} />
          <Route path="/perfil"         element={<PerfilEmpresa />} />
          <Route path="/phva"           element={<PHVA />} />
          <Route path="/checklist"      element={<Checklist />} />
          <Route path="/electrico"      element={<RiesgosElectricos />} />
          <Route path="/documentos"     element={<Documentos />} />
          <Route path="/calendario"     element={<Calendario />} />
          <Route path="/autoevaluacion" element={<Autoevaluacion />} />
          <Route path="/ayuda"          element={<Ayuda />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
