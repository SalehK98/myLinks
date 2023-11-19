import { createContext, useContext, useReducer } from "react";
import * as ActionTypes from "./actionTypes";

// Create a context with an initial state and a reducer function
const searchContext = createContext(null);

// Export a custom hook to use the context
export function useSearchContext() {
  return useContext(searchContext);
}

const initialState = {
  searchTerm: "",
  searchResult: {},
  searchComponent: "",
  searchType: "",
};

function searchReducer(searchState, action) {
  switch (action.type) {
    case ActionTypes.SET_SEARCH_RESULT:
      return { ...searchState, searchTerm: action.payload };
    case ActionTypes.SET_SEARCH_RESULT:
      return { ...searchState, searchResult: action.payload };
    case ActionTypes.SET_SEARCH_COMPONENT:
      return { ...searchState, searchComponent: action.payload };
    case ActionTypes.SET_SEARCH_TYPE:
      return { ...searchState, searchType: action.payload };
    // Add more cases for other actions as needed
    default:
      return searchState;
  }
}

export function SearchProvider({ children }) {
  const [searchState, searchDispatch] = useReducer(searchReducer, initialState);

  return (
    <searchContext.Provider value={{ searchState, searchDispatch }}>
      {children}
    </searchContext.Provider>
  );
}
