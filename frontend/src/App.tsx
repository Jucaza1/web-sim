import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import Home from './pages/Home';
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Router>
      <Routes> {/*Agregar rutas*/}

        <Route path="/" Component={LoginPage} />

        <Route path="/register" Component={RegisterPage} />

        <Route path="/home" Component={Home} />

      </Routes>
    </Router>
  );
}

export default App;
