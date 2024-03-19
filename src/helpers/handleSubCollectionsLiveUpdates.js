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
  console.log("entered handle ");
  const handleAdded = ({ doc }) => {
    // console.log(userDataDispatch);
    if (subCollection === CATEGORY_SUB_COLLECTION) {
      if (userDataState.categories.includes(doc.id)) {
        console.log("category exits", doc.id);
        return;
      }
      console.log("categories from state", userDataState.categories);
      console.log(
        "categoriesWithLinks from state",
        userDataState.categoriesWithLinks
      );
      console.log("category", doc.id, " does not exist");
      const categoriesArray = [...userDataState.categories];
      console.log("categories temp array", categoriesArray);
      const categoriesWithLinksObj = { ...userDataState.categoriesWithLinks };
      console.log("categoriesWithLinks temp obj", categoriesWithLinksObj);
      const newCategory = doc.id;
      console.log("new category", newCategory);
      const tempArr = [...categoriesArray, newCategory].sort();
      console.log("temp array - sorted", tempArr);
      categoriesWithLinksObj[newCategory] = {
        id: newCategory,
        urls: [],
      };
      console.log(
        "categoriesWithLinksObj after adding new category",
        categoriesWithLinksObj
      );
      const sortedCategoriesWithLinks = {};
      console.log("sortedCategoriesWithLinks", sortedCategoriesWithLinks);
      Object.entries(categoriesWithLinksObj)
        .sort()
        .forEach((arr) => {
          sortedCategoriesWithLinks[arr[0]] = arr[1];
        });
      console.log(
        "sortedCategoriesWithLinks after sorting",
        sortedCategoriesWithLinks
      );

      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: sortedCategoriesWithLinks,
      });
      console.log(
        "user data state access for categories array",
        userDataState.categories
      );
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES,
        payload: tempArr,
      });
      console.log(
        "user data state access for obj",
        userDataState.categoriesWithLinks
      );
    } else if (subCollection === URLS_SUB_COLLECTION) {
      if (searchLinkWithId(userDataState.categoriesWithLinks, doc.id)) {
        console.log("link does exist", doc.id);
        return;
      }
      console.log("categories from state", userDataState.categories);
      console.log(
        "categoriesWithLinks from state",
        userDataState.categoriesWithLinks
      );
      console.log("link does not exist");
      const categoriesWithLinksTempObj = {
        ...userDataState.categoriesWithLinks,
      };
      console.log("categoriesWithLinksTempObj", categoriesWithLinksTempObj);
      const newLinkObj = doc.data();
      console.log("new link obj", doc.data());
      newLinkObj["id"] = doc.id;
      console.log("new link obj after adding id", newLinkObj);
      if (categoriesWithLinksTempObj[newLinkObj.categoryName]?.urls) {
        // console.log();
        categoriesWithLinksTempObj[newLinkObj.categoryName].urls.push(
          newLinkObj
        );
        console.log(
          "obj after checking for category and urls and adding link",
          categoriesWithLinksTempObj
        );

        userDataDispatch({
          type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
          payload: categoriesWithLinksTempObj,
        });
        console.log(
          "get access form user data state",
          userDataDispatch.categoriesWithLinks
        );
      }
      // categoriesWithLinksTempObj[newLinkObj.categoryName]?.urls
      //   ? categoriesWithLinksTempObj[newLinkObj.categoryName].urls.push(
      //       newLinkObj
      //     )
      //   : null;
      // console.log(
      //   "obj after checking for category and urls and adding link",
      //   categoriesWithLinksTempObj
      // );

      // userDataDispatch({
      //   type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
      //   payload: categoriesWithLinksTempObj,
      // });
      // console.log(
      //   "get access form user data state",
      //   userDataDispatch.categoriesWithLinks
      // );
    }
    console.log(
      "------------------------------------------------------------------------------"
    );
  };

  const handleModified = ({ doc }) => {
    console.log("in modified");
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
    if (!userDataState.categories.includes(doc.id)) {
      console.log("category does not exits", doc.id);
      console.log("categories from state", userDataState.categories);
      return;
    }
    console.log("category does exist", doc.id);
    if (subCollection === CATEGORY_SUB_COLLECTION) {
      console.log("categories from state", userDataState.categories);
      console.log(
        "categoriesWithLinks from state",
        userDataState.categoriesWithLinks
      );
      const tempArr = [...userDataState.categories]
        .filter((el) => el !== doc.id)
        .sort();
      console.log("temp arr", tempArr);
      const tempObj = { ...userDataState.categoriesWithLinks };
      console.log("temp obj", tempObj);
      delete tempObj[doc.id];
      console.log("temp obj after delete", tempObj);

      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES,
        payload: tempArr,
      });
      console.log("categories from state", userDataState.categories);
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: tempObj,
      });
      console.log("links form state", userDataState.categoriesWithLinks);
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
    console.log("entered check if server");
    snapshot.docChanges().forEach((change) => {
      console.log("entered loop");
      handleChange(change);
    });
  }
}

export default handleSubCollectionsLiveUpdates;
