/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import DataTable from "components/RTable";
import CompletedReturnTable from "lib/tables/returns/completedReturnsTable";
import React, { memo } from "react";

function CompletedReturns({ orders, brandInfo }) {
  let response = { rows: [], columns: [] };

  const orderData = orders.map((x, index) => ({
    index,
    ...x,
  }));

  response = CompletedReturnTable(orderData || [], brandInfo || {});

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

export default memo(CompletedReturns);
