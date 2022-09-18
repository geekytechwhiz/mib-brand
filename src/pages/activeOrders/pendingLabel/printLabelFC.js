/* eslint-disable react/prop-types */
import { Button, Grid } from "@mui/material";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintIcon from "@mui/icons-material/Print";
import Invoice from "./invoice";

function PrintLabelFC({ orders, brandInfo, billingDetails }) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <Grid container>
      <Grid item xs={12}>
        <Invoice
          orders={orders}
          brandInfo={brandInfo}
          billingDetails={billingDetails}
          ref={componentRef}
        />
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        flexDirection="row"
        justifyContent="flex-end"
      >
        <Button onClick={handlePrint} endIcon={<PrintIcon />}>
          Save or Print
        </Button>
      </Grid>
    </Grid>
  );
}
export default PrintLabelFC;
