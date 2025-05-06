import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import styles from "../styles/RegisterForm.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
//import { UserCreateDTO } from "../backend/src/types/validations.ts"
import logo from "../assets/logo/Davante_logo_endosos_navy.svg"

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      await api.post("/auth/register", data);                            // Enviar datos al endpoint de registro
      navigate("/");                                                     // Redirigir a la página de inicio después del registro exitoso
    } catch (err: any) {
      console.error(err.response?.data?.error || "Error al registrar el usuario");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.titleContainer}>
      <img src={logo} alt="Logo de Davante" className={styles.logo}/>
      <h2 className={styles.formTitle}>Registro de Usuario</h2>
      </div>

      <input
        {...register("name")}
        placeholder="Nombre"
        className={styles.inputField}
      />
      {errors.name && <p className="text-red-500 px-4">El nombre es obligatorio</p>}

      <input
        {...register("email")}
        placeholder="Correo electrónico"
        type="email"
        className={styles.inputField}
      />
      {errors.email && <p className="text-red-500 px-4">El correo electrónico es obligatorio</p>}

      <input
        {...register("password")}
        placeholder="Contraseña"
        type="password"
        className={styles.inputField}
      />
      <input
        {...register("confirmPassword")}
        placeholder="Confirmar contraseña"
        type="password"
        className={styles.inputField}
      />
      <input
        {...register("profession")}
        placeholder="Profesión"
        className={styles.inputField}
      />
      <input
        {...register("companyId")}
        placeholder="ID de la Compañía"
        className={styles.inputField}
      />

      <button type="submit" className={styles.submitButton}>
        Registrarse
      </button>
    </form>
  );
}
