import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {useState} from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCreateDTO, UserCreateSchema } from "./../types/validations"; // Importar el esquema de validación
import styles from "../styles/RegisterForm.module.css";
import logo from "../assets/logo/Davante_logo_endosos_navy.svg"
import { API_URL } from "../config";

export default function RegisterForm() {

  const [registerError, setRegisterError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors }
  } = useForm<UserCreateDTO>({
    resolver: zodResolver(UserCreateSchema),                          // Validación de datos usando Zod
  });



  const onSubmit = async (data: UserCreateDTO) => {
    setRegisterError(null)
    try {

      const response = await fetch(`${API_URL}/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),                                    // Convertir los datos a JSON
      });
      if (response.status === 422){
        setRegisterError("El email ya está en uso")
      }

      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error en el usuario");
      }

      navigate("/");                                                     // Redirigir a la página de inicio después del registro exitoso
    } catch (err) {
      console.error((err as Error).message || "Error al registrar el usuario");
    }
  };

  return (
    <>
    <button onClick={() => navigate("/")} className={styles.backButton}>
      ← Volver
    </button>

    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
      <div className={styles.titleContainer}>
        <img src={logo} alt="Logo de Davante" className={styles.logo} />
        <h2 className={styles.formTitle}>Registro de Usuario</h2>
      </div>

      <input
        {...register("name")}
        placeholder="Nombre"
        className={styles.inputField}
      />

      {errors.name && <p className="text-red-700 px-4">{errors.name.message}</p>}


      <input
        {...register("email")}
        placeholder="Correo electrónico"
        type="email"
        className={styles.inputField}
      />

      {errors.email && <p className="text-red-700 px-4">{errors.email.message}</p>}
      {registerError && <p className="text-red-700 px-4">{registerError}</p>}


      <input
        {...register("password")}
        placeholder="Contraseña"
        type="password"
        className={styles.inputField}
      />
      {errors.password && <p className="text-red-700 px-4">{errors.password.message}</p>}

      <input
        {...register("confirmPassword")}
        placeholder="Confirmar contraseña"
        type="password"
        className={styles.inputField}
      />
      {errors.confirmPassword && <p className="text-red-700 px-4">{errors.confirmPassword.message}</p>}

      <input
        {...register("profession")}
        placeholder="Profesión"
        className={styles.inputField}
      />
      {errors.profession && <p className="text-red-700 px-4">{errors.profession.message}</p>}

      <input
        {...register("companyId", {setValueAs: value => value === "" ? undefined : Number(value), })}
        placeholder="ID de la Compañía"
        className={styles.inputField}
      />
      {errors.companyId && <p className="text-red-700 px-4">{errors.companyId.message}</p>}


      <button type="submit" className={styles.submitButton}>
        Registrarse
      </button>
    </form>
    </>
  );
}
