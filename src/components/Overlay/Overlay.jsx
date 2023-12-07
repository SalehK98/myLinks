import { useModalContext } from "../../contexts/ModalContext";
import * as ActionTypes from "../../contexts/actionTypes";
import styles from "../../styles/OverlayStyles.module.css";

export default function Overlay({
  children,
  overlayStyleClass,
  overlayComponent,
}) {
  const { modalDispatch } = useModalContext();
  return (
    <div
      className={styles[overlayStyleClass]}
      onClick={() => {
        if (overlayComponent === "fullscreen") {
          modalDispatch({
            type: ActionTypes.SET_IS_MODAL_OPEN,
            payload: false,
          });
          document.body.style.overflow = "auto";
        }
      }}
    >
      {children}
    </div>
  );
}
