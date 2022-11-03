import Grid from '@mui/material/Grid';
import {Divider, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog, Button, Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, LinkProps } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar/Navbar'
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import MuiDialog from '../../components/DialogueBox/Confirmation'


const PersonalWebsiteEdit = () => {



    const viewAllThemes = (index) => {
      MuiDialog();
    }

    const changeTheme = (index) => {
     //MuiDialog();
    }

    const [open, setOpen] = useState(false)

    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    //use this once the id comes
    let navigate = useNavigate();
    const routeChange = () => { 
        let path = `/personalwebsiteview/`; 
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
         //should i copy the above? need to make get_personalWebsite in db functions 
        }
      
        fetchData();
     
        return;
      }, []);

      const submit = async (e) => {
        e.preventDefault();
        console.log(experiences);
        console.log(educations);
        // SEND EXPERIENCES AND EDUCATIONS TO SERVER
        const data = {
          user_id: localStorage.getItem('user_id'),
          personalWebsite: personalWebsite,
        }
        try {
          await axios
            .post("http://localhost:5000/profile/add", data)
            .then((res) => {
              console.log(res.data);
            });
        } catch (error) {
          console.log("oops");
        }
        // RETRIEVE EXPERIENCES
        try {
          const { data: res } = await axios.post("http://localhost:5000/profile/get_personalWebsite", data);
          console.log(data);
          console.log(res);
          // data.map((i)=> {console.log("i : ", i)});
        } catch (error) {
          console.log(error);
          console.log("oops");
        }
    
        routeChange();
      }

      

    const styles = {
      circlePink: {
        display: 'inline-block',
        width: '50px',
        height: '50px',
        background:'linear-gradient(to right bottom, #ffafcc, #430089)',
        borderRadius: 50,
        margin:'10px',
        //border: '3px solid black',
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
      <Grid mx ={35}>
      <Navbar />

     <Box my={10}>
    </Box>
    <Typography gutterBottom variant="h4">
        Chosen Theme: 
    </Typography>
    <div style={styles.circlePink} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "pink"})} >
    </div>
    <div style={styles.circlePurple} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "purple"})}>
    </div>
    <div style={styles.circleBlue} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "blue"})}>
    </div>
    <Box my={1}>
    </Box>
      <MuiDialog></MuiDialog>
    <Box my={10}>
    </Box>
    <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Profile
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showProfile: !personalWebsite.showProfile})} startIcon={<VisibilityIcon />}> </Button>
      </Grid>
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
        </Typography>  
        </Grid>: null
      

      }
      </div>
      <Box my={2}>
       </Box>

       <Divider></Divider>
       <Box my={10}>
      </Box>
      <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Experiences
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showExperiences: !personalWebsite.showExperiences})}  startIcon={<VisibilityIcon />}> </Button>
      </Grid>
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
      }
      </div>
      : null
      

      }
      </div>


       <Box my={10}>
      </Box>

      <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Skills
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showSkills: !personalWebsite.showSkills})}  startIcon={<VisibilityIcon />}> </Button>
      </Grid>
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


    

     <Box my={10}>
    </Box>

    
    <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Education
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showEducation: !personalWebsite.showEducation})} startIcon={<VisibilityIcon />}> </Button>
      </Grid>
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


      <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Projects
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showProjects: !personalWebsite.showProjects})} startIcon={<VisibilityIcon />}> </Button>
      </Grid>
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

    <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Links
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showLinks: !personalWebsite.showLinks})}  startIcon={<VisibilityIcon />}> </Button>
      </Grid>
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


      <Button onClick={submit} variant="outlined" startIcon={<SaveOutlinedIcon /> } >
        Save
      </Button>

    </Grid>
    
    )
}

export default PersonalWebsiteEdit
