import styles from "../../styles/LoginCard.module.css";
import googleIcon from "../../assets/icons/google_colored.svg";

export default function LoginCard() {
  return (
    <div className={styles.loginCardContainer}>
      <p className={styles.welcomeText}>Welcome to MyLinks</p>
      <p className={styles.mustLoginText}>
        You must login with you google account to continue
      </p>
      <button className={styles.googleLoginButton}>
        <img src={googleIcon} className={styles.googleIcon} alt="Google Icon" />
        <span>Log in with Google</span>
      </button>
      <div className={styles.termsContainer}>
        <p className={styles.termsText}>
          By logging in, you agree to our <a href="#">Terms of Service</a> and{" "}
          <a href="#">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}
