/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import React, { memo } from "react";
import DataTable from "components/RTable";
import { shallowEqual, useSelector } from "react-redux";
import OrderTable from "../../lib/tables/orderTable";

function Orders() {
  let response = { orderRows: [], orderColumns: [] };
  console.log("ProcessOrders");
  let ordersData = useSelector(
    (state) => state.orderState.orders,
    shallowEqual
  );
  ordersData = ordersData || [];

  if (ordersData && ordersData.length > 0) {
    response = OrderTable(ordersData);
  }

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
    </div>
  );
}

export default memo(Orders);
