/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import PublishRoundedIcon from "@mui/icons-material/PublishRounded";
import SaveAltRoundedIcon from "@mui/icons-material/SaveAltRounded";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { alert } from "redux/slices/root/rootSlice";
import MDSnackbar from "components/MDSnackbar";
import MDBackdrop from "components/MDBackDrop";
import MDLoadingButton from "components/MDLoadingButton";
import { postProducts } from "../../services/inventory";
import { Validate } from "../../lib/validations";
import {
  ALL_REQUIRED_FIELDS,
  MORE_DETAILS_REQUIRED_FIELDS,
} from "../../lib/constants";

function MoreDetails(props) {
  const { data } = props;
  let validationResponse = {};
  const [isLoading, setIsLoading] = useState(false);
  const [isDraftLoading, setIsDraftLoading] = useState(false);
  let productState = {};
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [openError, setOpenError] = useState({ error: false, message: "" });

  const keys = Object.keys(data);
  if (keys.length === 0) {
    productState = useSelector(
      (state) => state.inventory.pricing,
      shallowEqual
    );
    productState = productState || {};
  } else {
    productState = data;
  }
  const [product, setProduct] = useState(productState);

  const { vitalInfo, offers, medias, description, categories, variant } =
    useSelector((state) => state.inventory);

  const [acceptTerms, setAcceptTerms] = useState(false);
  const handleClose = () => {
    const error = {
      error: false,
      message: "",
    };
    setOpenError(error);
  };
  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setProduct(() => ({
      ...product,
      [name]: value,
    }));
  };

  const handlePublish = async () => {
    const brandId = localStorage.getItem("brandId");

    if (!brandId) {
      setOpenError({
        error: true,
        message: "Some technical error happened.Please login again and try",
      });
      return false;
    }
    setShow(true);
    validationResponse = Validate(MORE_DETAILS_REQUIRED_FIELDS, product);
    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      setShow(false);
      return false;
    }
    const request = {
      BrandId: brandId,
      ...vitalInfo,
      ...offers,
      ...medias,
      ...description,
      ...categories,
      ...variant,
    };
    request.Status = "Published";

    const response = await postProducts(request, brandId);
    setShow(false);
    if (!response) {
      const error = {
        status: "error",
        message:
          "Product upload failed. Please check for any error or try again",
      };
      dispatch(alert(error));
    } else {
      const success = {
        status: "success",
        message:
          "Product has been uploaded to your inventory and will be live in few minutes",
      };
      dispatch(alert(success));
    }
  };
  const handleDraft = async () => {
    setIsDraftLoading(true);
    const brandId = localStorage.getItem("brandId");
    if (!brandId) {
      setOpenError({
        error: true,
        message: "Some technical error happened.Please login again and try",
      });
      return false;
    }
    setShow(true);
    validationResponse = Validate(MORE_DETAILS_REQUIRED_FIELDS, product);
    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      setShow(false);
      setIsDraftLoading(false);
      return false;
    }
    const request = {
      BrandId: brandId,
      ...vitalInfo,
      ...offers,
      ...medias,
      ...description,
      ...categories,
      ...variant,
    };
    request.Status = "Draft";
    const response = await postProducts(request, vitalInfo.BrandId);
    setShow(false);
    if (!response) {
      const error = {
        status: "error",
        message:
          "Product upload failed. Please check for any error or try again",
      };

      setIsDraftLoading(false);
      dispatch(alert(error));
    } else {
      const success = {
        status: "success",
        message:
          "Product has been uploaded to your inventory and will be live in few minutes",
      };

      setIsDraftLoading(false);
      dispatch(alert(success));
    }
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
      >
        <Grid item xs={5}>
          <Box mb={2}>
            <MDTypography
              variant="h6"
              textAlign="start"
              fontWeight="medium"
              p={3}
              mb={2}
            >
              Migo Loyalty
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
            variant="h6"
            textAlign="start"
            fontWeight="medium"
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

      <Grid container xs={12} mt={5} justifyContent="space-between">
        <Grid item xs={3} />
        <Grid item xs={5}>
          <MDBox display="flex" alignItems="center" ml={1} px={1}>
            <Checkbox
              size="small"
              color="info"
              onChange={() => {
                const value = !acceptTerms;
                setAcceptTerms(value);
              }}
              defaultChecked={false}
              checked={acceptTerms}
            />
            <MDTypography
              variant="button"
              color="text"
              sx={{ cursor: "pointer", userSelect: "none", ml: 1 }}
            >
              &nbsp;&nbsp;I agree the&nbsp;
            </MDTypography>
            <MDTypography
              component="a"
              href="#"
              variant="button"
              fontWeight="bold"
              color="info"
              textGradient
            >
              Terms and Conditions
            </MDTypography>
          </MDBox>
        </Grid>

        <Grid item xs={1} mx={1}>
          <MDLoadingButton
            onClick={handleDraft}
            loading={isDraftLoading}
            color="warning"
            size="small"
            loadingPosition="start"
            variant="outlined"
            startIcon={<SaveAltRoundedIcon />}
            mx={2}
            name="save"
          >
            Draft
          </MDLoadingButton>
        </Grid>
        <Grid item xs={1} mx={1}>
          <MDLoadingButton
            disabled={!acceptTerms}
            onClick={handlePublish}
            loading={isLoading}
            color="success"
            size="small"
            startIcon={<PublishRoundedIcon />}
            loadingPosition="start"
            variant="outlined"
            mx={5}
            name="save"
          >
            {" "}
            Publish
          </MDLoadingButton>
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
        {show ? <MDBackdrop show={show} /> : <></>}
      </Grid>
    </MDBox>
  );
}

export default MoreDetails;
