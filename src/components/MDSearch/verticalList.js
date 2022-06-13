/* eslint-disable no-debugger */
// import InboxIcon from "@mui/icons-material/Inbox";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { BUSINESS_CATEGORY } from "lib/data";
import * as React from "react";

export default function SelectedListItem() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    debugger;
    setSelectedIndex(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders" sx={{ mt: 2 }}>
        {BUSINESS_CATEGORY &&
          BUSINESS_CATEGORY.map((x, index) => (
            <>
              <ListItemButton
                selected={selectedIndex === index}
                key={x.category}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <CategoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary={x.category} />
                <ListItemIcon>
                  <CheckCircleOutlinedIcon />
                </ListItemIcon>
              </ListItemButton>
              <Divider />
            </>
          ))}
      </List>
      <Divider />
    </Box>
  );
}
