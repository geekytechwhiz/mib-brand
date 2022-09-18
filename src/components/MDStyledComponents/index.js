/* eslint-disable react/prop-types */
/* eslint-disable import/prefer-default-export */
import { Card, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import Rating from "@mui/material/Rating";
import { compose, spacing, typography } from "@mui/system";

export const MDCard = styled(({ hoverEffect, children, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, hoverEffect }) => ({
  borderRadius: "8px",
  overflow: "unset",
  transition: "all 250ms ease-in-out",
  "&:hover": {
    boxShadow: hoverEffect ? theme.shadows[3] : "",
  },
}));
MDCard.defaultProps = {
  hoverEffect: false,
};

export function FlexBox({ children, ...props }) {
  return (
    <Box display="flex" {...props}>
      {children}
    </Box>
  );
}

export const MDRating = styled(Rating)(compose(spacing, typography));
MDRating.defaultProps = {
  fontSize: "1.25rem",
};
