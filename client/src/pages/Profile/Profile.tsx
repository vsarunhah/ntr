import Grid from '@mui/material/Grid';
import {Button, Box, Typography, CardContent } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, LinkProps } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar/Navbar'

const Profile = () => {
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


  const [links, setLinks] = useState([
    { id: uuidv4(), link: "" },
  ]);

  const [experiences, setExperiences] = useState(
    { id: uuidv4(), 
      title: "", 
      company_name: "", 
      start_date: "", 
      end_date: "", 
      current_job: "",
      description: "",
      location: "",
      user_id: localStorage.getItem("user_id"),
    },
  );
  const [projects, setProjects] = useState(
    { id: uuidv4(), 
      title: "", 
      company_name: "", 
      start_date: "", 
      end_date: "", 
      current_job: "",
      description: "",
      location: "",
      user_id: localStorage.getItem("user_id"),
    },
  );
  const [educations, setEducations] = useState(
    { id: uuidv4(), 
      university: "",
      degree: "",
      start_date: "",
      end_date: "",
      major: "",
      minor: "",
      gpa: "",
      other: "",
      user_id: localStorage.getItem("user_id"),
    },
  );
 
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
       setExperiences(experience);
       setEducations(education);
       setProjects(project);
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
       <Box my={10}>
      </Box>
       <Typography gutterBottom variant="h5">
        Experiences
      </Typography>

      {/* {experiences.map(experience => (
          <div key={experience.index}> */}
        <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="textSecondary">
        Employer Name: {experiences.company_name}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       Position: {experiences.title}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       Location: {experiences.location}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       startDate: {experiences.start_date}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       endDate: {experiences.end_date}
       </Typography> 
       <Typography variant="body1" color="textSecondary">
       description: {experiences.description}
       </Typography> 
        </Grid>
        {/* </div>
        ))
      } */}


       <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Skills
      </Typography>

      <Typography variant="body1" color="textSecondary">
        Skills: {form.skills}
       </Typography>  


       </Grid>

    

     <Grid item xs={6}>
     <Box my={10} mx={30}>
    </Box>
    <Typography gutterBottom variant="h5">
        Education
      </Typography>

      <Typography  variant="body1" color="textSecondary">
      Insitute Name: {educations.university}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Degree: {educations.degree}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Major: {educations.major}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Minor: {educations.minor}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       GPA: {educations.gpa}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       Start date: {educations.start_date}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       End date: {educations.end_date}
       </Typography>

      <Box my={10}>
      </Box>


      <Typography gutterBottom variant="h5">
        Projects
      </Typography>
      
      <Typography  variant="body1" color="textSecondary">
        Project Name: {projects.company_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Start date: {projects.start_date}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
        End date: {projects.end_date}
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
        Description: {projects.description}
       </Typography>  


     <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Links
      </Typography>

      <Typography variant="body1" color="textSecondary">
        Links: {form.links}
       </Typography>       

        <Box my={10}>
      </Box>

      <Button onClick={routeChange} variant="outlined" startIcon={<EditOutlinedIcon /> } >
        Edit
      </Button>
     </Grid>
    </Grid>
    </Grid>


    
    // <Grid  mx ={35}>
    //   <Box my={10}>
    //   </Box>

    //   <Grid item xs={10}>
    //   <Typography gutterBottom variant="h5">
    //     Profile
    //   </Typography>

    //     <Typography  variant="body1" color="textSecondary">
    //     First Name: first_name
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //     Last Name: last_name
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //     Email: email
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //     Phone: phone
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //     Address: address
    //    </Typography>
    //    </Grid>

    //     <Box my={10}>
    //   </Box>

    //   <Grid item xs={12}>
    //   <Typography gutterBottom variant="h5">
    //     Education
    //   </Typography>

    //   <Typography  variant="body1" color="textSecondary">
    //   Insitute Name: Insitute Name
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //    Degree: Degree
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //    Major: Major
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //    Minor: Minor
    //    </Typography>
       
    //    <Typography variant="body1" color="textSecondary">
    //    GPA: GPA
    //    </Typography>
       
    //    <Typography variant="body1" color="textSecondary">
    //    Start date: Start date
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //    End date: End date
    //    </Typography>
    //    </ Grid>
    //   <Box my={10}>
    //   </Box>

    //   <Typography gutterBottom variant="h5">
    //     Experiences
    //   </Typography>

    //   <Typography  variant="body1" color="textSecondary">
    //   Employer Name: Employer Name
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //    Position: Position
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //    Location: Location
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //    Start date: Start date
    //    </Typography>
       
    //    <Typography variant="body1" color="textSecondary">
    //    End date: End date
    //    </Typography>
       
    //    <Typography variant="body1" color="textSecondary">
    //    Description: Description
    //    </Typography>



    //   <Box my={10}>
    //   </Box>

    //   <Typography gutterBottom variant="h5">
    //     Projects
    //   </Typography>
      
    //   <Typography  variant="body1" color="textSecondary">
    //     Project Name: Project Name
    //    </Typography>

    //    <Typography variant="body1" color="textSecondary">
    //     Start date: Start date
    //    </Typography>
       
    //    <Typography variant="body1" color="textSecondary">
    //     End date: End date
    //    </Typography>
       
    //    <Typography variant="body1" color="textSecondary">
    //     Description: Description
    //    </Typography>      
       




    //   <Box my={10}>
    //   </Box>

    //   <Typography gutterBottom variant="h5">
    //     Skills
    //   </Typography>

    //   <Typography variant="body1" color="textSecondary">
    //     Skills: Java, C, C++, C#
    //    </Typography>  


    //   <Box my={10}>
    //   </Box>

    //   <Typography gutterBottom variant="h5">
    //     Links
    //   </Typography>

    //   <Typography variant="body1" color="textSecondary">
    //     Links: Java, C, C++, C#
    //    </Typography>  

    //     <Box my={10}>
    //   </Box>


    //   <Button onClick={routeChange} variant="outlined" startIcon={<EditOutlinedIcon /> } >
    //     Edit
    //   </Button>

    //   <Box my={10}>
    //   </Box>
    
    )
}

export default Profile
