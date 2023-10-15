import styles from "../../styles/LinkCard.module.css";
import firestoreServices from "../../services/firestoreServices";
import { useUserDataContext } from "../../contexts/userDataContext";

function LinkCard({ link }) {
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
    const timeStampId = new Date().getTime().toString();
    try {
      await firestoreServices.addNewLink(userEmail, timeStampId, {
        categoryName: "school",
        favorite: 1,
        private: 0,
        title: "eight",
        url: "eight.com",
      });
    } catch (error) {
      console.error("sth went wrong", error.message);
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
        <button className={styles.linkButton}>Copy</button>
        <span className={styles.linkSeparator}></span>
        <button className={styles.linkButton} onClick={handleDeleteLink}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default LinkCard;
