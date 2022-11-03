

import React, { Component, useState, useEffect } from "react";
import { Link, Grid, Button, Box, Typography, CardContent, Card, Divider} from '@mui/material';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


  const PersonalWebsite = () => {

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


    const stylesPink = {
      rectangle: {
        //display: 'inline-block',
        display: 'inline-block',
        width: '100%',
        height: '500px',
        //backgroundColor: '#ffafcc',
        //backgroundColor: 'linear-gradient(to bottom right, red, yellow)',
        background: 'linear-gradient(to right bottom, #ffafcc, #430089)',
        position: 'relative',
        textAlign:"center",
      },

    }

    const stylesBlue = {
      rectangle: {
        //display: 'inline-block',
        display: 'inline-block',
        width: '100%',
        height: '500px',
        //backgroundColor: '#ffafcc',
        //backgroundColor: 'linear-gradient(to bottom right, red, yellow)',
        background: 'linear-gradient(to right bottom, #000000, #a2d2ff)',
        position: 'relative',
        textAlign:"center",
      },
      
    }

    const stylesPurple = {
      rectangle: {
        //display: 'inline-block',
        display: 'inline-block',
        width: '100%',
        height: '500px',
        //backgroundColor: '#ffafcc',
        //backgroundColor: 'linear-gradient(to bottom right, red, yellow)',
        background: 'linear-gradient(to right bottom, #5390d9, #7400b8)',
        position: 'relative',
        textAlign:"center",
      },
      
    }

    const rectangleOutline = {
      rectangleOutline: {
        //display: 'inline-block',
        display: 'inline-block',
        width: '50%',
        height: '270px',
        //backgroundColor: '#ffafcc',
        //backgroundColor: 'linear-gradient(to bottom right, red, yellow)',
        position: 'relative',
        textAlign:"center",
        border: '2px solid white',
      },
    }
    
    //Setting styles based on user db
    var styles = stylesPink;
    if (personalWebsite.theme == "pink") {
      styles = stylesPink;
    } else if (personalWebsite.theme == "purple") {
      styles = stylesPurple;
    } else if (personalWebsite.theme == "blue") {
      styles = stylesBlue;
    }
    
    
    return (
    
    
    <Grid>

    <div style={styles.rectangle}>
    <Box my={15}>
    </Box>

    <div style={rectangleOutline.rectangleOutline}>

      <Typography gutterBottom variant="h1" color="#ffffff" style={{ fontWeight: 520}}>
        Hello!
      </Typography>
      <div>
      {
        personalWebsite.showProfile ? <Grid>
      <Typography gutterBottom variant="h5" color="#ffffff" >
        My name is <Box fontWeight='fontWeightBold' display='inline'>{profile.first_name} {profile.last_name}</Box>  and welcome to my page!
      </Typography>
      <Typography gutterBottom variant="body1" color="#ffffff" >
        {profile.profileEmail} | {profile.phone}
      </Typography>
      <Typography variant="body1" color="#ffffff" >
        {profile.address}
      </Typography></Grid>:null
      }
      </div>
      </div>

    </div>
    

     <Box my={10}>
    </Box>

    <Grid mx={10}>
    <div>
      {
       

       personalWebsite.showExperiences ?
       <div>

      <Typography gutterBottom variant="h3" >
        Experiences
      </Typography>
      

      {experiences.map(experience => (
          <div key={experience.index}>
        <br></br>
        {/* <Card style={styles.card}>
      <CardContent> */}
      <Grid maxWidth={700}> 
        <Grid item xs={12} sm={6}>
        <Typography variant="h5" color="textSecondary" textTransform='capitalize'>
        {experience.company_name}
       </Typography> 
       <Typography variant="h6" color="textSecondary" textTransform='uppercase'>
       {experience.title}
       </Typography> 
       <Typography variant="body1" color="textSecondary" textTransform='capitalize'>
       {experience.location}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       {experience.start_date} - {experience.end_date}
       </Typography> 
       <Box my={2}>
       </Box>
       <Typography variant="body1" color="textSecondary" >
       {experience.description}
       </Typography> 
        </Grid>
        {/* </CardContent>
        </Card> */}
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
      <div>
      {
        personalWebsite.showSkills ?
        <div>
      <Typography gutterBottom variant="h3">
        Skills
      </Typography>
      <div class="container" style={{display: "flex"}}>
      
      {skills.map(skill => (
          <div key={skill.index} >  
          <Typography variant="h6" color="textSecondary" textTransform='capitalize' style={{ fontWeight: 600, marginRight: '5px' }}>
        {skill.skill} | 
        </Typography>
       
       </div>
        ))
        
      }
      </div>
      </div>
      : null
      

      }
      </div>
      <Divider></Divider>
       




    


     <Box my={10} mx={30}>
    </Box>

    <div>
      {
       

       personalWebsite.showEducation ?
       <div>
    <Typography gutterBottom variant="h3">
        Education
      </Typography>
      {educations.map(education => (
          <div key={education.index}>
                <br></br>
      <Typography  variant="h5" color="textSecondary" textTransform='capitalize'>
      {education.university}
       </Typography>

       <Typography variant="h6" color="textSecondary" textTransform='capitalize'>
       {education.degree} | {education.major}
       </Typography>


       <Typography variant="h6" color="textSecondary" textTransform='capitalize'>
       Minor: {education.minor}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       {education.gpa}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       {education.start_date} - {education.end_date}
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

      <div>
      {
       

       personalWebsite.showProjects ?
       <div>
      <Typography gutterBottom variant="h3">
        Projects
      </Typography>
      {projects.map(project => (
          <div key={project.index}>
                <br></br>
      <Typography  variant="h5" color="textSecondary" textTransform='capitalize'>
        {project.name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Start date: {project.start_date} - {project.end_date}
       </Typography>
       <Typography variant="body1" color="textSecondary">
        Description: {project.description}
       </Typography>  
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

      {/* <CardContent className="card" style={styles.card}>
        <Card> */}

    <div>
      {
       

       personalWebsite.showLinks ?
       <div>

      <Typography gutterBottom variant="h3">
        Links
      </Typography>
      <div class="container" style={{display: "flex"}}>
      {links.map(link => (
          <div key={link.index}>
          <br></br>
      <Link href={link.link} variant="h6" color="textSecondary" style={{marginRight: '5px', color: "blue"}}>
        {link.link} | 
       </Link>  

       </div>
       ))
     }
     </div>
     </div>
     : null
     

     }
     </div>

       {/* </Card>
      </CardContent>      */}

        <Box my={10}>
      </Box>
    </Grid>
    </Grid>

          
    );
  }
 export default PersonalWebsite;


 