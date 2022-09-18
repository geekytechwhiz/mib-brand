/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import MDBox from "components/MDBox";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import { RESOURCE_DOCUMENT_VERIFICATION } from "lib/constants";
import _ from "lodash";
import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { alert } from "redux/slices/root/rootSlice";
import { postSignedUrl } from "services/common";
import { updateDocuments } from "services/onboarding/index";
import { v4 as uuidv4 } from "uuid";

export default function VerifyDocuments({ data }) {
  const dispatch = useDispatch();
  const aadharFrontRef = useRef(null);
  const aadharBackRef = useRef(null);
  const proofRef = useRef(null);
  const panRef = useRef(null);
  const brandId = localStorage.getItem("brandId");
  const emailId = localStorage.getItem("emailId");
  const [document, setDocuments] = useState({
    AadhaarFront: "",
    AadhaarBack: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState({
    AadhaarFront: false,
    AadhaarBack: false,
    BusinessProof: false,
    Pan: false,
  });
  const [isEnabled, setIsEnabled] = useState({
    AadhaarFront: false,
    AadhaarBack: false,
    BusinessProof: false,
    Pan: false,
  });
  const [docsVerification, setDocsVerification] = useState(data);

  const handleCancel = async () => {
    const keys = Object.keys(docsVerification);

    const obj = {};
    keys.forEach((x) => {
      obj[x] = "";
    });
    setDocsVerification(() => ({
      ...obj,
    }));
    setIsLoading({ save: false, cancel: false });
  };
  const handleSave = async () => {
    const docs = { ...docsVerification };
    docs.BrandId = brandId;
    const req = { ...docsVerification };
    setIsLoading({ save: true, cancel: false });
    const res = await updateDocuments(req, emailId, brandId);
    setIsLoading({ save: false, cancel: false });
    if (!res) {
      const error = {
        show: true,
        title: "Updated Action failed",
        status: "error",
        message: "Updated Action failed!",
      };
      dispatch(alert(error));
    } else {
      const success = {
        show: true,
        title: "Updated Successfully",
        status: "success",
        message: "Documents has been updated successfully!",
      };
      dispatch(alert(success));
    }
  };

  const uuid = uuidv4();
  const getUploadParams = async (e) => {
    try {
      const { name } = e.target;
      const isLoadingObj = {
        AadhaarFront: false,
        AadhaarBack: false,
        BusinessProof: false,
        Pan: false,
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
      // images.push(res.fileName);
      const axiosRes = await axios.put(res.preSignedUrl, file);

      if (axiosRes.status !== 200) return false;
      const initialState = _.cloneDeep(docsVerification);
      initialState[name] = {
        Uploaded: true,
        Verified: true,
        Url: res.fileName,
      };
      setDocsVerification(initialState);
      const success = {
        show: true,
        title: "Updated Successfully",
        status: "success",
        message: "Document uploaded successfully!",
      };
      dispatch(alert(success));
      setIsEnabled({
        AadhaarFront: false,
        AadhaarBack: false,
        BusinessProof: false,
        Pan: false,
      });
      setIsLoading({
        AadhaarFront: false,
        AadhaarBack: false,
        BusinessProof: false,
        Pan: false,
      });
    } catch (err) {
      setIsEnabled({
        AadhaarFront: false,
        AadhaarBack: false,
        BusinessProof: false,
        Pan: false,
      });
      setIsLoading({
        AadhaarFront: false,
        AadhaarBack: false,
        BusinessProof: false,
        Pan: false,
      });
      const error = {
        show: true,
        title: "Updated Action failed",
        status: "error",
        message: "Something went wrong!",
      };
      dispatch(alert(error));
    }
  };

  const handleFileUpload = (event) => {
    const { name } = event.target;
    if (event.target.files[0]) {
      const tempSelectedFiles = selectedFiles;
      tempSelectedFiles.push(event.target.files[0]);
      setSelectedFiles(tempSelectedFiles);
      const temp = {
        AadhaarFront: false,
        AadhaarBack: false,
        BusinessProof: false,
        Pan: false,
      };
      temp[name] = true;
      setIsEnabled(temp);
    }
  };
  return (
    <MDBox textAlign="center">
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
            Verify Documents
          </MDTypography>
        </Grid>
      </Grid>

      <MDBox
        display="flex"
        mx={20}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid
          container
          display="flex"
          spacing={1}
          justifyContent="center"
          flexDirection="row"
          xs={12}
        >
          <Grid item xs={8} mb={2} textAlign="left">
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textAlign="left"
            >
              Aadhaar Front of Authorized Signatory
            </MDTypography>
            <>
              <label htmlFor="icon-button-photo">
                <input
                  ref={aadharFrontRef}
                  type="file"
                  name="AadhaarFront"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <IconButton
                  color="secondary"
                  aria-label=" Aadhaar Front side of Authorized Signatory"
                  component="span"
                  onClick={() => aadharFrontRef.current.click()}
                >
                  <PhotoCamera />
                </IconButton>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                  textAlign="left"
                >
                  {document.AadhaarFront}
                </MDTypography>
                {isEnabled.AadhaarFront ? (
                  <MDLoadingButton
                    sx={{ margin: 2 }}
                    loading={isLoading.AadhaarFront}
                    disabled={!isEnabled.AadhaarFront}
                    color="success"
                    loadingPosition="start"
                    startIcon={<PhotoCamera />}
                    variant="outlined"
                    mx={2}
                    name="AadhaarFront"
                    size="small"
                    onClick={getUploadParams}
                  >
                    Upload
                  </MDLoadingButton>
                ) : (
                  <></>
                )}
                {docsVerification?.AadhaarFront?.Uploaded ? (
                  <CheckCircleOutlineOutlinedIcon color="success" />
                ) : (
                  <DoDisturbOnOutlinedIcon color="error">
                    not verified
                  </DoDisturbOnOutlinedIcon>
                )}
              </label>
            </>
          </Grid>

          <Grid item xs={8} mb={2} textAlign="left">
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textAlign="left"
            >
              Aadhaar Back of Authorized Signatory
            </MDTypography>
            <>
              <label htmlFor="icon-button-photo">
                <input
                  ref={aadharBackRef}
                  type="file"
                  name="AadhaarBack"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <IconButton
                  color="secondary"
                  aria-label=" Aadhaar Back of Authorized Signatory"
                  component="span"
                  onClick={() => aadharBackRef.current.click()}
                >
                  <PhotoCamera />
                </IconButton>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                  textAlign="left"
                >
                  {document.AadhaarBack}
                </MDTypography>
                {isEnabled.AadhaarBack ? (
                  <MDLoadingButton
                    sx={{ margin: 2 }}
                    loading={isLoading.AadhaarBack}
                    disabled={!isEnabled.AadhaarBack}
                    color="success"
                    loadingPosition="start"
                    startIcon={<PhotoCamera />}
                    variant="outlined"
                    mx={2}
                    name="AadhaarBack"
                    size="small"
                    onClick={getUploadParams}
                  >
                    Upload
                  </MDLoadingButton>
                ) : (
                  <></>
                )}
                {docsVerification?.AadhaarBack?.Uploaded ? (
                  <CheckCircleOutlineOutlinedIcon color="success" />
                ) : (
                  <DoDisturbOnOutlinedIcon color="error">
                    not verified
                  </DoDisturbOnOutlinedIcon>
                )}
              </label>
            </>
          </Grid>

          <Grid item xs={8} mb={2} textAlign="left">
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textAlign="left"
            >
              Business Registration Proof
            </MDTypography>
            <>
              <label htmlFor="icon-button-photo">
                <input
                  ref={proofRef}
                  type="file"
                  name="BusinessProof"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <IconButton
                  color="secondary"
                  aria-label="Business Registration Proof"
                  component="span"
                  onClick={() => proofRef.current.click()}
                >
                  <PhotoCamera />
                </IconButton>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                  textAlign="left"
                >
                  {document.BusinessProof}
                </MDTypography>
                {isEnabled.BusinessProof ? (
                  <MDLoadingButton
                    sx={{ margin: 2 }}
                    loading={isLoading.BusinessProof}
                    disabled={!isEnabled.BusinessProof}
                    color="success"
                    loadingPosition="start"
                    startIcon={<PhotoCamera />}
                    variant="outlined"
                    mx={2}
                    name="AadhaarBack"
                    size="small"
                    onClick={getUploadParams}
                  >
                    Upload
                  </MDLoadingButton>
                ) : (
                  <></>
                )}
                {docsVerification?.BusinessProof?.Uploaded ? (
                  <CheckCircleOutlineOutlinedIcon color="success" />
                ) : (
                  <DoDisturbOnOutlinedIcon color="error">
                    not verified
                  </DoDisturbOnOutlinedIcon>
                )}
              </label>
            </>
          </Grid>

          <Grid item xs={8} mb={2} textAlign="left">
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textAlign="left"
            >
              Company PAN
            </MDTypography>
            <>
              <label htmlFor="icon-button-photo">
                <input
                  ref={panRef}
                  name="Pan"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileUpload}
                />
                <IconButton
                  color="secondary"
                  aria-label="Company PAN"
                  component="span"
                  onClick={() => panRef.current.click()}
                >
                  <PhotoCamera />
                </IconButton>
                <MDTypography
                  variant="caption"
                  color="text"
                  fontWeight="medium"
                  textAlign="left"
                >
                  {document.Pan}
                </MDTypography>
                {isEnabled.Pan ? (
                  <MDLoadingButton
                    sx={{ margin: 2 }}
                    loading={isLoading.Pan}
                    disabled={!isEnabled.Pan}
                    color="success"
                    loadingPosition="start"
                    startIcon={<PhotoCamera />}
                    variant="outlined"
                    mx={2}
                    name="AadhaarBack"
                    size="small"
                    onClick={getUploadParams}
                  >
                    Upload
                  </MDLoadingButton>
                ) : (
                  <></>
                )}
                {docsVerification?.Pan?.Uploaded ? (
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
      </MDBox>
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
    </MDBox>
  );
}
