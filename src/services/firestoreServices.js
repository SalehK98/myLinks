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
  writeBatch,
  onSnapshot,
} from "firebase/firestore";
import { firestoreDb } from "../firebase/firebaseConfig";
import {
  PARENT_COLLECTION_NAME,
  CATEGORY_SUB_COLLECTION,
  URLS_SUB_COLLECTION,
} from "../firebase/constants";
const email = "mylinks.test.s@gmail.com";

const checkUserExists = async (email) => {
  console.log("called -> checkUserExists()");
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
  const userQuerySnapshot = await getDoc(userDocRef);
  const userData = userQuerySnapshot.data();
  return [userQuerySnapshot.exists(), userData];
};

const checkIfUserPaid = async (email) => {
  console.log("called -> checkIfUserPaid()");
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
  const userQuerySnapshot = await getDoc(userDocRef);
  const userData = userQuerySnapshot.data();
  // const userPaymentDate = userData.paid;
  // const date = new Date(userPaymentDate);
  // console.log(date);
  return userData.paid;
};

// Function to fetch user data
const getUserData = async (email) => {
  console.log("called -> getUserData()");
  const [ifUser, snapshotData] = await checkUserExists(email);

  if (ifUser) {
    // console.log("User Document data:", userQuerySnapshot.data());
    return snapshotData;
  } else {
    // console.log("No such user document!");
    return null; // Or handle the absence of user data as needed.
  }
};

// Function to fetch data from subcollections
const getSubcollectionData = async (userDocRef, subCollections) => {
  console.log("called -> getSubcollectionData()");

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
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);

  const userInfo = await getUserData(email);
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
  console.log("called -> addNewLink()");

  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
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

export const updateLink = async (email, oldLink, newLink) => {
  console.log("called -> updateLink()");
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
  const urlDocRef = doc(userDocRef, URLS_SUB_COLLECTION, oldLink.id);
  try {
    await setDoc(urlDocRef, newLink);
    console.log("link data updated");
    if (oldLink.categoryName === newLink.categoryName) return;
    const oldCategoryDocRef = doc(
      userDocRef,
      CATEGORY_SUB_COLLECTION,
      oldLink.categoryName
    );
    const newCategoryDocRef = doc(
      userDocRef,
      CATEGORY_SUB_COLLECTION,
      newLink.categoryName
    );

    const batch = writeBatch(firestoreDb);

    //remove url reference from old category
    batch.update(oldCategoryDocRef, { urls: arrayRemove(urlDocRef) });
    //add url reference to new category
    batch.update(newCategoryDocRef, { urls: arrayUnion(urlDocRef) });

    //commit the batch
    await batch.commit();
    console.log("updated categories reference successfully");
  } catch (error) {
    console.error("updating link failed", error.message);
  }
};

export const deleteLink = async (email, link) => {
  console.log("deleteLink() -> called.");
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
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
  console.log("called -> addNewCategory()");
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
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
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
  const categoryDocRef = doc(userDocRef, CATEGORY_SUB_COLLECTION, categoryName);

  try {
    const categoryQuerySnapshot = await getDoc(categoryDocRef);
    if (!categoryQuerySnapshot.exists()) {
      console.error("Category does not exist");
      return; // Category doesn't exist, nothing to delete
    }
    const urlsReferences = categoryQuerySnapshot.data().urls || [];
    const batch = writeBatch(firestoreDb);

    // Delete the documents from the "URLs" collection
    urlsReferences.forEach(async (urlRef) => {
      batch.delete(urlRef);
    });
    // Delete the category document itself, no need to update urls array
    batch.delete(categoryDocRef);

    // Commit the batch
    await batch.commit();
    console.log("category deleted successfully");
  } catch (error) {
    console.error("failed to delete category", error.message);
  }
};

export const subscribeToUserDocumentUpdates = (email, handleUpdates) => {
  console.log("subscribeToUserDocumentUpdates() -> called.");
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
  const unsubscribe = onSnapshot(
    userDocRef,
    (userDocSnapshot) => {
      console.log("userSnapshot -> currentData", userDocSnapshot.data());
      const userData = userDocSnapshot.data();
      handleUpdates(userData.paid, userData.paymentUpdateDate);
    },
    (error) => {
      console.log("Error subscribing to document updates:", error);
    }
  );
  return unsubscribe;
};

export const subscribeToSubCollectionsUpdates = async (
  email,
  subCollection,
  callback,
  userDataState,
  userDataDispatch,
  setIsLoading
) => {
  console.log("subscribeToSubCollectionsUpdates() -> called.");
  const userDocRef = doc(firestoreDb, PARENT_COLLECTION_NAME, email);
  const subCollectionRef = collection(userDocRef, subCollection);
  const unsubscribe = onSnapshot(
    subCollectionRef,
    { includeMetadataChanges: true },
    (subCollectionSnapshot) => {
      callback(
        subCollectionSnapshot,
        subCollection,
        userDataState,
        userDataDispatch,
        setIsLoading
      );
    },
    (error) => {
      console.log(
        `Error subscribing to subcollection: ${subCollection} updates:`,
        error
      );
    }
  );
  return unsubscribe;
};

export default {
  checkUserExists,
  checkIfUserPaid,
  getAllDataForSingleUser,
  addNewCategory,
  deleteCategory,
  addNewLink,
  updateLink,
  deleteLink,
  subscribeToUserDocumentUpdates,
  subscribeToSubCollectionsUpdates,
};
