/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import { Button, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import { MDDataTable } from "components/MDDataTable";
import _ from "lodash";
import React, { memo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  setSelectedOrders,
  updateOrderThunk,
} from "redux-store/slices/orders/orderSlice";
import { notification } from "redux-store/slices/root/rootSlice";
import {
  ORDER_STATUS_READY_TO_DISPATCH,
  ORDER_STATUS_CANCELLED,
} from "constants";
import PendingLabelTable from "../../../lib/tables/activeOrders/pendingLabelTable";
import GenerateBillingLabel from "./generateLabel";

function PendingLabelOrders({ orders }) {
  const dispatch = useDispatch();
  let response = { orderRows: [], orderColumns: [] };
  const [hasOpen, setHasOpen] = useState(false);
  const [hasDisabled, setHasDisabled] = useState(true);

  const brandInfo = useSelector(
    (state) => state.auth.accountInfo,
    shallowEqual
  );
  console.log(brandInfo);

  if (orders && orders.length > 0) {
    response = PendingLabelTable(orders);
  }

  const selectedOrders = useSelector(
    (state) => state.orderState.selectedOrders
  );
  const handleCancelOrder = () => {
    const success = {
      show: true,
      title: "Cancelled Successfully",
      status: "success",
      message: "Order has been cancelled!!",
    };
    const brandId = localStorage.getItem("brandId");
    const orderRequest = selectedOrders?.map((row) => ({
      HandoverTime: "NA",
      CustomerId: row.CustomerId,
      OrderStatus: ORDER_STATUS_CANCELLED,
      OrderId: row.OrderId,
      TrackingId: null,
    }));
    const request = {
      BrandId: brandId,
      Orders: orderRequest,
    };
    dispatch(updateOrderThunk(request));
    dispatch(notification(success));
  };

  const handleReadyToDispatch = async () => {
    const success = {
      show: true,
      title: "Updated Successfully",
      status: "success",
      message: "Order has been marked as ready to dispatch!!",
    };

    try {
      const brandId = localStorage.getItem("brandId");
      const orderRequest = selectedOrders?.map((row) => ({
        HandoverTime: "NA",
        CustomerId: row.CustomerId,
        OrderStatus: ORDER_STATUS_READY_TO_DISPATCH,
        OrderId: row.OrderId,
        TrackingId: null,
      }));
      const request = {
        BrandId: brandId,
        Orders: orderRequest,
      };
      dispatch(updateOrderThunk(request));
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

  const handleRowSelection = (item) => {
    let data = [];
    if (item.length > 0) {
      setHasDisabled(false);
    } else {
      setHasDisabled(true);
    }
    if (item && item.length > 0) {
      data = _.filter(orders, (x) => _.includes(item, x.OrderId));
    }
    dispatch(setSelectedOrders(data));
  };

  return (
    <MDBox>
      <Grid container my={2} spacing={1} columnSpacing={1}>
        <Grid item xs={2.5}>
          <GenerateBillingLabel
            hasOpen={hasOpen}
            orders={orders}
            brandInfo={brandInfo}
            name="Generate Billing Label"
            hasShow={hasDisabled}
          />
        </Grid>
        <Grid item xs={2.5}>
          <Button
            my={2}
            color="dark"
            sx={{ color: "black" }}
            variant="contained"
            disabled={hasDisabled}
            onClick={handleReadyToDispatch}>
            Mark Ready To Dispatch
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Button
            my={2}
            color="dark"
            sx={{ color: "black" }}
            variant="contained"
            disabled={hasDisabled}
            onClick={handleCancelOrder}>
            Cancel Orders
          </Button>
        </Grid>
      </Grid>
      <MDDataTable
        rows={response.orderRows}
        columns={response.orderColumns}
        onRowSelection={handleRowSelection}
      />
    </MDBox>
  );
}

export default memo(PendingLabelOrders);
