/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";

export function Fallback({ error, componentStack, resetErrorBoundary }) {
  return (
    <div>
      <h1>An error occurred: {error.message}</h1>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
