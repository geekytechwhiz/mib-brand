/* eslint-disable react/prop-types */
import React from "react";

function InputField({ label, ...props }) {
  return (
    <div>
      {label ? <label htmlFor={props.id}>{label}</label> : null}
      <input {...props} />
    </div>
  );
}

export default InputField;
