import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import LinkEditorModalForm from "../LinkEditorModalForm/LinkEditorModalForm";
import { useModalContext } from "../../contexts/ModalContext";
import * as ActionTypes from "../../contexts/actionTypes";
import Overlay from "../Overlay/Overlay";

export default function Modal() {
  const { modalState, modalDispatch } = useModalContext();
  // const ModalName = LinkEditorModalForm
  console.log("isOpen", modalState.isModalOpen);
  console.log("modalMode", modalState.modalMode);
  const [isOperationLoading, setIsOperationLoading] = useState(false);
  // const [keyProp, setKeyProp] = useState(0);

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
      // setKeyProp((prevKeyProp) => prevKeyProp + 1);
    }

    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [modalState.isModalOpen]);

  if (!modalState.isModalOpen) return <></>;
  return createPortal(
    <>
      <Overlay>
        <LinkEditorModalForm
          isOperationLoading={isOperationLoading}
          setIsOperationLoading={setIsOperationLoading}
          // keyProp={keyProp}
        />
      </Overlay>
    </>,
    document.getElementById("portal-root")
  );
}
