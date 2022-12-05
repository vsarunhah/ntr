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
import { MailruIcon } from 'react-share';
import MoodRoundedIcon from '@mui/icons-material/MoodRounded';
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import axios from 'axios';
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
    const handleWebsite = async () => {
      const data = {
        user_id: localStorage.getItem('user_id'),
      }
      await axios.post("http://localhost:5000/profile/hasWebsite", data).then(async (res) => {
        console.log(res.data);
        if (res.data === true){
         navigate('/personalwebsiteview');
        }
        else{
          navigate('/createpersonalwebsite');
        }
      });
    };

    return (
        <Drawer
          sx={navbarStyles.drawer}
          variant="permanent"
          anchor="left"
      >
        <a href='/profile'>
        <img src={logo} 
              alt="ntr logo"
              style={{width:'210px'}}
              /></a>
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
          <ListItem button onClick={handleWebsite}>
            <ListItemIcon
                  sx={navbarStyles.icons}
                >
                < CoPresentRoundedIcon></CoPresentRoundedIcon>
                </ListItemIcon>
            <ListItemText
                  sx={navbarStyles.text}
                  primary="Website"
                />
          </ListItem>
          <Box my={3}></Box>
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