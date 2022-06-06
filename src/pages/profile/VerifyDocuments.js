/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import { RESOURCE_DOCUMENT_VERIFICATION } from "lib/constants";
import React, { useRef, useState } from "react";
import { postSignedUrl } from "services/common";
import { v4 as uuidv4 } from "uuid";
import { updateBankDetails } from "../../services/onboarding/index";

export default function VerifyDocuments({ data }) {
  const verification = data;
  const aadharFrontRef = useRef(null);
  const aadharBackRef = useRef(null);
  const proofRef = useRef(null);
  const panRef = useRef(null);
  const brandId = localStorage.getItem("brandId");
  const emailId = localStorage.getItem("emailId");
  const [document, setDocuments] = useState({
    aadhaarFront: "",
    aadhaarBack: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState({
    aadhaarfront: false,
    aadhaarback: false,
    proof: false,
    companypan: false,
  });
  const [isEnabled, setIsEnabled] = useState({
    aadhaarfront: false,
    aadhaarback: false,
    proof: false,
    companypan: false,
  });
  const [isSaved, setIsSaved] = useState(false);
  const [docsVerification, setDocsVerification] = useState({});
  const images = [];

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
    const bankObj = { ...docsVerification };
    bankObj.BrandId = brandId;
    const req = { ...bankObj, ...docsVerification };
    setIsLoading({ save: true, cancel: false });
    const res = await updateBankDetails(req, emailId);
    if (res) {
      setIsLoading({ save: false, cancel: false });
      setIsSaved(true);
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

  const uuid = uuidv4();
  const getUploadParams = async (e) => {
    debugger;
    const { name } = e.target;
    const isLoadingObj = {
      aadhaarfront: false,
      aadhaarback: false,
      proof: false,
      companypan: false,
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
    images.push(res.fileName);
    const axiosRes = await axios.put(res.preSignedUrl, file);

    if (axiosRes.status !== 200) return false;
    setIsSaved(true);
    setIsEnabled({
      aadhaarfront: false,
      aadhaarback: false,
      proof: false,
      companypan: false,
    });
    setIsLoading({
      aadhaarfront: false,
      aadhaarback: false,
      proof: false,
      companypan: false,
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
      setIsEnabled({
        aadhaarfront: true,
        aadhaarback: false,
        proof: false,
        companypan: false,
      });
    }
  };
  return (
    <MDBox textAlign="center">
      {isSaved ? (
        <MDAlert color="success" dismissible>
          {alertContent("Document has been uploaded successfully")}
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
              Aadhaar Back of Authorized Signatory
            </MDTypography>
            <>
              <label htmlFor="icon-button-photo">
                <input
                  ref={aadharFrontRef}
                  type="file"
                  name="aadhaarFront"
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
                  {document.aadhaarFront}
                </MDTypography>
                {isEnabled.aadhaarfront ? (
                  <MDLoadingButton
                    sx={{ margin: 2 }}
                    loading={isLoading.aadhaarfront}
                    disabled={!isEnabled.aadhaarfront}
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
                {verification?.AadhaarFront ? (
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
                  name="aadhaarBack"
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
                  {document.aadhaarBack}
                </MDTypography>
                {isEnabled.aadhaarback ? (
                  <MDLoadingButton
                    sx={{ margin: 2 }}
                    loading={isLoading.aadhaarback}
                    disabled={!isEnabled.aadhaarback}
                    color="success"
                    loadingPosition="start"
                    startIcon={<PhotoCamera />}
                    variant="outlined"
                    mx={2}
                    name="aadhaarback"
                    size="small"
                    onClick={getUploadParams}
                  >
                    Upload
                  </MDLoadingButton>
                ) : (
                  <></>
                )}
                {verification?.AadhaarBack ? (
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
                  name="proof"
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
                  {document.proof}
                </MDTypography>
                {isEnabled.proof ? (
                  <MDLoadingButton
                    sx={{ margin: 2 }}
                    loading={isLoading.proof}
                    disabled={!isEnabled.proof}
                    color="success"
                    loadingPosition="start"
                    startIcon={<PhotoCamera />}
                    variant="outlined"
                    mx={2}
                    name="aadhaarback"
                    size="small"
                    onClick={getUploadParams}
                  >
                    Upload
                  </MDLoadingButton>
                ) : (
                  <></>
                )}
                {verification?.BusinessProof ? (
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
                  name="companypan"
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
                  {document.companypan}
                </MDTypography>
                {isEnabled.companypan ? (
                  <MDLoadingButton
                    sx={{ margin: 2 }}
                    loading={isLoading.companypan}
                    disabled={!isEnabled.companypan}
                    color="success"
                    loadingPosition="start"
                    startIcon={<PhotoCamera />}
                    variant="outlined"
                    mx={2}
                    name="aadhaarback"
                    size="small"
                    onClick={getUploadParams}
                  >
                    Upload
                  </MDLoadingButton>
                ) : (
                  <></>
                )}
                {verification?.Pan ? (
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
