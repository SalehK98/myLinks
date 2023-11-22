import { useState } from "react";

function useForm(initialValue) {
  const [values, setValues] = useState(initialValue);

  const handleChange = (event, isChecked, setIsChecked) => {
    const { name, type } = event.target;
    let { value } = event.target;
    if (type === "checkbox") {
      setIsChecked({
        ...isChecked,
        [name]: !isChecked[name],
      });
    }
    value = type === "checkbox" ? (value === "0" ? 1 : 0) : value;
    setValues({ ...values, [name]: value });
  };

  const resetFrom = () => {
    setValues(initialValue);
  };

  return [values, handleChange, resetFrom];
}

export default useForm;
