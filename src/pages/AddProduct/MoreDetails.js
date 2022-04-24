/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postProducts } from "../../services/inventory";

function MoreDetails(props) {
  const { activeTab } = props;

  const dispatch = useDispatch();
  const productState = useSelector((state) => state.pricing) || {};
  const { vitalInfo, offers, medias, description, categories, variant } =
    useSelector((state) => state.inventory);
  const BrandId = "BR1650183738930";
  // useSelector((state) => state.accountInfo) || "BR1650183738930";
  const [product, setProduct] = useState(productState);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setProduct((p) => ({
      ...product,
      [name]: value,
    }));
  };

  const handlePublish = (e) => {
    debugger;
    const request = {
      ...vitalInfo,
      ...offers,
      ...medias,
      ...description,
      ...categories,
      ...variant,
    };
    request.Status = "Published";
    postProducts(request, BrandId);
  };
  const handleDraft = (e) => {
    debugger;
    const request = {
      ...vitalInfo,
      ...offers,
      ...medias,
      ...description,
      ...categories,
      ...variant,
    };
    request.Status = "Draft";
    postProducts(request, BrandId);
  };

  const handleBack = (e) => {
    // dispatch(pricing(product));
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
      mb={2}
      textAlign="center"
    >
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="flex-start"
        flexDirection="row"
        xs={12}
      >
        <Grid item xs={5}>
          <Box mb={2}>
            <MDTypography
              variant="h5"
              textAlign="start"
              fontWeight="medium"
              color="gray"
              p={3}
              mb={2}
            >
              Pricing
            </MDTypography>
          </Box>

          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              label="Buddy Margin"
              name="BuddyMargin"
              value={product.BuddyMargin}
              error={!product.BuddyMargin}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              label="Loyalty Point"
              name="LoyaltyPoint"
              error={!product.LoyaltyPoint}
              value={product.LoyaltyPoint}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <MDTypography
            variant="h5"
            textAlign="start"
            fontWeight="medium"
            color="gray"
            p={3}
            mb={2}
          >
            Shipping
          </MDTypography>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              label="Local Delivery Charges"
              name="LocalDeliveryCharge"
              value={product.LocalDeliveryCharge}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              label="Zonal Delivery Charges "
              name="ZonalDeliveryCharge"
              value={product.ZonalDeliveryCharge}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              label="National Delivery Charges"
              name="NationalDeliveryCharge"
              value={product.NationalDeliveryCharge}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={8} mb={2}>
            <MDInput
              required
              type="text"
              name="SellingPrice"
              value={product.SellingPrice}
              label="Selling Price"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container xs={12} justifyContent="space-between">
        <Grid item>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Accept terms and condition"
          />
        </Grid>
        <Grid item>
          <MDButton
            variant="gradient"
            color="#007EFF"
            onClick={handleDraft}
            size="small"
            style={{
              color: "#007EFF",
              marginRight: 50,
              borderColor: "#007EFF",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            mx={2}
          >
            {" "}
            Draft
          </MDButton>
          <MDButton
            color="#007EFF"
            variant="gradient"
            mx={2}
            style={{
              color: "#007EFF",
              borderColor: "#007EFF",
              borderWidth: 1,
              borderStyle: "solid",
            }}
            onClick={handlePublish}
            size="small"
          >
            {" "}
            Publish
          </MDButton>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default MoreDetails;
