/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import Rating from "@mui/material/Rating";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";
import Imgix from "react-imgix";
import { Button } from "@mui/material";
// import img from '../../../public/images/marie.jpg'

function MDCard({
  price,
  mrp,
  title,
  stock,
  ratting,
  image,
  brand,
  type,
  productId,
  category,
}) {
  let img = image;
  if (!image) {
    img = "";
  }
  const navigate = useNavigate();
  const handleClickOpen = () => {
    alert("Clicked");
  };
  const handleOnClick = () => {
    navigate("/add-product", {
      state: {
        productId,
        type,
        category,
      },
    });
  };
  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      coloredShadow="info"
      p={1}
      textAlign="flex-start"
      borderRadius="lg"
    >
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems={{ xs: "flex-end", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        mb={0}
      >
        <MDBox>
          <MDButton variant="text" color="error">
            <Icon>delete</Icon>&nbsp;
          </MDButton>
        </MDBox>
        <MDBox>
          <MDButton mx={0} variant="text" color="dark" onClick={handleOnClick}>
            <Icon fontSize="small">edit</Icon>
          </MDButton>
        </MDBox>
      </MDBox>

      <MDBox px={2} py={2} mx={0} my={0}>
        <Imgix
          src={img || ""}
          width={50}
          height={100}
          imgixParams={{ fit: "crop", ar: "1:1" }}
        />
      </MDBox>
      <Divider />
      <MDBox
        display="flex"
        component="div"
        textAlign="left"
        sx={{ overflow: "auto" }}
      >
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {title}
        </MDTypography>
      </MDBox>
      <MDBox display="flex">
        <MDTypography variant="caption" fontWeight="medium" gutterBottom>
          {brand}
        </MDTypography>
      </MDBox>
      <MDBox display="flex" component="div" justifyContent="flex-start">
        <MDBox sx={{ display: "inline" }}>
          <MDTypography variant="caption" color="text" fontWeight="regular">
            Price:
          </MDTypography>

          <MDTypography
            variant="caption"
            color="error"
            fontWeight="medium"
            sx={{ px: 2 }}
          >
            {price} |
          </MDTypography>
          <MDTypography variant="caption" color="success" fontWeight="medium">
            {mrp}
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox display="flex">
        <Rating name="half-rating" defaultValue={ratting} precision={0.5} />
      </MDBox>
      <Divider />
      <MDBox
        mb={0}
        my={0}
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        textAlign="display-inline"
      >
        <MDBox>
          <MDTypography variant="caption" fontWeight="medium">
            Stock:
            <MDTypography component="span" variant="caption" color="text">
              {stock} 45
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox>
          <Button variant="text">
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="regular"
              onClick={handleClickOpen}
              sx={{ cursor: "pointer" }}
            >
              Update Stock +
            </MDTypography>
          </Button>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of MDCard
MDCard.defaultProps = {
  color: "info",
};

// Typechecking props for the MDCard
MDCard.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "light",
    "dark",
  ]),
  title: PropTypes.string.isRequired,
  mrp: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  stock: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MDCard;
