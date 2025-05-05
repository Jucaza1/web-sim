import { useForm } from "react-hook-form";
import styles from "../styles/RegisterForm.module.css";
import logo from "../assets/logo/Davante_logo_endosos_navy.svg"

export default function RegisterForm() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
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
      <input
        {...register("email")}
        placeholder="Correo electrónico"
        type="email"
        className={styles.inputField}
      />
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
