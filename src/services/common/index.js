/* eslint-disable no-debugger */
/* eslint-disable import/prefer-default-export */
import { apiInstance } from "api";
import axios from "axios";
import { ORIGIN } from "../../lib/constants";

export const postSignedUrl = async (payload) => {
  try {
    debugger;
    const requestBody = {
      ContentType: payload.contentType,
      Resource: payload.resource,
      ResourceId: payload.resourceId,
      FileId: payload.uuid,
      UserId: localStorage.getItem("brandId"),
      Origin: ORIGIN,
    };

    const { data } = await apiInstance.post(
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
