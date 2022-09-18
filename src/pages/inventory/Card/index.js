/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/prop-types */
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import MDBox from "components/MDBox";
import { Chip, IconButton, styled } from "@mui/material";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";
import React, { useState } from "react";
import Imgix from "react-imgix";
import { useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import LazyLoad from "react-lazyload";
import CardMenu from "../CardMenu";
import UpdateStock from "../updateStock";

// import img from '../../../public/images/marie.jpg'
const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
}));
function ProductCard({
  isActive,
  price,
  mrp,
  productName,
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
        sx={{ padding: 0, overflow: "auto" }}
        justifyContent="space-between"
        mb={0}
      >
        <MDBox
          display="flex"
          component="div"
          sx={{ padding: 0, overflow: "auto" }}
          justifyContent="flex-start"
          mb={0}
        >
          {type === "Combo" ? (
            <StyledChip color="primary" size="small" label={type} />
          ) : (
            <></>
          )}
        </MDBox>
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
      </MDBox>

      <MDBox mx={0} my={0}>
        <Imgix
          src={img || ""}
          width={150}
          height={200}
          imgixParams={{ fit: "crop", ar: "1:1" }}
        />
      </MDBox>
      <MDBox mx={0} my={0}>
        {/* <LazyLoadImage
          alt="demonstration1"
          placeholder="Image"
          width={100}
          height={100}
          src={img}
        /> */}
        {/* <LazyLoad once>
          <img src={img} height={150} width={100} alt="dog" />
        </LazyLoad> */}
      </MDBox>
      <MDBox
        display="flex"
        component="div"
        textAlign="left"
        sx={{ overflow: "auto" }}
      >
        <MDTypography variant="caption" color="text" fontWeight="medium">
          {productName || "Apple I phone"}
        </MDTypography>
      </MDBox>
      <MDBox display="flex">
        <Rating
          name="half-rating"
          defaultValue={ratting}
          size="small"
          precision={0.5}
          readOnly
        />
      </MDBox>
      <MDBox display="flex" component="div" justifyContent="flex-start">
        <MDBox sx={{ display: "inline" }}>
          <MDTypography variant="caption" color="text" fontWeight="regular">
            Price:
          </MDTypography>

          <MDTypography
            variant="caption"
            fontWeight="medium"
            color="primary"
            sx={{ px: 2 }}
          >
            ₹ {price} |
          </MDTypography>
          <MDTypography variant="caption" color="secondary" fontWeight="medium">
            <del>₹ {mrp}</del>
          </MDTypography>
        </MDBox>
      </MDBox>
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
