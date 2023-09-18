import { useState } from "react";
import categoriesList from "../../data/links.json";
import styles from "../../styles/CategoriesBox.module.css"; // Import the CSS module

export default function CategoriesBox() {
  const catList = Object.keys(categoriesList);
  const [categories, setCategories] = useState(catList);
  const [editing, setEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isEditModeButton, setIsEditModeButton] = useState(true);

  const toggleClass = () => {
    setIsEditModeButton(!isEditModeButton); // Toggle the state
    setEditing(!editing);
  };

  const handleDeleteCategory = (index) => {
    const updatedCategories = [...categories];
    updatedCategories.splice(index, 1);
    setCategories(updatedCategories);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      const updatedCategories = [...categories, newCategory];
      setCategories(updatedCategories);
      setNewCategory("");
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
            />
            <button onClick={handleAddCategory}>Add</button>
          </div>
        )}
        <ul>
          {!editing && (
            <li key="showAll" id="showAll">
              Show All
            </li>
          )}

          {categories.map((category, index) => (
            <li key={index}>
              {category}
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
