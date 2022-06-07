/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-unused-vars */
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Dialog, DialogTitle } from "@mui/material";
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
// @mui material components
import List from "@mui/material/List";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React context
import {
  setMiniSidenav,
  setTransparentSidenav,
  setWhiteSidenav,
  useMaterialUIController,
} from "context";
// Material Dashboard 2 React example components
// Custom styles for the Sidenav
// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
// react-router-dom components
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import SidenavCollapse from "./SidenavCollapse";
import SidenavRoot from "./SidenavRoot";
import sidenavLogoLabel from "./styles/sidenav";

function Sidenav({ color, brand, logo, brandName, routes, ...rest }) {
  const navigate = useNavigate();
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    sidenavColor,
  } = controller;
  const location = useLocation();
  const collapseName = location.pathname.replace("/", "");
  const [open, setOpen] = useState(false);
  let textColor = "white";

  if (transparentSidenav || (whiteSidenav && !darkMode)) {
    textColor = "dark";
  } else if (whiteSidenav && darkMode) {
    textColor = "inherit";
  }

  const closeSidenav = () => setMiniSidenav(dispatch, true);
  const profileScore = useSelector(
    (state) => state.auth?.profileScore,
    shallowEqual
  );
  useEffect(() => {
    // A function that sets the mini state of the sidenav.
    function handleMiniSidenav() {
      setMiniSidenav(dispatch, window.innerWidth < 1200);
      setTransparentSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : transparentSidenav
      );
      setWhiteSidenav(
        dispatch,
        window.innerWidth < 1200 ? false : whiteSidenav
      );
    }

    /** 
     The event listener that"s calling the handleMiniSidenav function when resizing the window.
    */
    window.addEventListener("resize", handleMiniSidenav);

    // Call the handleMiniSidenav function to set the state with the initial value.
    handleMiniSidenav();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleMiniSidenav);
  }, [dispatch, location]);

  function Progress({ color, value }) {
    const onHandleClick = () => {
      setOpen(true);
    };
    return (
      <MDBox
        display="flex"
        flexDirection="column"
        alignItems="left"
        backgroundColor="#315bc2"
        sx={{
          backgroundColor: "white",
          height: "3rem",
          width: "10rem",
        }}
        onClick={onHandleClick}
      >
        <MDBox ml={0.5} width="9rem">
          <MDTypography variant="caption" color="white" fontWeight="medium">
            Account Activation {profileScore}%
            <IconButton
              size="small"
              aria-label="edit"
              color="inherit"
              onClick={onHandleClick}
            >
              <ChevronRightIcon fontSize="small" />
            </IconButton>
          </MDTypography>
        </MDBox>

        <MDBox ml={0.5} width="9rem">
          <MDProgress
            variant="gradient"
            color={
              profileScore < 50
                ? "error"
                : profileScore < 70
                ? "info"
                : "success"
            }
            value={profileScore}
          />
        </MDBox>
      </MDBox>
    );
  }
  // Render all the routes from the routes.js (All the visible items on the Sidenav)
  const renderRoutes = routes.map(
    ({ type, name, icon, title, noCollapse, key, href, route }) => {
      let returnValue;
      if (type === "collapse") {
        returnValue = href ? (
          <Link
            href={href}
            key={key}
            target="_blank"
            rel="noreferrer"
            sx={{ textDecoration: "none" }}
          >
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
              noCollapse={noCollapse}
            />
          </Link>
        ) : (
          <NavLink key={key} to={route}>
            <SidenavCollapse
              name={name}
              icon={icon}
              active={key === collapseName}
            />
          </NavLink>
        );
      } else if (type === "title") {
        returnValue = (
          <MDTypography
            key={key}
            color={textColor}
            display="block"
            variant="caption"
            fontWeight="bold"
            textTransform="uppercase"
            pl={3}
            mt={2}
            mb={1}
            ml={1}
          >
            {title}
          </MDTypography>
        );
      } else if (type === "divider") {
        returnValue = (
          <Divider
            key={key}
            light={
              (!darkMode && !whiteSidenav && !transparentSidenav) ||
              (darkMode && !transparentSidenav && whiteSidenav)
            }
          />
        );
      }

      return returnValue;
    }
  );

  return (
    <SidenavRoot
      {...rest}
      variant="permanent"
      ownerState={{ transparentSidenav, whiteSidenav, miniSidenav, darkMode }}
    >
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
            <MDTypography variant="button" color="text" fontWeight="regular">
              Your Account activation is incomplete Do you want to complete
              Account Activation now ?
              <MDButton
                color="primary"
                variant="text"
                onClick={() => {
                  setOpen(false);
                  navigate("/profile");
                }}
              >
                Click Here To Complete the Account Activation
              </MDButton>
            </MDTypography>
          </MDBox>
        </DialogTitle>
      </Dialog>
      <MDBox pt={3} pb={1} px={4} textAlign="center">
        <MDBox
          display={{ xs: "block", xl: "none" }}
          position="absolute"
          top={0}
          right={0}
          p={1.625}
          onClick={closeSidenav}
          sx={{ cursor: "pointer" }}
        >
          <MDTypography variant="h6" color="secondary">
            <Icon sx={{ fontWeight: "bold" }}>close</Icon>
          </MDTypography>
        </MDBox>
        <MDBox component={NavLink} to="/" display="flex" alignItems="center">
          {brand && (
            <MDBox
              component="img"
              src={logo}
              alt="Brand"
              height="auto"
              width="12rem"
            />
          )}
          <MDBox
            width={!brandName && "100%"}
            sx={(theme) => sidenavLogoLabel(theme, { miniSidenav })}
          />
        </MDBox>
        <MDBox
          component={NavLink}
          to="/"
          display="flex"
          alignItems="center"
          sx={{ backgroundColor: "primary" }}
        >
          <MDBox width="100%">
            <Progress color="info" value={60} />
          </MDBox>
        </MDBox>
      </MDBox>
      <Divider
        light={
          (!darkMode && !whiteSidenav && !transparentSidenav) ||
          (darkMode && !transparentSidenav && whiteSidenav)
        }
      />
      <List>{renderRoutes}</List>
    </SidenavRoot>
  );
}

// Setting default values for the props of Sidenav
Sidenav.defaultProps = {
  color: "info",
  brand: "",
};

// Typechecking props for the Sidenav
Sidenav.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
  ]),
  brand: PropTypes.string,
  brandName: PropTypes.string.isRequired,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Sidenav;
