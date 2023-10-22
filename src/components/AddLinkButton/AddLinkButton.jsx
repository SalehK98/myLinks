import { IconContext } from "react-icons";
import styles from "../../styles/AddLinkButton.module.css";
import { BsPlusCircleFill } from "react-icons/bs";
import { useModalContext } from "../../contexts/ModalContext";
import * as ActionTypes from "../../contexts/actionTypes";
import { initialValues } from "../../data/formData";

export default function AddLinkButton() {
  const { modalState, modalDispatch } = useModalContext();

  return (
    <div
      className={styles.AddLinkContainer}
      onClick={() => {
        console.log("addLinkButton clicked");
        console.log(modalState.isModalOpen, "isModalOpen");
        modalDispatch({
          type: ActionTypes.SET_CURRENT_LINK_DATA,
          payload: initialValues,
        });
        modalDispatch({ type: ActionTypes.SET_MODAL_MODE, payload: "add" });
        modalDispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: true });
      }}
    >
      <IconContext.Provider
        value={{ size: "3rem", color: "#018786", style: { cursor: "pointer" } }}
      >
        <BsPlusCircleFill />
      </IconContext.Provider>
    </div>
  );
}
