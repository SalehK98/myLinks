import React, { useEffect, useState } from "react";
// Import the getAllDataForSingleUSer function
import firestoreServices from "../services/firestoreServices";

function FirestoreDataComponent() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectionData = async () => {
      setIsLoading(true);
      try {
        const collectionData =
          await firestoreServices.getAllDataForSingleUSer();
        setData(collectionData);
        setError(null);
        console.log(collectionData);
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
        {data.map((item) => (
          <li key={item.id}>
            {item.title}, {item.url}
          </li>
        ))}
      </ul>
    </>
  );
}

export default FirestoreDataComponent;
