/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import { Autocomplete } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDModal from "components/MDModal";
import MDTypography from "components/MDTypography";
import { ACCOUNT_TYPE_LIST } from "lib/constants";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBankInfoThunk } from "redux/slices/onboarding/index";

export default function BankInfo({ data }) {
  const dispatch = useDispatch();
  const brandId = localStorage.getItem("brandId");
  const [showProgress, setShowProgress] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [bankInfo, setBankDetails] = useState(data);
  const [accountNumValidation, setAccountNumValidation] = useState({
    message: "",
    isValid: true,
  });

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
    const bankObj = { ...data };
    bankObj.BrandId = brandId;
    const req = { ...bankObj, ...bankInfo };
    setShowProgress(true);
    dispatch(updateBankInfoThunk(req));
    setShowProgress(false);
    setIsSaved(true);
  };

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;

    setBankDetails(() => ({
      ...bankInfo,
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
          {alertContent("Bank Details updated successfully!")}
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
            label="Beneficiary Name"
            fullWidth
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <Autocomplete
            disabled={disabled}
            disablePortal
            required
            onChange={handleChange}
            placeholder="Account Type"
            value={bankInfo.AccountType}
            error={!bankInfo.AccountType}
            id="combo-BusinessType"
            options={ACCOUNT_TYPE_LIST}
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
                value={bankInfo.AccountType}
                name="AccountType"
                label="Account Type"
              />
            )}
          />
        </Grid>
        <Grid item xs={5} mb={2}>
          <MDInput
            disabled={disabled}
            required
            error={!bankInfo.AccountNumber}
            value={bankInfo.AccountNumber}
            type="number"
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
            error={!accountNumValidation.isValid}
            value={bankInfo.ReAccountNumber}
            type="number"
            onBlur={() => {
              if (bankInfo.ReAccountNumber !== bankInfo.AccountNumber) {
                setAccountNumValidation({
                  isValid: false,
                  message: "Account Number mismatch",
                });
              } else {
                setAccountNumValidation({
                  isValid: true,
                  message: " ",
                });
              }
            }}
            label="Re-Enter Account number "
            helperText={accountNumValidation.message}
            name="ReAccountNumber"
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
