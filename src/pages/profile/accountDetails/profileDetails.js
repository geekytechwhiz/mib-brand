/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
// import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";

import {
  MDAccordion,
  MDAccordionSummary,
  MDAccordionDetails,
} from "components/MDAccordion";
import MDTypography from "components/MDTypography";
import * as React from "react";
import AddressDetails from "./AddressDetails";
import BankInfo from "./BankInfo";
import BusinessInfo from "./BusinessInfo";
import ContactDetails from "./ContactInfo";
import VerifyDocuments from "./VerifyDocuments";

export default function ProfileDetails({ data }) {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <MDAccordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <MDAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Contact Info
          </MDTypography>
        </MDAccordionSummary>
        <MDAccordionDetails>
          <ContactDetails data={data?.ContactDetails || {}} />
        </MDAccordionDetails>
      </MDAccordion>
      <MDAccordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <MDAccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            {" "}
            Business Details
          </MDTypography>
        </MDAccordionSummary>
        <MDAccordionDetails>
          <BusinessInfo data={data?.BusinessDetails || {}} />
        </MDAccordionDetails>
      </MDAccordion>

      <MDAccordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <MDAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            {" "}
            Billing Information
          </MDTypography>
        </MDAccordionSummary>
        <MDAccordionDetails>
          <AddressDetails data={data?.AddressDetails || {}} />
        </MDAccordionDetails>
      </MDAccordion>
      <MDAccordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <MDAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            {" "}
            Bank Details
          </MDTypography>
        </MDAccordionSummary>
        <MDAccordionDetails>
          <BankInfo data={data?.BankDetails || {}} />
        </MDAccordionDetails>
      </MDAccordion>
      <MDAccordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <MDAccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <MDTypography
            display="block"
            variant="button"
            color="text"
            fontWeight="medium"
          >
            Verify Documents
          </MDTypography>
        </MDAccordionSummary>
        <MDAccordionDetails>
          <VerifyDocuments
            data={data?.Documents}
            completion={data?.ProfileCompletion}
          />
        </MDAccordionDetails>
      </MDAccordion>
    </div>
  );
}
