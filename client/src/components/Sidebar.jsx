import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Toolbar from "@mui/material/Toolbar";
import { IronTwoTone } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Sidebar = (props) => {
  const drawerWidth = 240;
  const { window } = props;

  const list = [
    {
      text: "الموظفين",
      icon: <PeopleIcon />,
      to: "/",
    },
    {
      text: "كشف المرتبات",
      icon: <AssignmentIcon />,
      to: "/transactions",
    },
    {
      text: "دفتر الحضور",
      icon: <BusinessCenterIcon />,
      to: "/present-schedule",
    }
  ];

  let activeStyle = {
    color: "#1976d2",
  }

  const drawer = (
    <div>
      <Toolbar />
      <List>
        {list.map((item, index) => (
          <NavLink
            className='list-link'
            style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }
            to={item.to}
            key={item.text}
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon className="main-color">{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
        {/* <Toolbar />
        <Divider />
        <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon className="main-color"><AssignmentIcon /></ListItemIcon>
                <ListItemText primary="العربية" />
              </ListItemButton>
            </ListItem> */}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={props.open}
            onClose={props.close}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
