import { useState } from "react";

function useForm(initialValue) {
  const [values, setValues] = useState(initialValue);

  const handleChange = (event) => {
    const { name, type } = event.target;
    let { value } = event.target;
    value = type === "checkbox" ? (value === "0" ? 1 : 0) : value;
    setValues({ ...values, [name]: value });
  };

  const resetFrom = () => {
    setValues(initialValue);
  };

  return [values, handleChange, resetFrom];
}

export default useForm;
