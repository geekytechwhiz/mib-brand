/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import { apiInstance } from "api";

export const getProducts = async (payload, brandId) => {
  try {
    debugger;

    const { data } = await apiInstance.get(`/inventory/products/${brandId}`);
    return data;
  } catch (err) {
    return null;
  }
};

export const postProducts = async (payload, brandId) => {
  try {
    debugger;
    const { data } = await apiInstance.post(
      `/inventory/products/${brandId}/product`,
      payload
    );
    return data;
  } catch (err) {
    return null;
  }
};
export const patchProducts = async (payload, brandId) => {
  try {
    debugger;
    const { data } = await apiInstance.patch(
      `/inventory/products/${brandId}/product/${payload.ProductId}`,
      payload
    );
    return data;
  } catch (err) {
    return null;
  }
};
