/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable consistent-return */
/* eslint-disable react/no-string-refs */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */

import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import { Button, IconButton, OutlinedInput } from "@mui/material";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDAlert from "components/MDAlert";
import MDBox from "components/MDBox";
// import MDButton from "components/MDButton";
import MDLoadingButton from "components/MDLoadingButton";
import MDTypography from "components/MDTypography";
import { setLayout, useMaterialUIController } from "context";
import React, { useRef, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { responseValidator } from "lib/helper";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { getBrandThunk } from "../../redux-store/slices/onboarding";
import { login } from "../../services/onboarding";

function SignIn() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef("form");
  const initialRoutesSetRef = useRef(false);
  const token = localStorage.getItem("token");
  const [error, setError] = useState({ message: "", isValid: false });
  const [showPassword, setShowPassword] = React.useState(false);

  const [rememberMe, setRememberMe] = useState(false);
  const [user, setUser] = useState({ EmailId: "", Password: "" });
  if (!initialRoutesSetRef.current) {
    if (token) {
      // initialRoutesSetRef.current = true;
      navigate("/dashboard");
    } else {
      initialRoutesSetRef.current = true;
      navigate("/authentication/sign-in", {
        state: { register: false, passwordReset: false },
      });
    }
  }

  const [controller, contextDispatch] = useMaterialUIController();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!user.EmailId || !user.Password) {
      setError({ message: "Email and Password is mandatory!", isValid: false });
      return false;
    }

    setError({ message: "", isValid: false });
    setIsLoading(true);
    const response = await login(user);
    if (response && response?.payload?.auth) {
      setIsLoading(false);
      localStorage.setItem("token", response?.payload?.token);
      localStorage.setItem("auth", true);
      localStorage.setItem("emailId", user.EmailId);
      dispatch(getBrandThunk(user.EmailId));
      setLayout(contextDispatch, "dashboard");
      navigate("/dashboard");
    } else {
      setIsLoading(false);
      const validate = responseValidator(response);

      if (!validate.isValid) {
        setError(validate);
      }
    }
  };
  if (!initialRoutesSetRef.current) {
    if (token) {
      initialRoutesSetRef.current = true;
      navigate("/dashboard");
    } else {
      initialRoutesSetRef.current = true;
      navigate("/authentication/sign-in", {
        state: { register: false, passwordReset: false },
      });
    }
  }
  const alertContent = (message) => (
    <MDBox>
      <MDTypography variant="body2" color="white">
        {message}&nbsp;&nbsp;&nbsp;
      </MDTypography>
    </MDBox>
  );

  return (
    <ValidatorForm formRef="form" onSubmit={handleSubmit}>
      <MDBox px={3}>
        {state?.register ? (
          <MDAlert color="success" dismissible>
            {alertContent("Account has been created successfully!!")}
          </MDAlert>
        ) : (
          <></>
        )}
        {state?.passwordReset ? (
          <MDAlert color="success" dismissible>
            {alertContent(" Password has been changed successfully!!")}
          </MDAlert>
        ) : (
          <></>
        )}
      </MDBox>
      <MDBox pt={4} pb={1} mt={10} px={3}>
        <Card>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox>
              <MDBox mb={2}>
                <TextValidator
                  label="Email"
                  fullWidth
                  onChange={handleChange}
                  name="EmailId"
                  value={user.EmailId}
                  validators={["required", "isEmail"]}
                  errorMessages={[
                    "this field is required",
                    "email is not valid",
                  ]}
                />
              </MDBox>
              <MDBox mb={2}>
                <OutlinedInput
                  label="Password"
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  onChange={handleChange}
                  name="Password"
                  value={user.Password}
                  validators={["required"]}
                  errorMessages={["this field is required"]}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={1}>
                {!error.isValid ? (
                  <MDTypography
                    variant="caption"
                    fontWeight="regular"
                    color="error">
                    {error.message}
                  </MDTypography>
                ) : (
                  <></>
                )}
              </MDBox>
              <MDBox display="flex" alignItems="center" ml={-1}>
                <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}>
                  &nbsp;&nbsp;Remember me
                </MDTypography>
              </MDBox>
              <MDBox mt={4} mb={0}>
                <MDLoadingButton
                  onClick={handleSubmit}
                  loading={isLoading}
                  color="primary"
                  loadingPosition="start"
                  startIcon={<LoginRoundedIcon />}
                  variant="gradient"
                  fullWidth
                  mx={2}
                  name="login">
                  Sign in
                </MDLoadingButton>
              </MDBox>
              <MDBox mt={1} textAlign="left">
                <MDTypography
                  component={Button}
                  to="/authentication/reset-password"
                  variant="caption"
                  color="info"
                  fontWeight="medium"
                  textGradient
                  onClick={() => navigate("/authentication/reset-password")}>
                  Forgot password
                </MDTypography>
              </MDBox>

              <MDBox mt={1} textAlign="right">
                <MDTypography variant="caption" color="text">
                  Don&apos;t have an account?{" "}
                  <MDTypography
                    component={Button}
                    to="/authentication/sign-up"
                    variant="caption"
                    color="info"
                    fontWeight="medium"
                    textGradient
                    onClick={() => navigate("/authentication/sign-up")}>
                    Sign up
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

export default SignIn;
