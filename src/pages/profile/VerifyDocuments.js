/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import DoDisturbOnOutlinedIcon from "@mui/icons-material/DoDisturbOnOutlined";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDModal from "components/MDModal";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { updateBankDetails } from "../../services/onboarding/index";

export default function VerifyDocuments() {
  const brandId = localStorage.getItem("brandId");
  const emailId = localStorage.getItem("emailId");
  const [showProgress, setShowProgress] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [docsVerification, setDocsVerification] = useState({});

  const handleClose = () => {
    setShowProgress(false);
  };
  const handleCancel = async () => {
    const keys = Object.keys(docsVerification);
    const obj = {};
    keys.forEach((x) => {
      obj[x] = "";
    });
    setDocsVerification(() => ({
      ...obj,
    }));
    setShowProgress(false);
  };
  const handleSave = async () => {
    const bankObj = { ...docsVerification };
    bankObj.BrandId = brandId;
    const req = { ...bankObj, ...docsVerification };
    setShowProgress(true);
    const res = await updateBankDetails(req, emailId);
    if (res) {
      setShowProgress(false);
      setIsSaved(true);
    }
  };
  // const handleChange = (event) => {
  //   const { name } = event.target;
  //   const { value } = event.target;
  //   setBankDetails(() => ({
  //     ...billingInfo,
  //     [name]: value,
  //   }));
  // };

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
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="secondary"
                aria-label="Aadhaar Front of Authorized Signatory"
                component="span"
              >
                <PhotoCamera />
                <DoDisturbOnOutlinedIcon color="error" />
              </IconButton>
            </label>
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
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="secondary"
                aria-label="Aadhaar Back of Authorized Signatory"
                component="span"
              >
                <PhotoCamera />
                <CheckCircleOutlineOutlinedIcon color="success" />
              </IconButton>
            </label>
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
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="secondary"
                aria-label="Business Registration Proof"
                component="span"
              >
                <PhotoCamera />
                <CheckCircleOutlineOutlinedIcon color="success" />
              </IconButton>
            </label>
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
            <label htmlFor="icon-button-file">
              <Input accept="image/*" id="icon-button-file" type="file" />
              <IconButton
                color="secondary"
                aria-label=" Company PAN"
                component="span"
              >
                <PhotoCamera />

                <CheckCircleOutlineOutlinedIcon color="success" />
              </IconButton>
            </label>
          </Grid>
        </Grid>
      </MDBox>
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
    </MDBox>
  );
}
