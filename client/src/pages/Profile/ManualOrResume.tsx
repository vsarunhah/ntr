import React from 'react'
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'

const ManualOrResume = () => {
    let navigate = useNavigate(); 

    const routeChange = () => { 
        let path = `/form`; 
        console.log("sent : "+path);
        navigate(path);
      }
      const routeChangeResume = () => { 
        let path = `/ParseResume`; 
        console.log("sent : "+path);
        navigate(path);
      }
    return (
      
    <Grid>
      <Navbar />
    <Grid container  mx={30} my={30}>
        <Typography gutterBottom variant="h5">
        Would you like to manully fill out your profile or upload from resume?
      </Typography>
    <Grid container>
    <Grid item xs={6}>
     <Button onClick={routeChange}  variant="contained" color="primary" >Manually </Button>
     </Grid>
    <Grid item xs={6}>
     <Button onClick={routeChangeResume} variant="contained" color="primary" >Resume </Button>
    </Grid>
    </Grid>
    </Grid>
    </Grid>
        

    )
}

export default ManualOrResume