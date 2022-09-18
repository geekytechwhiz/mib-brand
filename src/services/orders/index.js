/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import { apiInstance } from "api";
import { ORDER_STATUS, RETURN_ORDER_STATUS } from "lib/constants/index";
import _ from "lodash";
import { responseBuilder } from "lib/helper";

export const getAllOrders = async (brandId) => {
  try {
    const orders = await responseBuilder(
      await apiInstance.get(`/oms/order/brand/${brandId}`)
    );
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
    return responseBuilder(await apiInstance.patch(`/oms/order`, req));
  } catch (err) {
    return err;
  }
};
export const getAllReturns = async (brandId) => {
  try {
    const data = await responseBuilder(
      await apiInstance.get(`/oms/order/returns/brand/${brandId}`)
    );
    const orders = data;
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
    const orders = responseBuilder(
      await apiInstance.get(`/oms/order/cancel/brand/${brandId}`)
    );
    // const orders = data.body;

    return orders;
  } catch (err) {
    return err;
  }
};

export const updateReturns = async (req) => {
  try {
    return responseBuilder(await apiInstance.patch(`/oms/order/returns`, req));
  } catch (err) {
    return err;
  }
};
