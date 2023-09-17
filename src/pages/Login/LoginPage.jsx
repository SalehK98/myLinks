import styles from "../../styles/LoginPage.module.css";
import linkIcon from "../../assets/icons/icons8-link-96.webp";
import LoginCard from "../../components/LoginCard/LoginCard";

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.title}>
        <img src={linkIcon} />
        <h1>
          &nbsp;<b>MyLinks</b>
        </h1>
        &nbsp;&nbsp;&nbsp;
        <span>
          <i>Web</i>
        </span>
      </div>
      <div className={styles.cardWrapper}>
        <LoginCard />
      </div>
    </div>
  );
}
