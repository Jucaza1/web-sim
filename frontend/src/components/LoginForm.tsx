import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../styles/LoginForm.module.css";
import logo from "../assets/logo/Davante_logo_endosos_navy.svg";
import { z } from "zod";
import { login } from "../services/auth";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

// 1. Validación
const LoginFormSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z
    .string()
    .min(8, { message: "Debe tener al menos 8 caracteres" })
    .max(25, { message: "Máximo 25 caracteres" }),
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const navigate = useNavigate();
  const { setUser, setLoggedIn } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data);
      if (result) {
        setUser(result);
        setLoggedIn(true);
      }
      console.log("Login correcto:", result);
      navigate("/");
    } catch (err) {
      console.error("Error en login:", (err as Error).message);
    }
  };

  return (
    
    <div className={styles.pageContainer}>
  <div className={styles.backContainer}>
    <button onClick={() => navigate("/")} className={styles.backButton}>
      ← Volver
    </button>
  </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <div className={styles.titleContainer}>
          <img src={logo} alt="Logo de Davante" className={styles.logo} />
          <h2 className={styles.formTitle}>Iniciar sesión</h2>
        </div>

        <input
          type="email"
          placeholder="Correo electrónico"
          className={styles.inputField}
          {...register("email")}
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Contraseña"
          className={styles.inputField}
          {...register("password")}
        />
        {errors.password && (
          <p className={styles.error}>{errors.password.message}</p>
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
    </div>
  );
};

export default LoginForm;
