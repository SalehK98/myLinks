import React from "react";
import styles from "../../styles/LinkEditorModalForm.module.css"; // Import the CSS module

const inputs = [
  {
    label: "Title",
    type: "text",
    name: "title",
  },
  {
    label: "Link",
    type: "url",
    name: "link",
  },
  {
    label: "Category",
    type: "select",
    name: "categoryDropDown",
  },
  {
    label: "Add to Favorites",
    type: "checkbox",
    name: "addToFavorites",
  },
];

import categoriesList from "../../data/links.json";

export default function LinkEditorModalForm({ onClose }) {
  return (
    <form className={styles.linkEditorForm}>
      {" "}
      {/* Apply the container style */}
      {inputs.map((input) => (
        <div key={input.name} className={styles.formField}>
          {" "}
          {/* Apply form field style */}
          {input.type === "select" ? (
            <>
              <label htmlFor={input.name}></label>
              <select
                name={input.name}
                id={input.name}
                className={styles.inputField}
                required
                // defaultValue=""
              >
                <option
                  disabled
                  selected
                  value=""
                  hidden
                  style={{ color: "red" }}
                >
                  Category
                </option>
                {Object.keys(categoriesList).map((category, idx) => {
                  return (
                    <option value={category} key={idx}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <label htmlFor={input.name}>
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                placeholder={input.label}
                className={styles.inputField}
              ></input>
              {input.type === "checkbox" && input.label}
            </label>
          )}
        </div>
      ))}
      <div className={styles.buttonContainer}>
        {" "}
        {/* Apply button container style */}
        <button
          className={styles.cancelButton}
          onClick={(event) => {
            event.preventDefault();
            document.body.style.overflow = "auto";
            onClose(false);
          }}
        >
          Cancel
        </button>
        <button className={styles.saveButton}>Save</button>
      </div>
    </form>
  );
}
