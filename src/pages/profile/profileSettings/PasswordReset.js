/* eslint-disable radix */
/* eslint-disable consistent-return */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-useless-fragment */
import ModeEditOutlinedIcon from "@mui/icons-material/ModeEditOutlined";
import SaveIcon from "@mui/icons-material/Save";
import { Card } from "@mui/material";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { alert } from "redux-store/slices/root/rootSlice";
import { updateContactInfo } from "services/onboarding/index";

function PasswordReset({ data }) {
  const dispatch = useDispatch();

  const [disabled, setDisabled] = useState(true);
  const [contactDetails, setContactDetails] = useState(data || {});

  const [hasShowOtp, setHasShowOtp] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState({ Password: "", RePassword: "" });
  const [otp, setOtp] = useState();
  const [response, setResponse] = useState({});
  const [error, setError] = useState({ message: "", isValid: false });
  const [captionText, setCaptionText] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    message: "",
    isValid: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const onHandleEdit = () => {
    const val = !disabled;
    setDisabled(val);
  };

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);

    contactDetails.BrandId = localStorage.getItem("brandId");
    const emailId = localStorage.getItem("emailId");
    const req = { ...data, ...contactDetails };
    const res = await updateContactInfo(req, emailId);
    setIsLoading(false);

    if (!res) {
      const err = {
        show: true,
        title: "Updated Action failed",
        status: "error",
        message: "Updated Action failed!",
      };
      dispatch(alert(err));
    } else {
      const success = {
        show: true,
        title: "Updated Successfully",
        status: "success",
        message: "Contact information uploaded successfully!",
      };
      dispatch(alert(success));
    }
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
  };
  const handleCancel = async () => {
    const keys = Object.keys(contactDetails);
    const obj = {};
    keys.forEach((x) => {
      obj[x] = "";
    });
    setContactDetails(() => ({
      ...obj,
    }));
    setIsLoading(false);
  };

  const handleRequestResetPassword = async () => {
    setIsLoading(true);
    setHasShowOtp(true);
    // const userResponse = await getBrandAccount(email);
    // const validate = responseValidator(userResponse);
    // if (!validate.isValid) {
    //   setError(validate);
    //   setIsLoading(false);
    //   return false;
    // }
    // const req = {
    //   name: userResponse?.ContactDetails?.Name,
    //   toAddress: email,
    // };
    // const res = await postPasswordResetRequest(req);
    //
    // const validatePasswordRequest = responseValidator(userResponse);
    // if (!validatePasswordRequest.isValid) {
    //   setError(validate);
    //   setIsLoading(false);
    //   return false;
    // }
    setCaptionText("You will receive an e-mail with OTP in maximum 60 seconds");
    setIsLoading(false);
    // setResponse(res?.body);
    setHasShowOtp(true);
  };

  return (
    <MDBox textAlign="center">
      <Grid container>
        <Grid item xs={11}>
          <Card sx={{ px: 3 }}>
            <MDBox textAlign="left">
              <MDTypography
                variant="button"
                textAlign="start"
                fontWeight="medium"
                p={1}>
                Password Reset
              </MDTypography>
              <MDTypography
                display="block"
                variant="caption"
                fontWeight="medium"
                color="success"
                my={1}>
                {captionText}
              </MDTypography>
            </MDBox>

            <MDBox pb={3}>
              {hasShowOtp ? (
                <>
                  <MDBox mb={4} textAlign="left">
                    <MDInput
                      type="number"
                      label="OTP"
                      variant="outlined"
                      value={otp}
                      onChange={(e) => {
                        e.target.value = Math.max(0, parseInt(e.target.value))
                          .toString()
                          .slice(0, 6);
                        setOtp(e.target.value);
                      }}
                      inputProps={{ maxLength: 6 }}
                    />
                  </MDBox>
                  <MDBox mb={4}>
                    <MDInput
                      fullWidth
                      type="text"
                      label="New Password"
                      variant="outlined"
                      onChange={handleChange}
                      name="Password"
                    />
                  </MDBox>
                  <MDBox mb={4}>
                    <MDInput
                      fullWidth
                      type="text"
                      label="Re Enter Password"
                      name="RePassword"
                      onChange={handleChange}
                      onBlur={() => {
                        if (user.Password !== user.RePassword) {
                          setPasswordValidation({
                            isValid: false,
                            message: "Password does't match",
                          });
                        } else {
                          setPasswordValidation({
                            isValid: true,
                            message: " ",
                          });
                        }
                      }}
                      error={!passwordValidation.isValid}
                      helperText={passwordValidation.message}
                      variant="outlined"
                    />
                  </MDBox>
                  <MDBox display="flex" alignItems="center" ml={1}>
                    {!error.isValid ? (
                      <MDTypography
                        variant="caption"
                        fontWeight="medium"
                        color="error">
                        {error.message}
                      </MDTypography>
                    ) : (
                      <></>
                    )}
                  </MDBox>
                  <MDBox mt={6} mb={1}>
                    <MDLoadingButton
                      fullWidth
                      variant="gradient"
                      color="primary"
                      onClick={handleResetPassword}>
                      Submit
                    </MDLoadingButton>
                  </MDBox>
                </>
              ) : (
                <>
                  {" "}
                  <MDBox mb={1}>
                    <MDInput
                      fullWidth
                      type="email"
                      label="Email"
                      variant="outlined"
                      validators={["required", "isEmail"]}
                      errorMessages={[
                        "this field is required",
                        "email is not valid",
                      ]}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </MDBox>
                  <MDBox display="flex" alignItems="center" ml={1}>
                    {!error.isValid ? (
                      <MDTypography
                        variant="caption"
                        fontWeight="medium"
                        color="error">
                        {error.message}
                      </MDTypography>
                    ) : (
                      <></>
                    )}
                  </MDBox>
                  <MDBox mt={6} mb={1}>
                    <MDLoadingButton
                      loading={isLoading}
                      color="success"
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="outlined"
                      mx={2}
                      onClick={handleRequestResetPassword}
                      size="small">
                      reset
                    </MDLoadingButton>
                  </MDBox>
                </>
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default PasswordReset;
