import styles from "../../styles/LinkEditorModalForm.module.css"; // Import the CSS module
import { useUserDataContext } from "../../contexts/userDataContext";
import firestoreServices from "../../services/firestoreServices";
import useForm from "../../hooks/useForm";
import { inputs, initialValues } from "../../data/formData";

export default function LinkEditorModalForm({ onCloseModal }) {
  const { state } = useUserDataContext();
  const userEmail = state.user.email;
  const [values, handleChange, resetFrom] = useForm(initialValues);

  const handleSave = async (event) => {
    if (event.currentTarget.checkValidity())
      console.log(event.currentTarget.checkValidity());
    event.preventDefault();
    const timeStampId = new Date().getTime().toString();
    try {
      await firestoreServices.addNewLink(userEmail, timeStampId, values);
      resetFrom();
    } catch (error) {
      console.error("sth went wrong", error.message);
    } finally {
      document.body.style.overflow = "auto";
      onCloseModal(false);
    }
  };

  return (
    <form
      className={styles.linkEditorForm}
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      {/* Apply the container style */}
      {inputs.map((input) => (
        <div key={input.name} className={styles.formField}>
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
                onChange={handleChange}
                value={values.categoryName}
              >
                <option disabled value="" hidden>
                  Category
                </option>
                {state.categories.map((category, idx) => {
                  return (
                    <option value={category} key={idx}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </>
          ) : (
            <div>
              <label htmlFor={input.name}>
                {/* <img src={input.icon} /> */}
                <input
                  type={input.type}
                  name={input.name}
                  id={input.name}
                  placeholder={input.label}
                  className={styles.inputField}
                  required={input.type !== "checkbox" && true}
                  value={values[input.name]}
                  onChange={handleChange}
                ></input>
                {input.type === "checkbox" && input.label}
              </label>
            </div>
          )}
        </div>
      ))}
      <div className={styles.buttonContainer}>
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
        <button
          type="submit"
          className={styles.saveButton}
          onClick={(event) => handleSave(event)}
        >
          Save
        </button>
      </div>
    </form>
  );
}
