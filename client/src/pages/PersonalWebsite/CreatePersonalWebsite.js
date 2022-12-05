import React from 'react'
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'

const CreatePersonalWebsite  = () => {
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
        Create a personal website!
      </Typography>
    <Grid container>
    <Grid item xs={6}>
     <Button onClick={routeChange}  variant="contained" color="primary" >Let's go!</Button>
     </Grid>
    </Grid>
    </Grid>
    </Grid>
        

    )
}

export default CreatePersonalWebsite