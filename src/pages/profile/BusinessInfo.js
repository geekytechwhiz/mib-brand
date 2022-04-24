/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Autocomplete from "@mui/material/Autocomplete";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDModal from "components/MDModal";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Category, SubCategory } from "../../lib/data";
import { updateBusinessDetails } from "../../services/onboarding/index";

export default function BusinessInfo() {
  let businessDetails = useSelector((state) => state.accountInfo);
  const { BrandId } = useSelector((state) => state.accountInfo) || "";
  const { EmailId } = useSelector((state) => state.accountInfo) || "";
  businessDetails = businessDetails || {};
  const [showProgress, setShowProgress] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [disableGstn, setDisableGstn] = useState(true);
  const [businessInfo, setBusinessDetails] = useState(BusinessDetails);
  const [isSaved, setIsSaved] = useState(false);
  const options = [
    {
      label: "Private Limited",
      value: "pvt.Ltd",
    },
    {
      label: "Public Limited",
      value: "pub.Ltd",
    },
    {
      label: "Limited Liability Partnership",
      value: "llp",
    },
  ];
  const alertContent = (name) => (
    <MDTypography variant="body2" color="white">
      <MDTypography
        component="a"
        href="#"
        variant="body2"
        fontWeight="medium"
        color="white"
      >
        {name} Saved successfully!
      </MDTypography>
    </MDTypography>
  );
  const handleCancel = async () => {
    debugger;
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
    debugger;
    const { value } = values;
    setBusinessDetails(() => ({
      ...businessInfo,
      BusinessType: value,
    }));
  };
  const handleSubCategoryChange = (event, values) => {
    debugger;
    const { value } = values;
    setBusinessDetails(() => ({
      ...businessInfo,
      SubCategory: value,
    }));
  };

  const handleCategoryChange = (event, values) => {
    debugger;
    const { value } = values;
    setBusinessDetails(() => ({
      ...businessInfo,
      Category: value,
    }));
  };

  const handleChange = (event) => {
    debugger;
    const { name } = event.target;
    const { value } = event.target;
    setBusinessDetails(() => ({
      ...businessInfo,
      [name]: value,
    }));
  };

  const handleGstnSelection = (e) => {
    debugger;
    const { value } = e.target;
    if (value === "1") {
      setDisableGstn(false);
    } else {
      setDisableGstn(true);
    }
  };

  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
  };

  const handleSave = async () => {
    debugger;
    setShowProgress(true);
    businessInfo.BrandId = BrandId;
    const req = { ...BusinessDetails, ...businessInfo };

    const res = await updateBusinessDetails(req, EmailId);
    if (res) {
      setShowProgress(false);
      setIsSaved(true);
    }
  };
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={3}
      p={1}
      pb={5}
      mb={4}
      textAlign="center"
    >
      <MDModal open={showProgress} />
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
        xs={12}
      >
        <Grid item xs={11}>
          <MDTypography
            variant="h5"
            textAlign="start"
            fontWeight="medium"
            color="gray"
            p={1}
            mb={2}
          >
            Business Details
          </MDTypography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            size="small"
            aria-label="edit"
            color="inherit"
            onClick={onHandleEdit}
          >
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
        xs={12}
      >
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
        <Grid item xs={5} mb={2}>
          <Grid item xs={12} mb={2}>
            <RadioGroup
              row
              aria-labelledby="radio-buttons-group-label"
              name="row-radio-buttons-group"
              value="0"
              onChange={handleGstnSelection}
            >
              <FormControlLabel
                disabled={disabled}
                control={<Radio />}
                value="1"
                label="We have GSTIN"
              />
              <FormControlLabel
                disabled={disabled}
                value="0"
                control={<Radio />}
                label="We dont have have GSTIN"
              />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <Grid item xs={8} mb={2}>
            <MDInput
              disabled={disableGstn}
              required
              type="text"
              label="GSTIN"
              name="GSTIN"
              value={businessInfo.GSTIN}
              error={!businessInfo.GSTIN}
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
              label="Business PAN"
              name="BusinessPAN"
              value={businessInfo.BusinessPAN}
              error={!businessInfo.BusinessPAN}
              fullWidth
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
          <Grid item xs={8} mb={2}>
            <MDInput
              disabled={disabled}
              required
              type="text"
              error={!businessInfo.PinCode}
              value={businessInfo.PinCode}
              name="PinCode"
              label="Pin Code"
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <div>
            <MDButton
              color="#007EFF"
              variant="gradient"
              mx={2}
              style={{
                color: "#007EFF",
                borderColor: "#007EFF",
                borderWidth: 1,
                borderStyle: "solid",
                marginRight: 20,
              }}
              onClick={handleCancel}
              size="small"
            >
              Cancel
            </MDButton>
          </div>
          <div>
            <MDButton
              color="#007EFF"
              variant="gradient"
              mx={2}
              style={{
                color: "#007EFF",
                borderColor: "#007EFF",
                borderWidth: 1,
                borderStyle: "solid",
                marginRight: 20,
              }}
              onClick={handleSave}
              size="small"
            >
              Save
            </MDButton>
          </div>
        </div>
      )}
    </MDBox>
  );
}
