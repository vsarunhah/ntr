import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { mainNavbarItems } from './consts/navbarListItems';
import { navbarStyles } from './styles';
import { useNavigate } from "react-router-dom";
import logo from "../../images/ntrlogoinverted.png";
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { Box } from '@mui/material';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
      console.log("logout");
      // window.open("http://localhost:5000/auth/logout", "_self");
      // localStorage.removeItem("token");
      // localStorage.removeItem("user_id");
      // window.open("http://localhost:5000/auth/logout", "_self");
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      console.log("logged out");
      window.location.href = "/login";
    };

    return (
        <Drawer
          sx={navbarStyles.drawer}
          variant="permanent"
          anchor="left"
      >
        <img src={logo} 
              alt="ntr logo"
              />
        <Toolbar />
        <Divider />
        <List>
          {mainNavbarItems.map((item, index) => (
            <ListItem
                button
                key={item.id}
                onClick={() => navigate(item.route)}
            >
              <ListItemIcon
                sx={navbarStyles.icons}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                sx={navbarStyles.text}
                primary={item.label}
              />
              <Box my={3}></Box>
            </ListItem>
            
          ))}
          <ListItem button onClick={handleLogout}>
          <ListItemIcon
                sx={navbarStyles.icons}
              >
               < ExitToAppOutlinedIcon></ExitToAppOutlinedIcon>
              </ListItemIcon>
          <ListItemText
                sx={navbarStyles.text}
                primary="LogOut"
              />
          </ListItem>
        </List>
      </Drawer>
    );
};

export default Navbar