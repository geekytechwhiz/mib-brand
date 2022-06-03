import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import colors from "assets/theme/base/colors";
import pxToRem from "assets/theme/functions/pxToRem";
import boxShadows from "assets/theme/base/boxShadows";

const { grey, white } = colors;
const { tabsBoxShadow } = boxShadows;

const { size, fontWeightRegular } = typography;
const { borderRadius } = borders;
const { dark } = colors;
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    marginRight: theme.spacing(1),
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flex: "1 1 auto",
    textAlign: "center",
    maxWidth: "unset !important",
    minWidth: "unset !important",
    minHeight: "unset !important",
    fontSize: size.md,
    fontWeight: fontWeightRegular,
    textTransform: "none",
    lineHeight: "inherit",
    color: `${dark.main} !important`,
    opacity: "1 !important",
    backgroundColor: grey[100],
    borderRadius: borderRadius.xl,
    padding: pxToRem(4),
    position: "relative",
    flexContainer: {
      height: "100%",
      position: "relative",
      zIndex: 10,
    },
    fixed: {
      overflow: "unset !important",
      overflowX: "unset !important",
    },
    vertical: {
      "& .MuiTabs-indicator": {
        width: "100%",
      },
    },
    indicator: {
      height: "100%",
      borderRadius: borderRadius.lg,
      backgroundColor: white.main,
      boxShadow: tabsBoxShadow.indicator,
      transition: "all 500ms ease",
    },
    "& .material-icons, .material-icons-round": {
      marginBottom: "0 !important",
      marginRight: pxToRem(6),
    },
    "& svg": {
      marginBottom: "0 !important",
      marginRight: pxToRem(6),
    },
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
    },
  })
);

export default function CustomizedTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "#fff" }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          <AntTab label="Tab 1" />
          <AntTab label="Tab 2" />
          <AntTab label="Tab 3" />
        </AntTabs>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
}
