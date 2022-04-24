/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Autocomplete from "@mui/material/Autocomplete";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { vitalInfo } from "../../redux/slices/inventory";

function VitalInfo(props) {
  debugger;
  const { activeTab } = props;
  const dispatch = useDispatch();
  const productId = `P${new Date().getTime().toString()}`;
  const productState = useSelector(
    (state) => state.inventory.vitalInfo,
    shallowEqual
  );

  const accountInfo = useSelector((state) => state.accountInfo);

  const [product, setProduct] = useState(productState);

  const handleChange = (event) => {
    debugger;
    const { name } = event.target;
    const { value } = event.target;
    setProduct(() => ({
      ...product,
      [name]: value,
    }));
  };

  const handleNext = (e) => {
    debugger;
    activeTab(e, "2");
    setProduct(() => ({
      ...product,
      ProductId: productId,
      BrandId: accountInfo.BrandId,
    }));
    dispatch(vitalInfo(product));
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
      <Grid container alignItems="center" spacing={2}>
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
                Product Details
              </MDTypography>
            </Box>
            <Grid container spacing={2} xs={12}>
              <Grid item xs={12} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="Tittle"
                  error={!product.Title}
                  fullWidth
                  onChange={handleChange}
                  name="Title"
                  value={product.Title}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="Brand Name"
                  error={!product.ProductBrand}
                  fullWidth
                  onChange={handleChange}
                  name="ProductBrand"
                  value={product.ProductBrand}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="Manufacturer"
                  name="Manufacturer"
                  value={product.Manufacturer}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type="number"
                  label="Number Of Items"
                  error={!product.NumberOfItems}
                  fullWidth
                  onChange={handleChange}
                  name="NumberOfItems"
                  value={product.NumberOfItems}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type="text"
                  label="Unit Count"
                  error={!product.UnitCount}
                  fullWidth
                  onChange={handleChange}
                  name="UnitCount"
                  value={product.UnitCount}
                />
              </Grid>
              <Grid item xs={4} mb={2}>
                <Autocomplete
                  disablePortal
                  required
                  value={product.UnitType}
                  placeholder="Unit Type"
                  id="combo-taxCode"
                  name="UnitType"
                  options={[
                    { value: "Count", label: "Count" },
                    { value: "Grams", label: "Grams" },
                  ]}
                  onSelect={handleChange}
                  sx={{
                    "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input .MuiOutlinedInput-root":
                      {
                        padding: 5,
                      },
                  }}
                  renderInput={(params) => (
                    <MDInput
                      {...params}
                      label="Unit Type"
                      name="UnitType"
                      onChange={handleChange}
                      value={product.TaxCode}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6} mb={2}>
                <MDInput
                  required
                  type="text"
                  error={!product.WarrantyDescription}
                  label="Warranty Description"
                  fullWidth
                  onChange={handleChange}
                  name="WarrantyDescription"
                  value={product.WarrantyDescription}
                />
              </Grid>
            </Grid>
          </MDBox>
        </Grid>
      </Grid>
      <Grid container xs={12} justifyContent="space-between">
        <Grid item />
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

export default VitalInfo;
