import { useState, useEffect } from "react";
import { getAllDataFromCollection } from "../firebase/firestore";

function useFetch(url, options, params) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchCollectionData = async () => {
      setIsLoading(true);
      try {
        const response = await getAllDataFromCollection(params);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    return () => {
      second;
    };
  }, [third]);
}
