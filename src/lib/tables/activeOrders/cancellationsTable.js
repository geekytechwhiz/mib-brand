/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// Images

import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import MDProgress from "components/MDProgress";
import { LightTooltip } from "components/MDTooltip";
import MDTypography from "components/MDTypography";
import DialogSelect from "../statusSelect";
import { utcToLocalDateFormatter } from "../../helper";
// import { useEffect, useState } from "react";

function CancellationsTable(orders) {
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
    <MDTypography
      component="a"
      href="#"
      variant="button"
      color="text"
      fontWeight="medium"
    >
      {row[column] || ""}
    </MDTypography>
  );

  const createOrderDate = (row, column) => (
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
      {utcToLocalDateFormatter(row[column]) || ""}
    </MDTypography>
  );

  function ProductName(row, column) {
    const name = row[column];
    return (
      <MDBox
        display="flex"
        sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "6rem" }}
        alignItems="left"
        lineHeight={1}
      >
        <MDAvatar src={LogoAsana} name={name} size="sm" variant="rounded" />
        <LightTooltip title={name}>
          <MDTypography
            display="block"
            variant="button"
            fontWeight="medium"
            ml={1}
            lineHeight={1}
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
        </LightTooltip>
      </MDBox>
    );
  }

  function Status(row, column) {
    const status = row[column];
    const options = [
      {
        label: "Packed",
        value: "packed",
      },
      {
        label: "Shipped",
        value: "shipped",
      },
      {
        label: "In Transits",
        value: "inTransits",
      },
    ];
    return (
      <MDBox display="flex" alignItems="center" flexDirection="column">
        <MDTypography
          variant="caption"
          color="text"
          fontWeight="medium"
          mx={1}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {status || ""}
        </MDTypography>
        <DialogSelect options={options} />
      </MDBox>
    );
  }
  function Progress(row, column) {
    const value = 60;
    return (
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value || ""}%
        </MDTypography>
        <MDBox ml={0.5} width="9rem">
          <MDProgress variant="gradient" color="info" value={value} />
        </MDBox>
      </MDBox>
    );
  }

  const getRows = () => {
    const dataRows = [];
    rows.forEach((element) => {
      const res = {
        Id: createColumn(element, "Id"),
        CancelledDate: createOrderDate(element, "CancelledDate"),
        ProductName: ProductName(element, "ProductName"),
        Status: Status(element, "Status"),
        Progress: Progress(element, "Progress"),
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const response = {
    orderColumns: [
      { Header: "ID", accessor: "Id", align: "center" },
      { Header: "Date", accessor: "CancelledDate", align: "center" },
      { Header: "Product Name", accessor: "ProductName", align: "center" },
      { Header: "Status", accessor: "Status", align: "center" },
      { Header: "PROGRESS", accessor: "Progress", align: "center" },
    ],

    orderRows: getRows(),
  };

  return response;
}

export default CancellationsTable;
