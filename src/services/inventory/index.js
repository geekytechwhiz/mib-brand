/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import { apiInstance } from "api";

export const getProducts = async (brandId, status) => {
  try {
    const { data } = await apiInstance.get(
      `/inventory/products/brand/${brandId}`,
      {
        params: {
          Status: status,
        },
      }
    );
    return data;
  } catch (err) {
    return null;
  }
};

export const postProducts = async (payload, brandId) => {
  try {
    const { data } = await apiInstance.post(
      `/inventory/products/product/${brandId}`,
      payload
    );
    return data;
  } catch (err) {
    return null;
  }
};
export const patchProducts = async (payload, brandId) => {
  try {
    const { data } = await apiInstance.patch(
      `/inventory/products/${brandId}/product/${payload.ProductId}`,
      payload
    );
    return data;
  } catch (err) {
    return null;
  }
};

export const patchProductStatus = async (payload, brandId) => {
  try {
    const { data } = await apiInstance.patch(
      `/inventory/products/product/${brandId}/status`,
      payload
    );
    return data;
  } catch (err) {
    return null;
  }
};
