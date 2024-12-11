/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import _ from "lodash";

import { ORDER_STATUS, RETURN_ORDER_STATUS } from "../../constants/index";
import { responseBuilder } from "../../lib/helper/index";
import api from "../../api";

export const getAllOrders = async (brandId) => {
  try {
    const orders = await responseBuilder(
      await api.get(`/oms/order/brand/${brandId}`)
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
    return responseBuilder(await api.patch(`/oms/order`, req));
  } catch (err) {
    return err;
  }
};
export const getAllReturns = async (brandId) => {
  try {
    const data = await responseBuilder(
      await api.get(`/oms/order/returns/brand/${brandId}`)
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
      await api.get(`/oms/order/cancel/brand/${brandId}`)
    );
    // const orders = data.body;

    return orders;
  } catch (err) {
    return err;
  }
};

export const updateReturns = async (req) => {
  try {
    return responseBuilder(await api.patch(`/oms/order/returns`, req));
  } catch (err) {
    return err;
  }
};
