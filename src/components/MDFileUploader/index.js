/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import React from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import { IconButton, Input } from "@mui/material";
import { DoDisturbAltOutlined, PhotoCamera } from "@mui/icons-material";

// const FileUploadProps = {
//   imageButton: "",
//   accept: "",
//   hoverLabel: "",
//   dropLabel: "",
//   width: "",
//   height: "",
//   backgroundColor: "",
//   image: {
//     url: "",
//     imageStyle: {
//       width: "",
//       height: "",
//     },
//   },
//   onChange: (event) => {},
//   onDrop: (event) => {},
// };

const useStyle = makeStyles({
  root: {
    cursor: "pointer",
    textAlign: "center",
    display: "flex",
    "&:hover p,&:hover svg,& img": {
      opacity: 1,
    },
    "& p, svg": {
      opacity: 0.4,
    },
    "&:hover img": {
      opacity: 0.3,
    },
  },
  noMouseEvent: {
    pointerEvents: "none",
  },
  iconText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
  },
  hidden: {
    display: "none",
  },
  onDragOver: {
    "& img": {
      opacity: 0.3,
    },
    "& p, svg": {
      opacity: 1,
    },
  },
});

export function MDFileUploader({
  accept,
  imageButton = false,
  hoverLabel = "Click or drag to upload file",
  dropLabel = "Drop file here",
  width = "600px",
  height = "100px",
  backgroundColor = "#fff",
  url,
  imageStyle,
  onChange,
  onDrop,
}) {
  const classes = useStyle();
  const [imageUrl, setImageUrl] = React.useState(url);
  const [labelText, setLabelText] = React.useState(hoverLabel);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const [isMouseOver, setIsMouseOver] = React.useState(false);
  const stopDefaults = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  const dragEvents = {
    onMouseEnter: () => {
      setIsMouseOver(true);
    },
    onMouseLeave: () => {
      setIsMouseOver(false);
    },
    onDragEnter: (e) => {
      stopDefaults(e);
      setIsDragOver(true);
      setLabelText(dropLabel);
    },
    onDragLeave: (e) => {
      stopDefaults(e);
      setIsDragOver(false);
      setLabelText(hoverLabel);
    },
    onDragOver: stopDefaults,
    onDrop: (e) => {
      stopDefaults(e);
      setLabelText(hoverLabel);
      setIsDragOver(false);
      if (imageButton && e.dataTransfer.files[0]) {
        setImageUrl(URL.createObjectURL(e.dataTransfer.files[0]));
      }
      onDrop(e);
    },
  };

  const handleChange = (event) => {
    if (imageButton && event.target.files[0]) {
      setImageUrl(URL.createObjectURL(event.target.files[0]));
    }

    onChange(event);
  };

  return (
    <>
      <label htmlFor="icon-button-file">
        <Input
          onChange={handleChange}
          accept="image/*"
          id="file-upload"
          type="file"
        />
        <IconButton
          color="secondary"
          aria-label="Aadhaar Front of Authorized Signatory"
          component="span"
        >
          <PhotoCamera />
          <DoDisturbAltOutlined color="error" />
        </IconButton>
      </label>
      <input
        onChange={handleChange}
        accept={accept}
        className={classes.hidden}
        // id="file-upload"
        type="file"
      />

      <label
        htmlFor="file-upload"
        {...dragEvents}
        className={clsx(classes.root, isDragOver && classes.onDragOver)}
      >
        <MDBox
          width={width}
          height={height}
          bgcolor={backgroundColor}
          className={classes.noMouseEvent}
        >
          {imageButton && (
            <MDBox position="absolute" height={height} width={width}>
              <img alt="file upload" src={imageUrl} style={imageStyle} />
            </MDBox>
          )}

          {(!imageButton || isDragOver || isMouseOver) && (
            <MDBox height={height} width={width} className={classes.iconText}>
              <CloudUploadIcon fontSize="large" />
              <MDTypography>{labelText}</MDTypography>
            </MDBox>
          )}
        </MDBox>
      </label>
    </>
  );
}
