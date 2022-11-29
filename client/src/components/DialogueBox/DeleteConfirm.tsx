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
  import { v4 as uuidv4 } from 'uuid';
  
const DeleteDialog = () => {
    console.log("in delete dialog")
    const [open, setOpen] = useState(true);
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
     
    const DeleteWebsite = async () => {
        const data = {
          user_id: localStorage.getItem("user_id"),
        };
        await axios.post("http://localhost:5000/profile/get_profile", data).then(async (res) => {   
          setLinks(res.data.links);
          setSkills(res.data.skills);
          setExperiences(res.data.experiences);
          setProjects(res.data.projects);
          setEducations(res.data.educations);
          const websiteDetails = {
            experiences: res.data.experiences,
            educations: res.data.educations,
            projects: res.data.projects,
            links: res.data.links,
            skills: res.data.skills,
          };
          // SEND EXPERIENCES AND EDUCATIONS TO SERVER
          const data = {
            user_id: localStorage.getItem('user_id'),
            websiteDetails: websiteDetails,
          }
          try {
            await axios
              .post("http://localhost:5000/profile/add", data)
              .then((res) => {
                //console.log(res.data);
              });
          } catch (error) {
            console.log("oops");
          }
        });
      };
    return (
        <React.Fragment>
        <Grid>
          <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby='dialog-title'
            aria-describedby='dialog-description'>
            <DialogTitle id='dialog-title'>Delete Website</DialogTitle>
            <DialogContent>
              <DialogContentText id='dialog-description'>
                Are you sure you want to delete all changes made to the website?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button autoFocus onClick={DeleteWebsite} >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        </React.Fragment>
      )
}; export default DeleteDialog;