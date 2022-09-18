import axios from "axios";

const isProduction = process.env.NODE_ENV === "production";
const { hostname } = window.location;
// const hdr= "X-MIBAPI-CustomerType,X-MIBAPI-Trace-Id,X-MIBAPI-CustomerID,X-MIBAPI-Token,X-MIBAPI-Source,Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
const getHeaders = () => ({
  "access-control-allow-origin": "*",
  "access-control-allow-headers": "*",
  "Content-Type": "application/json",
  "X-MIBAPI-CustomerType": "Brand",
  "X-MIBAPI-Source": "Brand",
  "X-MIBAPI-Token": "test",
  "X-MIBAPI-CustomerID": "test",
  "X-MIBAPI-Trace-Id": "f860dab7-d9b5-4606-b9b6-75a31cd8e48f",
});

const baseApiUrl = "https://api.dev.migobucks.com";
const applicationDomain = "brands.migobucks.com";

export const getBaseApiUrl = (path) => {
  if (hostname === applicationDomain && isProduction) {
    return `${baseApiUrl}/prod/${path}`;
  }
  return `${baseApiUrl}`;
};
export const apiInstance = axios.create({
  baseURL: getBaseApiUrl(),
});

export const onboardApiInstance = axios.create({
  baseURL: "https://06rga4bztj.execute-api.ap-south-1.amazonaws.com/dev",
});

export const inventoryApiInstance = axios.create({
  baseURL: "https://sn0f48vlw6.execute-api.ap-south-1.amazonaws.com/dev",
  headers: getHeaders(),
});
