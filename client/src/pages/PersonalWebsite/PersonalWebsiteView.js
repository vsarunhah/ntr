import Grid from '@mui/material/Grid';
import {Card, Divider, Button, Box, Typography,CardContent } from '@mui/material';
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
import axios from 'axios';
import MuiDialog from '../../components/DialogueBox/Confirmation'
const PersonalWebsiteEdit = () => {


    const openInNewTab = url => {
        window.open('/personalwebsite/', '_blank', 'noopener,noreferrer');
      };
    //use this once the id comes
    let navigate = useNavigate();
    const routeChange = () => { 
        let path = `/personalwebsiteedit/`; 
        navigate(path);
      }

      const [personalWebsite, setPersonalWebsite] = useState({
        showProfile: true,
        showEducation: true,
        showExperiences: true,
        showProjects: true,
        showSkills: true,
        showLinks: true,
        theme: "pink",
        user_id : localStorage.getItem("user_id"),
      });
    
      const [profile, setProfile] = useState({
        first_name: "",
        last_name: "",
        profileEmail: "",
        phone: "",
        address: "",
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
           address: profile.address,
           links: links,
           skills: skills,
           personalWebsite: personalWebsite,
         }
         await axios.post("http://localhost:5000/profile/get_profile", data).then((res) => {
           console.log("inside profile post req");
           console.log(res.data);
           const user_profile = {
             first_name: res.data.firstName,
             last_name: res.data.lastName,
             profileEmail: res.data.profileEmail,
             phone: res.data.phoneNumber,
             address: res.data.address,
             user_id : localStorage.getItem("user_id"),
           };
           console.log("user profile : ", user_profile);
           setProfile(user_profile);
           setLinks(res.data.links);
           setSkills(res.data.skills);
         });
          await axios.post("http://localhost:5000/profile/get_experiences", data).then((res) => {
           console.log("inside experiences post req");
           console.log(res.data);
           setExperiences(res.data);
         });
         await axios.post("http://localhost:5000/profile/get_educations", data).then((res) => {
           console.log("inside educations post req");
           console.log(res.data);
           setEducations(res.data);
         });
         await axios.post("http://localhost:5000/profile/get_projects", data).then((res) => {
           console.log("inside projects post req");
           console.log(res.data);
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

    
    const [style, setStyle] = useState({display: 'none'});

    const styles = {
      circlePink: {
        display: 'inline-block',
        width: '50px',
        height: '50px',
        //backgroundColor: '#ffafcc',
        background:'linear-gradient(to right bottom, #ffafcc, #430089)',
        borderRadius: 50,
        margin:'10px',
        border: personalWebsite.theme == "pink" ? '3px solid black': '1px solid white'
      },


      circlePurple: {
        display: 'inline-block',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(to right bottom, #5390d9, #7400b8)',
        borderRadius: 50,
        margin:'10px',
        border: personalWebsite.theme == "purple" ? '3px solid black': '1px solid white'
      },

      circleBlue: {
        display: 'inline-block',
        width: '50px',
        height: '50px',
        background: 'linear-gradient(to right bottom, #000000, #a2d2ff)',
        borderRadius: 50,
        margin:'10px',
        border: personalWebsite.theme == "blue" ? '3px solid black': '1px solid white'
      },

      wrapper: {
        border: '1px solid blue',
      }

    };

    return (
      <Grid mx={35}>
      <Navbar />
     <Box my={10}>
    </Box>

    <Button style={{margin:'10px'}} onClick={routeChange} variant="outlined" startIcon={<EditOutlinedIcon /> } >
        Edit
      </Button>

      <Button onClick={openInNewTab} variant="outlined" startIcon={<CoPresentRoundedIcon /> } >
        View Website
      </Button>

      <Box my={10}>
    </Box>
    <Typography gutterBottom variant="h4">
        Chosen Theme: 
    </Typography>
    <div style={styles.circlePink}>
    </div>
    <div style={styles.circlePurple}>
    </div>
    <div style={styles.circleBlue}>
    </div>
    <Box my={2}>
       </Box>
    <Divider></Divider>
    <Box my={10}>
    </Box>
    <Typography gutterBottom variant="h4">
        Profile
      </Typography>
      <div>
      {
        personalWebsite.showProfile ? <Grid><Typography  variant="body1" color="textSecondary">
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
       <Box fontWeight='fontWeightBold' display='inline'>Address:</Box>  {profile.address}
       </Typography></Grid>:null
       }
       </div>
       <Box my={2}>
       </Box>

       <Divider></Divider>

       <Box my={10}>
      </Box>

       <Typography gutterBottom variant="h4">
        Experiences
      </Typography>
      <div>
      {
       

       personalWebsite.showExperiences ?
       <div>
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
      }</div>
      : null
      

      }
      </div>



       <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h4">
        Skills
      </Typography>
      <div>
      {
        personalWebsite.showSkills ?
        <div>
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
      </div>
      : null
      

      }
      </div>
      <Box my={2}>
      </Box>
      <Divider></Divider>



    
     <Box my={10} mx={30}>
    </Box>

    
    <Typography gutterBottom variant="h4">
        Education
      </Typography>

      <div>
      {
       

       personalWebsite.showEducation ?
       <div>
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
     }</div>
     : null
     

     }
     </div>

      <Box my={10}>
      </Box>


      <Typography gutterBottom variant="h4">
        Projects
      </Typography>

      <div>
      {
       

       personalWebsite.showProjects ?
       <div>
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
     }</div>
     : null
     

     }
     </div>

     <Box my={10}>
      </Box>


      <Typography gutterBottom variant="h4">
        Links
      </Typography>
      <div>
      {
       

       personalWebsite.showLinks ?
       <div>
        <div class="container" style={{display: "flex"}}>
      {links.map(link => (
          <div key={link.index}>
          <br></br>
      <Typography variant="body1" color="textSecondary">
      <Box fontWeight='fontWeightBold' display='inline'> {link.link} | </Box>
       </Typography>  

       </div>
       ))
     }</div>
     </div>
     : null
     

     }
     </div>
     <Box my={2}>
       </Box>
        <Divider></Divider>


        <Box my={10}>
      </Box>


      
    </Grid>
    
    )
}

export default PersonalWebsiteEdit
