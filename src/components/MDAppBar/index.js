/* eslint-disable react/prop-types */
import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import borders from "assets/theme/base/borders";
import MDTypography from "components/MDTypography";
import { useNavigate } from "react-router-dom";

const { borderRadius } = borders;

function MDAppBar({ pages }) {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    navigate("/orders/active-orders");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Container sx={{ backgroundColor: "white" }}>
        <Toolbar
          disableGutters
          sx={{
            backgroundColor: "white !important",
            borderRadius: borderRadius.lg,
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", justifyContent: "flex-start", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", justifyContent: "flex-start" },
            }}
          >
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 0, color: "white", display: "block" }}
              >
                {page}
                <MDTypography
                  variant="caption"
                  color="button"
                  fontWeight="medium"
                  mx={1}
                >
                  {10}
                </MDTypography>{" "}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default MDAppBar;
