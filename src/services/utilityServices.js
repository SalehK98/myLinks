import { DateTime } from "luxon";

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

export const isValidPaymentDate = (paymentDate) => {
  // Use fromMillis() method to convert timestamp to DateTime object
  const userPaymentDate = DateTime.fromMillis(paymentDate);

  // Set desired timezone for calculations (e.g., UTC)
  const yourTimezone = "UTC";

  // Convert both dates to your chosen timezone for accurate comparison
  const paymentDateInZone = userPaymentDate.setZone(yourTimezone);
  const todayInZone = DateTime.local().setZone(yourTimezone);

  // Use diff() method with 'months' unit to calculate month difference
  const monthsPassed = todayInZone.diff(paymentDateInZone, "months");

  // Check if payment occurred within last month
  const result = Math.floor(monthsPassed.toObject().months) < 1;
  return result;
};

export default {
  validateForm,
  setFormErrors,
  clearError,
  handleChecked,
  simpleStringSearch,
  isValidPaymentDate,
};
