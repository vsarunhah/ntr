import React, { useState, useEffect } from "react";
import Grid from '@mui/material/Grid';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import Navbar from '../../components/Navbar/Navbar'
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
const CreatePersonalWebsite  = () => {
    let navigate = useNavigate(); 
    const routeChange = async () => { 
      const data = {
           user_id: localStorage.getItem('user_id'),
      }
      await axios.post("http://localhost:5000/profile/get_profile", data).then(async (res) => {
        const websiteDetails = {
          experiences: res.data.experiences,
          educations: res.data.educations,
          projects: res.data.projects,
          links: res.data.links,
          skills: res.data.skills,
        };
        console.log(websiteDetails);
        const data1 = {
          user_id: localStorage.getItem('user_id'),
          websiteDetails: websiteDetails,
          hasWebsite: true,
        }
        try {
          await axios
            .post("http://localhost:5000/profile/add", data1)
            .then((res) => {
              console.log(res.data);
            });
        } catch (error) {
          console.log("oops");
        }
      });
      
        let path = `/personalwebsiteedit`;
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