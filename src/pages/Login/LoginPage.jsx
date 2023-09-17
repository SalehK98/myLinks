import styles from "../../styles/LoginPage.module.css";
import linkIcon from "../../assets/icons/icons8-link-96.webp";

export default function LoginPage() {
  return (
    //     <div className={styles.pageContainer}>
    //       <h1>
    //         <span>MyLinks</span> <i>Web</i>
    //       </h1>
    //       <div className={styles.}></div>
    //     </div>
    <div className={styles.loginContainer}>
      <h1 className={styles.title}>
        <img src={linkIcon} style={{ width: "4rem" }} /> &nbsp;<b>MyLinks</b>{" "}
        &nbsp;Web
      </h1>
      <div className={styles.welcomeBox}>
        <p className={styles.welcomeText}>Welcome!</p>
        <p className={styles.mustLoginText}>You must log in to continue.</p>
        <button className={styles.googleLoginButton}>
          <span className={styles.googleIcon}>G</span> Log in with Google
        </button>
        <div className={styles.termsContainer}>
          <p className={styles.termsText}>
            By logging in, you agree to our <a href="#">Terms of Service</a> and{" "}
            <a href="#">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
