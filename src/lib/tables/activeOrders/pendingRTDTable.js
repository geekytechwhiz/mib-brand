/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// Images
import { Checkbox } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import { RenderProductName, RenderColumn } from "../common/index";

function PendingRTDTable(orders) {
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
  function CreateOrder(row, column) {
    return (
      <MDBox
        display="flex"
        sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "10rem" }}
        alignItems="left"
        lineHeight={1}
      >
        <MDTypography
          display="block"
          variant="caption"
          fontWeight="medium"
          color="primary"
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
      </MDBox>
    );
  }

  const getRows = () => {
    const dataRows = [];
    rows.forEach((element, index) => {
      const res = {
        index,
        OrderId: RenderColumn(element, "OrderId"),
        ProductName: RenderProductName(element, "ProductName"),
        ItemId: RenderColumn(element, "ProductId"),
        Quantity: RenderColumn(element, "Quantity"),
        Amount: RenderColumn(element, "Amount", true),
        TrackingID: RenderColumn(element, "TrackingID"),
        Tags: RenderColumn(element, "Tags"),
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = React.useRef();
      const resolvedRef = ref || defaultRef;

      React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return <Checkbox type="checkbox" ref={resolvedRef} {...rest} />;
    }
  );
  const response = {
    columns: React.useMemo(
      () => [
        {
          id: "selection",

          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              {/* <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} /> */}
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        {
          Header: "Order ID",
          accessor: "OrderId",
          align: "left",
          cell: ({ cell: { value } }) => <CreateOrder>{value}</CreateOrder>,
        },
        {
          Header: "Product Information ",
          accessor: "ProductName",
          align: "left",
        },
        { Header: "Item Id", accessor: "ItemId", align: "center" },
        { Header: "Quantity", accessor: "Quantity", align: "center" },
        { Header: "Amount", accessor: "Amount", align: "center" },

        {
          Header: "SLA/Dispatched By",
          accessor: "SLA",
          align: "center",
        },
        { Header: "Order Tags", accessor: "Tags", align: "center" },
      ],
      []
    ),
    rows: getRows(),
  };

  return response;
}

export default PendingRTDTable;
