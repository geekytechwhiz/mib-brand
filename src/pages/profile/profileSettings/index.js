/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import React from "react";
import PasswordReset from "./PasswordReset";

function ProfileSettings({ data }) {
  return (
    <MDBox textAlign="center">
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="space-around"
        flexDirection="row"
        xs={12}
      >
        <Grid item xs={6}>
          <PasswordReset />
        </Grid>
        <Grid item xs={6} />
        <Grid item xs={6} />
        <Grid item xs={6} />
      </Grid>
    </MDBox>
  );
}

export default ProfileSettings;
