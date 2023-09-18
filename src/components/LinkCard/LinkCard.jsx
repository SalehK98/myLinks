import styles from "../../styles/LinkCard.module.css";

function LinkCard({ link }) {
  return (
    <div className={styles.linkCard}>
      <div className={styles.Wrapper}>
        <h2 className={styles.linkTitle}>Website Title </h2>
      </div>
      <a className={styles.linkUrl} href={link} target="_blank">
        <div className={styles.Wrapper}>
          <p>{link}</p>
        </div>
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
