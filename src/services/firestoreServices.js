import { collection, getDocs } from "firebase/firestore";

// Initialize Firestore
import db from "../firebase/firebaseConfig";
import { PARENT_COLLECTION_NAME } from "../firebase/constants";

// Function to fetch all data from a Firestore collection
export const getAllDataForSingleUSer = async () => {
  console.log("called -> getAllDataForSingleUSer()");
  const data = [];
  const subCollections = ["categories", "urls"];
  try {
    // Query a reference to a subcollection
    for (const subCollection of subCollections) {
      const querySnapshot = await getDocs(
        collection(
          db,
          PARENT_COLLECTION_NAME,
          "mylinks.test.s@gmail.com",
          subCollection
        )
      );
      // console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({ id: doc.id, ...doc.data() });
      });
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default {
  getAllDataForSingleUSer,
};
