/* eslint-disable no-debugger */
/* eslint-disable import/no-self-import */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";
import { Template } from "lib/templates";
import { BUSINESS_CATEGORY } from "../data";

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
  debugger;
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
