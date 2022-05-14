/* eslint-disable consistent-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
// Images

import LogoAsana from "assets/images/small-logos/logo-asana.svg";
import MDAvatar from "components/MDAvatar";
import MDBox from "components/MDBox";
import CustomSelect from "components/MDDropdown/index";
import MDProgress from "components/MDProgress";
import { LightTooltip } from "components/MDTooltip";
import MDTypography from "components/MDTypography";
// import { useEffect, useState } from "react";

function OrderTable(columns, temp) {
  debugger;
  const orders = [
    {
      orderId: 545454,
      productName:
        "AAA BB CCCcccccccccccccccccccccccccccccccccccc ssssssssssssssssssssssss xxxxxxxxxxxx",
      orderDate: "04/05/2022 : 10:59:45",
      productType: "Exclusive",
      deliveryAddress: "Kakkanad, Kochi",
      pinCode: 6565664,
      status: "Order Placed",
      progress: 40,
      revenue: 500,
    },
  ];
  //   const [dataRows, setDataRow] = useState([columns]);
  const createColumn = (row, column) => (
    <MDTypography
      component="a"
      href="#"
      variant="button"
      color="text"
      fontWeight="medium"
    >
      {row[column]}
    </MDTypography>
  );
  function ProductName(row, column) {
    const name = row[column];
    return (
      <MDBox
        display="flex"
        sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "6rem" }}
        alignItems="center"
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
          >
            {row[column]}
          </MDTypography>
        </LightTooltip>
      </MDBox>
    );
  }

  function Status(ele) {
    const { value } = ele;
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
      <MDBox display="flex" alignItems="center">
        <MDBox m={1}>
          <CustomSelect
            placeholder="Category"
            defaultValue="packed"
            value={value}
            label={value}
            sx={{ width: "5rem" }}
            options={options}
          >
            {/* {options.map((x) => (
              <StyledOption sx={{ width: "5rem" }} value={x.value}>
                {x.label}
              </StyledOption>
            ))} */}
          </CustomSelect>
        </MDBox>
      </MDBox>
    );
  }
  function Progress(row, column) {
    const value = 60;
    const status = row[column];
    return (
      <MDBox display="flex" alignItems="center">
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {value}%
        </MDTypography>
        <MDBox ml={0.5} width="9rem">
          <MDProgress variant="gradient" color="info" value={value} />
        </MDBox>
      </MDBox>
    );
  }

  const getRows = () => {
    const dataRows = [];
    orders.forEach((element) => {
      const res = {
        orderId: createColumn(element, "orderId"),
        productName: ProductName(element, "productName"),
        orderDate: createColumn(element, "orderDate"),
        productType: createColumn(element, "productType"),
        deliveryAddress: ProductName(element, "deliveryAddress"),
        pinCode: createColumn(element, "pinCode"),
        status: Status(element, "status"),
        progress: Progress(element, "progress"),
        revenue: createColumn(element, "revenue"),
      };
      dataRows.push(res);
    });

    return dataRows;
  };
  const response = {
    orderColumns: [
      { Header: "Order Id", accessor: "orderId", align: "left" },
      { Header: "Order Date", accessor: "orderDate", align: "center" },
      { Header: "Product Name", accessor: "productName", align: "left" },
      { Header: "Type", accessor: "productType", align: "center" },
      {
        Header: "Delivery Address",
        accessor: "deliveryAddress",
        align: "center",
      },
      {
        Header: "Pin Code",
        accessor: "pinCode",
        align: "center",
      },
      { Header: "STATUS", accessor: "status", align: "center" },
      { Header: "PROGRESS", accessor: "progress", align: "center" },
      { Header: "Revenue", accessor: "revenue", align: "center" },
    ],

    orderRows: getRows(),
  };
  debugger;

  return response;
}

export default OrderTable;
