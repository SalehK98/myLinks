import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import db from "../firebase/firebaseConfig";
import {
  PARENT_COLLECTION_NAME,
  CATEGORY_SUB_COLLECTION,
  URLS_SUB_COLLECTION,
} from "../firebase/constants";
const email = "mylinks.test.s@gmail.com";

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
      subCollection === CATEGORY_SUB_COLLECTION
        ? categoriesSubCollectionData.push({ id: doc.id, ...doc.data() })
        : urlsSubCollectionData.push({ id: doc.id, ...doc.data() });
    });
  }

  return [categoriesSubCollectionData, urlsSubCollectionData];
};

// Function to fetch all data for a single user
export const getAllDataForSingleUser = async () => {
  console.log("called -> getAllDataForSingleUser()");
  const userDocRef = doc(db, PARENT_COLLECTION_NAME, email);

  const userInfo = await getUserData(userDocRef);
  if (!userInfo) {
    return null; // Or handle the absence of user data as needed.
  }
  const subCollections = [CATEGORY_SUB_COLLECTION, URLS_SUB_COLLECTION];
  const subCollectionData = await getSubcollectionData(
    userDocRef,
    subCollections
  );

  return [userInfo, subCollectionData];
};

export const addNewLink = async (email, linkId, linkObj) => {
  const userDocRef = doc(db, PARENT_COLLECTION_NAME, email);
  const categoryDocRef = doc(
    userDocRef,
    CATEGORY_SUB_COLLECTION,
    linkObj.categoryName
  );
  const urlsSubCollectionRef = collection(userDocRef, URLS_SUB_COLLECTION);
  const newLinKDocRef = doc(urlsSubCollectionRef, linkId);

  try {
    await setDoc(newLinKDocRef, linkObj);
    await updateDoc(categoryDocRef, {
      urls: arrayUnion(newLinKDocRef),
    });
    console.log("new link added successfully");
  } catch (error) {
    console.error("adding a new link failed", error.message);
  }
};

export const deleteLink = async (email, link) => {
  console.log("deleteLink() -> called.");
  const userDocRef = doc(db, PARENT_COLLECTION_NAME, email);
  const categoryDocRef = doc(
    userDocRef,
    CATEGORY_SUB_COLLECTION,
    link.categoryName
  );
  const urlDocRef = doc(userDocRef, URLS_SUB_COLLECTION, link.id);
  try {
    await deleteDoc(urlDocRef);
    await updateDoc(categoryDocRef, {
      urls: arrayRemove(urlDocRef),
    });
    console.log("url document deleted successfully");
  } catch (error) {
    console.error("deleting url document failed", error.message);
  }
};

export const addNewCategory = async (email, categoryName) => {
  console.log("called -> createNewCategory()");
  const userDocRef = doc(db, PARENT_COLLECTION_NAME, email);
  const categoryDocRef = doc(userDocRef, CATEGORY_SUB_COLLECTION, categoryName);
  try {
    // Check if the category already exists
    const categorySnapshot = await getDoc(categoryDocRef);
    if (categorySnapshot.exists()) {
      throw new Error("category already exists");
    }

    // Create the category with an empty array of URLs
    await setDoc(categoryDocRef, { urls: [] });
    console.log("createNewCategory: added", categoryName);
  } catch (error) {
    console.error("createNewCategory: failed", error.message);
    throw error; // Re-throw the error for higher-level handling, if needed
  }
};

export const deleteCategory = async (email, categoryName) => {
  console.log("deleteCategory() -> called.");
  const userDocRef = doc(db, PARENT_COLLECTION_NAME, email);
  const categoryDocRef = doc(userDocRef, CATEGORY_SUB_COLLECTION, categoryName);
  try {
  } catch (error) {}
};

export default {
  getAllDataForSingleUser,
  addNewCategory,
  addNewLink,
  deleteLink,
};
