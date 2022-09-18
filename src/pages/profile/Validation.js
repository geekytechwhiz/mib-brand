/* eslint-disable react/no-string-refs */
import React, { useState, useRef } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

function Validation() {
  const elementRef = useRef("form");
  const formData = {
    email: "",
    password: "",
  };

  const [bankDetails, setBankDetails] = useState(formData);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setBankDetails(() => ({
      ...bankDetails,
      [name]: value,
    }));
  };

  const handleSubmit = () => {};
  return (
    <div>
      Validation
      <ValidatorForm ref={elementRef} onSubmit={handleSubmit}>
        <TextValidator
          label="Email"
          onChange={handleChange}
          name="email"
          value={bankDetails.email}
          validators={["required", "isEmail"]}
          errorMessages={["this field is required", "email is not valid"]}
        />
      </ValidatorForm>
    </div>
  );
}

export default Validation;
