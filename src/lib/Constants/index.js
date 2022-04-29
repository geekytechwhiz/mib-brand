/* eslint-disable import/prefer-default-export */
export const RESOURCE = "inventory";
export const ORIGIN = "brand";
export const UPLOADED_PATH =
  "https://mibuploaddev.s3.ap-south-1.amazonaws.com/inbound/inbound/inventory/brand/";

export const NOT_FOUND_STATUS_CODE = 404;
export const UNAUTHORIZED_STATUS_CODE = 401;
export const INTERNAL_SERVER_ERROR = 500;
export const NOT_FOUND_ERROR_MSG = "Given Email id not found in our system";
export const UNAUTHORIZED_ERROR_MSG = "Incorrect email or password";
export const INTERNAL_SERVER_ERROR_MSG =
  "Something happened in our backend system. Please contact our support team";
export const ERRORS = [
  {
    status: 404,
    message: "Not found",
  },
];
