import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import { PARENT_COLLECTION_NAME } from "../firebase/constants";

// Function to fetch user data
const getUserData = async (userDocRef) => {
  const userQuerySnapshot = await getDoc(userDocRef);

  if (userQuerySnapshot.exists()) {
    // console.log("User Document data:", userQuerySnapshot.data());
    return userQuerySnapshot.data();
  } else {
    // console.log("No such user document!");
    return null; // Or handle the absence of user data as needed.
  }
};

// Function to fetch data from subcollections
const getSubcollectionData = async (userDocRef, subCollections) => {
  const categoriesSubCollectionData = [];
  const urlsSubCollectionData = [];

  for (const subCollection of subCollections) {
    const subCollectionRef = collection(userDocRef, subCollection);
    const querySnapshot = await getDocs(subCollectionRef);

    querySnapshot.forEach((doc) => {
      subCollection === "categories"
        ? categoriesSubCollectionData.push({ id: doc.id, ...doc.data() })
        : urlsSubCollectionData.push({ id: doc.id, ...doc.data() });
    });
  }

  return [categoriesSubCollectionData, urlsSubCollectionData];
};

// Function to fetch all data for a single user
export const getAllDataForSingleUser = async () => {
  console.log("called -> getAllDataForSingleUser()");
  const userDocRef = doc(
    db,
    PARENT_COLLECTION_NAME,
    "mylinks.test.s@gmail.com"
  );

  const userInfo = await getUserData(userDocRef);
  if (!userInfo) {
    return null; // Or handle the absence of user data as needed.
  }

  const subCollections = ["categories", "urls"];
  const subCollectionData = await getSubcollectionData(
    userDocRef,
    subCollections
  );

  return [userInfo, subCollectionData];
};

export default {
  getAllDataForSingleUser,
};
