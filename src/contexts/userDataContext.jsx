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
  categoriesWithLinks: {},
  user: null,
  activeCategory: "all",
  prevActiveCategory: "all",
  change: 0,
};

/* initialStateObjExample = {
categories: ["categoryOne", "categoryTwo", ...],
categoriesWithLinks: {categoryOne : {id: "CategoryOne",
   urls: [
    {id: "123456789", private: 0, favorite: 0, categoryName: "categoryONe", title: "title", url: "url" }, ...]},
      ...},
user: {email: "email@email.com", id: "123456789", paid: true/false, paymentUpdateDate: 123456789},
activeCategory:"all", "categoryOne" ...
}*/

function userDataReducer(userDataState, action) {
  switch (action.type) {
    case ActionTypes.SET_CATEGORIES:
      return { ...userDataState, categories: action.payload };
    case ActionTypes.SET_CATEGORIES_WITH_LINKS:
      return { ...userDataState, categoriesWithLinks: action.payload };
    case ActionTypes.SET_USER:
      return { ...userDataState, user: action.payload };
    case ActionTypes.SET_ACTIVE_CATEGORY:
      return { ...userDataState, activeCategory: action.payload };
    case ActionTypes.SET_PREV_ACTIVE_CATEGORY:
      return { ...userDataState, prevActiveCategory: action.payload };
    case ActionTypes.SET_CHANGE:
      return { ...userDataState, change: action.payload };
    // Add more cases for other actions as needed
    default:
      return userDataState;
  }
}

export function UserDataProvider({ children }) {
  const [userDataState, userDataDispatch] = useReducer(
    userDataReducer,
    initialState
  );

  return (
    <userDataContext.Provider value={{ userDataState, userDataDispatch }}>
      {children}
    </userDataContext.Provider>
  );
}
