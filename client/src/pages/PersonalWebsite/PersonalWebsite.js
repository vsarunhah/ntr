import Grid from '@mui/material/Grid';
import {Button, Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, LinkProps } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar/Navbar'
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";





const PersonalWebsiteEdit = () => {

    

    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    //use this once the id comes
    const routeChange = () => { 
        let path = `/personalwebsite/`; 
        openInNewTab(path);
      }


    

    return (
      <Grid>
    <Grid container mx ={35}>
        <Typography>yo</Typography>
      
    </Grid>
    </Grid>
    
    )
}

export default PersonalWebsiteEdit
