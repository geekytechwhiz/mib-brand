/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import { apiInstance } from "api";
import { ORDER_STATUS, RETURN_ORDER_STATUS } from "lib/constants/index";
import _ from "lodash";

export const getAllOrders = async (brandId) => {
  try {
    const { data } = await apiInstance.get(`/oms/order/brand/${brandId}`);
    const orders = data.body;

    const response = _.groupBy(orders, "OrderStatus");
    ORDER_STATUS.forEach((element) => {
      if (!response[element]) {
        response[element] = [];
      }
    });

    return response;
  } catch (err) {
    return err;
  }
};

export const updateOrder = async (req) => {
  try {
    const { data } = await apiInstance.patch(`/oms/order`, req);
    return data;
  } catch (err) {
    return err;
  }
};
export const getAllReturns = async (brandId) => {
  try {
    const { data } = await apiInstance.get(
      `/oms/order/returns/brand/${brandId}`
    );
    const orders = data.body;

    const response = _.groupBy(orders, "OrderStatus");
    RETURN_ORDER_STATUS.forEach((element) => {
      if (!response[element]) {
        response[element] = [];
      }
    });

    return response;
  } catch (err) {
    return err;
  }
};
export const getCancelledOrders = async (brandId) => {
  try {
    const { data } = await apiInstance.get(
      `/oms/order/cancel/brand/${brandId}`
    );
    const orders = data.body;

    return orders;
  } catch (err) {
    return err;
  }
};

export const updateReturns = async (req) => {
  try {
    const { data } = await apiInstance.patch(`/oms/order/returns`, req);
    return data;
  } catch (err) {
    return err;
  }
};
