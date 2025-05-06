import RegisterForm from "../components/RegisterForm";
import styles from "../styles/RegisterForm.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.formPage}>
      <RegisterForm />
    </div>
  );
}
