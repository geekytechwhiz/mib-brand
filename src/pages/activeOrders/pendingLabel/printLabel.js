/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-return-assign */
import React from "react";
import ReactToPrint from "react-to-print";
import { Button } from "@mui/material";
import Invoice from "./invoice";

class PrintLabel extends React.Component {
  render() {
        
    return (
      <div>
        <Invoice
          orders={this.props.orders}
          brandInfo={this.props.brandInfo}
          billingDetails={this.props.billingDetails}
          disabled
          ref={(response) => (this.componentRef = response)}
        />
        <ReactToPrint
          content={() => this.componentRef}
          trigger={() => (
            <Button
              color="dark"
              mt={2}
              sx={{ color: "black", margin: "25px" }}
              variant="contained"
            >
              Print Billing Label
            </Button>
          )}
        />
      </div>
    );
  }
}

export default PrintLabel;
