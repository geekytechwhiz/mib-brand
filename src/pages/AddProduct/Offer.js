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
import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { offers } from "../../redux/slices/inventory";

function Offer(props) {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const productState =
    useSelector((state) => state.inventory.offers, shallowEqual) || {};
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
    debugger;
    const { name } = event.target;
    const { value } = event.target;
    if (!value) return null;

    setProduct(() => ({
      ...product,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
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
          <MDBox
            variant="gradient"
            bgColor="transparent"
            borderRadius="lg"
            coloredShadow="info"
            mx={0.5}
            mt={2}
            p={2}
            mb={1}
          >
            <Box mb={2}>
              <MDTypography
                variant="h5"
                textAlign="start"
                fontWeight="medium"
                color="gray"
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
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <MDInput
                  required
                  name="SellingPrice"
                  value={product.SellingPrice}
                  error={product.SellingPrice}
                  type="text"
                  label="Selling Price"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <MDInput
                  required
                  type="text"
                  name="Quantity"
                  value={!product.Quantity}
                  label="Quantity"
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
                  error={!product.CountryOfOrigin}
                  name="CountryOfOrigin"
                  value={product.CountryOfOrigin}
                  label="Country Of Origin"
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              {/* <Grid item xs={12} mb={2}>
                <TagsInput
                  selectedTags={handleSelectedTags}
                  fullWidth
                  onChange={handleChange}
                  variant="outlined"
                  id="tags"
                  name="Tags"
                  value={product.Tags}
                  placeholder="add Tags"
                  label="tags"
                />
              </Grid> */}

              <Grid item xs={4} mb={2}>
                <Autocomplete
                  disablePortal
                  required
                  error={!product.DeliveryChannel}
                  placeholder="Delivery Channel"
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
      <Grid container xs={12} justifyContent="space-between">
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
    </MDBox>
  );
}

export default Offer;
