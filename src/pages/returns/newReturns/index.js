/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import DataTable from "components/RTable";
import NewReturnTable from "lib/tables/returns/newReturnsTable";
import {
  ORDER_STATUS_RETURNED_READY_FOR_PICKUP,
  ORDER_STATUS_REJECTED,
} from "constants";
import { useDispatch } from "react-redux";
import { updateReturnOrderThunk } from "redux/slices/orders/orderSlice";
import { notification } from "redux/slices/root/rootSlice";
import _ from "lodash";
// import _ from "lodash";
import React, { memo } from "react";

function NewReturns({ orders, brandInfo }) {
  const dispatch = useDispatch();

  let reference = {};
  let response = { rows: [], columns: [] };
  let handleApprove = {};
  let handleReject = {};
  const orderData = orders.map((x, index) => ({
    index,
    ...x,
  }));
  const getSelectedOrders = () => {
    const length = reference ? Object.keys(reference)?.length : 0;
    if (length < 0) return null;
    const keys = Object.keys(reference);
    const result = _.flatten(
      _.map(keys, (item) => _.filter(orderData, (x) => x.index == item))
    );
    const res = _.flatten(
      _.map(result, (item) =>
        _.filter(orders, (x) => x.ReturnOrderId == item.ReturnOrderId)
      )
    );
    return res || {};
  };

  const updateReturnOrders = async (status) => {
    try {
      const length = reference ? Object.keys(reference)?.length : 0;
      if (length <= 0) return false;
      const selectedOrders = await getSelectedOrders();
      const brandId = localStorage.getItem("brandId");
      const orderRequest = selectedOrders?.map((row) => ({
        HandoverTime: "NA",
        CustomerId: row.CustomerId,
        OrderStatus: status,
        ReturnOrderId: row.ReturnOrderId,
        TrackingId: null,
      }));
      const request = {
        BrandId: brandId,
        Orders: orderRequest,
      };
      dispatch(updateReturnOrderThunk(request));
      const success = {
        show: true,
        title: "Updated Successfully",
        status: "success",
        message: `Order has been ${status} successfully !!`,
      };
      dispatch(notification(success));
    } catch (err) {
      const error = {
        show: true,
        title: "Error",
        status: "error",
        message: "Something went wrong Please contact support team!!",
      };
      dispatch(notification(error));
    }
  };
  handleApprove = async () => {
    updateReturnOrders(ORDER_STATUS_RETURNED_READY_FOR_PICKUP);
  };
  handleReject = () => {
    updateReturnOrders(ORDER_STATUS_REJECTED);
  };
  response = NewReturnTable(
    orderData || [],
    brandInfo || {},
    handleApprove,
    handleReject
  );

  const handleClick = (val) => {
    reference = val;
  };

  return (
    <div>
      <DataTable
        table={{ columns: response.columns, rows: response.rows }}
        setEntriesPerPage={10}
        canSearch
        showTotalEntries
        isSorted
        onRowSelectStateChange={handleClick}
      />
    </div>
  );
}

export default memo(NewReturns);
