/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-multi-assign */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import { PhotoCamera } from "@mui/icons-material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Button, Grid, IconButton } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDImageList from "components/MDImageList";
import MDLoadingButton from "components/MDLoadingButton";
import MDSnackbar from "components/MDSnackbar";
import MDTypography from "components/MDTypography";
import { useRef, useState } from "react";
import Dropzone from "react-dropzone-uploader";
import "react-dropzone-uploader/dist/styles.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { medias } from "redux-store/slices/inventory";
import { notification } from "redux-store/slices/root/rootSlice";
import { postSignedUrl } from "services/common";
import { v4 as uuidv4 } from "uuid";
import { Validate } from "lib/Validations/index";
import { REQUIRED_FIELDS_MEDIAS, RESOURCE_INVENTORY } from "../../constants";

export default function Medias(props) {
  let productState = { ImageLinks: [] };

  const imageRef = useRef(null);
  const brandId = localStorage.getItem("brandId");
  let images = [];
  const { activeTab, data } = props;

  let validationResponse = {};
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const [openError, setOpenError] = useState({ error: false, message: "" });
  const [mainImage, setMainImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
  const getUploadMainParams = async (e) => {
    debugger;
    const { name } = e.target;

    setIsLoading(false);
    const file = mainImage;
    const req = {
      contentType: file.type,
      resource: RESOURCE_INVENTORY,
      brandId,
      resourceId: name,
      uuid,
    };
    const res = await postSignedUrl(req);
    if (!res) return null;
    const axiosRes = await axios.put(res.preSignedUrl, file);

    if (axiosRes.status !== 200) {
      const error = {
        show: true,
        title: "Updated Action failed",
        status: "error",
        message: "Updated Action failed!",
      };
      dispatch(notification(error));
    } else {
      const success = {
        show: true,
        title: "Updated Successfully",
        status: "success",
        message: "File uploaded successfully!",
      };
      dispatch(notification(success));
    }
    // const imgUlr = { Name: file.name, Url: res.fileName };
    setImageUrl(res.fileName);
    setIsLoading(false);
  };

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
    debugger;
    productState = {
      ImageLinks: images,
      ImageUrl: imageUrl,
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
  const handleFileUpload = (event) => {
    debugger;
    const { name } = event.target;
    if (event.target.files[0]) {
      // const tempSelectedFiles = mainImage;
      // tempSelectedFiles.push(event.target.files[0]);
      setMainImage(event.target.files[0]);
      setEnabled(true);
    }
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
        <MDBox mb={5}>
          <MDTypography
            variant="caption"
            color="button"
            fontWeight="medium"
            textAlign="left"
          >
            Upload Product Main image
          </MDTypography>
          <label htmlFor="icon-button-photo">
            <input
              ref={imageRef}
              type="file"
              name="Logo"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <IconButton
              color="secondary"
              aria-label="Logo"
              component="span"
              onClick={() => imageRef.current.click()}
            >
              <PhotoCamera />
            </IconButton>
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="medium"
              textAlign="left"
            >
              {document.Logo}
            </MDTypography>

            <MDLoadingButton
              sx={{ margin: 2 }}
              loading={isLoading}
              disabled={!enabled}
              color="success"
              loadingPosition="start"
              startIcon={<PhotoCamera />}
              variant="outlined"
              mx={2}
              name="Logo"
              size="small"
              onClick={getUploadMainParams}
            >
              Upload
            </MDLoadingButton>
          </label>
        </MDBox>
      </Grid>
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
