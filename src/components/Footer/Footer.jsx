import styles from "../../styles/Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      <span>
        <b>MyLinks</b> <i>Web app v1.0.0</i>
      </span>
      <h3></h3>
      <span>&copy; All copyrights reserved</span>
    </div>
  );
}
