/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import { styled } from "@mui/material/styles";
import MDTypography from "components/MDTypography";
import * as React from "react";
import { ExpandMoreOutlined } from "@mui/icons-material";
import BankInfo from "./BankInfo";
import AddressDetails from "./AddressDetails";
import BusinessInfo from "./BusinessInfo";
import ContactDetails from "./ContactInfo";
import VerifyDocuments from "./VerifyDocuments";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ExpandMoreOutlined sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  borderRadius: "lg",
  flexDirection: "flex-start",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function ProfileDetails({ data }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Contact Info
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <ContactDetails data={data.ContactDetails || {}} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            {" "}
            Business Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <BusinessInfo data={data.BusinessDetails || {}} />
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            {" "}
            Billing Information
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <AddressDetails data={data.AddressDetails || {}} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            {" "}
            Bank Details
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <BankInfo data={data.BankDetails || {}} />
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Verify Documents
          </MDTypography>
        </AccordionSummary>
        <AccordionDetails>
          <VerifyDocuments
            data={data.DocumentVerification}
            completion={data.ProfileCompletion}
          />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
