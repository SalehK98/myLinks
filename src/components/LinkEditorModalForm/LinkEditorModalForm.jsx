import React from "react";
import styles from "../../styles/LinkEditorModalForm.module.css"; // Import the CSS module
import editIcon from "../../assets/icons/edit_FILL0_wght400_GRAD0_opsz24.svg";
import linkIcon from "../../assets/icons/link_FILL0_wght400_GRAD0_opsz24.svg";

const inputs = [
  {
    label: "Title",
    type: "text",
    name: "title",
    icon: editIcon,
  },
  {
    label: "Link",
    type: "url",
    name: "link",
    icon: linkIcon,
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

export default function LinkEditorModalForm({ onCloseModal }) {
  return (
    <form
      className={styles.linkEditorForm}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
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
                defaultValue=""
              >
                <option disabled value="" hidden>
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
            <>
              <label htmlFor={input.name}>
                {/* <img src={input.icon} /> */}
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  placeholder={input.label}
                  className={styles.inputField}
                  required={input.type !== "checkbox" && true}
                ></input>
                {input.type === "checkbox" && input.label}
              </label>
            </>
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
            onCloseModal(false);
          }}
        >
          Cancel
        </button>
        <button className={styles.saveButton}>Save</button>
      </div>
    </form>
  );
}
