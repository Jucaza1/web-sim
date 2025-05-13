import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "../styles/LoginForm.module.css";
import logo from "../assets/logo/Davante_logo_endosos_navy.svg";
import { z } from "zod";
import { login } from "../services/auth";

// 1. Validación
const LoginFormSchema = z.object({
  email: z.string().email({ message: "Correo inválido" }),
  password: z
    .string()
    .min(8, { message: "Debe tener al menos 8 caracteres" })
    .max(25, { message: "Máximo 25 caracteres" }),
  companyId: z.string().uuid({ message: "ID de empresa inválido" }),
});

type LoginFormData = z.infer<typeof LoginFormSchema>;

const LoginForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
  });

  // 2. Enviar al backend con fetch
  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await login(data);
      console.log("Login correcto:", result);
      navigate("/home");
    } catch (err: any) {
      console.error("Error en login:", err.message);
    }
  };

  return (
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

      <input
        type="text"
        placeholder="ID de la empresa"
        className={styles.inputField}
        {...register("companyId")}
      />
      {errors.companyId && (
        <p className={styles.error}>{errors.companyId.message}</p>
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
