import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import LoadingScreen from './components/LoadingScreen';
import { useState, useEffect } from "react";
import SimPage from "./pages/SimPage";
import NavBar from "./components/NavBar";
import SimulatorApp from "./pages/Simulator";
import ProfilePage from "./pages/ProfilePage";


function App() {

    return (
      <Router> 
        <LoadingWrapper />
      </Router>
    );
  }

  function LoadingWrapper() {

  const [loading, setLoading] = useState(true);
  const location = useLocation();


  useEffect(() => {
    // Muestra la pantalla de carga al cambiar de ruta
    setLoading(true);
    const timeout = setTimeout(() => setLoading(false), 1000); // Simula retraso de 1 segundo
    return () => {
      clearTimeout(timeout); // Limpia el timeout si el componente se desmonta antes de que se complete
    };
  }, [location]);

  const hideNavBar = location.pathname === "/register" || location.pathname === "/"; // Oculta NavBar en estas rutas

  return (
    <>
        {loading && <LoadingScreen />} {/* Pantalla de carga */}
        {!loading && !hideNavBar && <NavBar />} {/* Muestra NavBar solo si no está en login o register */}
        <Routes> 
          <Route path="/" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/home" Component={Home} />
          <Route path="/simulatorspage" Component={SimPage} />
          <Route path="/simulator" Component={SimulatorApp} />
          <Route path="/profile" Component={ProfilePage} />

        </Routes>
    </>
  );
  }

export default App;
