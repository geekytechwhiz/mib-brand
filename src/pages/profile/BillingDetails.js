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
import React, { useRef, useState } from "react";
import { postSignedUrl } from "services/common";
import { v4 as uuidv4 } from "uuid";
import { updateBankDetails } from "../../services/onboarding/index";

export default function BillingInfo({ data }) {
  const signatureRef = useRef(null);
  const logoRef = useRef(null);
  const [isLoading, setIsLoading] = useState({
    signature: false,
    logo: false,
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isEnabled, setIsEnabled] = useState({
    signature: false,
    logo: false,
  });
  const brandId = localStorage.getItem("brandId");
  const emailId = localStorage.getItem("emailId");
  const [disabled, setDisabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [billingInfo, setBankDetails] = useState(data);
  const [document, setDocuments] = useState({
    logo: "",
    signature: "",
  });

  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
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

    setIsLoading({ save: false, cancel: false });
  };
  const handleSave = async () => {
    const bankObj = { ...data };
    bankObj.BrandId = brandId;
    const req = { ...bankObj, ...billingInfo };

    setIsLoading({ save: true, cancel: false });
    const res = await updateBankDetails(req, emailId);
    if (res) {
      setIsLoading({ save: false, cancel: false });
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
  const uuid = uuidv4();
  const getUploadParams = async (e) => {
    debugger;
    const { name } = e.target;
    const isLoadingObj = {
      signature: false,
      logo: false,
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
    setIsSaved(true);
    setIsEnabled({
      signature: false,
      logo: false,
    });
    setIsLoading({
      signature: false,
      logo: false,
    });
    return {
      body: file,
      meta: { fileUrl: `https://mibuploaddev.s3.ap-south-1.amazonaws.com` },
      url: res.preSignedUrl,
    };
  };

  const handleFileUpload = (event) => {
    debugger;
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
        signature: false,
        logo: false,
      };
      buttonState[name]=true
      setIsEnabled(buttonState);
    }
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
                name="logo"
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
                {document.logo}
              </MDTypography>
              {isEnabled.logo ? (
                <MDLoadingButton
                  sx={{ margin: 2 }}
                  loading={isLoading.logo}
                  disabled={!isEnabled.logo}
                  color="success"
                  loadingPosition="start"
                  startIcon={<PhotoCamera />}
                  variant="outlined"
                  mx={2}
                  name="aadhaarfront"
                  size="small"
                  onClick={getUploadParams}
                >
                  Upload
                </MDLoadingButton>
              ) : (
                <></>
              )}
              {billingInfo?.logo ? (
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
                name="signature"
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
                {document.signature}
              </MDTypography>
              {isEnabled.signature ? (
                <MDLoadingButton
                  sx={{ margin: 2 }}
                  loading={isLoading.signature}
                  disabled={!isEnabled.signature}
                  color="success"
                  loadingPosition="start"
                  startIcon={<PhotoCamera />}
                  variant="outlined"
                  mx={2}
                  name="signature"
                  size="small"
                  onClick={getUploadParams}
                >
                  Upload
                </MDLoadingButton>
              ) : (
                <></>
              )}
              {billingInfo?.Signature ? (
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
