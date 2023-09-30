import React, { useEffect, useState } from "react";
// import { getAllDataFromCollection } from "./firestore"; // Import the getAllDataFromCollection function
import { getAllDataFromCollection } from "../firebase/firestore";

function FirestoreDataComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchCollectionData = async () => {
      try {
        const collectionName = "users"; // Replace with your actual collection name
        const collectionData = await getAllDataFromCollection(collectionName);
        setData(collectionData);
        // console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCollectionData();
  }, []);

  return (
    <div>
      <h2>Data from Firestore Collection</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.title}, {item.url}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FirestoreDataComponent;
