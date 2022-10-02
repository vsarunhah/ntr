import React from 'react'
import Grid from '@mui/material/Grid';
import {Button, Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, LinkProps } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Profile = () => {

    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = '/form'; 
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
        First Name: first_name
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Last Name: last_name
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Email: email
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Phone: phone
       </Typography>

       <Typography variant="body1" color="textSecondary">
        Address: address
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

        <Box my={5}>
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


    // </Grid>
    )
}

export default Profile