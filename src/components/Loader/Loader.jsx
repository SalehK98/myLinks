import styles from "../../styles/Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
