/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Grid } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import React from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { useDispatch } from "react-redux";
import { medias } from "redux/slices/inventory";
import { postSignedUrl } from "services/common";
import { v4 as uuidv4 } from "uuid";

export default function Medias(props) {
  const { activeTab } = props;
  const productId = `P${new Date().getTime().toString()}`;
  const dispatch = useDispatch();
  const productState = { ImageLinks: [] };
  const uuid = uuidv4();
  const getUploadParams = async ({ file, meta: { name } }) => {
    debugger;
    console.log(name);
    const req = {
      contentType: file.type,
      productId,
      uuid,
    };
    const res = await postSignedUrl(req);
    if (!res) return null;
    productState.ImageLinks.push(res.fileName);
    const axiosRes = await axios.put(res.preSignedUrl, file);
    console.log(axiosRes);
    return {
      body: file,
      meta: { fileUrl: `https://mibuploaddev.s3.ap-south-1.amazonaws.com` },
      url: res.preSignedUrl,
    };
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };

  const handleNext = (e) => {
    debugger;
    activeTab(e, "5");
    dispatch(medias(productState));
  };
  const handleBack = (e) => {
    debugger;
    activeTab(e, "5");
    dispatch(medias(productState));
  };
  const handleSubmit = (files, allFiles) => {
    debugger;

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
    </MDBox>
  );
}
