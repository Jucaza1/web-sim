import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../styles/LoginForm.module.css";
import logo from "../assets/logo/Davante_logo_endosos_navy.svg";

import { UserCredentialsSchema, UserCredentials } from "../types/credentials";
import { login } from "../services/auth";
import { useContext, useState } from "react";
import { UserContext } from "../context/userContext";



const LoginFormSchema = UserCredentialsSchema;
type LoginFormData = UserCredentials;

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setLoggedIn } = useContext(UserContext);
  const [logginError, setLogginError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  // 2. Enviar al backend con fetch
  const onSubmit = async (data: LoginFormData) => {
      setLogginError(null);
    let result
    try {
      result = await login(data);
    } catch (err) {
      console.error("Error en login:", (err as Error).message);
    }
    if (result) {
      setUser(result);
      setLoggedIn(true);
      navigate("/");
    } else {
      setLogginError("Usuario o contraseña incorrectos");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.titleContainer}>
        <img src={logo} alt="Logo de Davante" className={styles.logo} />
        <h2 className={styles.formTitle}>Iniciar sesión</h2>
      </div>

      {logginError && <p className="text-red-700 px-4">{logginError}</p>}

      <input
        type="email"
        placeholder="Correo electrónico"
        className={styles.inputField}
        {...register("email")}
      />
      {errors.email && <p className="text-red-700 px-4">{errors.email.message}</p>}

      <input
        type="password"
        placeholder="Contraseña"
        className={styles.inputField}
        {...register("password")}
      />
      {errors.password && (
        <p className="text-red-700 px-4">{errors.password.message}</p>
      )}
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
