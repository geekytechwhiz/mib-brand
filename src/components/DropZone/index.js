/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import React from "react";
import Dropzone from "react-dropzone-uploader";
import { Grid, Button } from "@mui/material";
import "react-dropzone-uploader/dist/styles.css";
import { postSignedUrl, putImage } from "services/common";
import MDBox from "components/MDBox";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { v4 as uuidv4 } from "uuid";

export default function MediaUploader(props) {
  const { activeTab } = props;
  const productId = `P${new Date().getTime().toString()}`;
  const uuid = uuidv4();
  let images = [];
  const getUploadParams = async ({ file, meta: { name } }) => {
    console.log(name);
    const req = {
      contentType: file.type,
      resourceId: productId,
      uuid,
    };
    const image = `${uuid}.${file.type}`;
    images = { ...images, ...image };
    const fileUrl = await await postSignedUrl(req);
    const config = {
      header: {
        "Content-Type": file.type,
      },
    };
    await putImage(fileUrl, file, config);
  };

  const handleChangeStatus = ({ meta }, status) => {
    console.log(status, meta);
  };
  const handleNext = (e) => {
    activeTab(e, "5");
    // dispatch(productDetails(product));
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
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <Button
            color="primary"
            onClick={handleNext}
            variant="text"
            endIcon={<ArrowForwardIosIcon />}
          >
            Next
          </Button>
        </div>
      </div>
    </MDBox>
  );
}
