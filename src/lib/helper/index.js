/* eslint-disable consistent-return */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
/* eslint-disable no-multi-assign */
/* eslint-disable no-debugger */
/* eslint-disable import/no-self-import */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";
import { Template } from "lib/templates";
import { BUSINESS_CATEGORY } from "../data";
import {
  INTERNAL_SERVER_ERROR,
  INTERNAL_SERVER_ERROR_MSG,
  NOT_FOUND_ERROR_MSG,
  SYSTEM_ERROR_MSG,
  NOT_FOUND_STATUS_CODE,
  UNAUTHORIZED_ERROR_MSG,
  UNAUTHORIZED_STATUS_CODE,
  STATUS_CODE_SUCCESS,
} from "../constants";

export const getCategories = () => {
  const arr = [];
  _.forEach(BUSINESS_CATEGORY, (x) => {
    arr.push(x.category);
  });

  const data = _.map(arr, (x) => ({
    label: x,
    value: x,
  }));
  return data;
};

export const getSubCategories = (category) => {
  const obj = _.find(BUSINESS_CATEGORY, (x) => x.category === category);
  if (!obj) return [];
  const data = _.map(obj.subCategory, (x) => ({
    label: x,
    value: x,
  }));
  return data;
};

export const getVariantDetails = (productCategory) => {
  if (!productCategory) return [];
  const template = Template;
  if (!template && Object.keys(template).length === 0) return [];
  const data = template[productCategory] || [];
  return data;
};

export const utcToLocalDateFormatter = (value) => {
  const parsedDate = Date.parse(value);
  const isValidDate = Number.isNaN(parsedDate);
  if (isValidDate) {
    return "";
  }
  const date = new Date(parsedDate);
  value = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}: ${date.getHours()}:${date.getMinutes()}`;
  return value;
};

export const getCurrentDateTime = () => {
  const date = new Date();
  return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}: ${date.getHours()}:${date.getMinutes()}`;
};

export const getProfileCompletionScore = (data) => {
  let score = 0;
  if (!data) return score;
  if (data.AccountActivation === "Completed") {
    score += (100 * 16.66) / 100;
  }
  if (data.AddressDetails === "Completed") {
    score += (100 * 16.66) / 100;
  }
  if (data.BankDetails === "Completed") {
    score += (100 * 16.66) / 100;
  }
  if (data.BusinessDetails === "Completed") {
    score += (100 * 16.66) / 100;
  }
  if (data.ContactDetails === "Completed") {
    score += (100 * 16.66) / 100;
  }
  if (data.Documents === "Completed") {
    score += (100 * 16.66) / 100;
  }
  score = Math.round(score);
  return score;
};

export const responseValidator = (res) => {
  debugger;
  const response = {
    message: "Success",
    isValid: true,
  };
  if (!res || res.statusCode) {
    return {
      message: SYSTEM_ERROR_MSG,
      isValid: false,
    };
  }
  if (res.statusCode && res.statusCode === NOT_FOUND_STATUS_CODE) {
    return {
      message: NOT_FOUND_ERROR_MSG,
      isValid: false,
    };
  }
  if (res.statusCode && res.statusCode === UNAUTHORIZED_STATUS_CODE) {
    return {
      message: UNAUTHORIZED_ERROR_MSG,
      isValid: false,
    };
  }
  if (res.statusCode && res.statusCode === INTERNAL_SERVER_ERROR) {
    return {
      message: INTERNAL_SERVER_ERROR_MSG,
      isValid: false,
    };
  }
  if (res.statusCode && res.statusCode === STATUS_CODE_SUCCESS) {
    return response;
  }
  return response;
};

export const responseBuilder = (response) => {
  debugger;
  let responseBody = null;
  if (!response) {
    return responseBody;
  }
  const { data } = response;
  if (!data) {
    return responseBody;
  }
  if (
    data?.statusCode &&
    (data?.statusCode === 200 || data?.statusCode === 201)
  ) {
    responseBody = data.data || {};
  }
  return responseBody;
};
