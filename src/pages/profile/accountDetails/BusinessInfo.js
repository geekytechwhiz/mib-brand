/* eslint-disable react/prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import Autocomplete from "@mui/material/Autocomplete";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import { Category, SubCategory } from "lib/data";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBrandThunk } from "redux-store/slices/onboarding/index";
import { updateBusinessDetails } from "services/onboarding/index";
import { gstValidator, validatePAN } from "../../../helper/validator";

export default function BusinessInfo({ data }) {
  const brandId = localStorage.getItem("brandId");
  const emailId = localStorage.getItem("emailId");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState({ save: false, cancel: false });
  const [disabled, setDisabled] = useState(true);
  const [gstSelection, setGstSelection] = useState(false);
  const [disableGstn, setDisableGstn] = useState(false);
  const [businessInfo, setBusinessDetails] = useState(data);
  const [gstValidation, setGstValidation] = useState({
    message: "",
    isValid: true,
  });
  const [panValidation, setPanValidation] = useState({
    message: "",
    isValid: true,
  });
  const [isSaved, setIsSaved] = useState(false);
  const options = [
    {
      label: "Private Limited",
      value: "Private Limited",
    },
    {
      label: "Public Limited",
      value: "Public Limited",
    },
    {
      label: "Limited Liability Partnership",
      value: "Limited Liability Partnership",
    },
  ];
  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      <MDTypography
        component="a"
        href="#"
        variant="body2"
        fontWeight="medium"
        color="white">
        {name} Saved successfully!
      </MDTypography>
    </MDTypography>
  );
  const handleCancel = async () => {
    const keys = Object.keys(businessInfo);
    const obj = {};
    keys.forEach((x) => {
      obj[x] = "";
    });
    setBusinessDetails(() => ({
      ...obj,
    }));
    setShowProgress(false);
  };
  const handleBusinessTypeChange = (event, values) => {
    const { value } = values;
    setBusinessDetails(() => ({
      ...businessInfo,
      BusinessType: value,
    }));
  };
  const handleSubCategoryChange = (event, values) => {
    const { value } = values;
    setBusinessDetails(() => ({
      ...businessInfo,
      SubCategory: value,
    }));
  };

  const handleCategoryChange = (event, values) => {
    const { value } = values;
    setBusinessDetails(() => ({
      ...businessInfo,
      Category: value,
    }));
  };

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;

    if (name === "GSTIN") {
      const res = gstValidator(value);
      if (!res)
        setGstValidation({
          isValid: false,
          message: "Please Enter Valid GSTIN Number",
        });
    }
    if (name === "BusinessPAN") {
      const validation = validatePAN(value);
      if (!validation)
        setPanValidation({
          isValid: false,
          message: "Please Enter Valid PAN Number",
        });
    }
    setBusinessDetails(() => ({
      ...businessInfo,
      [name]: value,
    }));
  };

  const handleGstnSelection = (e) => {
    const { value } = e.target;
    setGstSelection(!gstSelection);
    setDisableGstn(!disableGstn);
  };

  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
  };

  const handleSave = async () => {
    setIsLoading({ save: true, cancel: false });
    businessInfo.BrandId = brandId;
    const req = businessInfo;
    if (req.GSTIN) {
      req.GSTNVerification = true;
    }
    const res = await updateBusinessDetails(req, emailId);
    dispatch(getBrandThunk(emailId));

    if (res) {
      setIsLoading({ save: false, cancel: false });
      setIsSaved(true);
    }
  };
  return (
    <MDBox>
      {isSaved ? (
        <MDAlert color="success" dismissible>
          {alertContent("Business Details")}
        </MDAlert>
      ) : (
        <></>
      )}
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="space-around"
        flexDirection="row"
        xs={12}>
        <Grid item xs={11}>
          <MDTypography
            variant="h5"
            textAlign="start"
            fontWeight="medium"
            p={1}
            mb={2}>
            Business Details
          </MDTypography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            size="small"
            aria-label="edit"
            color="inherit"
            onClick={onHandleEdit}>
            <ModeEditOutlinedIcon fontSize="small">Edit</ModeEditOutlinedIcon>
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="space-around"
        flexDirection="row"
        xs={12}>
        <Grid item xs={5}>
          <Grid item xs={12} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="Business Name"
              fullWidth
              value={businessInfo.BusinessName}
              error={!businessInfo.BusinessName}
              name="BusinessName"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={12} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="Business Category"
              fullWidth
              value={businessInfo.Category}
              error={!businessInfo.Category}
              name="Category"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5} mb={2}>
          <Autocomplete
            disabled={disabled}
            disablePortal
            required
            onChange={handleBusinessTypeChange}
            placeholder="Business Type"
            value={businessInfo.BusinessType}
            error={!businessInfo.BusinessType}
            id="combo-BusinessType"
            options={options}
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
                disabled={disabled}
                {...params}
                name="BusinessType"
                label="Business Type"
                value={businessInfo.BusinessType}
              />
            )}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <Autocomplete
            disabled={disabled}
            disablePortal
            required
            placeholder="Business Category"
            id="combo-BusinessCategory"
            value={businessInfo.Category}
            error={!businessInfo.Category}
            onChange={handleCategoryChange}
            options={Category}
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
                disabled={disabled}
                {...params}
                value={businessInfo.Category}
                label="Business Category"
                name="Category"
              />
            )}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <Autocomplete
            disabled={disabled}
            disablePortal
            required
            value={businessInfo.SubCategory}
            placeholder="Sub Category"
            id="combo-SubCategory"
            onChange={handleSubCategoryChange}
            options={SubCategory}
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
                error={!businessInfo.SubCategory}
                disabled={disabled}
                value={businessInfo.SubCategory}
                name="SubCategory"
                {...params}
                label="Sub Category"
              />
            )}
          />
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="GSTIN"
              name="GSTIN"
              value={businessInfo.GSTIN}
              error={!gstValidation.isValid}
              fullWidth
              helperText={gstValidation.message}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              label="Business PAN"
              name="BusinessPAN"
              value={businessInfo.BusinessPAN}
              error={!panValidation.isValid}
              helperText={panValidation.message}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={12} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              name="PANOwnerName"
              label="PAN Owner Name"
              value={businessInfo.PANOwnerName}
              error={!businessInfo.PANOwnerName}
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={12} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              error={!businessInfo.BrandName}
              value={businessInfo.BrandName}
              name="BrandName"
              label="Billing Label"
              fullWidth
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <MDInput
            disabled={disabled}
            type="text"
            name="WebSiteLink"
            value={businessInfo.WebSiteLink}
            label="Website link"
            fullWidth
            onChange={handleChange}
          />
        </Grid>{" "}
        <Grid item xs={5} />
      </Grid>
      {disabled ? (
        <></>
      ) : (
        <MDBox display="flex" flexDirection="row" justifyContent="flex-end">
          <MDBox sx={{ mx: 2 }}>
            <MDLoadingButton
              loading={isLoading.cancel}
              color="error"
              loadingPosition="start"
              startIcon={<CancelIcon />}
              variant="outlined"
              mx={2}
              onClick={handleCancel}
              size="small">
              Cancel
            </MDLoadingButton>
          </MDBox>
          <MDBox sx={{ mx: 2 }}>
            <MDLoadingButton
              loading={isLoading.save}
              color="success"
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="outlined"
              mx={2}
              onClick={handleSave}
              size="small">
              Save
            </MDLoadingButton>
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
}
