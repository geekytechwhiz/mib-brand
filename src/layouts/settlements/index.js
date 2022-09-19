/* eslint-disable no-debugger */
/* eslint-disable no-debugger */

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import Settlement from "pages/settlement";
import { useDispatch } from "react-redux";
import { getBrandThunk } from "../../redux/slices/onboarding/index";
import {
  getOrderThunk,
  getReturnsThunk
} from "../../redux/slices/orders/orderSlice";

function OrderLayout() {
  const dispatch = useDispatch();
  const brandId = localStorage.getItem("brandId");
  dispatch(getOrderThunk(brandId));
  dispatch(getReturnsThunk(brandId));
  const emailId = localStorage.getItem("emailId");
  if (emailId) dispatch(getBrandThunk(emailId));
  return ( 
      <MDBox pt={1} pb={1}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Settlement />
          </Grid>
        </Grid>
      </MDBox> 
  );
}

export default OrderLayout;
