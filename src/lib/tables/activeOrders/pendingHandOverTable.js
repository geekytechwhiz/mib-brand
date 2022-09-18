/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// Images

import {
  RenderAction,
  RenderColumn,
  RenderDate,
  RenderLogisticsPartner,
} from "lib/tables/common";
// import { useEffect, useState } from "react";

function ReadyToDispatchTable(orders) {
  const rows = [];
  const resp = {
    ProductName: "",
    OrderDate: "",
    ProductType: "",
    DeliveryAddress: "",
    PinCode: "",
    Status: "",
    Progress: "",
  };
  const keys = Object.keys(resp);
  if (orders && orders.length > 0) {
    orders.forEach((ele) => {
      const obj = { ...ele };
      keys.forEach((key) => {
        if (obj[key] === "OrderDate") {
          const date = obj[key];
        }
        if (!obj[key]) {
          obj[key] = "";
        }
      });
      rows.push(obj);
    });
  }

  const getRows = () => {
    const dataRows = [];

    rows.forEach((element) => {
      const res = {
        OrderId: RenderColumn(element, "OrderId"),
        Courier: RenderLogisticsPartner(element, "DispatchedBy"),
        HandoverTime: RenderDate(element, "HandoverTime"),
        Quantity: RenderColumn(element, "Quantity"),
        Amount: RenderColumn(element, "Amount"),
        TrackingId: RenderColumn(element, "TrackingId"),
        Tag: RenderColumn(element, "Tag"),
        Actions: RenderAction("download", "manifest"),
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const response = {
    orderColumns: [
      {
        Header: "Order # ",
        accessor: "OrderId",
        align: "left",
      },
      {
        Header: "Logistics Partner ",
        accessor: "Courier",
        align: "left",
      },
      {
        Header: "Handover Date & Time",
        accessor: "HandoverTime",
        align: "center",
      },
      { Header: "No.of Orders", accessor: "Quantity", align: "center" },
      { Header: "Tracking ID", accessor: "TrackingId", align: "center" },
      { Header: "Tag", accessor: "Tag", align: "center" },
      { Header: "Actions", accessor: "Actions", align: "center" },
    ],

    orderRows: getRows(),
  };

  return response;
}

export default ReadyToDispatchTable;
