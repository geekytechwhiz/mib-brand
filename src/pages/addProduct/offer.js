/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import MDSnackbar from "components/MDSnackbar";
import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { offers } from "../../redux/slices/inventory";
import { Validate } from "../../lib/validations";
import { REQUIRED_FIELDS_OFFER } from "../../lib/constants";

function Offer(props) {
  const { activeTab, data } = props;
  let validationResponse = {};
  let productState = {};
  const dispatch = useDispatch();
  const [openError, setOpenError] = useState({ error: false, message: "" });

  const keys = Object.keys(data);
  if (keys.length === 0) {
    productState = useSelector((state) => state.inventory.offers, shallowEqual);
    productState = productState || {};
  } else {
    productState = data;
  }
  const [product, setProduct] = useState(productState);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setProduct((p) => ({
      ...product,
      [name]: value,
    }));
  };
  const handleSelect = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    if (!value) return null;

    setProduct(() => ({
      ...product,
      [name]: value,
    }));
  };
  const handleClose = () => {
    const error = {
      error: false,
      message: "",
    };
    setOpenError(error);
  };
  const handleNext = (e) => {
    validationResponse = Validate(REQUIRED_FIELDS_OFFER, product);
    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      return false;
    }
    dispatch(offers(product));
    activeTab(e, "4");
  };
  const handleBack = (e) => {
    dispatch(offers(product));
    activeTab(e, "2");
  };
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={-3}
      mt={-2}
      p={2}
      mb={1}
      textAlign="center"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MDBox>
            <Box mb={2}>
              <MDTypography
                variant="h6"
                textAlign="start"
                fontWeight="medium"
                mb={2}
              >
                offers and Pricing
              </MDTypography>
            </Box>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={4} mb={2}>
                <MDInput
                  required
                  error={!product.YourPrice}
                  type="text"
                  name="YourPrice"
                  value={product.YourPrice}
                  label="Your Price"
                  fullWidth
                  onChange={handleChange}
                  helperText="Required field"
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <MDInput
                  required
                  type="text"
                  name="MRP"
                  error={!product.MRP}
                  value={product.MRP}
                  label="MRP"
                  fullWidth
                  onChange={handleChange}
                  helperText="Required field"
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <MDInput
                  required
                  name="SellingPrice"
                  value={product.SellingPrice}
                  error={!product.SellingPrice}
                  type="text"
                  label="Selling Price"
                  helperText="Required field"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <MDInput
                  required
                  type="text"
                  name="Quantity"
                  error={!product.Quantity}
                  value={product.Quantity}
                  label="Quantity"
                  helperText="Required field"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <Autocomplete
                  disablePortal
                  required
                  placeholder="Condition"
                  id="combo-Condition"
                  name="Condition"
                  options={[
                    { value: "new", label: "New" },
                    { value: "used", label: "Used" },
                  ]}
                  onSelect={handleSelect}
                  sx={{
                    "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input":
                      {
                        paddingTop: 0,
                        paddingLeft: 4,
                        paddingRight: 6,
                        paddingBottom: 0,
                      },
                  }}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Condition"
                      name="Condition"
                      onChange={handleChange}
                      value={product.Condition}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <MDInput
                  required
                  type="text"
                  helperText="Required field"
                  error={!product.CountryOfOrigin}
                  name="CountryOfOrigin"
                  value={product.CountryOfOrigin}
                  label="Country Of Origin"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={4} mb={2}>
                <Autocomplete
                  disablePortal
                  required
                  error={!product.DeliveryChannel}
                  placeholder="Delivery Channel"
                  helperText="Required field"
                  id="combo-Condition"
                  name="DeliveryChannel"
                  options={[
                    { value: "Migo", label: "Migo Delivery" },
                    { value: "self", label: "self" },
                  ]}
                  onSelect={handleSelect}
                  sx={{
                    "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input":
                      {
                        paddingTop: 0,
                        paddingLeft: 4,
                        paddingRight: 6,
                        paddingBottom: 0,
                      },
                  }}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="DeliveryChannel"
                      name="DeliveryChannel"
                      onChange={handleChange}
                      value={product.DeliveryChannel}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <Autocomplete
                  disablePortal
                  required
                  placeholder="Tax Code"
                  id="combo-taxCode"
                  name="TaxCode"
                  error={!product.TaxCode}
                  options={[
                    { value: "GST1", label: "GST 1" },
                    { value: "GST2", label: "GST 2" },
                  ]}
                  onSelect={handleSelect}
                  sx={{
                    "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input":
                      {
                        paddingTop: 0,
                        paddingLeft: 4,
                        paddingRight: 6,
                        paddingBottom: 0,
                      },
                  }}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Tax Code"
                      name="TaxCode"
                      onChange={handleChange}
                      value={product.TaxCode}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item>
          <Button
            color="primary"
            onClick={handleBack}
            variant="text"
            endIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={handleNext}
            variant="text"
            endIcon={<ArrowForwardIosIcon />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <MDSnackbar
          color="error"
          icon="warning"
          title="Missing required fields"
          content={`${openError.message}`}
          open={openError.error}
          onClose={handleClose}
          close={handleClose}
          bgWhite
        />
      </Grid>
    </MDBox>
  );
}

export default Offer;
