/* eslint-disable no-debugger */
import { apiInstance } from "../../api";

const registerAccount = async (payload) => {
  try {
    const { EmailId, Password } = payload;
    const reqParam = {
      EmailId,
      Password,
    };

    const { data } = await apiInstance.post("/brand/register", reqParam);

    return data;
  } catch (err) {
    return null;
  }
};

export const login = async (payload) => {
  try {
    debugger;
    const { EmailId, Password } = payload;
    const reqParam = {
      EmailId,
      Password,
    };
    debugger;
    const { data } = await apiInstance.post("/authorizer/login", reqParam);
    return data;
  } catch (err) {
    return null;
  }
};

export const updateContactInfo = async (payload, emailId) => {
  try {
    debugger;
    const reqParam = {
      Name: payload.Name,
      Mobile: payload.Mobile,
      CountryCode: "+91",
      EmailId: payload.EmailId,
      Languages: payload.Languages,
      BrandId: payload.BrandId,
    };
    debugger;
    const { data } = await apiInstance.patch(
      `/brand/contact-info/${emailId}`,
      reqParam
    );
    return data;
  } catch (err) {
    return null;
  }
};
export const updateBankDetails = async (payload, emailId) => {
  try {
    debugger;
    const reqParam = {
      BeneficiaryName: payload.BeneficiaryName,
      IFSCode: payload.IFSCode,
      AccountNumber: payload.AccountNumber,
      BankName: payload.BankName,
      BrandId: payload.BrandId,
    };
    debugger;
    const { data } = await apiInstance.patch(
      `/brand/bank-details/${emailId}`,
      reqParam
    );
    return data;
  } catch (err) {
    return null;
  }
};
export const updateBusinessDetails = async (payload, emailId) => {
  try {
    debugger;
    const reqParam = {
      BusinessName: payload.BusinessName,
      BusinessType: payload.BusinessType,
      Category: payload.Category,
      SubCategory: payload.SubCategory,
      GSTIN: payload.GSTIN,
      BusinessPAN: payload.BusinessPAN,
      PANOwnerName: payload.PANOwnerName,
      BrandName: payload.BrandName,
      PinCode: payload.PinCode,
      WebSiteLink: payload.WebSiteLink,
      BrandId: payload.BrandId,
    };
    debugger;
    const { data } = await apiInstance.patch(
      `/brand/business-details/${emailId}`,
      reqParam
    );
    return data;
  } catch (err) {
    return null;
  }
};
export const getBrandAccount = async (emailId) => {
  const { data } = await apiInstance.get(`/brand/details/${emailId}`);
  debugger;
  if (data.BrandId) localStorage.setItem("BrandId", data.BrandId);
  return data;
};
export const getHealthCheck = async () => {
  const { data } = await apiInstance.get("/authorizer/health");
  return data;
};
export const postHealth = async () => {
  debugger;

  const { data } = await apiInstance.post("/authorizer/health");

  return data;
};

export default registerAccount;
