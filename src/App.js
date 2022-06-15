/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */
import createCache from "@emotion/cache";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import brandDark from "assets/images/logo-ct-dark.png";
// Images
import brandWhite from "assets/images/logo-ct.png";
// Material Dashboard 2 React themes
// Material Dashboard 2 React Dark Mode themes
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
// Material Dashboard 2 React routes
// Material Dashboard 2 React contexts
import {
  setMiniSidenav,
  setOpenConfigurator,
  setProfileSettings,
  useMaterialUIController,
} from "context";
// Material Dashboard 2 React example components
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
// react-router components
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import routes, { basicRoutes, companyRoutes } from "./routes";
// RTL plugins
import Configurator from "./lib/Configurator";
import themeDark from "./assets/theme-dark";
import theme from "./assets/theme";
import Sidenav from "./components/MDSidenav/index";
import MigoLogo from "./assets/images/logos/migobucks_brands.png";

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const token = localStorage.getItem("token");
  const routeList = routes.concat(companyRoutes);
  const {
    miniSidenav,
    direction,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    profileSettings,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    setOpenConfigurator(dispatch, !openConfigurator);

  const handleSetProfileSettings = () =>
    setProfileSettings(dispatch, !profileSettings);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {/* <Routes>{getRoutes(inlineRoutes)}</Routes> */}
      {layout === "dashboard" && token ? (
        <>
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="Migo Brand"
            logo={MigoLogo}
            routes={routeList}
            settingsRoutes={[]}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Sidenav
            color={sidenavColor}
            brand={
              (transparentSidenav && !darkMode) || whiteSidenav
                ? brandDark
                : brandWhite
            }
            brandName="Migo Brand"
            logo={MigoLogo}
            routes={routeList}
            settingsRoutes={companyRoutes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          <Routes>
            {getRoutes(routeList)}
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </>
      ) : (
        <Routes>
          {getRoutes(basicRoutes)}
          <Route path="*" element={<Navigate to="/authentication/sign-in" />} />
        </Routes>
      )}
    </ThemeProvider>
  );
}
