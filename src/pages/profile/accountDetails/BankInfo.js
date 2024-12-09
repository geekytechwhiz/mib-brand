/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
import CancelIcon from "@mui/icons-material/Cancel";
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Autocomplete } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import { ACCOUNT_TYPE_LIST } from "constants";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { alert } from "redux-store/slices/root/rootSlice";
import { updateBankDetails } from "services/onboarding/index";

export default function BankInfo({ data }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState({ save: false, cancel: false });
  const emailId = localStorage.getItem("emailId");
  const [disabled, setDisabled] = useState(true);
  const [bankInfo, setBankDetails] = useState(data);
  const [accountNumValidation, setAccountNumValidation] = useState({
    message: "",
    isValid: true,
  });

  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
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
    setIsLoading({ save: false, cancel: false });
  };
  const handleSave = async () => {
    setIsLoading({ save: true, cancel: false });
    const bankObj = { ...data };
    const req = { ...bankObj, ...bankInfo };
    const brandId = localStorage.getItem("brandId");
    const res = await updateBankDetails(req, emailId, brandId);

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
        message: "Bank details has been updated successfully!",
      };
      dispatch(alert(success));
    }
  };
  const handleAccountTypeChange = (event, values) => {
    const { value } = values;
    setBankDetails(() => ({
      ...bankInfo,
      AccountType: value,
    }));
  };
  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setBankDetails(() => ({
      ...bankInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    setBankDetails(() => ({
      ...bankInfo,
      AccountType: data.AccountType,
    }));
  }, []);

  return (
    <MDBox textAlign="center">
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
            Bank Details
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
            onChange={handleAccountTypeChange}
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
        {disabled ? (
          <Grid item xs={5} mb={2} />
        ) : (
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
        )}

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
