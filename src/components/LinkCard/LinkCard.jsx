import styles from "../../styles/LinkCard.module.css";
import firestoreServices from "../../services/firestoreServices";
import { useUserDataContext } from "../../contexts/userDataContext";
import { useState } from "react";

function LinkCard({ link }) {
  const [isCopied, setIsCopied] = useState(false);
  const { state } = useUserDataContext();
  const userEmail = state.user.email;

  const handleDeleteLink = async () => {
    try {
      await firestoreServices.deleteLink(userEmail, link);
    } catch (error) {
      console.error("failed to delete", error.message);
    }
  };

  const handleEditLink = async () => {
    try {
      await firestoreServices.updateLink(userEmail, link, {
        categoryName: "movies",
        favorite: 1,
        private: 0,
        title: "nine",
        url: "nine.com",
      });
    } catch (error) {
      console.error("sth went wrong", error.message);
    }
  };

  const handleCopyLink = async (newClipText) => {
    if (navigator.clipboard) {
      setIsCopied(true);
      try {
        await navigator.clipboard.writeText(newClipText);
        console.log("text copied", newClipText);
      } catch (error) {
        console.error("copy failed", error.message);
      } finally {
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      }
    } else {
      alert("Browser does not support ClipBoard API operations");
    }
  };
  return (
    <div className={styles.linkCard}>
      <div className={styles.Wrapper}>
        <h2 className={styles.linkTitle}>{link.title} </h2>
      </div>
      <a
        className={styles.linkUrl}
        href={`https://${link.url}`}
        target="_blank"
      >
        <div className={styles.Wrapper}>
          <p>{link.url}</p>
        </div>
      </a>
      <div className={styles.linkActions}>
        <button className={styles.linkButton} onClick={handleEditLink}>
          Edit
        </button>
        <span className={styles.linkSeparator}></span>
        <button
          className={styles.linkButton}
          onClick={() => handleCopyLink(link.url)}
        >
          {isCopied ? "Copied" : "Copy"}
        </button>
        <span className={styles.linkSeparator}></span>
        <button className={styles.linkButton} onClick={handleDeleteLink}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default LinkCard;
