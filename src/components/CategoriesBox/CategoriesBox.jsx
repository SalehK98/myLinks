import { useState, useEffect } from "react";
import styles from "../../styles/CategoriesBox.module.css"; // Import the CSS module
import { useUserDataContext } from "../../contexts/userDataContext";
import firestoreServices from "../../services/firestoreServices";
import { Tooltip } from "react-tooltip";
import * as ActionTypes from "../../contexts/actionTypes";
import Overlay from "../Overlay/Overlay";
import Loader from "../loader/Loader";
// import SearchBar from "../SearchBar/SearchBar";
import editIcon from "../../assets/icons/edit_FILL0_wght400_GRAD0_opsz24.svg";
import doneIcon from "../../assets/icons/done_FILL0_wght400_GRAD0_opsz24.svg";
import deleteIcon from "../../assets/icons/delete_FILL0_wght400_GRAD0_opsz24.svg";

export default function CategoriesBox() {
  const [editing, setEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { userDataState, userDataDispatch } = useUserDataContext();
  const userEmail = userDataState.user.email;
  const [localCategories, setLocalCategories] = useState([
    ...userDataState.categories,
  ]);

  const [isOperation, setIsOperation] = useState(false);

  const categoriesWithLinks = userDataState.categoriesWithLinks;

  const toggleClass = () => {
    setNewCategory("");
    setEditing(!editing);
  };

  useEffect(() => {
    let timeout;

    const startLoading = () => {
      timeout = setTimeout(() => {
        setIsOperation(false);
      }, 500); // Set your desired delay here (in milliseconds)
    };

    // Trigger the asynchronous operation
    startLoading();

    // Cleanup function to clear the timeout
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleDeleteCategory = async (categoryToDelete) => {
    setIsOperation(true);
    // setShowOverlay(true);

    try {
      await firestoreServices.deleteCategory(userEmail, categoryToDelete);
      const tempArr = localCategories
        .filter((el) => el !== categoryToDelete)
        .sort();
      setLocalCategories(tempArr);
      delete categoriesWithLinks[categoryToDelete];

      userDataDispatch({ type: ActionTypes.SET_CATEGORIES, payload: tempArr });
      userDataDispatch({
        type: ActionTypes.SET_CATEGORIES_WITH_LINKS,
        payload: categoriesWithLinks,
      });
    } catch (error) {
      console.error("sth went wrong", error.message);
    } finally {
      setIsOperation(false);
      setShowOverlay(false);
      setTimeout(() => {
        alert("category deleted successfully");
      }, 100);
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      setIsOperation(true);
      try {
        await firestoreServices.addNewCategory(
          userDataState.user.email,
          newCategory
        );
        const tempArr = [...localCategories, newCategory].sort();
        setLocalCategories(tempArr);
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
        userDataDispatch({
          type: ActionTypes.SET_CATEGORIES,
          payload: tempArr,
        });
        console.log(
          "categoriesWithLinks",
          categoriesWithLinks,
          localCategories
        );
      } catch (error) {
        // console.error("Error adding a new category:", error);
        setIsTooltipOpen(true);
      } finally {
        setIsOperation(false);
        setShowOverlay(false);
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
      userDataDispatch({
        type: ActionTypes.SET_PREV_ACTIVE_CATEGORY,
        payload: categoryToBeActive,
      });
  };

  const buttonClass = editing ? styles.doneButton : styles.editButton;

  useEffect(() => {
    console.log(localCategories);
  }, [localCategories]);

  return (
    <div className={styles.CategoriesBox}>
      <div className={styles.boxTitle}>
        <h2>Categories</h2>
        <button onClick={toggleClass} className={buttonClass}>
          <img
            src={editing ? doneIcon : editIcon}
            alt={editing ? "Done" : "Edit"}
          />
        </button>
      </div>

      <div className={styles.ulWrapper}>
        {isOperation && (
          <Overlay
            overlayStyleClass="categoriesBoxOverlay"
            overlayComponent="categoriesBox"
          >
            <Loader />
          </Overlay>
        )}
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
                >
                  {editing && <img src={deleteIcon} alt="Delete" />}
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
