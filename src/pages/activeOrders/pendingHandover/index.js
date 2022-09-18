/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import DataTable from "components/RTable";
import HandOverTable from "lib/tables/activeOrders/pendingHandOverTable";
import React, { memo } from "react";

function PendingHandoverOrders({ orders }) {
  let response = { orderRows: [], orderColumns: [] };

  if (orders && orders.length > 0) {
    response = HandOverTable(orders);
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

export default memo(PendingHandoverOrders);
