import { createContext, useContext, useReducer } from "react";
import * as ActionTypes from "./actionTypes";

// Create a context with an initial state and a reducer function
const userDataContext = createContext(null);

// Export a custom hook to use the context
export function useUserDataContext() {
  return useContext(userDataContext);
}

const initialState = {
  categories: [],
  categoriesWithLinks: [],
  user: null,
  activeCategory: "all",
};

function userDataReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload };
    case ActionTypes.SET_CATEGORIES_WITH_LINKS:
      return { ...state, categoriesWithLinks: action.payload };
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.SET_ACTIVE_CATEGORY:
      return { ...state, activeCategory: action.payload };
    // Add more cases for other actions as needed
    default:
      return state;
  }
}

export function UserDataProvider({ children }) {
  const [state, dispatch] = useReducer(userDataReducer, initialState);

  return (
    <userDataContext.Provider value={{ state, dispatch }}>
      {children}
    </userDataContext.Provider>
  );
}
