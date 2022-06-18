/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// Images

import {
  RenderColumn,
  PaymentStatus,
  RenderDate,
  ProductNameAndImage,
  RenderAction,
} from "../common/index";
// import { useEffect, useState } from "react";

function SettlementTable(orders) {
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
        Date: RenderDate(element, "Date"),
        SettlementId: RenderColumn(element, "OrderId"),
        OrderId: RenderColumn(element, "OrderId"),
        ProductName: ProductNameAndImage(element, "ProductName"),
        Amount: RenderColumn(element, "Amount", true),
        Status: PaymentStatus(element, "Status"),
        Action: RenderAction(null, null, true),
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const response = {
    columns: [
      { Header: "Date", accessor: "Date", align: "left" },
      { Header: "Order #", accessor: "OrderId", align: "center" },
      { Header: "Settlement ID", accessor: "SettlementId", align: "center" },
      {
        Header: "Product Name ",
        accessor: "ProductName",
        align: "center",
      },

      { Header: "Amount", accessor: "Amount", align: "center" },
      { Header: "Status", accessor: "Status", align: "center" },
      { Header: "Statement", accessor: "Action", align: "center" },
    ],

    rows: getRows(),
  };

  return response;
}

export default SettlementTable;
