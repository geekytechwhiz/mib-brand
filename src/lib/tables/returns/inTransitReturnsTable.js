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
  RenderPackageInfo,
  RenderReturnProductInfo,
  ReturnInfo,
} from "lib/tables/common";
import React from "react";
import { RenderWarehouseAddress } from "../common";

function InTransitReturns(orders, brandInfo) {
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
        ReturnDate: RenderDate(element, "ReturnDate"),
        ReturnInfo: ReturnInfo(element),
        Channel: RenderColumn(element, "Channel"),
        CustomerInfo: RenderAddressColumn(element),
        ProductInfo: RenderReturnProductInfo(element, "ProductInfo"),
        QualityCheck: RenderColumn(element, "QualityCheck"),
        Reason: RenderColumn(element, "Reason"),
        WarehouseAddress: RenderWarehouseAddress(
          brandInfo?.AddressDetails?.ShippingAddress,
          brandInfo?.BusinessDetails
        ),
        Dimension: RenderPackageInfo(element),
        ShippingDetails: RenderColumn(element, "ShippingDetails"),
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
          accessor: "ReturnDate",
          align: "left",
        },
        {
          Header: "Return Order Id & Return Status ",
          accessor: "ReturnInfo",
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
          Header: "Quality Check",
          accessor: "QualityCheck",
          align: "left",
          width: 150,
        },

        {
          Header: "Return Reason",
          width: 150,
          accessor: "Reason",
          align: "left",
        },
        {
          Header: "Warehouse Address",
          accessor: "WarehouseAddress",
          align: "left",
          width: 200,
        },
        {
          Header: "Dimension & Weight",
          accessor: "Dimension",
          align: "left",
          width: "15rem",
        },

        {
          Header: "Shipping Details",
          accessor: "ShippingDetails",
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

export default InTransitReturns;
