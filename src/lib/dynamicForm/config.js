/* eslint-disable import/prefer-default-export */
import InputField from "lib/dynamicForm/inputField";

export const config = [
  {
    name: "fullName",
    id: "fullName",
    type: "text",
    component: InputField,
    value: "John Doe",
    label: "Full Name",
  },
  {
    name: "email",
    id: "email",
    type: "email",
    component: InputField,
    value: "john.doe@pluralsight.com",
    label: "Email Address",
  },
  {
    name: "phoneNumber",
    id: "phoneNumber",
    type: "tel",
    component: InputField,
    value: "12345678",
    label: "Phone Number",
  },
];
