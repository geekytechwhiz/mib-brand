/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import { RESOURCE_DOCUMENT_VERIFICATION } from "lib/constants";
import _ from "lodash";
import React, { useRef, useState } from "react";
import { postSignedUrl } from "services/common";
import { v4 as uuidv4 } from "uuid";
import { updateAddressDetails } from "../../services/onboarding/index";

export default function AddressDetails({ data }) {
  debugger;
  const signatureRef = useRef(null);
  const logoRef = useRef(null);
  const [isLoading, setIsLoading] = useState({
    Signature: false,
    Logo: false,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isEnabled, setIsEnabled] = useState({
    Signature: false,
    Logo: false,
  });

  const uuid = uuidv4();
  const brandId = localStorage.getItem("brandId");
  const emailId = localStorage.getItem("emailId");
  const [disabled, setDisabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [addressDetails, setAddressDetails] = useState(data);
  const [isSameAddress, setIsSameAddress] = useState(false);
  // const billingAddress = addressDetails.BillingAddress || {};
  // const shippingAddress = addressDetails.ShippingAddress || {};
  const [document, setDocuments] = useState({
    Logo: "",
    Signature: "",
  });

  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
  };
  const handleCancel = async () => {
    const keys = Object.keys(addressDetails);
    const obj = {};
    keys.forEach((x) => {
      obj[x] = "";
    });
    setAddressDetails(() => ({
      ...obj,
    }));

    setIsLoading({ save: false, cancel: false });
  };
  const handleSave = async () => {
    setIsLoading({ save: true, cancel: false });
    const res = await updateAddressDetails(addressDetails, emailId);
    console.log(res);
    setIsLoading({ save: false, cancel: false });
    setIsSaved(true);
  };
  const handleChange = (event) => {
    debugger;
    const { name } = event.target;
    const { value } = event.target;
    const temp = _.cloneDeep(addressDetails.BillingAddress);
    temp[name] = value;
    setAddressDetails(() => ({
      ...addressDetails,
      BillingAddress: temp,
    }));
  };

  const handleShippingChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    const temp = _.cloneDeep(addressDetails.ShippingAddress);
    temp[name] = value;
    setAddressDetails(() => ({
      ...addressDetails,
      ShippingAddress: temp,
    }));
  };

  const getUploadParams = async (e) => {
    debugger;
    const { name } = e.target;
    const isLoadingObj = {
      Signature: false,
      Logo: false,
    };
    isLoadingObj[name] = true;
    setIsLoading(isLoadingObj);
    const file = selectedFiles[0];
    const req = {
      contentType: file.type,
      resource: RESOURCE_DOCUMENT_VERIFICATION,
      brandId,
      resourceId: name,
      uuid,
    };
    const res = await postSignedUrl(req);
    if (!res) return null;
    const axiosRes = await axios.put(res.preSignedUrl, file);

    if (axiosRes.status !== 200) return false;
    const imgUlr = { Name: file.name, Url: res.fileName };
    setAddressDetails(() => ({
      ...addressDetails,
      [name]: imgUlr,
    }));
    setIsSaved(true);
    setIsEnabled({
      Signature: false,
      Logo: false,
    });
    setIsLoading({
      Signature: false,
      Logo: false,
    });

    return {
      body: file,
      meta: { fileUrl: `https://mibuploaddev.s3.ap-south-1.amazonaws.com` },
      url: res.preSignedUrl,
    };
  };

  const handleFileUpload = (event) => {
    const { name } = event.target;
    if (event.target.files[0]) {
      const tempSelectedFiles = selectedFiles;
      tempSelectedFiles.push(event.target.files[0]);
      setSelectedFiles(tempSelectedFiles);
      setDocuments(() => ({
        ...document,
        [name]: event.target.files[0].name,
      }));
      const buttonState = {
        Signature: false,
        Logo: false,
      };
      buttonState[name] = true;
      setIsEnabled(buttonState);
    }
  };

  const handleCheckBox = (event) => {
    const { checked } = event.target;
    if (checked) {
      const address = _.cloneDeep(addressDetails.BillingAddress);
      setAddressDetails(() => ({
        ...addressDetails,
        ShippingAddress: address,
      }));
    }

    setIsSameAddress(checked);
  };
  const alertContent = (message) => (
    <MDTypography variant="body2" color="white">
      <CheckCircleOutlineRoundedIcon />
      <MDTypography
        sx={{ padding: 2 }}
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

  return (
    <MDBox textAlign="center">
      {isSaved ? (
        <MDAlert color="success" dismissible>
          {alertContent("Document uploaded successfully!")}
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
        justifyContent="space-around"
        flexDirection="row"
        xs={12}
      >
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            value={addressDetails?.BillingAddress?.AddressLine1}
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
            value={addressDetails?.BillingAddress?.AddressLine2}
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
            value={addressDetails?.BillingAddress?.PinCode}
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
            value={addressDetails?.BillingAddress?.City}
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
            label="State"
            name="State"
            value={addressDetails?.BillingAddress?.State}
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
            value={addressDetails?.BillingAddress?.Phone}
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
            control={
              <Checkbox
                defaultChecked
                checked={isSameAddress}
                onClick={handleCheckBox}
              />
            }
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
            value={addressDetails?.ShippingAddress?.AddressLine1}
            required
            type="text"
            name="AddressLine1"
            label="Address Line 1"
            fullWidth
            onChange={handleShippingChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            value={addressDetails?.ShippingAddress?.AddressLine1}
            required
            type="text"
            name="AddressLine2"
            label="Address Line 2"
            fullWidth
            onChange={handleShippingChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            label="Pincode"
            value={addressDetails?.ShippingAddress?.PinCode}
            name="PinCode"
            fullWidth
            onChange={handleShippingChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="City"
            value={addressDetails?.ShippingAddress?.City}
            label="City"
            fullWidth
            onChange={handleShippingChange}
          />
        </Grid>

        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="State"
            value={addressDetails?.ShippingAddress?.State}
            label="State"
            fullWidth
            onChange={handleShippingChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="Phone"
            value={addressDetails?.ShippingAddress?.Phone}
            label="Phone"
            fullWidth
            onChange={handleShippingChange}
          />
        </Grid>
      </Grid>

      <Grid
        container
        display="flex"
        spacing={1}
        justifyContent="center"
        flexDirection="column"
        xs={12}
      >
        <Grid item xs={5} mb={1} textAlign="left">
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textAlign="left"
          >
            Upload Brand Logo
          </MDTypography>
          <>
            <label htmlFor="icon-button-photo">
              <input
                ref={logoRef}
                type="file"
                name="Logo"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <IconButton
                color="secondary"
                aria-label="Logo"
                component="span"
                onClick={() => logoRef.current.click()}
              >
                <PhotoCamera />
              </IconButton>
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="medium"
                textAlign="left"
              >
                {document.Logo}
              </MDTypography>
              {isEnabled.Logo ? (
                <MDLoadingButton
                  sx={{ margin: 2 }}
                  loading={isLoading.Logo}
                  disabled={!isEnabled.Logo}
                  color="success"
                  loadingPosition="start"
                  startIcon={<PhotoCamera />}
                  variant="outlined"
                  mx={2}
                  name="Logo"
                  size="small"
                  onClick={getUploadParams}
                >
                  Upload
                </MDLoadingButton>
              ) : (
                <></>
              )}
              {addressDetails?.Logo ? (
                <CheckCircleOutlineOutlinedIcon color="success" />
              ) : (
                <DoDisturbOnOutlinedIcon color="error">
                  not verified
                </DoDisturbOnOutlinedIcon>
              )}
            </label>
          </>
        </Grid>
        <Grid item xs={12} mb={1} textAlign="left">
          <MDTypography
            variant="caption"
            color="text"
            fontWeight="medium"
            textAlign="left"
          >
            Upload Signature of Authorized Signatory
          </MDTypography>
          <>
            <label htmlFor="icon-button-photo">
              <input
                ref={signatureRef}
                type="file"
                name="Signature"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileUpload}
              />
              <IconButton
                color="secondary"
                aria-label="Signature"
                component="span"
                onClick={() => signatureRef.current.click()}
              >
                <PhotoCamera />
              </IconButton>
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="medium"
                textAlign="left"
              >
                {document.Signature}
              </MDTypography>
              {isEnabled.Signature ? (
                <MDLoadingButton
                  sx={{ margin: 2 }}
                  loading={isLoading.Signature}
                  disabled={!isEnabled.Signature}
                  color="success"
                  loadingPosition="start"
                  startIcon={<PhotoCamera />}
                  variant="outlined"
                  mx={2}
                  name="Signature"
                  size="small"
                  onClick={getUploadParams}
                >
                  Upload
                </MDLoadingButton>
              ) : (
                <></>
              )}
              {addressDetails?.Signature ? (
                <CheckCircleOutlineOutlinedIcon color="success" />
              ) : (
                <DoDisturbOnOutlinedIcon color="error">
                  not verified
                </DoDisturbOnOutlinedIcon>
              )}
            </label>
          </>
        </Grid>
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
              size="small"
            >
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
              size="small"
            >
              Save
            </MDLoadingButton>
          </MDBox>
        </MDBox>
      )}
    </MDBox>
  );
}
