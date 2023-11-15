import styles from "../../styles/NotSubscribedPage.module.css";
import linkIcon from "../../assets/icons/icons8-link-96.webp";
import googlePlayBadge from "../../assets/google-play-badge.png";
import { useLoginContext } from "../../contexts/LoginContext";

export default function NotSubscribedPage() {
  const { loginState } = useLoginContext();
  const { isPaid } = loginState;

  if (isPaid) return <>Loading...</>;
  return (
    <div className={styles.pageContainer}>
      <div className={styles.title}>
        <img src={linkIcon} alt="Link Icon" />
        <h1>
          &nbsp;<b>MyLinks</b>
        </h1>
        &nbsp;&nbsp;&nbsp;
        <span>
          <i>Web</i>
        </span>
      </div>
      <div className={styles.errorMessage}>
        <span>
          <b>Oops!</b> you don't have access to this website.
        </span>
        <span>This website is only for MyLinks Premium users.</span>
      </div>
      <div className={styles.downloadBox}>
        <span>Download Mylinks now and sync all your links</span>
        <a
          href="https://play.google.com/store/apps/details?id=com.dissiapps.mylinks.mylinks&hl=en&gl=US"
          target="_blank"
          className={styles.downloadButton}
        >
          <img src={googlePlayBadge} alt="GET IT ON Google Play" />
        </a>
      </div>
    </div>
  );
}
