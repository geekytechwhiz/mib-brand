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
import { RenderColumn, RenderProductName } from "../common/index";
// import { useEffect, useState } from "react";

function InTransitTable(orders) {
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
  const createColumn = (row, column) => (
    <MDTypography variant="button" fontWeight="medium" gutterBottom>
      {column === "Amount" && row[column]
        ? `Rs. ${(Math.round(row[column] * 100) / 100).toFixed(2)}`
        : row[column]}
    </MDTypography>
  );

  const createAction = (row, column) => (
    <MDBox display="flex" alignItems="center">
      <MDBox mr={2}>
        <MDButton variant="outlined" color="success" iconOnly circular>
          <Icon sx={{ fontWeight: "bold" }}>download</Icon>
        </MDButton>
      </MDBox>
      <MDBox display="flex" flexDirection="column">
        <MDTypography variant="button" fontWeight="medium" gutterBottom>
          Download
        </MDTypography>
        <MDTypography
          style={{ wordWrap: "break-word" }}
          sx={{
            display: "box",
            lineClamp: 2,
            boxOrient: "vertical",
            overflow: "hidden",
          }}
          variant="caption"
          color="text"
          fontWeight="regular"
        >
          manifest
        </MDTypography>
      </MDBox>
    </MDBox>
  );
  const createHandOverDate = (row, column) => (
    <MDTypography
      component="a"
      href="#"
      variant="button"
      color="text"
      fontWeight="medium"
      sx={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "-webkit-box",
        WebkitLineClamp: "2",
        WebkitBoxOrient: "vertical",
      }}
    >
      {row[column] || ""}
    </MDTypography>
  );

  const getRows = () => {
    const dataRows = [];

    rows.forEach((element) => {
      const res = {
        OrderId: RenderColumn(element, "OrderId"),
        ProductName: RenderProductName(element, "ProductName"),
        Amount: RenderColumn(element, "Amount", true),
        TrackingId: RenderColumn(element, "TrackingId"),
        Tag: RenderColumn(element, "Tag"),
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const response = {
    columns: [
      { Header: "Order #", accessor: "OrderId", align: "center" },
      {
        Header: "Product Information ",
        accessor: "ProductName",
        align: "left",
      },

      { Header: "Amount", accessor: "Amount", align: "center" },
      { Header: "Tracking ID", accessor: "TrackingId", align: "center" },
      { Header: "Tag", accessor: "Tag", align: "center" },
    ],

    rows: getRows(),
  };

  return response;
}

export default InTransitTable;
