/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
import { Fade } from "@mui/material";
// import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import * as React from "react";

export default function MDBackdrop(props) {
  const { show } = props;

  return (
    <Fade
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      in={show}
      style={{
        transitionDelay: show ? "800ms" : "0ms",
      }}
      unmountOnExit
    >
      <CircularProgress color="inherit" />
    </Fade>
  );
}
