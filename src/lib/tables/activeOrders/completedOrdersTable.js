/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// Images

import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import {
  RenderColumn,
  RenderDispatchByInfo,
  RenderProductName,
} from "../common/index";

// import { useEffect, useState } from "react";

function DeliveredOrderTable(orders) {
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
        ProductName: RenderProductName(element, "ProductName"),
        Amount: RenderColumn(element, "Amount", true),
        DispatchInfo: RenderDispatchByInfo(element, "DispatchInfo"),
        Tag: RenderColumn(element, "Tag"),
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const response = {
    columns: [
      {
        Header: "Order #",
        accessor: "OrderId",
        align: "center",
        width: "5rem",
      },
      {
        Header: "Product Information ",
        accessor: "ProductName",
        align: "left",
        width: "25rem",
      },

      { Header: "Amount", accessor: "Amount", align: "center", width: "5rem" },
      {
        Header: "Dispatch By Details",
        accessor: "DispatchInfo",
        width: "25rem",
        align: "center",
      },
      { Header: "Tag", accessor: "Tag", align: "center", width: "5rem" },
    ],

    rows: getRows(),
  };

  return response;
}

export default DeliveredOrderTable;
