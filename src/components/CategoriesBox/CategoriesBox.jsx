// import categories from "../../data/links.json";

// console.log(Object.values(categories));

// export default function CategoriesBox() {
//   return (
//     <div style={{ display: "flex", flexDirection: "column" }}>
//       {Object.keys(categories).map((category) => {
//         return <button key={category}>{category}</button>;
//       })}
//     </div>
//   );
// }
import { useState } from "react";
import styles from "../../styles/CategoriesBox.module.css"; // Import the CSS module

const CategoryBox = () => {
  const [categories, setCategories] = useState([
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
    "Category 9",
    "Category 10",
    "Category 11",
    "Category 12",
    "Category 13",
    "Category 14",
    "Category 15",
    "Category 15",
    "Category 15",
    "Category 15",
    "Category 15",
    "Category 15",
    "Category 15",
    "Category 15",
  ]);
  const [editing, setEditing] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isEditModeButton, setIsEditModeButton] = useState(true);

  // const handleEditClick = () => {

  // };

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
};

export default CategoryBox;
