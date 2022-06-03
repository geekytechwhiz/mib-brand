/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// Images
import {
  RenderAddressColumn,
  RenderColumn,
  RenderDate,
  RenderReturnProductInfo,
} from "lib/tables/common";
import React from "react";

function CancelledOrdersTable(orders) {
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
        CancelledDate: RenderDate(element, "CancelledDate"),
        OrderId: RenderColumn(element, "OrderId"),
        Channel: RenderColumn(element, "Channel"),
        CustomerInfo: RenderAddressColumn(element),
        ProductInfo: RenderReturnProductInfo(element, "ProductInfo"),
        Reason: RenderColumn(element, "Reason"),
        CurrentStatus: RenderColumn(element, "OrderStatus"),
      };
      dataRows.push(res);
    });

    return dataRows;
  };

  const response = {
    columns: React.useMemo(
      () => [
        {
          Header: "Request Date",
          accessor: "CancelledDate",
          align: "left",
        },
        {
          Header: "Order Id ",
          accessor: "OrderId",
          align: "left",
          width: 200,
        },
        {
          Header: "Channel",
          accessor: "Channel",
          align: "left",
        },
        {
          Header: "Customer Details ",
          accessor: "CustomerInfo",
          width: 150,
          align: "left",
        },
        {
          Header: "Product Details",
          accessor: "ProductInfo",
          align: "left",
          width: 150,
        },

        {
          Header: "Reason for Cancellation",
          width: 150,
          accessor: "Reason",
          align: "left",
        },
        {
          Header: "Warehouse Address",
          accessor: "PickupAddress",
          align: "left",
          width: 200,
        },

        {
          Header: "Current Status",
          accessor: "CurrentStatus",
          align: "left",
          width: "15rem",
        },
      ],
      []
    ),
    rows: getRows(),
  };

  return response;
}

export default CancelledOrdersTable;
