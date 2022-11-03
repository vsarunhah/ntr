import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid
} from '@mui/material'
import React from 'react';
import { useState, useEffect } from 'react'
import axios from 'axios';

const MuiDialog = () => {
  const [open, setOpen] = useState(false);
  
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

  const submit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
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
    setOpen(false);


  }


  useEffect(() => {
    async function fetchData() {
     const data = {
       user_id: localStorage.getItem('user_id'),
       personalWebsite: personalWebsite,
     }
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

    circleGreen: {
      display: 'inline-block',
      width: '50px',
      height: '50px',
      background: 'linear-gradient(to right bottom, #80ffdb, #132a13)',
      borderRadius: 50,
      margin:'10px',
      border: personalWebsite.theme == "green" ? '3px solid black': '1px solid white'
    },

    circleRed: {
      display: 'inline-block',
      width: '50px',
      height: '50px',
      background: 'linear-gradient(to right bottom, #723c70, #b7094c)',
      borderRadius: 50,
      margin:'10px',
      border: personalWebsite.theme == "green" ? '3px solid black': '1px solid white'
    },

    wrapper: {
      border: '1px solid blue',
    }

  };

  return (
    <React.Fragment>
    <Grid>
      <Button onClick={() => setOpen(true)}>view all</Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'>
        <DialogTitle id='dialog-title'>Would you like to change your website theme?</DialogTitle>
        <DialogContent>
          <DialogContentText id='dialog-description'>
            <div style={styles.circlePink} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "pink"})} >
            </div>
            <div style={styles.circlePurple} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "purple"})}>
            </div>
            <div style={styles.circleBlue} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "blue"})}>
            </div>
            <div style={styles.circleGreen}>
            </div>
            <div style={styles.circleRed}>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button autoFocus onClick={submit} >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
    </React.Fragment>
  )
}; export default MuiDialog