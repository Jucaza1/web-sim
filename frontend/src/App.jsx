import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
      <Routes> {/*Agregar rutas*/}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
  
      </Routes>
    </Router>
  );
}

export default App;
