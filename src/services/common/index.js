/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
 
import axios from "axios";
import { ORIGIN } from "../../lib/constants";
import api from "../../api";

export const postSignedUrl = async (payload) => {
  try {
             
    const requestBody = {
      ContentType: payload.contentType,
      Resource: payload.resource,
      ResourceId: payload.resourceId,
      FileId: payload.uuid,
      UserId: localStorage.getItem("brandId"),
      Origin: ORIGIN,
    };

    const { data } = await api.post(
      `/common/file-upload/signed-url`,
      requestBody
    );
    return data;
  } catch (err) {
    return null;
  }
};

export const putImage = async (url, payload, config) => {
  try {
    const { data } = await axios.put(url, payload, config);
    return data;
  } catch (err) {
    return null;
  }
};
export const postPasswordResetRequest = async (payload) => {
  try {
             
    const requestBody = {
      Name: payload.name,
      ToAddress: payload.toAddress,
      Origin: "Migo Brand",
    };

    const { data } = await api.post(
      `/email-service/reset-password`,
      requestBody
    );
    return data;
  } catch (err) {
    return null;
  }
};
