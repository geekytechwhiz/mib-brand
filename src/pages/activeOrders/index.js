/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-self-import */
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Card from "@mui/material/Card";
import Tab from "@mui/material/Tab";
import MDBox from "components/MDBox";
import React, { memo, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";
import Completed from "./completed";
import InTransitOrders from "./inTransit";
import PendingHandover from "./pendingHandover";
import PendingLabel from "./pendingLabel";
import ReadyToDispatch from "./pendingRTD";

function ActiveOrder() {
  const [value, setValue] = useState("0");
  let count = {
    pendingLabel: 0,
    rtd: 0,
    pendingHandover: 0,
    inTransit: 0,
    delivered: 0,
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  const switchTabs = (e, val) => {
    setValue(val);
  };
  const ordersData = useSelector(
    (state) => state.orderState.orders,
    shallowEqual
  ) || {
    READY_TO_DISPATCH: [],
    PENDING_LABEL: [],
    IN_TRANSIT: [],
    DELIVERED: [],
    PENDING_HANDOVER: [],
  };
  if (ordersData) {
    count = {
      pendingLabel:
        (ordersData.PENDING_LABEL && ordersData.PENDING_LABEL?.length) || 0,
      rtd:
        (ordersData.READY_TO_DISPATCH &&
          ordersData.READY_TO_DISPATCH?.length) ||
        0,
      inTransit: (ordersData.IN_TRANSIT && ordersData.IN_TRANSIT?.length) || 0,
      delivered: (ordersData.DELIVERED && ordersData.DELIVERED?.length) || 0,
      pendingHandover:
        (ordersData.PENDING_HANDOVER && ordersData.PENDING_HANDOVER?.length) ||
        0,
    };
    console.log(count);
  }

  return (
    <div>
      <Card>
        <MDBox pt={3}>
          <TabContext value={value}>
            <MDBox
              sx={{
                maxWidth: "80%",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label={`Pending Label (${count.pendingLabel})`}
                  value="0"
                />
                <Tab label={`Pending RTD (${count.rtd})`} value="1" />
                <Tab
                  label={`Pending Handover (${count.pendingHandover})`}
                  value="2"
                />
                <Tab label={`In Transit (${count.inTransit})`} value="3" />
                <Tab label={`Delivered (${count.delivered})`} value="4" />
              </TabList>
            </MDBox>
            <TabPanel value="0">
              <PendingLabel
                activeTab={switchTabs}
                orders={ordersData.PENDING_LABEL || []}
              />
            </TabPanel>
            <TabPanel value="1">
              <ReadyToDispatch
                activeTab={switchTabs}
                orders={ordersData.READY_TO_DISPATCH || []}
              />
            </TabPanel>
            <TabPanel value="2">
              <PendingHandover
                activeTab={switchTabs}
                orders={ordersData.PENDING_HANDOVER || []}
              />
            </TabPanel>
            <TabPanel value="3">
              <InTransitOrders
                activeTab={switchTabs}
                orders={ordersData.IN_TRANSIT || []}
              />
            </TabPanel>
            <TabPanel value="4">
              <Completed
                activeTab={switchTabs}
                orders={ordersData.DELIVERED || []}
              />
            </TabPanel>
          </TabContext>
        </MDBox>
      </Card>
    </div>
  );
}

export default memo(ActiveOrder);
