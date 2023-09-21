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

export default function Modal({ isOpen, onClose }) {
  console.log("isOpen", isOpen);
  if (!isOpen) return null;
  document.body.style.overflow = "hidden";

  return createPortal(
    <>
      <div className="overlay" style={overlay}>
        <LinkEditorModalForm onClose={onClose} />
        {/* hello\
        <button
          onClick={() => {
            onClose(false);
          }}
        >
          click me
        </button> */}
      </div>
    </>,
    document.getElementById("portal-root")
  );
}
