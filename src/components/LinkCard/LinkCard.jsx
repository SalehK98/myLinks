import styles from "../../styles/LinkCard.module.css";

function LinkCard() {
  return (
    <div className={styles.linkCard}>
      <h2 className={styles.linkTitle}>Website Title</h2>
      <a
        className={styles.linkUrl}
        href="https://www.example.com"
        target="_blank"
      >
        https://www.example.com
      </a>
      <div className={styles.linkActions}>
        <button className={styles.linkButton}>Edit</button>
        <span className={styles.linkSeparator}></span>
        <button className={styles.linkButton}>Copy</button>
        <span className={styles.linkSeparator}></span>
        <button className={styles.linkButton}>Delete</button>
      </div>
    </div>
  );
}

export default LinkCard;
