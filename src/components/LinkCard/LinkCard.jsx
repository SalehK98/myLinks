import styles from "../../styles/LinkCard.module.css";
import firestoreServices from "../../services/firestoreServices";
import { useUserDataContext } from "../../contexts/userDataContext";
import { useState } from "react";
import { useModalContext } from "../../contexts/ModalContext";
import * as ActionTypes from "../../contexts/actionTypes";
import Overlay from "../Overlay/Overlay";
import Loader from "../loader/Loader";

function LinkCard({ link }) {
  const [isCopied, setIsCopied] = useState(false);
  const { userDataState, userDataDispatch } = useUserDataContext();
  const userEmail = userDataState.user.email;
  const [isDeleting, setIsDeleting] = useState(false);

  const { modalDispatch } = useModalContext();

  const handleDeleteLink = async () => {
    const categoriesWithLinks = userDataState.categoriesWithLinks;
    try {
      setIsDeleting(true);
      await firestoreServices.deleteLink(userEmail, link);
      const { categoryName, id } = link;
      categoriesWithLinks[categoryName].urls = categoriesWithLinks[
        categoryName
      ].urls.filter((linkObj) => linkObj.id !== id);
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: categoriesWithLinks,
      });
    } catch (error) {
      console.error("failed to delete", error.message);
    } finally {
      setIsDeleting(false);
      setTimeout(() => {
        alert("link deleted successfully");
      }, 100);
    }
  };

  const handleEditLink = async () => {
    modalDispatch({ type: ActionTypes.SET_MODAL_MODE, payload: "edit" });
    modalDispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: true });
    modalDispatch({ type: ActionTypes.SET_CURRENT_LINK_DATA, payload: link });
  };

  const handleCopyLink = async (newClipText) => {
    if (navigator.clipboard) {
      setIsCopied(true);
      try {
        await navigator.clipboard.writeText(newClipText);
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
    <>
      <div className={styles.linkCard}>
        {isDeleting && (
          <Overlay
            overlayStyleClass="linkCardOverlay"
            overlayComponent="linkCard"
          >
            <Loader />
          </Overlay>
        )}
        <div style={{ padding: "1rem" }}>
          <div className={styles.Wrapper}>
            <h2 className={styles.linkTitle}>{link.title} </h2>
          </div>
          <a
            className={styles.linkUrl}
            href={link.url.includes("https") ? link.url : `https://${link.url}`}
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
      </div>
    </>
  );
}

export default LinkCard;
