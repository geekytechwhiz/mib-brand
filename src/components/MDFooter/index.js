/* eslint-disable react/destructuring-assignment */
import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

function CustomFooterStatusComponent(props) {
  return (
    <Box sx={{ padding: "10px", display: "flex" }}>
      <FiberManualRecordIcon
        fontSize="small"
        sx={{
          mr: 2,
          color: props.status === "connected" ? "#4caf50" : "#d9182e",
        }}
      />
      Status {props.status}
    </Box>
  );
}

CustomFooterStatusComponent.propTypes = {
  status: PropTypes.oneOf(["connected", "disconnected"]).isRequired,
};

export { CustomFooterStatusComponent };

export default function CustomFooter() {
  const [status, setStatus] = React.useState("connected");

  return (
    <Box sx={{ width: 1 }}>
      <Button
        color="primary"
        variant="contained"
        onClick={() =>
          setStatus((current) =>
            current === "connected" ? "disconnected" : "connected"
          )
        }
      >
        {status === "connected" ? "Disconnect" : "Connect"}
      </Button>
    </Box>
  );
}
