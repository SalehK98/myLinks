import { createContext, useContext, useReducer } from "react";
import * as ActionTypes from "./actionTypes";

// Create a context with an initial state and a reducer function
const loginContext = createContext(null);

// Export a custom hook to use the context
export function useLoginContext() {
  return useContext(loginContext);
}

const initialState = {
  isLogged: false,
  isPaid: true,
  // isAuthenticated: false,
};

function loginReducer(loginState, action) {
  switch (action.type) {
    case ActionTypes.SET_IS_LOGGED:
      return { ...loginState, isLogged: action.payload };
    case ActionTypes.SET_IS_PAID:
      return { ...loginState, isPaid: action.payload };
    // case ActionTypes.SET_IS_AUTHENTICATED:
    //   return { ...loginState, isAuthenticated: action.payload };
    // Add more cases for other actions as needed
    default:
      return loginState;
  }
}

export function AuthProvider({ children }) {
  const [loginState, loginDispatch] = useReducer(loginReducer, initialState);

  return (
    <loginContext.Provider value={{ loginState, loginDispatch }}>
      {children}
    </loginContext.Provider>
  );
}
