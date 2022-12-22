import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { UserType } from "../domain/models/userType";
import { LocalJsonStorage } from "../infra/http/local-json-storage";
import { Private } from "../domain/Constants";
import { useNavigate } from "react-router-dom";
import { PageRoutes } from "../routes";
import Endpoints from "../domain/endpoints";
import AppRoutes from "../App";
import pageRoutes from "../routes/pageRoutes";
import { orange } from "@mui/material/colors";
import DarkModeSwitch from "./DarkModeSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../store/Store";

const pages = [];
const settings = ["Profile", "Account", "Dashboard", "Logout"];
export type Props = {
  userInfo: UserType;
};
const NavBar: React.FC<Props> = ({ userInfo }) => {
  const user = LocalJsonStorage.getInstance();

  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const mode = useSelector<RootState, boolean | null>(
    (state) => state.app.darkMode
  );
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === "Logout") {
      user.remove(Private.USERINFO);
      user.remove(Private.AUTH);
      navigate(pageRoutes[0].path);
    }
    setAnchorElUser(null);
  };

  React.useEffect(() => {}, [userInfo]);
  return (
    <AppBar
      sx={{
        color: "primary.main",
        backgroundColor: !mode ? "white" : "black",
        paddingLeft: "5rem",
        paddingRight: "5rem",
      }}
      position="static"
      elevation={5}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img
            src="https://www.goapptiv.com/images/goapptivicon.jpg"
            width={130}
            style={{ marginRight: "2rem" }}
          ></img>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
            {/* <Menu
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
              {pages?.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: "primary.main",
                  fontWeight: "bold",
                  display: "block",
                }}
              >
                {page}
              </Button>
            ))} */}
          </Box>
          <DarkModeSwitch />

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={userInfo?.name} src={userInfo?.profilePic} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <Box
                paddingLeft={1}
                paddingRight={1}
                gap={1}
                alignSelf="center"
                alignItems="center"
                justifyContent="center"
                flexDirection="row"
                display="flex"
              >
                <Avatar src={userInfo?.profilePic}></Avatar>
                <div>
                  <Typography fontWeight="bold">{userInfo?.name}</Typography>
                  <Typography color="gray" fontFamily="sans-serif">
                    {userInfo?.role.roleId === 1 && "Technical Department"}
                  </Typography>
                </div>
              </Box>
              <hr />
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={(event) => handleCloseUserMenu(setting)}
                >
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
