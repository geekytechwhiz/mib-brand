/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import DataTable from "components/RTable";
import { useSelector, shallowEqual } from "react-redux";
import CancelledOrdersTable from "lib/tables/cancelled/cancelledOrdersTable";
import React, { memo } from "react";

function CancelledOrders() {
  let response = { rows: [], columns: [] };
  const data =
    useSelector((state) => state.orderState?.cancelled, shallowEqual) || [];
  const orderData =
    (data &&
      data.length > 0 &&
      data?.map((x, index) => ({
        index,
        ...x,
      }))) ||
    [];

  response = CancelledOrdersTable(orderData);

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

export default memo(CancelledOrders);
