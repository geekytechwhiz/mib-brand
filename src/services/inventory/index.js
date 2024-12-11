/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import api from "../../api";
import { responseBuilder } from "../../lib/helper/index";

export const getProducts = async (brandId, status) => {
  try {
    return responseBuilder(
      await api.get(`/inventory/products/brand/${brandId}`, {
        params: {
          Status: status,
        },
      })
    );
  } catch (err) {
    return null;
  }
};

export const postProducts = async (payload, brandId) => {
  try {
    return responseBuilder(
      await api.post(`/inventory/products/brand/${brandId}/product`, payload)
    );
  } catch (err) {
    return null;
  }
};
export const patchProducts = async (payload, brandId) => {
  try {
    const { data } = await api.patch(
      `/inventory/products/brand/${brandId}/product`,
      payload
    );
    return data;
  } catch (err) {
    return null;
  }
};

export const patchProductStatus = async (payload, brandId) => {
  try {
    const { data } = await api.patch(
      `products/brand/${brandId}/product/${payload.ProductId}/status`,
      payload
    );
    return data;
  } catch (err) {
    return null;
  }
};
