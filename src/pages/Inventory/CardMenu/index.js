/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-debugger */
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, Icon } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import { PRODUCT_STATUS_DELETED, PRODUCT_STATUS_INACTIVE } from "lib/constants";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { patchProductStatusThunk } from "redux/slices/inventory/index";

const ITEM_HEIGHT = 48;

export default function CardMenu({
  isActive,
  productId,
  type,
  category,
  productCategory,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hasDelete, setHasDelete] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const updateStatus = (status) => {
    const req = {
      ProductId: productId,
      ProductCategory: productCategory,
      Status: status,
    };
    const res = dispatch(patchProductStatusThunk(req));
    // dispatch(setLoading(false));
  };

  const handleOnSelect = (e) => {
    const { value } = e.target;
    if (value === 1) {
      navigate("/add-product", {
        state: {
          productId,
          type,
          category,
        },
      });
    } else if (value === 2) {
      updateStatus(PRODUCT_STATUS_INACTIVE);
    } else if (value === 3) {
      setHasDelete(true);
    }
  };
  return (
    <div>
      {hasDelete ? (
        <Dialog maxWidth="md" fullWidth open={open} onClose={handleClose}>
          <DialogTitle>
            <MDBox
              pt={1}
              my={2}
              textAlign="center"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <MDTypography variant="caption" fontWeight="medium" color="error">
                Do you really want to delete ? or make as inactive!
              </MDTypography>
            </MDBox>
            <MDBox
              pt={1}
              my={2}
              textAlign="center"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <LoadingButton
                variant="outlined"
                color="success"
                onClick={() => {
                  updateStatus(PRODUCT_STATUS_INACTIVE);
                }}
              >
                <Icon>inactive</Icon>&nbsp;Mark As Inactive
              </LoadingButton>
              <MDButton
                variant="outlined"
                color="error"
                onClick={() => {
                  updateStatus(PRODUCT_STATUS_DELETED);
                }}
              >
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
          </DialogTitle>
        </Dialog>
      ) : (
        <></>
      )}

      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: "20ch",
          },
        }}
      >
        <MenuItem
          key={1}
          onClick={handleOnSelect}
          onSelect={handleOnSelect}
          value={1}
        >
          Edit
        </MenuItem>
        <MenuItem
          key={2}
          onClick={handleOnSelect}
          onSelect={handleOnSelect}
          value={2}
        >
          {isActive ? "Mark As Inactive" : "Mark As Active"}
        </MenuItem>
        <MenuItem
          key={3}
          onClick={handleOnSelect}
          onSelect={handleOnSelect}
          value={3}
        >
          Delete
        </MenuItem>
      </Menu>
    </div>
  );
}
