import { createContext, useContext, useReducer } from "react";
import * as ActionTypes from "./actionTypes";

// Create a context with an initial state and a reducer function
const modalContext = createContext(null);

// Export a custom hook to use the context
export function useModalContext() {
  return useContext(modalContext);
}

const initialState = {
  modalMode: "", //value either "", "add", "edit"
  isModalOpen: false,
  currentLinkData: {},
  NewLinkDataL: {},
};

function ModalReducer(modalSate, action) {
  switch (action.type) {
    case ActionTypes.SET_MODAL_MODE:
      return { ...modalSate, modalMode: action.payload };
    case ActionTypes.SET_IS_MODAL_OPEN:
      return { ...modalSate, isModalOpen: action.payload };
    case ActionTypes.SET_CURRENT_LINK_DATA:
      return { ...modalSate, currentLinkData: action.payload };
    case ActionTypes.SET_NEW_LINK_DATA:
      return { ...modalSate, NewLinkDataL: action.payload };
    default:
      return modalSate;
  }
}

export function ModalProvider({ children }) {
  const [modalState, modalDispatch] = useReducer(ModalReducer, initialState);

  return (
    <modalContext.Provider value={{ modalState, modalDispatch }}>
      {children}
    </modalContext.Provider>
  );
}
