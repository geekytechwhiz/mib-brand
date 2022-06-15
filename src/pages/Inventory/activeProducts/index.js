/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import AddIcon from "@mui/icons-material/Add";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import _ from "lodash";
import * as React from "react";
import { shallowEqual, useSelector } from "react-redux";
import { Button, Dialog, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MDTypography from "components/MDTypography";
import MDLoadingButton from "components/MDLoadingButton";
import ExclusiveTab from "../exclusiveTab";

export default function ActiveProducts() {
  const navigate = useNavigate();
  let exTabs = [];
  let exData = [];
  let comboTabs = [];

  const inventoryData =
    useSelector((state) => state.inventory?.products, shallowEqual) || null;
  const businessDetails =
    useSelector((state) => state.auth?.accountInfo?.BusinessDetails) || null;
  const [hasGSTVerified, setHasGSTVerified] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  if (inventoryData && Object.keys(inventoryData).length > 0) {
    exData = inventoryData.Exclusive;
    const exKeys = Object.keys(inventoryData.Exclusive) || [];
    const comboKeys = Object.keys(inventoryData.Combo) || [];
    exTabs =
      exKeys &&
      _.map(exKeys, (val, key) => ({
        id: `${key + 1}`,
        label: `${val}`,
      }));
    comboTabs =
      comboKeys &&
      _.map(comboKeys, (val, key) => ({
        id: `${key + 1}`,
        label: `${val}`,
      }));
  }
  const handleAddNew = () => {
    debugger;
    if (!businessDetails.GSTNVerification) {
      setOpen(true);
    } else {
      navigate("/add-product", {
        state: {
          productId: "",
        },
      });
    }
  };

  return (
    <MDBox
      variant="gradient"
      bgColor="transparent"
      borderRadius="lg"
      coloredShadow="info"
      p={2}
      mb={1}
      textAlign="center"
      height="100vh"
      overflow="scroll"
      sx={{ width: "100%", typography: "body1" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        <div>
          <MDLoadingButton
            onClick={handleAddNew}
            color="primary"
            variant="gradient"
            size="small"
            endIcon={<AddIcon />}
          >
            Add New
          </MDLoadingButton>
        </div>
      </div>

      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <MDBox mx={3} pt={3} pb={3} mb={4} textAlign="center">
            <MDTypography variant="button" color="error" fontWeight="regular">
              Your have not verified your GST Number!!
            </MDTypography>
            <Button
              variant="text"
              onClick={() => {
                setOpen(false);
                navigate("/profile");
              }}
            >
              Click Here To Verify your GSTN
            </Button>
          </MDBox>
        </DialogTitle>
      </Dialog>

      <ExclusiveTab isActive data={exData} tabs={exTabs} />
    </MDBox>
  );
}
