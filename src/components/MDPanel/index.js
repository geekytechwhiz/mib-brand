/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";

// @mui material components
import Icon from "@mui/material/Icon";
import { Grid } from "@mui/material";
import { memo } from "react";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function MDPanel({ item, handleDelete }) {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  return (
    <MDBox
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      flexDirection={{ xs: "column", sm: "row" }}
      borderRadius="lg"
      sx={{ paddingLeft: "5px", paddingRight: "5px" }}
      mb={0}
      mt={0}
    >
      <Grid item xs={11} mb={0.5} px={1}>
        <MDBox sx={{ textAlign: "left" }}>
          <MDTypography
            variant="caption"
            fontWeight="medium"
            sx={{
              wordWrap: "break-word",
            }}
          >
            {item.point}
          </MDTypography>
        </MDBox>
      </Grid>
      <Grid item xs={1} mb={0.5} pr={2}>
        <MDBox alignItems="flex-start">
          <MDBox>
            <MDButton
              variant="text"
              color="error"
              onClick={(e) => {
                handleDelete(e, item);
              }}
            >
              <Icon>delete</Icon>&nbsp;delete
            </MDButton>
          </MDBox>
        </MDBox>
      </Grid>
    </MDBox>
  );
}

// Typechecking props for the Bill
MDPanel.propTypes = {
  point: PropTypes.string.isRequired,
};

export default memo(MDPanel);
