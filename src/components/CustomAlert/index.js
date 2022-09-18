/* eslint-disable react/prop-types */
import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import { alert } from "redux/slices/root/rootSlice";
import CloseIcon from "@mui/icons-material/Close";
import MDTypography from "components/MDTypography";
import { useDispatch } from "react-redux";

export default function TransitionAlerts({ show, message, status }) {
  const [open, setOpen] = React.useState(show);
  const dispatch = useDispatch();
  // #1d8102
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          variant="filled"
          severity={status}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                const success = {
                  show: false,
                  status: " ",
                  message: " ",
                };
                dispatch(alert(success));
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          <MDTypography
            style={{ wordWrap: "break-word" }}
            sx={{
              display: "box",
              lineClamp: 0.5,
              boxOrient: "vertical",
              overflow: "hidden",
              textTransform: "uppercase",
            }}
            variant="alert"
            color="inherit"
            fontWeight="medium"
          >
            {status}!{" "}
            <MDTypography
              style={{ wordWrap: "break-word" }}
              sx={{
                display: "box",
                lineClamp: 0.5,
                boxOrient: "vertical",
                overflow: "hidden",
              }}
              variant="alert"
              color="inherit"
              fontWeight="regular"
            >
              {" "}
              {message}
            </MDTypography>
          </MDTypography>
        </Alert>
      </Collapse>
      <Button
        disabled={open}
        variant="outlined"
        onClick={() => {
          setOpen(true);
        }}
      >
        Re-open
      </Button>
    </Box>
  );
}
