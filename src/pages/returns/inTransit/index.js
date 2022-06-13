/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import DataTable from "components/RTable";
import InTransitTable from "lib/tables/returns/inTransitReturnsTable";
import React, { memo } from "react";

function InTransitReturns({ orders, brandInfo }) {
  let response = { rows: [], columns: [] };
  debugger;
  const orderData = orders.map((x, index) => ({
    index,
    ...x,
  }));

  response = InTransitTable(orderData || [], brandInfo || {});

  return (
    <div>
      <DataTable
        table={{ columns: response.columns, rows: response.rows }}
        setEntriesPerPage={10}
        canSearch
        showTotalEntries
        isSorted
        onRowSelectStateChange={() => {}}
      />
    </div>
  );
}

export default memo(InTransitReturns);
