import * as ActionTypes from "../contexts/actionTypes";
import {
  CATEGORY_SUB_COLLECTION,
  URLS_SUB_COLLECTION,
} from "../firebase/constants";
import { searchLinkWithId } from "../services/utilityServices";

/**
 * Handles live updates for sub-collections in Firestore.
 * @param {Snapshot} snapshot - The Firestore snapshot.
 * @param {string} subCollection - The sub-collection name.
 * @param {Object} userDataState - The user data state.
 * @param {Function} userDataDispatch - The user data dispatch function.
 */

function handleSubCollectionsLiveUpdates(
  snapshot,
  subCollection,
  userDataState,
  userDataDispatch
) {
  const handleInitialSnapshotData = () => {};

  const handleAdded = ({ doc }) => {
    if (subCollection === CATEGORY_SUB_COLLECTION) {
      if (userDataState.categories.includes(doc.id)) return;
      console.log("category does not exist");
      const categoriesArray = [...userDataState.categories];
      const categoriesWithLinks = { ...userDataState.categoriesWithLinks };
      const newCategory = doc.id;
      const tempArr = [...categoriesArray, newCategory].sort();
      categoriesWithLinks[newCategory] = {
        id: newCategory,
        urls: [],
      };
      const sortedCategoriesWithLinks = {};
      Object.entries(categoriesWithLinks)
        .sort()
        .forEach((arr) => {
          sortedCategoriesWithLinks[arr[0]] = arr[1];
        });
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: categoriesWithLinks,
      });
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES,
        payload: tempArr,
      });
    } else if (subCollection === URLS_SUB_COLLECTION) {
      if (searchLinkWithId(userDataState.categoriesWithLinks, doc.id)) return;
      console.log("link does not exist");
      const categoriesWithLinks = { ...userDataState.categoriesWithLinks };
      const newLinkObj = doc.data();
      newLinkObj["id"] = doc.id;
      categoriesWithLinks[newLinkObj.categoryName]?.urls
        ? categoriesWithLinks[newLinkObj.categoryName].urls.push(newLinkObj)
        : null;

      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: categoriesWithLinks,
      });
    }
  };

  const handleModified = ({ doc }) => {
    // If the modified document is from the category sub-collection, return
    if (subCollection === CATEGORY_SUB_COLLECTION) return;

    const categoriesWithLinks = { ...userDataState.categoriesWithLinks };
    const newLinkObj = doc.data();
    const linkId = doc.id;
    const linkNewCategory = newLinkObj.categoryName;
    newLinkObj["id"] = linkId;
    console.log(newLinkObj);
    const linkOldCategory =
      searchLinkWithId(categoriesWithLinks, linkId)?.categoryName ?? null;

    // If the link's category has changed
    if (linkOldCategory && linkNewCategory !== linkOldCategory) {
      // Remove the link from the old category
      categoriesWithLinks[linkOldCategory].urls = categoriesWithLinks[
        linkOldCategory
      ].urls.filter((linkObj) => linkObj.id !== linkId);

      // Add the link to the new category
      categoriesWithLinks[linkNewCategory].urls.push(newLinkObj);
    }

    // If the link's category hasn't changed, update the link in the same category
    if (linkOldCategory && linkNewCategory === linkOldCategory) {
      categoriesWithLinks[linkNewCategory].urls = categoriesWithLinks[
        linkNewCategory
      ].urls.map((linkObj) => (linkObj.id === linkId ? newLinkObj : linkObj));
    }

    // Update the state with the modified categoriesWithLinks
    userDataDispatch({
      type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
      payload: categoriesWithLinks,
    });
  };

  const handleRemoved = ({ doc }) => {
    if (subCollection === CATEGORY_SUB_COLLECTION) {
      const tempArr = [...userDataState.categories]
        .filter((el) => el !== doc.id)
        .sort();

      const tempObj = { ...userDataState.categoriesWithLinks };
      delete tempObj[doc.id];

      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES,
        payload: tempArr,
      });
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: tempObj,
      });
    } else if (subCollection === URLS_SUB_COLLECTION) {
      const LinkId = doc.id;
      const category = doc.data().categoryName;
      const tempObj = { ...userDataState.categoriesWithLinks };
      if (!tempObj[category]) return;
      tempObj[category].urls = tempObj[category].urls.filter(
        (linkObj) => linkObj.id !== LinkId
      );
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: tempObj,
      });
    }
  };

  const handleChange = (change) => {
    switch (change.type) {
      case "added":
        console.log("Document added with ID: ", change.doc.id);
        handleAdded(change);
        break;
      case "modified":
        console.log("Document modified with ID:", change.doc.id);
        handleModified(change);
        break;
      case "removed":
        console.log("Document removed with ID: ", change.doc.id);
        handleRemoved(change);
        break;
      default:
        break;
    }
  };

  const source = snapshot.metadata.hasPendingWrites ? "Local" : "Server";

  if (source === "Server") {
    snapshot.docChanges().forEach((change) => {
      handleChange(change);
    });
  }
}

export default handleSubCollectionsLiveUpdates;
