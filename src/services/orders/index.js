/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import { apiInstance } from "api";

export const getAllOrders = async (brandId) => {
  try {
    const { data } = await apiInstance.get(`/oms/order/brand/${brandId}`);
    return data;
  } catch (err) {
    return err;
  }
};
