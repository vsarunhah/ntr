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
import VisibilityIcon from '@mui/icons-material/Visibility';


const PersonalWebsiteEdit = () => {

    const [showProfile, setShowProfile]=useState(true);

    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    //use this once the id comes
    const routeChange = () => { 
        let path = `/personalwebsite/`; 
        openInNewTab(path);
      }
    const [form, setForm] = useState({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      address: "",
      links : "",
      skills: "",
      user_id: localStorage.getItem("user_id"),
    });

    

    useEffect(() => {
      async function fetchData() {
        const response = await fetch("http://localhost:5000/dbprofile/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
          }),
        });
        const response2 = await fetch("http://localhost:5000/exp/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
          }),
        });
        const response3 = await fetch("http://localhost:5000/education/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
          }),
        });
        const response4 = await fetch("http://localhost:5000/project/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: localStorage.getItem("user_id"),
          }),
        });
        if (!response.ok) {
          const message = `An error has occurred: ${response.statusText}`;
          window.alert(message);
          return;
        }
        if (!response2.ok) {
          const message = `An error has occurred: ${response2.statusText}`;
          window.alert(message);
          return;
        }
        if (!response3.ok) {
          const message = `An error has occurred: ${response3.statusText}`;
          window.alert(message);
          return;
        }
        if (!response4.ok) {
          const message = `An error has occurred: ${response4.statusText}`;
          window.alert(message);
          return;
        }
        const profile = await response.json();
        if (!profile) {
          window.alert(`Please create a profile first`);
          window.location.href = "/form";
          return;
        }
        const experience = await response2.json();
        console.log(experience);
        if (!experience) {
          window.alert(`Record with id not found`);
          return;
        }
        const education = await response3.json();
        if (!education) {
        window.alert(`Record with id not found`);
        return;
      }
        const project = await response4.json();
        if (!project) {
        window.alert(`Record with id not found`);
        return;
      }
        setForm(profile);
        //setExperiences(experience);
        //setEducations(education);
        //setProjects(project);
      }
    
      fetchData();
    
      return;
    }, []);

    return (
      <Grid>
      <Navbar />
    <Grid container mx ={35}>
     <Grid item xs={6}>
     <Box my={10}>
    </Box>
    <Button onClick={routeChange} variant="outlined" startIcon={<CoPresentRoundedIcon /> } >
        View Website
      </Button>
      <Box my={10}>
      </Box>

      <Grid container direction="row" alignItems="center">
      <Typography gutterBottom variant="h5">
        Profile
      </Typography>
      <Button color="primary" onClick={()=>setShowProfile(!showProfile)} startIcon={<VisibilityIcon />}> </Button>
      </Grid>
      <div>
      {
       

          showProfile ? <Grid><Typography  variant="body1" color="textSecondary">
        First Name: {form.first_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Last Name: {form.last_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Email: {form.email}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Phone: {form.phone}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Address: {form.address}
        </Typography>  
        </Grid>: null
      

      }
      </div>


      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Education
      </Typography>

      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Experiences
      </Typography>

      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Projects
      </Typography>

      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Skills
      </Typography>

      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Links
      </Typography>
      <Button color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      <Button color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>

      <Box my={10}>
      </Box>

       
      <Button onClick={routeChange} variant="outlined" startIcon={<EditOutlinedIcon /> } >
        Edit Website
      </Button>
    
        <Box my={10}>
      </Box>

      
     </Grid>
    </Grid>
    </Grid>
    
    )
}

export default PersonalWebsiteEdit
