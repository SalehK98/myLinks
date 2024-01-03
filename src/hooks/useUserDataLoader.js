import { useState, useEffect } from "react";
import { useUserDataContext } from "../contexts/userDataContext";
import { getAllDataForSingleUser } from "../services/firestoreServices";
import transformAllUserData from "../helpers/transformFirestoreData";
import * as ActionTypes from "../contexts/actionTypes";

// Function to update context data
const updateContextData = (
  userDataDispatch,
  // user,
  categories,
  categoriesWithLinks
) => {
  // userDataDispatch({ type: ActionTypes.SET_USER, payload: user });
  userDataDispatch({ type: ActionTypes.SET_CATEGORIES, payload: categories });
  userDataDispatch({
    type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
    payload: categoriesWithLinks,
  });
};

// Function to fetch data
const fetchData = async (userDataDispatch, setIsLoading, setError) => {
  setIsLoading(true);
  try {
    const [user, rawCollectionData] = await getAllDataForSingleUser();
    const [categories, categoriesWithLinks] =
      transformAllUserData(rawCollectionData);
    updateContextData(
      userDataDispatch,
      // user,
      categories,
      categoriesWithLinks
    );
    setError(null);
    return { user, data: [categories, categoriesWithLinks] };
  } catch (error) {
    console.error("Error fetching data:", error);
    setError(error);
    return { user: null, data: null, error };
  } finally {
    setIsLoading(false);
  }
};

function useUserDataLoader() {
  const { userDataState, userDataDispatch } = useUserDataContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAndHandleState = async () => {
      const { user, data, error } = await fetchData(
        userDataDispatch,
        setIsLoading,
        setError
      );
      setUser(user);
      setData(data);
    };

    fetchDataAndHandleState();
  }, [userDataState.change]);

  return [user, data, isLoading, error];
}

export default useUserDataLoader;
