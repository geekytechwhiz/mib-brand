/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import DataTable from "components/RTable";
import InTransitTable from "lib/tables/activeOrders/inTransitTable";
import React, { memo } from "react";

function InTransitOrders({ orders }) {
  let response = { rows: [], columns: [] };

  response = InTransitTable(orders);

  return (
    <div>
      <DataTable
        table={{ columns: response.columns, rows: response.rows }}
        setEntriesPerPage={10}
        canSearch
        showTotalEntries
        isSorted
      />
    </div>
  );
}

export default memo(InTransitOrders);
