import { getFirestore, collection, getDocs } from "firebase/firestore";

// Initialize Firestore
// const db = getFirestore();

import db from "./firebase";

// Function to fetch all data from a Firestore collection
export const getAllDataFromCollection = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, collectionName, "mylinks.test.s@gmail.com", "urls")
    );
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    // console.log("querySnapshot", querySnapshot);
    // console.log("querySnapshot type", typeof querySnapshot);
    console.log("data", data);
    return data;
    // return querySnapshot;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
