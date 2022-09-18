/* eslint-disable no-debugger */
/* eslint-disable consistent-return */
/* eslint-disable prefer-regex-literals */
import { REQUIRED_FIELDS_SIGN_UP } from "lib/constants";

export const verifyGST = (gnumber) => {
  const gstVal = gnumber;
  const response = {
    isValid: true,
    message: "",
  };
  const stateCode = gstVal.substring(0, 2);
  const patternStateCode = /^[0-9]{2}$/;
  const threetoseven = gstVal.substring(2, 7);
  const patternthreetoseven = /^[A-Z]{5}$/;
  const seventoten = gstVal.substring(7, 11);
  const patternseventoten = /^[0-9]{4}$/;
  const Twelveth = gstVal.substring(11, 12);
  const patternTwelveth = /^[A-Z]{1}$/;
  const Thirteen = gstVal.substring(12, 13);
  const patternThirteen = /^[1-9A-Z]{1}$/;
  const fourteen = gstVal.substring(13, 14);
  const patternfourteen = /^Z$/;
  const fifteen = gstVal.substring(14, 15);
  const patternfifteen = /^[0-9A-Z]{1}$/;

  if (gstVal.length !== 15) {
    return {
      isValid: false,
      message:
        "Length should be restricted to 15 digits and should not allow anything more or less",
    };
  }
  if (!patternStateCode.test(stateCode)) {
    return {
      isValid: false,
      message: "First two characters of GSTIN should be numbers",
    };
  }
  if (!patternthreetoseven.test(threetoseven)) {
    return {
      isValid: false,
      message: "Third to seventh characters of GSTIN should be alphabets",
    };
  }
  if (!patternseventoten.test(seventoten)) {
    return {
      isValid: false,
      message: "Eighth to Eleventh characters of GSTIN should be numbers",
    };
  }
  if (!patternTwelveth.test(Twelveth)) {
    return {
      isValid: false,
      message: "Twelveth character of GSTIN should be alphabet",
    };
  }
  if (!patternThirteen.test(Thirteen)) {
    return {
      isValid: false,
      message: "Thirteen characters of GSTIN can be either alphabet or numeric",
    };
  }
  if (!patternfourteen.test(fourteen)) {
    return {
      isValid: false,
      message: "fourteen characters of GSTIN should be Z",
    };
  }
  if (!patternfifteen.test(fifteen)) {
    return {
      isValid: false,
      message: "fifteen characters of GSTIN can be either alphabet or numeric",
    };
  }
  return response;
};

export const gstValidator = (gst) => {
  let res = false;
  const regx = new RegExp(
    "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]1}[1-9A-Z]{1}Z[0-9A-Z]{1}$"
  );
  if (regx.test(gst)) {
    res = true;
  }
  return res;
};

export const ifscValidator = (ifsc) => {
  let res = false;
  const reg = /[A-Z|a-z]{4}[0][a-zA-Z0-9]{6}$/;
  if (ifsc.match(reg)) {
    res = true;
  }
  return res;
};

export function validatePAN(pan) {
  const regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
  if (regex.test(pan.toUpperCase())) {
    return true;
  }
  return false;
}

export const ValidateSignUp = (formData) => {
  let response = {
    isValid: true,
    message: "",
  };
  const errors = [];
  if (!formData) {
    response = {
      isValid: false,
      message: `Required fields ${[...REQUIRED_FIELDS_SIGN_UP]}`,
    };
  }
  REQUIRED_FIELDS_SIGN_UP.forEach((x) => {
    if (!formData[x] || formData[x] === "") {
      errors.push(x);
    }
  });

  if (errors.length > 0) {
    response = {
      isValid: false,
      message: `Required fields ${[...errors]}`,
    };
  }
  return response;
};
