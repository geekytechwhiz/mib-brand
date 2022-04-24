/* eslint-disable no-debugger */
/* eslint-disable import/no-self-import */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";
import { Template } from "lib/Templates";
import { businessCategory } from "../data";

export const getCategories = () => {
  const arr = [];
  _.forEach(businessCategory, (x) => {
    arr.push(x.category);
  });

  const data = _.map(arr, (x) => ({
    label: x,
    value: x,
  }));
  return data;
};

export const getSubCategories = (category) => {
  const obj = _.find(businessCategory, (x) => x.category === category);
  if (!obj) return [];
  const data = _.map(obj.subCategory, (x) => ({
    label: x,
    value: x,
  }));
  return data;
};

export const getVariantDetails = (productCategory) => {
  debugger;
  if (!productCategory) return [];
  const template = Template;
  if (!template && Object.keys(template).length === 0) return [];
  const data = template[productCategory] || [];
  return data;
};
