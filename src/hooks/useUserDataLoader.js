import { useState, useEffect } from "react";
import { useUserDataContext } from "../contexts/userDataContext";
import firestoreServices, {
  getAllDataForSingleUser,
} from "../services/firestoreServices";
import transformAllUserData from "../helpers/transformFirestoreData";
import * as ActionTypes from "../contexts/actionTypes";
import { CATEGORY_SUB_COLLECTION } from "../firebase/constants";
import handleSubCollectionsLiveUpdates from "../helpers/handleSubCollectionsLiveUpdates";
import { useLoginContext } from "../contexts/LoginContext";

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
  // setIsLoading,
  // setError,
  // loader_counter,
  // fetch_counter,
  // cleanup_counter
  console.log("entered data loader");
  // loader_counter += 1;
  const { userDataState, userDataDispatch } = useUserDataContext();
  const { loginState } = useLoginContext();
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

  // const userEmail = userDataState.user.email;
  // let categoriesCollectionUnsubscribe;
  // let urlsCollectionUnsubscribe;

  // useEffect(() => {
  //   if (!loginState.isAuthorized) {
  //     console.log("exited before entered");
  //     return;
  //   }
  //   const fetchDataAndHandleState = async () => {
  //     console.log("entered fetch data", fetch_counter);
  //     fetch_counter += 1;
  //     try {
  //       // setIsLoading(true);
  //       categoriesCollectionUnsubscribe =
  //         await firestoreServices.subscribeToSubCollectionsUpdates(
  //           userEmail,
  //           CATEGORY_SUB_COLLECTION,
  //           handleSubCollectionsLiveUpdates,
  //           userDataState,
  //           userDataDispatch
  //         );
  //       urlsCollectionUnsubscribe =
  //         firestoreServices.subscribeToSubCollectionsUpdates(
  //           userEmail,
  //           URLS_SUB_COLLECTION,
  //           handleSubCollectionsLiveUpdates,
  //           userDataState,
  //           userDataDispatch
  //         );
  //       // setError(false);
  //     } catch (error) {
  //       // setError(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //     setUser(userDataState.user);
  //     setData(userDataState.categoriesWithLinks);
  //   };

  //   fetchDataAndHandleState();

  //   return () => {
  //     console.log("entered clean up fore live updates", cleanup_counter);
  //     cleanup_counter += 1;
  //     if (categoriesCollectionUnsubscribe) categoriesCollectionUnsubscribe();
  //     // if (urlsCollectionUnsubscribe) urlsCollectionUnsubscribe();
  //   };
  // });
  return [user, data];
}

export default useUserDataLoader;
