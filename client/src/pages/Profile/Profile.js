import Grid from '@mui/material/Grid';
import {Divider, Button, Box, Typography, CardContent, Card} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, LinkProps } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar/Navbar'
import { StylesContext } from '@mui/styles';
import axios from 'axios';

const styles = {
  card: {
    width: 300,
    height: 200,
    margin: "auto",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  content: {
    textAlign: "left",
  },
  divider: {
    margin: "40px",
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
};

const Profile = () => {

  const [personalWebsite, setPersonalWebsite] = useState({
    showProfile: true,
    showEducation: true,
    showExperiences: true,
    showProjects: true,
    showSkills: true,
    showLinks: true,
    theme: "Blue",
    user_id : localStorage.getItem("user_id"),
  });

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    profileEmail: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    postal_code: "",
    user_id : localStorage.getItem("user_id"),
  });

  const [experiences, setExperiences] = useState([
    {
      id: uuidv4(), 
      title: "", 
      company_name: "", 
      start_date: "", 
      end_date: "", 
      current_job: "",
      description: "",
      location: ""
    },
  ])

  const [educations, setEducations] = useState([
    {
      id: uuidv4(), 
      university: "",
      degree: "",
      start_date: "",
      end_date: "",
      major: "",
      minor: "",
      gpa: "",
      other: "",
    },
  ])

  const [projects, setProjects] = useState([
    {
      id: uuidv4(), 
      name: "", 
      start_date: "", 
      end_date: "",
      description: ""
    },
  ])

  const [skills, setSkills] = useState([
    {
      skill: "",
    }
  ])
  const [links, setLinks] = useState([
    {
      link: "",
    },
  ])
 
  useEffect(() => {
    async function fetchData() {
     const data = {
       user_id: localStorage.getItem('user_id'),
       experiences: experiences,
       educations: educations,
       projects: projects,
       firstName: profile.first_name,
       lastName: profile.last_name,
       profileEmail: profile.profileEmail,
       phoneNumber: profile.phone,
       address_line: profile.address_line,
       city: profile.city,
       state: profile.state,
       postal_code: profile.postal_code,
       last_modified: profile.last_modified,
       links: links,
       skills: skills
     }
     await axios.post("http://localhost:5000/profile/get_profile", data).then((res) => {
       console.log("inside profile post req");
       console.log(res.data);
       const user_profile = {
         first_name: res.data.firstName,
         last_name: res.data.lastName,
         profileEmail: res.data.profileEmail,
         phone: res.data.phoneNumber,
         address_line: res.data.address_line,
         city: res.data.city,
         state: res.data.state,
         postal_code: res.data.postal_code,
         user_id : localStorage.getItem("user_id"),
         last_modified: res.data.last_modified,
       };
       //console.log("user profile : ", user_profile);
       setProfile(user_profile);
       setLinks(res.data.links);
       setSkills(res.data.skills);
     });
      await axios.post("http://localhost:5000/profile/get_experiences", data).then((res) => {
       //console.log("inside experiences post req");
       //console.log(res.data);
       setExperiences(res.data);
     });
     await axios.post("http://localhost:5000/profile/get_educations", data).then((res) => {
       //console.log("inside educations post req");
       //console.log(res.data);
       setEducations(res.data);
     });
     await axios.post("http://localhost:5000/profile/get_projects", data).then((res) => {
       //console.log("inside projects post req");
       //console.log(res.data);
       setProjects(res.data);
     });
     await axios.post("http://localhost:5000/profile/get_personalWebsite", data).then((res) => {
      console.log("inside personal website post req");
      console.log(res.data);
      setPersonalWebsite(res.data);
    });
    }
  
    fetchData();
 
    return;
  }, []);
    let navigate = useNavigate(); 
    //use this once the id comes
    const routeChange = () => { 
        let path = `/editProfile/`; 
        console.log("sent : "+path);
        navigate(path);
      }

    return (
      <Grid mx={35}>
      <Navbar />

     <Box my={10}>
    </Box>
    <Typography gutterBottom variant="h4">
        Profile
      </Typography>

      <Typography  variant="body1" color="textSecondary">
        <Box fontWeight='fontWeightBold' display='inline'>First Name:</Box> {profile.first_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Last Name:</Box> {profile.last_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Email:</Box> {profile.profileEmail}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Phone:</Box>  {profile.phone}
       </Typography>
       

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Address Line 1: </Box>  {profile.address_line}
       </Typography>
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>City: </Box>  {profile.city}
       </Typography>
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>State: </Box>  {profile.state}
       </Typography>
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Postal Code: </Box>  {profile.postal_code}
       </Typography>
       <Box my={2}>
       </Box>

       <Divider></Divider>
       <Box my={10}>
      </Box>
       <Typography gutterBottom variant="h4">
        Experiences
      </Typography>

      {experiences.map(experience => (
          <div key={experience.index}>
        <br></br>
        <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="textSecondary">
        <Box fontWeight='fontWeightBold' display='inline'>Employer Name: </Box>{experience.company_name}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Position: </Box> {experience.title}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Location: </Box> {experience.location}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Start Date: </Box> {experience.start_date}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>End Date: </Box> {experience.end_date}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Description: </Box> {experience.description}
       </Typography> 
        </Grid>
        <Box my={2}>
       </Box>
        <Divider></Divider>
        </div>
        ))
      }


       <Box my={10}>
      </Box>

     <Box my={10}>
    </Box>

    
    <Typography gutterBottom variant="h4">
        Education
      </Typography>
      {educations.map(education => (
          <div key={education.index}>
                <br></br>
                <Typography  variant="body1" color="textSecondary">
      <Box fontWeight='fontWeightBold' display='inline'>Insitute Name: </Box>{education.university}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Degree: </Box> {education.degree}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Major: </Box> {education.major}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Minor: </Box> {education.minor}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>GPA: </Box>{education.gpa}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Start Date: </Box> {education.start_date}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>End Date: </Box> {education.end_date}
       </Typography>
       <Box my={2}>
       </Box>

       <Divider></Divider>
       </div>
       ))
     }

      <Box my={10}>
      </Box>


      <Typography gutterBottom variant="h4">
        Projects
      </Typography>
      {projects.map(project => (
          <div key={project.index}>
                <br></br>
      <Typography  variant="body1" color="textSecondary">
      <Box fontWeight='fontWeightBold' display='inline'>Project Name: </Box> {project.name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Start Date: </Box> {project.start_date}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>End Date: </Box> {project.end_date}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Description: </Box> {project.description}
       </Typography>  
       <Box my={2}>
       </Box>
        <Divider></Divider>  
       </div>
       ))
     }

     <Box my={10}>
      </Box>

      {/* <CardContent className="card" style={styles.card}>
        <Card> */}
      <Typography gutterBottom variant="h4">
        Skills
      </Typography>
      <div class="container" style={{display: "flex" , flexWrap: 'wrap'}}>
      {skills.map(skill => (
          <div key={skill.index}>
                <br></br>
      <Typography variant="body1" color="textSecondary">
         {skill.skill } &nbsp;
       </Typography>  
       </div>
        ))
      }</div>

    <Box my={2}>
       </Box>

       <Divider></Divider>
       <Box my={10}>
      </Box>
      <Typography gutterBottom variant="h4">
        Links
      </Typography>
      <div class="container" style={{display: "flex"}}>
      {links.map(link => (
          <div key={link.index}>
          <br></br>
      <Typography variant="body1" color="textSecondary"> 
      <Box fontWeight='fontWeightBold' display='inline'> { link.link} | </Box>
       </Typography>  

       </div>
       ))
     }</div>

      <Box my={2}>
       </Box>
        <Divider></Divider>

        <Box my={10}>
      </Box>


      <Button onClick={routeChange} variant="outlined" startIcon={<EditOutlinedIcon /> } >
        Edit
      </Button>
      <Box my={10}>
      </Box>
    </Grid>
    )
}

export default Profile