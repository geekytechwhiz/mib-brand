/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import DataTable from "components/RTable";
import CompletedOrdersTable from "lib/tables/activeOrders/completedOrdersTable";
import React, { memo } from "react";

function CompletedOrders({ orders }) {
  let response = { columns: [], rows: [] };

  if (orders && orders.length > 0) {
    response = CompletedOrdersTable(orders);
  }

  return (
    <div>
      <DataTable
        table={{ columns: response.columns, rows: response.rows }}
        setEntriesPerPage={10}
        canSearch
        showTotalEntries
        pagination
        isSorted
      />
    </div>
  );
}

export default memo(CompletedOrders);
