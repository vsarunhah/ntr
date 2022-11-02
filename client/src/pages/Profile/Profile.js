import Grid from '@mui/material/Grid';
import {Button, Box, Typography, CardContent, Card} from '@mui/material';
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
      <Grid>
      <Navbar />
    <Grid container mx ={35}>
     <Grid item xs={6}>
     <Box my={10}>
    </Box>
    <Typography gutterBottom variant="h5">
        Profile
      </Typography>

        <Typography  variant="body1" color="textSecondary">
        First Name: {profile.first_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Last Name: {profile.last_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Email: {profile.profileEmail}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Phone: {profile.phone}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Address Line 1: {profile.address_line}
       </Typography>
       <Typography variant="body1" color="textSecondary">
        City: {profile.city}
       </Typography>
       <Typography variant="body1" color="textSecondary">
        State: {profile.state}
       </Typography>
       <Typography variant="body1" color="textSecondary">
        Postal Code: {profile.postal_code}
       </Typography>
       <Box my={10}>
      </Box>
       <Typography gutterBottom variant="h5">
        Experiences
      </Typography>

      {experiences.map(experience => (
          <div key={experience.index}>
        <br></br>
        <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="textSecondary">
        Employer Name: {experience.company_name}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       Position: {experience.title}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       Location: {experience.location}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       startDate: {experience.start_date}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       endDate: {experience.end_date}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       description: {experience.description}
       </Typography> 
        </Grid>
        </div>
        ))
      }


       <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Skills
      </Typography>
      {skills.map(skill => (
          <div key={skill.index}>
                <br></br>
      <Typography variant="body1" color="textSecondary">
         {skill.skill}
       </Typography>  
       </div>
        ))
      }


       </Grid>

    

     <Grid item xs={6}>
     <Box my={10} mx={30}>
    </Box>

    
    <Typography gutterBottom variant="h5">
        Education
      </Typography>
      {educations.map(education => (
          <div key={education.index}>
                <br></br>
      <Typography  variant="body1" color="textSecondary">
      Insitute Name: {education.university}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Degree: {education.degree}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Major: {education.major}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Minor: {education.minor}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       GPA: {education.gpa}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       Start date: {education.start_date}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       End date: {education.end_date}
       </Typography>
       </div>
       ))
     }

      <Box my={10}>
      </Box>


      <Typography gutterBottom variant="h5">
        Projects
      </Typography>
      {projects.map(project => (
          <div key={project.index}>
                <br></br>
      <Typography  variant="body1" color="textSecondary">
        Project Name: {project.name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Start date: {project.start_date}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
        End date: {project.end_date}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
        Description: {project.description}
       </Typography>  
       </div>
       ))
     }

     <Box my={10}>
      </Box>

      {/* <CardContent className="card" style={styles.card}>
        <Card> */}

      <Typography gutterBottom variant="h5">
        Links
      </Typography>
      {links.map(link => (
          <div key={link.index}>
          <br></br>
      <Typography variant="body1" color="textSecondary">
        {link.link}
       </Typography>  

       </div>
       ))
     }

       {/* </Card>
      </CardContent>      */}

        <Box my={10}>
      </Box>


      <Button onClick={routeChange} variant="outlined" startIcon={<EditOutlinedIcon /> } >
        Edit
      </Button>
     </Grid>
    </Grid>
    </Grid>
    )
}

export default Profile