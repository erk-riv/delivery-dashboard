import React from 'react';
import logo from '../images/logo-black.svg';
import './Topbar.css';
import { Box, Typography, InputBase, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { white } from '@mui/material/colors';
function Topbar() {
    return (
      <Box display="flex"
           justifyContent="space-between" 
           p={2}
           sx={{borderBottom: 1}}>
        <img class="logo" src={logo} alt="logo" draggable="false"/>
        {/* <Box display="flex" borderRadius="3px">
          <InputBase sx={{ml: 2, flex: 1, color: "#ffffff"}} placeholder="Search" />
          <IconButton type="button" sx={{p: 1, color: "#ffffff"}}>
            <SearchIcon />
          </IconButton>
        </Box> */}

        {/*ICONS HERE*/}
        <Box display="flex">
          <InputBase sx={{ml: 2, flex: 1}} placeholder="Search" />
            <IconButton type="button" sx={{p: 1}}>
              <SearchIcon />
            </IconButton>
            <IconButton sx={{ml: 6}}>
              <NotificationsOutlinedIcon />
            </IconButton>
            <IconButton>
              <SettingsOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    );
  }
  
  export default Topbar;