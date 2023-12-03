import { useModalContext } from "../../contexts/ModalContext";
import * as ActionTypes from "../../contexts/actionTypes";

export default function Overlay({ children }) {
  const { modalDispatch } = useModalContext();
  const overlayStyle = {
    backgroundColor: "rgba(0,0,0,0.7)",
    top: "0",
    bottom: "0",
    left: "0",
    right: "0",
    zIndex: "1000",
    position: "fixed",
    height: "100%",
  };
  return (
    <div
      style={overlayStyle}
      className={overlayStyle}
      onClick={() => {
        modalDispatch({
          type: ActionTypes.SET_IS_MODAL_OPEN,
          payload: false,
        });
        document.body.style.overflow = "auto";
      }}
    >
      {children}
    </div>
  );
}
