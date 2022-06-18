/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Imgix from "react-imgix";
import { useNavigate } from "react-router-dom";
import CardMenu from "../CardMenu";
import UpdateStock from "../updateStock";

// import img from '../../../public/images/marie.jpg'

function ProductCard({
  isActive,
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
  productCategory,
}) {
  let img = image;
  if (!image) {
    img = "";
  }

  const [hasUpdate, setHasUpdate] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setHasUpdate(true);
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
        component="div"
        textAlign="right"
        sx={{ padding: 0, overflow: "auto" }}
        justifyContent="flex-end"
        mb={0}
      >
        <CardMenu
          isActive={isActive}
          productId={productId}
          type={type}
          category={category}
          productCategory={productCategory}
        />
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
            <MDTypography
              component="span"
              variant="caption"
              fontWeight="medium"
              px={1}
              color={stock < 5 ? "error" : "success"}
            >
              {stock}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox>
          {/* <Button variant="text">
            <MDTypography
              variant="caption"
              color="text"
              fontWeight="regular"
              onClick={handleClickOpen}
              sx={{ cursor: "pointer" }}
            >
              Update Stock +
            </MDTypography>
          </Button> */}
          <UpdateStock />
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

// Setting default values for the props of MDCard
ProductCard.defaultProps = {
  color: "info",
};

// Typechecking props for the MDCard
ProductCard.propTypes = {
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

export default ProductCard;
