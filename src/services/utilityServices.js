function validateForm(formValues, inputs) {
  const inputErrors = {};

  function isValidURL(url) {
    const urlPattern =
      /^(https?:\/\/)?([\w\d.-]+\.[\w\d.-]+)+([\w\d.-./?%&=]*)?$/;
    return urlPattern.test(url);
  }

  inputs.forEach((input) => {
    if (input.required && !formValues[input.name]) {
      inputErrors[input.name] = "Please fill out this field.";
    }

    if (
      input.type === "url" &&
      formValues[input.name] &&
      !isValidURL(formValues[input.name])
    ) {
      inputErrors[input.name] = "Please enter a valid URL.";
    }
  });

  return inputErrors;
}

function setFormErrors(inputErrors, isInputError, setIsInputErrors, inputs) {
  const updatedIsInputError = { ...isInputError };

  inputs.forEach((input) => {
    updatedIsInputError[input.name] = {
      status: false,
      message: "",
    };
  });

  Object.entries(inputErrors).forEach((inputError) => {
    const inputName = inputError[0];
    const inputMessage = inputError[1];
    updatedIsInputError[inputName] = {
      status: true,
      message: inputMessage,
    };
  });
  setIsInputErrors(updatedIsInputError);
}

function clearError(inputName, isInputError, setIsInputError) {
  setIsInputError({
    ...isInputError,
    [inputName]: {
      status: false,
      message: "",
    },
  });
}

export const handleChecked = (values, setIsChecked) => {
  const favoriteChecked = values.favorite === 1 ? true : false;
  const PrivateChecked = values.private === 1 ? true : false;
  const newIsChecked = {
    favorite: favoriteChecked,
    private: PrivateChecked,
  };
  setIsChecked(newIsChecked);
};

export const simpleStringSearch = (stringArr, searchTerm) => {
  console.log("preforming simple string search:", searchTerm);
  return stringArr.filter((str) => str.includes(searchTerm));
};

export default {
  validateForm,
  setFormErrors,
  clearError,
  handleChecked,
  simpleStringSearch,
};
