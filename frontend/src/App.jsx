import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes> {/*Agregar rutas*/}
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
  
      </Routes>
    </Router>
  );
}

export default App;
