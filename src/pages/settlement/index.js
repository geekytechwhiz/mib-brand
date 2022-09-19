/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import DataTable from "components/RTable";
import SettlementTable from "lib/tables/settlements/index";
import React, { memo } from "react";

function PendingHandoverOrders() {
  let response = { orderRows: [], orderColumns: [] };
  const orders = [
    {
      Date: "04/05/2022",
      SettlementId: "MIS79777",
      OrderId: "OR5656464",
      ProductName: "Iphone 11",
      Amount: 50000.0,
      Status: "PENDING",
      Action: "COD",
    },
    {
      Date: "04/05/2022",
      SettlementId: "MIS79777",
      OrderId: "OR5656464",
      ProductName: "Iphone 11",
      Amount: 50000.0,
      Status: "SUCCESS",
      Action: "COD",
    },
  ];
  if (orders && orders.length > 0) {
    response = SettlementTable(orders);
  }
  response = SettlementTable(orders);

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

export default memo(PendingHandoverOrders);
