/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import React, { useState } from "react";
import PrintLabel from "./printLabel";
import Invoice from "./invoice";
import PrintLabelFC from "./printLabelFC";

export default function BillingLabelInfo({ orders, brandInfo }) {
  const [hasPrint, setHasPrint] = useState(false);
  const [billingDetails, setBillingDetails] = useState({});

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setBillingDetails(() => ({
      ...billingDetails,
      [name]: value,
    }));
  };

  const handleGenerateLabel = () => {
    setHasPrint(true);
  };

  return (
    <MDBox pt={5}>
      {!hasPrint ? (
        <Grid
          container
          display="flex"
          spacing={2}
          justifyContent="flex-start"
          flexDirection="row"
        >
          <Grid item xs={5}>
            <MDInput
              required
              type="text"
              label="Courier"
              fullWidth
              value={billingDetails.Courier}
              error={!billingDetails.Courier}
              name="Courier"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={5} />
          <Grid item xs={3}>
            <MDInput
              required
              type="text"
              label="Length (in cm)"
              fullWidth
              value={billingDetails.Length}
              error={!billingDetails.Length}
              name="Length"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              required
              type="text"
              label="Breadth (in cms)"
              name="Breadth"
              value={billingDetails.Breadth}
              error={!billingDetails.Breadth}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              required
              type="text"
              label="Height (in cms)"
              name="Height"
              value={billingDetails.Height}
              error={!billingDetails.Height}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={3}>
            <MDInput
              required
              type="text"
              name="Weight"
              label="Weight (in cms)"
              value={billingDetails.Weight}
              error={!billingDetails.Weight}
              onChange={handleChange}
            />
          </Grid>

          <Grid
            container
            display="flex"
            spacing={1}
            alignItems="center"
            justifyContent="flex-end"
          >
            <Grid item pt={5} mt={5}>
              <MDButton
                color="dark"
                sx={{ color: "black" }}
                variant="contained"
                onClick={handleGenerateLabel}
              >
                Generate Label
              </MDButton>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        // <PrintLabel
        //   billingDetails={billingDetails}
        //   orders={orders}
        //   brandInfo={brandInfo}
        // />
        <PrintLabelFC
          orders={orders}
          brandInfo={brandInfo}
          billingDetails={billingDetails}
          disabled
        />
      )}
    </MDBox>
  );
}
