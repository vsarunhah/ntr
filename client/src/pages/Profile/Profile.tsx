import Grid from '@mui/material/Grid';
import {Button, Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, LinkProps } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

const id = "6336412aab0f0f35a5c36faf";
const Profile = () => {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });


  const [links, setLinks] = useState([
    { id: uuidv4(), link: "" },
  ]);

 
   useEffect(() => {
     async function fetchData() {
       const response = await fetch(`http://localhost:5000/dbprofile/${id}`);
   
       if (!response.ok) {
         const message = `An error has occurred: ${response.statusText}`;
         window.alert(message);
         return;
       }
   
       const profile = await response.json();
       if (!profile) {
         window.alert(`Record with id ${id} not found`);
         return;
       }
   
       setForm(profile);
       //setLinks(profile);
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

      <Typography  variant="body1" color="textSecondary">
      Employer Name: Employer Name
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Position: Position
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Location: Location
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Start date: Start date
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       End date: End date
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       Description: Description
       </Typography>

       <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Skills
      </Typography>

      <Typography variant="body1" color="textSecondary">
        Skills: Java, C, C++, C#
       </Typography>  


       </Grid>

    

     <Grid item xs={6}>
     <Box my={10} mx={30}>
    </Box>
    <Typography gutterBottom variant="h5">
        Education
      </Typography>

      <Typography  variant="body1" color="textSecondary">
      Insitute Name: Insitute Name
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Degree: Degree
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Major: Major
       </Typography>

       <Typography variant="body1" color="textSecondary">
       Minor: Minor
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       GPA: GPA
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
       Start date: Start date
       </Typography>

       <Typography variant="body1" color="textSecondary">
       End date: End date
       </Typography>

      <Box my={10}>
      </Box>


      <Typography gutterBottom variant="h5">
        Projects
      </Typography>
      
      <Typography  variant="body1" color="textSecondary">
        Project Name: Project Name
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Start date: Start date
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
        End date: End date
       </Typography>
       
       <Typography variant="body1" color="textSecondary">
        Description: Description
       </Typography>  


     <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Links
      </Typography>

      <Typography variant="body1" color="textSecondary">
        Links: Java, C, C++, C#
       </Typography>  
       {links.map(link => (
          <div key={link.id}>     
        <Grid item xs={12} sm={6}>
        <Typography variant="body1" color="textSecondary">
          Link: {link.link}
       </Typography> 
        </Grid>
            </div> ))}
      

        <Box my={10}>
      </Box>

      <Button onClick={routeChange} variant="outlined" startIcon={<EditOutlinedIcon /> } >
        Edit
      </Button>
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


