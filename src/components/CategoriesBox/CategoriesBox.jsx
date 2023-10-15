import { useState } from "react";
import styles from "../../styles/CategoriesBox.module.css"; // Import the CSS module
import { useUserDataContext } from "../../contexts/userDataContext";
import firestoreServices from "../../services/firestoreServices";
import { Tooltip } from "react-tooltip";

export default function CategoriesBox() {
  const [editing, setEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isEditModeButton, setIsEditModeButton] = useState(true);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { state } = useUserDataContext();

  const toggleClass = () => {
    setIsEditModeButton(!isEditModeButton); // Toggle the state
    setNewCategory("");
    setEditing(!editing);
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...state.categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      try {
        await firestoreServices.addNewCategory(state.user.email, newCategory);
      } catch (error) {
        console.error("Error adding a new category:", error);
        setIsTooltipOpen(true);
      } finally {
        setNewCategory("");
        setTimeout(() => {
          setIsTooltipOpen(false);
        }, 5000);
      }
    }
  };

  const buttonClass = isEditModeButton ? styles.editButton : styles.doneButton;

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
        <ul>
          {!editing && (
            <li key="showAll" id="showAll">
              Show All
            </li>
          )}

          {state.categories.map((category, index) => (
            <li
              key={index}
              onClick={() => {
                console.log(category, "was clicked");
              }}
            >
              <span>{category}</span>
              {editing && (
                <button onClick={() => handleDeleteCategory(index)}></button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
