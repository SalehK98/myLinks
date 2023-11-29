import { useState, useEffect } from "react";
import styles from "../../styles/CategoriesBox.module.css"; // Import the CSS module
import { useUserDataContext } from "../../contexts/userDataContext";
import firestoreServices from "../../services/firestoreServices";
import { Tooltip } from "react-tooltip";
import * as ActionTypes from "../../contexts/actionTypes";
// import SearchBar from "../SearchBar/SearchBar";

export default function CategoriesBox() {
  const [editing, setEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isEditModeButton, setIsEditModeButton] = useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { userDataState, userDataDispatch } = useUserDataContext();
  const userEmail = userDataState.user.email;
  const [localCategories, setLocalCategories] = useState([
    ...userDataState.categories,
  ]);

  const categoriesWithLinks = userDataState.categoriesWithLinks;

  const toggleClass = () => {
    setIsEditModeButton(!isEditModeButton); // Toggle the state
    setNewCategory("");
    setEditing(!editing);
    // editing
    //   ? userDataDispatch({
    //       type: ActionTypes.SET_CHANGE,
    //       payload: userDataState.change + 1,
    //     })
    //   : "";
  };

  const handleDeleteCategory = async (categoryToDelete) => {
    try {
      await firestoreServices.deleteCategory(userEmail, categoryToDelete);
      const tempArr = localCategories
        .filter((el) => el !== categoryToDelete)
        .sort();
      delete categoriesWithLinks[categoryToDelete];
      userDataDispatch({ type: ActionTypes.SET_CATEGORIES, payload: tempArr });
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: categoriesWithLinks,
      });
      setLocalCategories(tempArr);
    } catch (error) {
      console.error("sth went wrong", error.message);
    } finally {
      setTimeout(() => {
        alert("category deleted successfully");
      }, 100);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        await firestoreServices.addNewCategory(
          userDataState.user.email,
          newCategory
        );
        setLocalCategories((prev) => [...prev, newCategory].sort());
        categoriesWithLinks[newCategory] = { id: newCategory, urls: [] };
        const sortedCategoriesWithLinks = {};
        Object.entries(categoriesWithLinks)
          .sort()
          .forEach((arr) => {
            sortedCategoriesWithLinks[arr[0]] = arr[1];
          });
        userDataDispatch({
          type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
          payload: sortedCategoriesWithLinks,
        });
        console.log("categoriesWithLinks", categoriesWithLinks);
      } catch (error) {
        // console.error("Error adding a new category:", error);
        setIsTooltipOpen(true);
      } finally {
        setNewCategory("");
        setTimeout(() => {
          setIsTooltipOpen(false);
        }, 1500);
        setTimeout(() => {
          alert("category added successfully");
        }, 100);
      }
    }
  };

  const changeActiveCategory = (categoryToBeActive) => {
    !editing &&
      // userDataDispatch({
      //   type: ActionTypes.SET_ACTIVE_CATEGORY,
      //   payload: categoryToBeActive,
      // });
      userDataDispatch({
        type: ActionTypes.SET_PREV_ACTIVE_CATEGORY,
        payload: categoryToBeActive,
      });
  };

  const buttonClass = isEditModeButton ? styles.editButton : styles.doneButton;

  useEffect(() => {
    console.log(localCategories);
  }, [localCategories]);

  return (
    <div className={styles.CategoriesBox}>
      <div className={styles.boxTitle}>
        <h2>Categories</h2>
        <button onClick={toggleClass} className={buttonClass}></button>
      </div>

      <div className={styles.ulWrapper}>
        {editing && (
          <div className={styles.addCategoryContainer}>
            <input
              type="text"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              maxLength="40"
              data-tooltip-id="tooltip"
              onMouseEnter={() => setIsTooltipOpen(false)}
            />
            <button onClick={handleAddCategory}>Add</button>

            <Tooltip
              id="tooltip"
              place="bottom"
              content={`category already exists`}
              variant="info"
              isOpen={isTooltipOpen}
            />
          </div>
        )}
        {/* {!editing && <SearchBar />} */}
        <ul>
          {!editing && (
            <li
              key="showAll"
              id="showAll"
              onClick={() => changeActiveCategory("all")}
              className={
                userDataState.prevActiveCategory === "all"
                  ? styles.activeCategory
                  : ""
              }
            >
              Show All
            </li>
          )}

          {localCategories.map((category, index) => (
            <li
              key={index}
              onClick={() => changeActiveCategory(category)}
              className={
                !editing && userDataState.prevActiveCategory === category
                  ? styles.activeCategory
                  : ""
              }
            >
              <span>{category}</span>
              {editing && (
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDeleteCategory(category);
                  }}
                ></button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
