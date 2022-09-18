/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/img-redundant-alt */
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import * as React from "react";

export default function MDImageList({ images }) {
  return (
    <ImageList fullWidth>
      <Grid
        container
        spacing={1}
        display="flex"
        flexDirection="row"
        justifyContent="flex-start"
      >
        {images &&
          images.map((item) => (
            <Grid item>
              <ImageListItem key={item.img}>
                <MDBox
                  variant="gradient"
                  bgColor="transparent"
                  borderRadius="sm"
                  coloredShadow="info"
                  p={0}
                  textAlign="flex-start"
                >
                  <MDBox
                    display="flex"
                    justifyContent="flex-end"
                    alignItems={{ xs: "flex-end", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                    mb={0}
                  >
                    <MDButton
                      sx={{ padding: "1px" }}
                      mx={0}
                      variant="text"
                      color="text"
                    >
                      <Icon>delete</Icon>&nbsp;
                    </MDButton>
                  </MDBox>
                  <MDBox
                    display="flex"
                    justifyContent="center"
                    alignItems={{ xs: "center", sm: "center" }}
                    flexDirection={{ xs: "column", sm: "row" }}
                    mb={0}
                  >
                    <img
                      width={150}
                      height={300}
                      src={`${item}?w=248&fit=crop&auto=format`}
                      srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      alt="product image"
                      loading="lazy"
                    />
                  </MDBox>
                </MDBox>
              </ImageListItem>
            </Grid>
          ))}
      </Grid>
    </ImageList>
  );
}
