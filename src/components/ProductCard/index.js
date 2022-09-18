/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import { Add, Favorite, Remove } from "@mui/icons-material";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import React, { Fragment, useCallback, useState } from "react";
import MDTypography from "components/MDTypography";
import { MDCard, FlexBox, MDRating } from "../MDStyledComponents";

const StyledMigobucksCard = styled(MDCard)(() => ({
  height: "100%",
  margin: "auto",
  display: "flex",
  overflow: "hidden",
  borderRadius: "8px",
  position: "relative",
  flexDirection: "column",
  justifyContent: "space-between",
  transition: "all 250ms ease-in-out",
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  textAlign: "center",
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const StyledChip = styled(Chip)(() => ({
  zIndex: 1,
  top: "10px",
  left: "10px",
  paddingLeft: 3,
  paddingRight: 3,
  fontWeight: 600,
  fontSize: "10px",
  position: "absolute",
}));
const LoveIconWrapper = styled(Box)(() => ({
  zIndex: 2,
  top: "7px",
  right: "15px",
  cursor: "pointer",
  position: "absolute",
}));
const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
})); // ========================================================

// ========================================================
function MDProductCard({
  imgUrl,
  id,
  tittle,
  price,
  rating,
  hideRating,
  hoverEffect,
  discount = 0,
  showProductSize,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const cartItem = { qty: 0 };

  const toggleIsFavorite = () => setIsFavorite((fav) => !fav);

  const handleCartAmountChange = useCallback(() => {});
  return (
    <StyledMigobucksCard hoverEffect={hoverEffect}>
      <ImageWrapper>
        {!!discount && (
          <StyledChip color="primary" size="small" label={`${discount}% off`} />
        )}

        <LoveIconWrapper>
          <IconButton
            sx={{
              p: "6px",
            }}
            onClick={toggleIsFavorite}
          >
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
        </LoveIconWrapper>

        {/* <Link href={`/product/${id}`}> */}
        <a>
          <LazyLoadImage
            uri={imgUrl || ""}
            paddingTop={10}
            width={0}
            height={0}
            layout="responsive"
            alt={tittle}
            render={(src, style) => (
              <img src={src} style={style} alt="demonstration" />
            )}
          />
        </a>
        {/* </Link> */}
      </ImageWrapper>

      <ContentWrapper>
        <FlexBox>
          <Box flex="1 1 0" minWidth="0px" mr={1}>
            {/* <Link href={`/product/${id}`}> */}
            <a>
              <MDTypography
                variant="caption"
                color="text"
                fontWeight="regular"
                mb={1}
                title={tittle}
                fontSize="14px"
              >
                {tittle}
              </MDTypography>
            </a>
            {/* </Link> */}

            {!hideRating && (
              <MDRating value={rating || 0} color="warn" readOnly />
            )}
            <FlexBox alignItems="center" gap={1} mt={0.5}>
              <Box fontWeight="600" color="primary.main">
                ${price}
                {/* ?.toFixed(2) */}
              </Box>

              {!!discount && (
                <Box color="grey.600" fontWeight="600">
                  <del>{discount}</del>
                </Box>
              )}
            </FlexBox>
          </Box>

          <FlexBox
            width="30px"
            alignItems="center"
            className="add-cart"
            flexDirection="column-reverse"
            justifyContent={cartItem?.qty ? "space-between" : "flex-start"}
          >
            <Button
              color="primary"
              variant="outlined"
              sx={{
                padding: "3px",
              }}
              onClick={handleCartAmountChange((cartItem?.qty || 0) + 1)}
            >
              <Add fontSize="small" />
            </Button>

            {!!cartItem?.qty && (
              <>
                <Box color="text.primary" fontWeight="600">
                  {cartItem?.qty}
                </Box>
                <Button
                  color="primary"
                  variant="outlined"
                  sx={{
                    padding: "3px",
                  }}
                  onClick={() => {}}
                >
                  <Remove fontSize="small" />
                </Button>
              </>
            )}
          </FlexBox>
        </FlexBox>
      </ContentWrapper>
    </StyledMigobucksCard>
  );
}

export default MDProductCard;
