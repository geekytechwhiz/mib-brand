/* eslint-disable react/prop-types */
import * as React from "react";
import { Divider, Grid, Icon } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemText from "@mui/material/ListItemText";
// import Divider from "@mui/material/Divider";
import MDTypography from "components/MDTypography";

// const style = {
//   width: "100%",
//   maxWidth: 360,
//   bgcolor: "background.paper",
// };

export default function MDList({ data }) {
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="sm"
      coloredShadow="light"
      p={1}
      textAlign="flex-start"
    >
      {data &&
        data.map((x) => (
          <MDBox
            display="flex"
            justifyContent="flex-start"
            textAlign="left"
            mx={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={0}
          >
            <Grid
              container
              display="flex"
              flexDirection="row"
              justifyContent="flex-start"
            >
              <Grid item xs={11}>
                <MDTypography variant="caption" color="text" fontWeight="bold">
                  {x}
                </MDTypography>
              </Grid>
              <Grid item>
                <MDButton
                  sx={{ padding: "1px" }}
                  mx={0}
                  variant="text"
                  color="error"
                >
                  <Icon>delete</Icon>&nbsp;delete
                </MDButton>
              </Grid>

              <Divider />
            </Grid>
          </MDBox>
        ))}
    </MDBox>
  );
}
