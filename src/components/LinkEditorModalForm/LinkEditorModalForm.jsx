import styles from "../../styles/LinkEditorModalForm.module.css"; // Import the CSS module
import { useUserDataContext } from "../../contexts/userDataContext";
import firestoreServices from "../../services/firestoreServices";
import useForm from "../../hooks/useForm";
import { inputs, initialValues, InputErrorObj } from "../../data/formData";
import utilityServices from "../../services/utilityServices";
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import { useModalContext } from "../../contexts/ModalContext";
import * as ActionTypes from "../../contexts/actionTypes";

export default function LinkEditorModalForm() {
  const { userDataState } = useUserDataContext();
  const { modalState, modalDispatch } = useModalContext();
  const userEmail = userDataState.user.email;
  const [isInputError, setIsInputError] = useState(InputErrorObj);
  const [isChecked, setIsChecked] = useState({
    favorite: false,
    private: false,
  });

  const [values, handleChange, resetFrom] = useForm(modalState.currentLinkData);

  useEffect(() => {
    const handleChecked = () => {
      const favoriteChecked = values.favorite === 1 ? true : false;
      const PrivateChecked = values.private === 1 ? true : false;
      const newIsChecked = {
        favorite: favoriteChecked,
        private: PrivateChecked,
      };
      setIsChecked(newIsChecked);
    };

    handleChecked();
  }, []);

  const closeModal = () => {
    document.body.style.overflow = "auto";
    modalDispatch({ type: ActionTypes.SET_IS_MODAL_OPEN, payload: false });
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const inputErrors = utilityServices.validateForm(values);
    console.log(inputErrors);
    if (Object.keys(inputErrors).length > 0) {
      utilityServices.setFormErrors(inputErrors, isInputError, setIsInputError);
      return;
    }
    console.log("Form is valid:", values);
    const timeStampId = new Date().getTime().toString();

    try {
      modalState.modalMode === "add"
        ? await firestoreServices.addNewLink(userEmail, timeStampId, values)
        : await firestoreServices.updateLink(
            userEmail,
            modalState.currentLinkData,
            values
          );
      resetFrom();
    } catch (error) {
      console.error("sth went wrong", error.message);
    } finally {
      closeModal(event);
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
                data-tooltip-id={`tooltip-${input.name}`}
                onChange={(event) =>
                  handleChange(event, isChecked, setIsChecked)
                }
                onFocus={() =>
                  utilityServices.clearError(
                    input.name,
                    isInputError,
                    setIsInputError
                  )
                }
                value={values.categoryName}
              >
                <option disabled value="" hidden>
                  Category
                </option>
                {userDataState.categories.map((category, idx) => {
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
                  checked={isChecked[input.name]}
                  data-tooltip-id={`tooltip-${input.name}`}
                  value={values[input.name]}
                  onChange={(event) =>
                    handleChange(event, isChecked, setIsChecked)
                  }
                  onFocus={() =>
                    utilityServices.clearError(
                      input.name,
                      isInputError,
                      setIsInputError
                    )
                  }
                ></input>
                {input.type === "checkbox" && input.label}
              </label>
            </div>
          )}
          <Tooltip
            id={`tooltip-${input.name}`}
            place="bottom"
            content={isInputError[input.name].message}
            variant="warning"
            isOpen={isInputError[input.name].status}
          />
        </div>
      ))}
      <div className={styles.buttonContainer}>
        {/* Apply button container style */}
        <button
          name="cancel"
          className={styles.cancelButton}
          onClick={(event) => {
            event.preventDefault();
            closeModal();
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
