/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import React, { useState } from "react";
import MDButton from "components/MDButton";
import MDSnackbar from "components/MDSnackbar";

function Notifications(props) {
  const [successSB, setSuccessSB] = useState(false);
  const [infoSB, setInfoSB] = useState(false);
  const [warningSB, setWarningSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  if (props && props.data.status === "error") {
    setErrorSB(true);
  } else if (props && props.data.status === "warning") {
    setWarningSB(true);
  } else if (props && props.data.status === "success") {
    setSuccessSB(true);
  }
  const closeSuccessSB = () => setSuccessSB(false);
  const openInfoSB = () => setInfoSB(true);
  const closeInfoSB = () => setInfoSB(false);
  const closeWarningSB = () => setWarningSB(false);
  const closeErrorSB = () => setErrorSB(false);
  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderInfoSB = (
    <MDSnackbar
      icon="notifications"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={infoSB}
      onClose={closeInfoSB}
      close={closeInfoSB}
    />
  );

  const renderWarningSB = (
    <MDSnackbar
      color="warning"
      icon="star"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={warningSB}
      onClose={closeWarningSB}
      close={closeWarningSB}
      bgWhite
    />
  );

  const RenderErrorSB = React.memo(() => (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  ));
  return (
    <MDBox p={2}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          {props && props.data && props.data.status === "info" ? (
            <Grid item xs={12} sm={6} lg={3}>
              <MDButton
                variant="gradient"
                color="info"
                onClick={openInfoSB}
                fullWidth
              >
                info notification
              </MDButton>
              {renderInfoSB}
            </Grid>
          ) : (
            <></>
          )}
          {props && props.data && props.data.status === "success" ? (
            <Grid item xs={12} sm={6} lg={3}>
              <MDButton
                variant="gradient"
                color="success"
                onClick={openInfoSB}
                fullWidth
              >
                info notification
              </MDButton>
              {renderSuccessSB}
            </Grid>
          ) : (
            <></>
          )}
          {props && props.data && props.data.status === "error" ? (
            <Grid item xs={12} sm={6} lg={3}>
              <MDButton
                variant="gradient"
                color="error"
                onClick={openInfoSB}
                fullWidth
              >
                info notification
              </MDButton>
              <RenderErrorSB />
            </Grid>
          ) : (
            <></>
          )}
          {props && props.data && props.data.status === "warning" ? (
            <Grid item xs={12} sm={6} lg={3}>
              <MDButton
                variant="gradient"
                color="warning"
                onClick={openInfoSB}
                fullWidth
              >
                info notification
              </MDButton>
              {renderWarningSB}
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Notifications;
