/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDModal from "components/MDModal";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { updateBankDetails } from "../../services/onboarding/index";

export default function BankInfo() {
    
  let bankDetails = useSelector((state) => state.accountInfo);
  const { BrandId } = useSelector((state) => state.accountInfo) || "";
  const { EmailId } = useSelector((state) => state.accountInfo) || "";
  bankDetails = bankDetails || {};
  const [showProgress, setShowProgress] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [bankInfo, setBankDetails] = useState(bankDetails);

  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
  };
  const handleClose = () => {
    setShowProgress(false);
  };
  const handleCancel = async () => {
      
    const keys = Object.keys(bankInfo);
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
      
    const bankObj = { ...bankDetails };
    bankObj.BrandId = BrandId;
    const req = { ...bankObj, ...bankInfo };
    setShowProgress(true);
    const res = await updateBankDetails(req, EmailId);
    if (res) {
      setShowProgress(false);
      setIsSaved(true);
    }
  };
  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setBankDetails(() => ({
      ...bankInfo,
      [name]: value,
    }));
  };
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
          {alertContent("Bank Details are")}
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
            Bank Details
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
            error={!bankInfo.BeneficiaryName}
            value={bankInfo.BeneficiaryName}
            required
            type="text"
            name="BeneficiaryName"
            label="Account holder name"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            error={!bankInfo.AccountNumber}
            value={bankInfo.AccountNumber}
            type="text"
            label="Account number "
            name="AccountNumber"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            label="IFSC Code"
            error={!bankInfo.IFSCode}
            value={bankInfo.IFSCode}
            name="IFSCode"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            type="text"
            name="BankName"
            error={!bankInfo.BankName}
            value={bankInfo.BankName}
            label="Bank name"
            fullWidth
            onChange={handleChange}
          />
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
