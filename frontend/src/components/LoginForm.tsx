
import { Link } from "react-router-dom";
import styles from "../styles/LoginForm.module.css";

const LoginForm = () => {
  return (
    <form className={styles.formContainer}>
      <h2 className={styles.formTitle}>Iniciar sesión</h2>
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
        Iniciar sesion
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
