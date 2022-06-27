/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDImageList from "components/MDImageList";
import MDSnackbar from "components/MDSnackbar";
import React, { useState } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { medias } from "redux/slices/inventory";
import { postSignedUrl } from "services/common";
import { v4 as uuidv4 } from "uuid";
import {
  REQUIRED_FIELDS_MEDIAS,
  RESOURCE_INVENTORY,
} from "../../lib/constants";
import { Validate } from "../../lib/validations";

export default function Medias(props) {
  let productState = { ImageLinks: [] };

  const brandId = localStorage.getItem("brandId");
  let images = [];
  const { activeTab, data } = props;
  let validationResponse = {};
  const dispatch = useDispatch();
  const [openError, setOpenError] = useState({ error: false, message: "" });
  let productId = "";
  const keys = Object.keys(data);

  if (keys.length === 0) {
    productId = useSelector(
      (state) => state.inventory.vitalInfo.ProductId,
      shallowEqual
    );
    productState = useSelector((state) => state.inventory.medias, shallowEqual);
    productState = { ...productState } || {};
  } else {
    productState = data;
  }

  const uuid = uuidv4();
  const getUploadParams = async ({ file, meta: { name } }) => {
    console.log(name);
    const req = {
      contentType: file.type,
      resourceId: productId,
      resource: RESOURCE_INVENTORY,
      brandId,
      uuid,
    };

    const res = await postSignedUrl(req);
    if (!res) return null;
    images.push(res.fileName);
    const axiosRes = await axios.put(res.preSignedUrl, file);
    console.log(axiosRes);
    return {
      body: file,
      meta: { fileUrl: `https://mibuploaddev.s3.ap-south-1.amazonaws.com` },
      url: res.preSignedUrl,
    };
  };
  const handleClose = () => {
    const error = {
      error: false,
      message: "",
    };
    setOpenError(error);
  };
  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleNext = (e) => {
    productState = {
      ImageLinks: images,
    };
    validationResponse = Validate(REQUIRED_FIELDS_MEDIAS, productState);
    if (!validationResponse.isValid) {
      const error = {
        error: !validationResponse.isValid,
        message: validationResponse.message,
      };
      setOpenError(error);
      return false;
    }
    activeTab(e, "5");
    dispatch(medias(productState));
  };
  const handleBack = (e) => {
    activeTab(e, "3");
    dispatch(medias(productState));
  };
  const handleSubmit = (files, allFiles) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      mx={-3}
      mt={-2}
      p={2}
      mb={1}
      textAlign="center"
    >
      <Grid display="flex" flexDirection="row" justifyContent="flex-start">
        <Dropzone
          getUploadParams={getUploadParams}
          onChangeStatus={handleChangeStatus}
          onSubmit={handleSubmit}
          fileWithMeta
          accept="image/*,audio/*,video/*"
          inputContent={(files, extra) =>
            extra.reject ? "Image, audio and video files only" : "Images"
          }
          styles={{
            dropzoneReject: { borderColor: "red", backgroundColor: "#DAA" },
            inputLabel: (files, extra) =>
              extra.reject ? { color: "red" } : {},
          }}
        />
      </Grid>
      <MDBox
        variant="gradient"
        bgColor="transparent"
        borderRadius="lg"
        coloredShadow="info"
        mx={3}
        mt={5}
        p={2}
        mb={1}
        textAlign="center"
      >
        {/* <Grid display="flex" flexDirection="row" justifyContent="flex-start">
          <ImageGallery images={productState.ImageLinks || []} />
        </Grid> */}
        {/* <Grid display="flex" flexDirection="row" justifyContent="flex-start">
          <CustomCarousel images={productState.ImageLinks || []} />
        </Grid> */}
        <Grid display="flex" flexDirection="row" justifyContent="flex-start">
          <MDImageList images={productState.ImageLinks || []} />
        </Grid>
      </MDBox>

      <Grid container xs={12} justifyContent="space-between">
        <Grid item>
          <Button
            color="primary"
            onClick={handleBack}
            variant="text"
            endIcon={<ArrowBackIosNewIcon />}
          >
            Back
          </Button>
        </Grid>
        <Grid item>
          <Button
            color="primary"
            onClick={handleNext}
            variant="text"
            endIcon={<ArrowForwardIosIcon />}
          >
            Next
          </Button>
        </Grid>
      </Grid>
      <Grid>
        <MDSnackbar
          color="error"
          icon="warning"
          title="Missing required fields"
          content={`${openError.message}`}
          open={openError.error}
          onClose={handleClose}
          close={handleClose}
          bgWhite
        />
      </Grid>
    </MDBox>
  );
}
