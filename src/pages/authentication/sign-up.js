/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable import/no-named-as-default */
/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Checkbox, IconButton } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Card from "@mui/material/Card";
//
import MDBox from "components/MDBox";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import React, { useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Link, useNavigate } from "react-router-dom";
import registerAccount, { generateOTP } from "services/onboarding/index";
import { REQUIRED_FIELDS_SIGN_UP } from "../../constants/index";

import { Validate } from "../../lib/validations/index";

function Signup() {
  const formRef = useRef("form");
  const [error, setError] = useState({ message: "", isValid: false });
  const [disabled, setDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [otpDetails, setOtpDetails] = useState({});
  const [hasVerify, setHasVerify] = useState(false);

  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };

  const handleGenerateOtp = async (e) => {
    const req = {
      ContactNumber: user.Mobile,
      Action: "VERIFY_MOBILE",
    };
    const res = await generateOTP(req);
    setHasVerify(true);
    setOtpDetails(res);
    console.log(res);
  };

  const handleVerify = async (e) => {
    const currentTime = new Date().getTime();
    if (otpDetails.Otp !== user.OTP) {
      setError({ isValid: false, message: "Invalid OTP" });
    } else if (currentTime >= otpDetails.ExpiresIn) {
      setError({ isValid: false, message: "OTP Expired" });
    }
    if (otpDetails.Otp === user.OTP && currentTime <= otpDetails.ExpiresIn) {
      setUser(() => ({
        ...user,
        MobileVerified: true,
      }));
    }
    setHasVerify(false);
  };
  const handleSubmit = async () => {
    const validate = Validate(REQUIRED_FIELDS_SIGN_UP, user);
    if (!validate.isValid) {
      setError({ message: validate.message, isValid: false });
      return false;
    }
    if (!user?.MobileVerified) {
      setError({
        message: "Please verify your contact number and proceed",
        isValid: false,
      });
      return false;
    }
    setIsLoading(true);
    const req = {
      EmailId: user.EmailId,
      Password: user.Password,
      BusinessDetails: {
        Category: user.Category,
      },
      ContactDetails: {
        Name: user.Name,
        Mobile: user.Mobile,
        EmailId: user.EmailId,
        CountryCode: "+91",
        Languages: ["English"],
      },
    };
    const res = await registerAccount(req);
    if (res) {
      console.log(res);
    }
    navigate("/authentication/sign-in", { state: { register: true } });
  };

  const handleTerms = (e) => {
    const isChecked = e.target.checked;
    setDisabled(isChecked);
  };

  return (
    <ValidatorForm formRef="form" onSubmit={handleSubmit}>
      <MDBox pt={4} pb={3} mb={10} px={3}>
        <Card>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox>
              <MDBox mb={2}>
                <Autocomplete
                  disablePortal
                  required
                  value={user.Category}
                  placeholder="What type business your are ?"
                  id="combo-taxCode"
                  name="BrandType"
                  options={[
                    {
                      value: "DirectSellingBrands",
                      label: "Direct Selling Brands",
                    },
                    { value: "ProductBrands", label: "Product Brands" },
                    {
                      value: "MerchandisingBrands",
                      label: "Merchandising Brands",
                    },
                    { value: "ServiceBrands", label: "Service Brands" },
                    { value: "DigitalBrands", label: "Digital Brands" },
                  ]}
                  onSelect={handleChange}
                  sx={{
                    "& .css-tnnq9f-MuiAutocomplete-root .MuiOutlinedInput-root .MuiAutocomplete-input .MuiOutlinedInput-root":
                      {
                        padding: 5,
                      },
                  }}
                  renderInput={(params) => (
                    <TextValidator
                      {...params}
                      label="What type of business your are ?"
                      name="Category"
                      onChange={handleChange}
                      value={user.Category}
                    />
                  )}
                />
              </MDBox>
              <MDBox mb={2}>
                <TextValidator
                  label="Your Name"
                  name="Name"
                  required
                  fullWidth
                  value={user.Name}
                  validators={["required", "text"]}
                  errorMessages={["this field is required"]}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox mb={2}>
                <TextValidator
                  required
                  label="Email"
                  value={user.EmailId}
                  name="EmailId"
                  fullWidth
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                  onChange={handleChange}
                />
              </MDBox>
              <MDBox
                mb={2}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                {hasVerify ? (
                  <>
                    <TextValidator
                      label="OTP"
                      name="OTP"
                      required
                      value={user.OTP || ""}
                      fullWidth
                      errorMessages={["this field is required"]}
                      validators={["required", "minNumber:10"]}
                      onChange={handleChange}
                      inputProps={{ maxLength: 6 }}
                    />
                    <MDLoadingButton
                      disabled={!disabled}
                      onClick={handleVerify}
                      loading={isLoading}
                      color="primary"
                      loadingPosition="start"
                      variant="gradient"
                      mx={2}
                      size="small"
                      name="OTP"
                    >
                      Verify
                    </MDLoadingButton>
                  </>
                ) : (
                  <>
                    <TextValidator
                      label="Mobile Number"
                      name="Mobile"
                      required
                      value={user.Mobile}
                      fullWidth
                      errorMessages={[
                        "this field is required",
                        "Mobile is not valid",
                      ]}
                      validators={["required", "minNumber:10"]}
                      onChange={handleChange}
                    />
                    <IconButton onClick={handleGenerateOtp}>
                      <MDTypography
                        variant="button"
                        color={!user.MobileVerified ? "info" : "success"}
                        fontWeight="regular"
                      >
                        {!user.MobileVerified ? "Verify" : "Verified"}
                      </MDTypography>
                    </IconButton>
                  </>
                )}
              </MDBox>
              <MDBox mb={2}>
                <TextValidator
                  required
                  label="Password"
                  type="password"
                  name="Password"
                  value={user.Password}
                  fullWidth
                  validators={["required"]}
                  errorMessages={[
                    "this field is required",
                    "Password must be at least 6 characters",
                  ]}
                  onChange={handleChange}
                />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;Password must be at least 6 characters &nbsp;
                </MDTypography>
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Checkbox
                  size="small"
                  color="info"
                  onChange={handleTerms}
                  defaultChecked={false}
                  checked={disabled}
                />
                <MDTypography
                  variant="button"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: 1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </MDTypography>
                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={1} mt={2}>
                {!error.isValid ? (
                  <MDTypography
                    variant="caption"
                    fontWeight="regular"
                    color="error"
                  >
                    {error.message}
                  </MDTypography>
                ) : (
                  <></>
                )}
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDLoadingButton
                  disabled={!disabled}
                  onClick={handleSubmit}
                  loading={isLoading}
                  color="primary"
                  loadingPosition="start"
                  startIcon={<ExitToAppIcon />}
                  variant="gradient"
                  fullWidth
                  mx={2}
                  name="signup"
                >
                  Create Account
                </MDLoadingButton>
              </MDBox>
              <MDBox mt={2} mb={1} textAlign="center">
                <MDTypography variant="button" color="text">
                  Already have an account?{" "}
                  <MDTypography
                    component={Link}
                    to="/authentication/sign-in"
                    variant="button"
                    color="info"
                    fontWeight="medium"
                    textGradient
                  >
                    Sign In
                  </MDTypography>
                </MDTypography>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </ValidatorForm>
  );
}

export default Signup;
