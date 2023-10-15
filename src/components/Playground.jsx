import { useEffect, useState } from "react";
// Import the getAllDataForSingleUSer function
import firestoreServices from "../services/firestoreServices";
import transformAllUserData from "../helpers/transformFirestoreData";
import { useUserDataContext } from "../contexts/userDataContext";
import * as ActionTypes from "../contexts/actionTypes";

function FirestoreDataComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { state, dispatch } = useUserDataContext();

  useEffect(() => {
    const fetchCollectionData = async () => {
      setIsLoading(true);
      try {
        const [user, rawCollectionData] =
          await firestoreServices.getAllDataForSingleUser();
        const [categories, categoriesWithLinks] =
          transformAllUserData(rawCollectionData);
        // console.log("raw", rawCollectionData);
        // console.log("transformed", transformedData);
        // setData(transformedData);
        dispatch({ type: ActionTypes.SET_USER, payload: user });
        dispatch({ type: ActionTypes.SET_CATEGORIES, payload: categories });
        dispatch({
          type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
          payload: categoriesWithLinks,
        });
        setError(null);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollectionData();
  }, []);

  if (isLoading) return <>Loading</>;
  if (error) return <>{error}</>;

  return (
    <>
      <h2>Data from Firestore Collection</h2>
      <ul>
        {console.log(state.user.email)}
        {/* {data.map((item) => (
          <li key={item.id}>
            {item.title}, {item.url}
          </li>
        ))} */}
      </ul>
    </>
  );
}

export default FirestoreDataComponent;
