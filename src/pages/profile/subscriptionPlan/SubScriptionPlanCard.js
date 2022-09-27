import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { IconButton } from "@mui/material";
import PlanContentItem from "./PlanContentItem";

// eslint-disable-next-line react/prop-types
function SubScriptionPlanCard({ isSubscribed }) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  return (
    <MDBox
      width="18vw"
      minHeight="65vh"
      bgColor="transparent"
      margin="10px"
      borderRadius="md"
      shadow="sm"
      sx={{
        position: "relative",
      }}
    >
      <IconButton
        sx={{
          position: "absolute",
          top: -12,
          right: -12,
        }}
        size="small"
        color="inherit"
      >
        <CheckCircleIcon
          sx={{ color: isSubscribed ? "green" : "gray" }}
          fontSize="medium"
        />
      </IconButton>
      <MDBox
        width="100%"
        height="50%"
        bgColor="transparent"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <MDTypography fontSize="smaller" alignSelf="flex-start" margin="10px">
          Upgrade
        </MDTypography>
        <img
          src="http://mindscroll.com/images/cover_image/pricing.jpg"
          alt=""
          width="80%"
          height="50%"
          style={{ objectFit: "fill" }}
        />
        <MDBox
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="space-evenly"
          paddingTop="10px"
        >
          <MDTypography color="gray-300" fontSize="0.9rem">
            Migo Inventory
          </MDTypography>
          <MDBox
            width="40%"
            height="20px"
            borderRadius="xl"
            bgColor="#25428a"
            color="white"
            cursor="pointer"
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="0.8rem"
            sx={{
              cursor: "pointer",
            }}
          >
            Subscribe
          </MDBox>
        </MDBox>
      </MDBox>
      <MDBox
        width="100%"
        minHeight="50%"
        bgColor="#25428a"
        borderRadius="md"
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        paddingTop="3%"
        paddingLeft="5%"
      >
        <PlanContentItem content="Free Brand Promotion" />
        <PlanContentItem content="Business revenue" />
        <PlanContentItem content="Reach more customers" />
        <PlanContentItem content="Customers Engagement" />
        <PlanContentItem content="Create Your Brand Identity" />
        <PlanContentItem content="Brand Stoeies" />
        <MDBox
          width="40%"
          height="25px"
          borderRadius="xl"
          bgColor="white"
          color="#25428a"
          cursor="pointer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          marginBottom="5px"
          fontSize="0.9rem"
          sx={{
            cursor: "pointer",
          }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          Know more
        </MDBox>
        {isExpanded && (
          <MDBox
            minHeight="10vh"
            width="100%"
            color="white"
            fontSize=".5rem"
            textAlign="justify"
            paddingRight="3%"
            paddingBottom="2%"
          >
            loremNisi id velit non ea irure.Esse non culpa aliquip eu ut eiusmod
            aute duis fugiat commodo est. Ipsum pariatur deserunt exercitation
            minim sunt sunt culpa deserunt Lorem irure dolor adipisicing
            officia. Nulla anim ullamco labore nisi velit in sunt voluptate quis
            in.
          </MDBox>
        )}
      </MDBox>
    </MDBox>
  );
}

export default SubScriptionPlanCard;
