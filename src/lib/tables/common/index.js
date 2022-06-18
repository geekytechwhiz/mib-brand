/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */

import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { Avatar, Button } from "@mui/material";
import Icon from "@mui/material/Icon";
import productImage from "assets/images/logos/shiprocket.png";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
import { LightTooltip } from "components/MDTooltip";
import MDTypography from "components/MDTypography";
import { utcToLocalDateFormatter } from "lib/helper/index";
import InventoryIcon from "@mui/icons-material/Inventory";
import Imgix from "react-imgix";

export function RenderBadge() {
  return (
    <MDBox ml={-1}>
      <MDBadge
        badgeContent="online"
        color="success"
        variant="gradient"
        size="sm"
      />
    </MDBox>
  );
}

export function ProductNameAndImage(row, column) {
  const name = row[column];
  return (
    <MDBox
      display="flex"
      alignItems="center"
      lineHeight={1}
      sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "10rem" }}
    >
      <Avatar sx={{ bgcolor: "green" }}>
        <InventoryIcon />
      </Avatar>
      <MDTypography
        component="a"
        href="#"
        variant="button"
        color="text"
        fontWeight="medium"
        ml={1}
        lineHeight={1}
      >
        {name}
      </MDTypography>
    </MDBox>
  );
}

export function PaymentStatus(row, column) {
  const name = row[column];

  return (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      {name === "SUCCESS" ? (
        <MDBadge
          badgeContent={name}
          color="success"
          variant="gradient"
          size="sm"
        />
      ) : (
        <MDBadge
          badgeContent={name}
          color="error"
          variant="gradient"
          size="sm"
        />
      )}
    </MDBox>
  );
}

export function RenderProductName(row, column) {
  const name = row[column];
  return (
    <MDBox
      display="flex"
      sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "20rem" }}
      alignItems="center"
      lineHeight={1}
    >
      {row.ImageLink ? (
        <MDBox px={0.5} py={0.5} mx={0} my={0}>
          <Imgix
            src={row.ImageLink || ""}
            width={50}
            height={100}
            imgixParams={{ fit: "crop", ar: "1:1" }}
          />
        </MDBox>
      ) : (
        <MDAvatar>N</MDAvatar>
      )}

      <LightTooltip title={name}>
        <MDTypography
          component="a"
          href="#"
          variant="button"
          color="text"
          fontWeight="medium"
          display="block"
          ml={1}
          lineHeight={1}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {row[column] || ""}
        </MDTypography>
      </LightTooltip>
    </MDBox>
  );
}

export function RenderMultiLineColumn({ title, description }) {
  return (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        component="a"
        href="#"
        variant="button"
        color="text"
        fontWeight="medium"
        display="block"
      >
        {title}
      </MDTypography>
      <MDTypography
        component="a"
        href="#"
        variant="button"
        color="text"
        fontWeight="medium"
      >
        {description}
      </MDTypography>
    </MDBox>
  );
}
const formatAddress = (address) => {
  if (!address) return "";
  return `${address.HouseName} , ${address.Street}, ${address.District}, ${address.State}`;
};

export function ReturnInfo(element) {
  return (
    <MDBox
      lineHeight={1}
      textAlign="left"
      display="flex"
      flexDirection="column"
      sx={{ width: 200, minWidth: 200 }}
    >
      <MDTypography
        component="a"
        href="#"
        variant="button"
        color="text"
        fontWeight="medium"
      >
        {element.ReturnOrderId}
      </MDTypography>
    </MDBox>
  );
}
export function RefundInfo(element) {
  return (
    <MDBox
      lineHeight={1}
      textAlign="left"
      display="flex"
      flexDirection="column"
      sx={{ width: "15rem" }}
    >
      <MDTypography
        component="a"
        href="#"
        variant="button"
        color="text"
        fontWeight="medium"
      >
        {element.RefundStatus}
      </MDTypography>
      <MDBox display="flex" justifyContent="space-between" alignItems="left">
        <MDTypography
          color="text"
          display="block"
          variant="caption"
          fontWeight="medium"
        >
          Refund Mode:&nbsp;&nbsp;&nbsp;
          <MDTypography color="text" variant="caption" fontWeight="regular">
            {element.RefundMode}
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}
export function RenderPackageInfo(element) {
  if (!element.PackageDetails)
    return <MDTypography variant="caption" color="text" fontWeight="regular" />;
  const packageDetails = element.PackageDetails || {};
  return (
    <MDBox
      lineHeight={1}
      textAlign="left"
      display="flex"
      flexDirection="column"
      sx={{ width: "15rem" }}
    >
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {`${packageDetails.Height}x${packageDetails.Length}x${packageDetails.Breadth}`}
      </MDTypography>
      <MDBox display="flex" justifyContent="space-between" alignItems="left">
        <MDTypography variant="caption" color="text" fontWeight="regular">
          Entered:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {`${packageDetails.Weight} kg`}
          </MDTypography>
        </MDTypography>
      </MDBox>
    </MDBox>
  );
}
export function RefundAction(handleApprove, handleReject) {
  return (
    <MDBox
      lineHeight={1}
      textAlign="left"
      display="flex"
      flexDirection="column"
      sx={{ width: "15rem" }}
    >
      <MDBox display="flex" justifyContent="space-between" alignItems="center">
        <MDBox mr={2}>
          <Button
            variant="text"
            size="small"
            onClick={handleApprove}
            sx={{
              borderWidth: 1,
              borderColor: "#4CAF50",
              borderStyle: "solid",
              color: "#4CAF50",
            }}
            endIcon={<CheckCircleOutlinedIcon />}
          >
            Approve
          </Button>
        </MDBox>
        <MDBox mr={2}>
          <Button
            variant="text"
            size="small"
            onClick={handleReject}
            sx={{
              borderWidth: 1,
              borderColor: "#F44335",
              borderStyle: "solid",
              color: "#F44335",
            }}
            endIcon={<CancelOutlinedIcon />}
          >
            Reject
          </Button>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export function RenderAddressColumn(ele) {
  const deliverInfo = ele.DeliveryDetails;
  const customerInfo = ele.CustomerDetails;
  return (
    <MDBox
      lineHeight={1}
      textAlign="left"
      display="flex"
      flexDirection="column"
    >
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        Name:&nbsp;&nbsp;&nbsp;
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {customerInfo.Name}
        </MDTypography>
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        Email:&nbsp;&nbsp;&nbsp;
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {customerInfo.Email}
        </MDTypography>
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        Phone:&nbsp;&nbsp;&nbsp;
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {customerInfo.Mobile}
        </MDTypography>
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        Address:&nbsp;&nbsp;&nbsp;
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {formatAddress(deliverInfo)}
        </MDTypography>
      </MDTypography>
    </MDBox>
  );
}

export function RenderDispatchByInfo(row) {
  return (
    <MDBox
      display="flex"
      flexDirection="column"
      alignItems="left"
      justifyContent="flex-start"
      lineHeight={1}
    >
      <MDBox ml={2} lineHeight={1}>
        <MDBox display="flex" flexDirection="row">
          <MDTypography
            display="block"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            To Address:
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection="row">
          <MDTypography
            style={{ wordWrap: "break-word" }}
            sx={{
              display: "box",
              lineClamp: 0.5,
              boxOrient: "vertical",
              overflow: "hidden",
            }}
            variant="caption"
            color="text"
            fontWeight="regular"
          >
            {row?.DeliveryDetails?.Name}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection="row">
          <MDTypography
            style={{ wordWrap: "break-word" }}
            sx={{
              display: "box",
              lineClamp: 0.5,
              boxOrient: "vertical",
              overflow: "hidden",
            }}
            variant="caption"
            color="text"
            fontWeight="regular"
          >
            {row?.DeliveryDetails?.HouseName}
          </MDTypography>
          <MDTypography
            style={{ wordWrap: "break-word" }}
            sx={{
              display: "box",
              lineClamp: 0.5,
              boxOrient: "vertical",
              overflow: "hidden",
            }}
            variant="caption"
            color="text"
            fontWeight="regular"
          >
            {(row && row?.DeliveryDetails?.Street) || ""}
            {(row && row?.DeliveryDetails?.District) || ""}
          </MDTypography>
          <MDTypography
            style={{ wordWrap: "break-word" }}
            sx={{
              display: "box",
              lineClamp: 0.5,
              boxOrient: "vertical",
              overflow: "hidden",
            }}
            variant="caption"
            color="text"
            fontWeight="regular"
          >
            {row && row?.DeliveryDetails.State}{" "}
            {row && row?.DeliveryDetails.PinCode}
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection="row">
          <MDTypography
            display="block"
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Dispatched By:
          </MDTypography>
        </MDBox>
        <MDBox display="flex" flexDirection="row">
          <MDTypography
            style={{ wordWrap: "break-word" }}
            sx={{
              display: "box",
              lineClamp: 0.5,
              boxOrient: "vertical",
              overflow: "hidden",
            }}
            variant="caption"
            color="text"
            fontWeight="regular"
          >
            {row?.DispatchedBy}
          </MDTypography>
        </MDBox>
      </MDBox>
    </MDBox>
  );
}

export function RenderWarehouseAddress(address, businessDetails) {
  return (
    <MDBox
      lineHeight={1}
      textAlign="left"
      display="flex"
      flexDirection="column"
      sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "10rem" }}
    >
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="regular"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "1",
          WebkitBoxOrient: "vertical",
        }}
      >
        {businessDetails?.BusinessName}
      </MDTypography>
      <MDTypography
        variant="caption"
        color="text"
        fontWeight="regular"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "1",
          WebkitBoxOrient: "vertical",
        }}
      >
        {address?.Street}, {address?.Street}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {address?.City}
      </MDTypography>
      <MDTypography variant="caption" color="text" fontWeight="regular">
        {address?.State}
        {address?.PostalCode}
      </MDTypography>
    </MDBox>
  );
}

export function RenderReturnProductInfo(ele) {
  return (
    <MDBox
      lineHeight={1}
      textAlign="left"
      display="flex"
      flexDirection="column"
      sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "15rem" }}
    >
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: "1",
          WebkitBoxOrient: "vertical",
        }}
      >
        Name:&nbsp;&nbsp;&nbsp;
        <LightTooltip title={ele.ProductName}>
          <MDTypography variant="caption" color="text" fontWeight="regular">
            {ele.ProductName}
          </MDTypography>
        </LightTooltip>
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        SKU:&nbsp;&nbsp;&nbsp;
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {ele.SKU}
        </MDTypography>
      </MDTypography>
      <MDTypography
        display="block"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        Qty:&nbsp;&nbsp;&nbsp;
        <MDTypography variant="caption" color="text" fontWeight="regular">
          {ele.Quantity}
        </MDTypography>
      </MDTypography>
    </MDBox>
  );
}
export function RenderProgress(row, column) {
  const value = 60;
  const val = row[column];
  console.log(val);
  return (
    <MDBox display="flex" alignItems="left">
      <MDTypography variant="caption" color="text" fontWeight="medium">
        {value || ""}%
      </MDTypography>
      <MDBox ml={0.5} width="9rem">
        <MDProgress variant="gradient" color="info" value={value} />
      </MDBox>
    </MDBox>
  );
}
export function RenderProductInfo(row, column) {
  const name = row[column];
  return (
    <MDBox
      display="flex"
      sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "20rem" }}
      alignItems="left"
      lineHeight={1}
    >
      {row.ImageLink ? (
        <MDBox px={0.5} py={0.5} mx={0} my={0}>
          <Imgix
            src={row.ImageLink || ""}
            width={50}
            height={100}
            imgixParams={{ fit: "crop", ar: "1:1" }}
          />
        </MDBox>
      ) : (
        <MDAvatar>N</MDAvatar>
      )}

      <LightTooltip title={name}>
        <MDTypography
          display="block"
          variant="caption"
          fontWeight="regular"
          color="secondary"
          ml={1}
          lineHeight={1}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {row[column] || ""}
        </MDTypography>
      </LightTooltip>
    </MDBox>
  );
}
export function RenderDate(row, column) {
  return (
    <MDBox lineHeight={1} sx={{ width: "10rem" }} textAlign="left">
      <MDTypography
        component="a"
        href="#"
        variant="button"
        color="text"
        fontWeight="medium"
      >
        {utcToLocalDateFormatter(row[column]) || ""}
      </MDTypography>
    </MDBox>
  );
}

export function RenderColumn(row, column, isAmount) {
  return (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography
        component="a"
        href="#"
        variant="button"
        color="text"
        fontWeight="medium"
      >
        {isAmount && row[column]
          ? `Rs. ${(Math.round(row[column] * 100) / 100).toFixed(2)}`
          : row[column]}
      </MDTypography>
    </MDBox>
  );
}

export function RenderAction(name, description, hasDisabled) {
  return (
    <MDBox display="flex" alignItems="left">
      <MDBox display="flex" flexDirection="column">
        <MDTypography
          display="block"
          variant="caption"
          color="text"
          fontWeight="regular"
          gutterBottom
        >
          {name || ""}
        </MDTypography>
        <MDTypography
          component="a"
          href="#"
          variant="button"
          color="text"
          fontWeight="medium"
          style={{ wordWrap: "break-word" }}
          sx={{
            display: "box",
            lineClamp: 2,
            boxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description || ""}{" "}
        </MDTypography>
      </MDBox>
      <MDBox mr={2}>
        <MDButton
          disabled={hasDisabled}
          variant="outlined"
          color="success"
          iconOnly
          circular
        >
          <Icon sx={{ fontWeight: "bold" }}>download</Icon>
        </MDButton>
      </MDBox>
    </MDBox>
  );
}

export function RenderLogisticsPartner(row, column) {
  return (
    <MDBox
      display="flex"
      sx={{ overflow: "hidden", textOverflow: "ellipsis", width: "20rem" }}
      alignItems="left"
      lineHeight={1}
    >
      <MDAvatar
        src={productImage}
        name={row[column]}
        size="lg"
        variant="rounded"
      />
      <LightTooltip title={row[column]}>
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
          ml={1}
          pt={3}
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {row[column]}
        </MDTypography>
      </LightTooltip>
    </MDBox>
  );
}
