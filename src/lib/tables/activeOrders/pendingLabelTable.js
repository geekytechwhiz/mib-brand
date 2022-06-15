/* eslint-disable no-debugger */
/* eslint-disable no-param-reassign */
// import { useEffect, useState } from "react";

function PendingLabelTable(orders) {
  const rows = [];
  const resp = {
    ProductName: "",
    OrderDate: "",
    ProductType: "",
    DeliveryAddress: "",
    PinCode: "",
    Status: "",
    Progress: "",
    SLA: "",
    Tags: "",
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

  const formatAddress = (address) => {
    if (!address) return "";
    return `${address.HouseName} , ${address.Street}, ${address.District}, ${address.State}`;
  };
  const getRows = () => {
    const dataRows = [];

    rows.forEach((element) => {
      console.log(element);
      const res = {
        id: element.OrderId,
        ProductName: element.ProductName,
        DeliveryAddress: formatAddress(element.DeliveryDetails),
        Amount: element.Amount,
        PaymentStatus: element.PaymentStatus,
        PaymentMode: element.PaymentMode || "",
        SLA: element.SLA,
        Tags: element.Tags,
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const response = {
    orderColumns: [
      { headerName: "Order ID", field: "id", width: 170, align: "left" },
      {
        headerName: "Product Information",
        field: "ProductName",
        align: "left",
        width: 200,
      },
      {
        headerName: "Buyer Details",
        field: "DeliveryAddress",
        align: "center",
        width: 270,
      },
      {
        headerName: "Amount",
        field: "Amount",
        align: "center",
        width: 100,
      },
      {
        headerName: "Payment Status",
        field: "PaymentStatus",
        align: "center",
        width: 170,
      },
      {
        headerName: "Payment Mode",
        field: "PaymentMode",
        align: "center",
        width: 150,
      },
      {
        headerName: "SLA/Dispatched by",
        field: "SLA",
        align: "center",
        width: 170,
      },
      { headerName: "Order Tags", field: "Tags", align: "center", width: 170 },
    ],

    orderRows: getRows(),
  };

  return response;
}

export default PendingLabelTable;
