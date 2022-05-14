/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import React, { memo } from "react";
// import MDTypography from "components/MDTypography";
// import MDBox from "components/MDBox";

import DataTable from "components/RTable";
import _ from "lodash";
import { shallowEqual, useSelector } from "react-redux";
import OrderTable from "../../lib/tables/orderTable";
import projectsTableData from "../../lib/projectsTableData";

function ProcessOrders() {
  let response = { orderRows: [], orderColumns: [] };
  const columns = {
    OrderId: "",
    ProductName: "",
    OrderDate: "",
    ProductType: " ",
    DeliveryAddress: "",
    PinCode: 0,
    Status: " ",
    Progress: "",
    Revenue: "",
  };
  let rows = [];
  console.log("ProcessOrders");
  let ordersData = useSelector(
    (state) => state.orderState.orders,
    shallowEqual
  );
  ordersData = ordersData || [];

  if (ordersData && ordersData.length > 0) {
    const keys = Object.keys(columns);
    const data =
      ordersData &&
      ordersData?.map((element) => {
        const obj = _.cloneDeep(columns);
        keys.forEach((x) => {
          obj[x] = element[x];
          obj.Status = element.OrderStatus;
        });
        return obj;
      });
    rows = data ?? [];
    if (data) {
      response = OrderTable(columns, rows);
      // response = React.useMemo(orderTable(columns, data), [columns, data]);
      console.log(response);
    }
  }

  const { columns: pColumns, rows: pRows } = projectsTableData();

  return (
    <div>
      <DataTable
        table={{ columns: response.orderColumns, rows: response.orderRows }}
        setEntriesPerPage={10}
        canSearch
        showTotalEntries
        pagination
        isSorted
      />
      <DataTable
        table={{ columns: pColumns, rows: pRows }}
        setEntriesPerPage={10}
        canSearch
        showTotalEntries
        pagination
        isSorted
      />
    </div>
  );
}

export default memo(ProcessOrders);
