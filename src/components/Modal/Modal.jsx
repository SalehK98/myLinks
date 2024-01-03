import { useEffect } from "react";
import { createPortal } from "react-dom";
import LinkEditorModalForm from "../LinkEditorModalForm/LinkEditorModalForm";
import { useModalContext } from "../../contexts/ModalContext";
import * as ActionTypes from "../../contexts/actionTypes";
const overlay = {
  backgroundColor: "rgba(0,0,0,0.7)",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  zIndex: "1000",
  position: "fixed",
};

export default function Modal() {
  const { modalState, modalDispatch } = useModalContext();
  // const ModalName = LinkEditorModalForm
  console.log("isOpen", modalState.isModalOpen);
  // console.log("modalMode", modalState.modalMode);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        modalDispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: false });
        document.body.style.overflow = "auto";
      }
    };

    if (modalState.isModalOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalState.isModalOpen]);

  if (!modalState.isModalOpen) return <></>;
  return createPortal(
    <>
      <div
        className="overlay"
        style={overlay}
        onClick={() => {
          modalDispatch({
            type: ActionTypes.SET_IS_MODAL_OPEN,
            payload: false,
          });
          document.body.style.overflow = "auto";
        }}
      >
        <LinkEditorModalForm />
      </div>
    </>,
    document.getElementById("portal-root")
  );
}
