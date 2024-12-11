/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable radix */
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDLoadingButton from "components/MDLoadingButton";
import LockResetIcon from "@mui/icons-material/LockReset";

import MDTypography from "components/MDTypography";
import { responseValidator } from "lib/helper";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBrandThunk } from "redux-store/slices/onboarding/index";
import { postPasswordResetRequest } from "services/common/index";
import { passwordReset } from "services/onboarding/index";

function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hasShowOtp, setHasShowOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const useDetails = useSelector((state) => state.auth, shallowEqual);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setUser(() => ({
      ...user,
      [name]: value,
    }));
  };

  const handleResetPassword = async () => {
    setIsLoading(true);
    const request = {
      EmailId: email,
      Password: user.Password,
      UserId: useDetails?.accountInfo?.UserID,
      CreatedAt: useDetails?.accountInfo?.CreatedAt,
    };
    const res = await passwordReset(request);
    if (!res) {
      setError({
        isValid: false,
        message: "Something went wrong please contact support team",
      });
    } else {
      navigate("/authentication/sign-in", {
        state: { register: false, passwordReset: true },
      });
    }
  };

  const handleRequestResetPassword = async () => {
    if (!email) {
      setError({ message: "Email Id is mandatory!", isValid: false });
      return false;
    }
    setIsLoading(true);
    const { data } = await dispatch(getBrandThunk(email)).unwrap();

    const req = {
      name: data?.ContactDetails?.Name,
      toAddress: email,
    };
    const res = await postPasswordResetRequest(req);

    const validatePasswordRequest = responseValidator(res);
    if (!validatePasswordRequest.isValid) {
      setError(validatePasswordRequest);
      setIsLoading(false);
      return false;
    }
    setCaptionText("You will receive an e-mail with OTP in maximum 60 seconds");
    setIsLoading(false);
    setResponse(res?.body);
    setHasShowOtp(true);
  };
  return (
    <ValidatorForm formRef="form" onSubmit={handleRequestResetPassword}>
      <MDBox pt={4} pb={3} mt={10} px={3}>
        <Card>
          <MDBox textAlign="center">
            <MDTypography
              variant="body"
              fontWeight="medium"
              color="primary"
              mt={1}
            >
              Reset Password
            </MDTypography>
            <MDTypography
              display="block"
              variant="caption"
              fontWeight="medium"
              color="success"
              my={1}
            >
              {captionText}
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              {hasShowOtp ? (
                <>
                  <MDBox mb={4}>
                    <TextValidator
                      type="number"
                      label="OTP"
                      variant="outlined"
                      fullWidth
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
                    <TextValidator
                      type="text"
                      label="New Password"
                      variant="outlined"
                      onChange={handleChange}
                      name="Password"
                      fullWidth
                    />
                  </MDBox>
                  <MDBox mb={4}>
                    <TextValidator
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
                      fullWidth
                    />
                  </MDBox>
                  <MDBox display="flex" alignItems="center" ml={1}>
                    {!error.isValid ? (
                      <MDTypography
                        variant="caption"
                        fontWeight="medium"
                        color="error"
                      >
                        {error.message}
                      </MDTypography>
                    ) : (
                      <></>
                    )}
                  </MDBox>
                  <MDBox mt={3} mb={1}>
                    <MDLoadingButton
                      variant="gradient"
                      color="primary"
                      fullWidth
                      onClick={handleResetPassword}
                    >
                      Submit
                    </MDLoadingButton>
                  </MDBox>
                </>
              ) : (
                <>
                  {" "}
                  <MDBox mb={1}>
                    <MDInput
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
                      fullWidth
                    />
                  </MDBox>
                  <MDBox display="flex" alignItems="center" ml={1}>
                    {!error.isValid ? (
                      <MDTypography
                        variant="caption"
                        fontWeight="medium"
                        color="error"
                      >
                        {error.message}
                      </MDTypography>
                    ) : (
                      <></>
                    )}
                  </MDBox>
                  <MDBox mt={6} mb={1}>
                    <MDLoadingButton
                      loadingPosition="start"
                      startIcon={<LockResetIcon />}
                      variant="gradient"
                      color="primary"
                      loading={isLoading}
                      fullWidth
                      onClick={handleRequestResetPassword}
                    >
                      reset
                    </MDLoadingButton>
                  </MDBox>
                </>
              )}
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
    </ValidatorForm>
  );
}

export default ResetPassword;
