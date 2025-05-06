
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/LoginForm.module.css";
import logo from "../assets/logo/Davante_logo_endosos_navy.svg";

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();                           //Evita comportamiento por defecto del formulario
    navigate("/home");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div className={styles.titleContainer}>
      <img src={logo} alt="Logo de Davante" className={styles.logo} />
      <h2 className={styles.formTitle}>Iniciar sesión</h2>
      </div>
      <input
        type="email"
        placeholder="Correo electrónico"
        className={styles.inputField}
      />
      <input
        type="password"
        placeholder="Contraseña"
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="ID de la empresa"
        className={styles.inputField}
      />
      <button type="submit" className={styles.submitButton}>
        Iniciar sesión
      </button>

      <p className={styles.redirectText}>
        ¿No tienes cuenta?{" "}
        <Link to="/register" className={styles.linkButton}>
          Regístrate aquí
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
