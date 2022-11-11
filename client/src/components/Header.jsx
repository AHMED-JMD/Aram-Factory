import React from "react";
import { useState, useContext } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { authContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ toggleFunc }) => {
  const menu = [
    {
      title: "Profile",
      icon: <AccountCircleIcon />,
    },
    {
      title: "Logout",
      icon: <ExitToAppIcon />,
    },
  ];

  const { auth, setAuth } = useContext(authContext);
  const Navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const HandleLogout = (e) => {
    setAuth({ isAuthenticated: false, user: {} });
    localStorage.removeItem("token");
    Navigate("/login");
  };
  return (
    <AppBar
      position="fixed"
      style={{ zIndex: "1300" }}
      xs={{
        color: "black",
      }}
      elevation={0}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleFunc}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <div className="logo">
          {/* <img
            src={require("../assets/images/logo.png")}
            width="45"
            alt="logo"
          /> */}
        </div>
        <Typography
          sx={{ flexGrow: 1 }}
          variant="h6"
          component="div"
          fontWeight="fontWeightMedium"
          mx={1}
        >
          <Link style={{ color: "#fff", textDecoration: "none" }} to="/">
            منصة التحكم
          </Link>
        </Typography>
        <Box sx={{ flexGrow: 0 }}>
          <MenuItem onClick={() => HandleLogout()}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            تسجيل الخروج
          </MenuItem>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
