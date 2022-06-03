/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import * as React from "react";

export function MDDataTable({ rows, columns, onRowSelection }) {
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        onSelectionModelChange={React.useCallback(onRowSelection)}
      />
    </div>
  );
}
