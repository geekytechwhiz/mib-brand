/* eslint-disable no-unused-vars */

// Images
// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";
import SignIn from "pages/Authentication/sign-in";
import Grid from "@mui/material/Grid";
import { useCallback } from "react";
import loginImage from "../../../assets/images/login.png";

function Basic() {
  return useCallback(
    <CoverLayout>
      <Grid item xs={6}>
        <img src={loginImage} width={620} height={520} alt="abc" />
      </Grid>
      <Grid item xs={4}>
        <SignIn />
      </Grid>
    </CoverLayout>
  );
}

export default Basic;
