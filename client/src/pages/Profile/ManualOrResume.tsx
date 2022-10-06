import React from 'react'
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

const ManualOrResume = () => {
    let navigate = useNavigate(); 

    const routeChange = () => { 
        let path = `/profile`; 
        console.log("sent : "+path);
        navigate(path);
      }

    return (
    
    <Grid container  mx={30} my={30}>
        <Typography gutterBottom variant="h5">
        Would you like to manully fill out your profile or upload from resume?
      </Typography>
    <Grid container>
    <Grid item xs={6}>
     <Button onClick={routeChange}  variant="contained" color="primary" >Manually </Button>
     </Grid>
    <Grid item xs={6}>
     <Button variant="contained" color="primary" >Resume </Button>
    </Grid>
    </Grid>
    </Grid>
        

    )
}

export default ManualOrResume