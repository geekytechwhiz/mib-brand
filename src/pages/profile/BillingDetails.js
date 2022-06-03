/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDModal from "components/MDModal";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { updateBankDetails } from "../../services/onboarding/index";

export default function BillingInfo({ data }) {
  const brandId = localStorage.getItem("brandId");
  const emailId = localStorage.getItem("emailId");
  const [showProgress, setShowProgress] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [billingInfo, setBankDetails] = useState(data);

  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
  };
  const handleClose = () => {
    setShowProgress(false);
  };
  const handleCancel = async () => {
    const keys = Object.keys(billingInfo);
    const obj = {};
    keys.forEach((x) => {
      obj[x] = "";
    });
    setBankDetails(() => ({
      ...obj,
    }));
    setShowProgress(false);
  };
  const handleSave = async () => {
    const bankObj = { ...data };
    bankObj.BrandId = brandId;
    const req = { ...bankObj, ...billingInfo };
    setShowProgress(true);
    const res = await updateBankDetails(req, emailId);
    if (res) {
      setShowProgress(false);
      setIsSaved(true);
    }
  };
  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setBankDetails(() => ({
      ...billingInfo,
      [name]: value,
    }));
  };
  const alertContent = (message) => (
    <MDTypography variant="body2" color="white">
      <MDTypography
        component="a"
        href="#"
        variant="body2"
        fontWeight="medium"
        color="white"
      >
        {message}
      </MDTypography>
    </MDTypography>
  );
  const Input = styled("input")({
    display: "none",
  });
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
      <MDModal open={showProgress} onClose={handleClose} />
      {isSaved ? (
        <MDAlert color="success" dismissible>
          {alertContent("")}
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
            p={1}
            mb={2}
          >
            Billing Information
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
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            error={!billingInfo.AddressLine1}
            value={billingInfo.AddressLine1}
            required
            type="text"
            name="AddressLine1"
            label="Address Line 1"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            error={!billingInfo.AddressLine1}
            value={billingInfo.AddressLine1}
            required
            type="text"
            name="AddressLine2"
            label="Address Line 2"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            label="Pincode"
            error={!billingInfo.PinCode}
            value={billingInfo.PinCode}
            name="PinCode"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="City"
            error={!billingInfo.City}
            value={billingInfo.City}
            label="City"
            fullWidth
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="State"
            error={!billingInfo.State}
            value={billingInfo.State}
            label="State"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="Phone"
            error={!billingInfo.Phone}
            value={billingInfo.Phone}
            label="Phone"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="flex-start"
        flexDirection="row"
        textAlign="left"
      >
        <Grid mx={2} item xs={6}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={
              <MDTypography
                display="block"
                variant="caption"
                color="text"
                fontWeight="medium"
                p={1}
                mb={2}
              >
                Is Billing Address is same as Shipping Address?
              </MDTypography>
            }
          />
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
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            error={!billingInfo.AddressLine1}
            value={billingInfo.AddressLine1}
            required
            type="text"
            name="AddressLine1"
            label="Address Line 1"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            error={!billingInfo.AddressLine1}
            value={billingInfo.AddressLine1}
            required
            type="text"
            name="AddressLine2"
            label="Address Line 2"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            label="Pincode"
            error={!billingInfo.PinCode}
            value={billingInfo.PinCode}
            name="PinCode"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="City"
            error={!billingInfo.City}
            value={billingInfo.City}
            label="City"
            fullWidth
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="State"
            error={!billingInfo.State}
            value={billingInfo.State}
            label="State"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="Phone"
            error={!billingInfo.Phone}
            value={billingInfo.Phone}
            label="Phone"
            fullWidth
            onChange={handleChange}
          />
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
        <Grid item xs={5} mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Upload Signature of Authorized Signatory
          </MDTypography>

          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton
              color="secondary"
              aria-label="upload Signature"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Upload Company Logo
          </MDTypography>

          <label htmlFor="icon-button-file">
            <Input accept="image/*" id="icon-button-file" type="file" />
            <IconButton
              color="secondary"
              aria-label="upload Logo"
              component="span"
            >
              <PhotoCamera />
            </IconButton>
          </label>
        </Grid>
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
