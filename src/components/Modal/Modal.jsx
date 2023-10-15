import LinkEditorModalForm from "../LinkEditorModalForm/LinkEditorModalForm";
const overlay = {
  backgroundColor: "rgba(0,0,0,0.7)",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  zIndex: "1000",
  position: "fixed",
};
import { createPortal } from "react-dom";

export default function Modal({ isOpen, onCloseModal }) {
  console.log("isOpen", isOpen);
  if (!isOpen) return null;
  document.body.style.overflow = "hidden";
  // const ModalName = LinkEditorModalForm

  return createPortal(
    <>
      <div
        className="overlay"
        style={overlay}
        onClick={() => {
          onCloseModal(false);
          document.body.style.overflow = "auto";
        }}
      >
        <LinkEditorModalForm onCloseModal={onCloseModal} />
      </div>
    </>,
    document.getElementById("portal-root")
  );
}
