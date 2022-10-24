
import Grid from '@mui/material/Grid';
import {IconButton, FormGroup, Box, MenuItem, InputLabel, Select, FormControl, Card, TextField, Typography, CardContent, Button, FormControlLabel, Checkbox } from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from "react-router-dom";
//import { useNavigate } from "react-router";
//localStorage.setItem("user_id", "overallprofiletestid2");


export  default function Form() {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/profile`; 
    navigate(path);
  }
 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   email: "",
   phone: "",
   address: "",
   user_id : localStorage.getItem("user_id"),
   links : "",
   skills: "",
 });

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
const handleChangeExperience = (id, event) => {
  const newExperiences = experiences.map(i => {
    if(id === i.id) {
      i[event.target.name] = event.target.value;
    }
    return i;
  })
  setExperiences(newExperiences);
}


 // These methods will update the state properties.
 function updateForm(value) {
  console.log('I was triggered during updateForm'); 
  return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
   console.log('I was triggered during onSubmit');
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
   console.log("sending newperson: ", newPerson);
   await fetch("http://localhost:5000/dbprofile/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });

   const newExperience = {... experiences};
   console.log("sending newexp: ", newExperience);
   await fetch("http://localhost:5000/exp/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newExperience),
  })
  .catch(error => {
    window.alert(error);
    return;
  });
  const newProject = {... projects};
  //console.log("sending newexp: ", newProject);
  await fetch("http://localhost:5000/project/add", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(newProject),
 })
 .catch(error => {
   window.alert(error);
   return;
 });
  const newEducation = {... educations};
  console.log("sending neweducation: ", newEducation);
  await fetch("http://localhost:5000/education/add", {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
   },
   body: JSON.stringify(newEducation),
 })
 .catch(error => {
   window.alert(error);
   return;
 });
 
   setForm({ first_name: "",
   last_name: "",
   email: "",
   phone: "",
   address: "",
   user_id : "",
   links : "",
   skills: "",});

   setExperiences({
    id: uuidv4(),
    title: "", 
    company_name: "", 
    start_date: "", 
    end_date: "", 
    current_job: "",
    description: "",
    location: "",
    user_id: localStorage.getItem("user_id"), 
   });
   setProjects({
    id: uuidv4(),
    title: "", 
    company_name: "", 
    start_date: "", 
    end_date: "", 
    current_job: "",
    description: "",
    location: "",
    user_id: localStorage.getItem("user_id"), 
   });
   setEducations({ 
    id: uuidv4(), 
    university: "",
    degree: "",
    start_date: "",
    end_date: "",
    major: "",
    minor: "",
    gpa: "",
    other: "",
    user_id: localStorage.getItem("user_id"),
  });
   
   //navigate("/");
   routeChange();
 }
 
  return (
    <Grid>
      <Navbar />
    <Grid mx ={35}>
      
      <Box my={10}>
      </Box>
      
      <form onSubmit={onSubmit}>
      <Typography gutterBottom variant="h5">
        Profile
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your personal information.
      </Typography>
        <Grid container spacing={1}>
          <Grid xs={12} sm={6} item className="form-group">
            <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required  value={form.first_name}
           onChange={(e) => setForm({...form, first_name: e.target.value})}/>
          </Grid>
          <Grid xs={12} sm={6} item className="form-group">
            <TextField id ="last_name" className="form-control" placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth required value={form.last_name}
           onChange={(e) => setForm({...form, last_name: e.target.value})}/>
          </Grid>
          <Grid item xs={12} className="form-group">
            <TextField id ="email" className="form-control" type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required value={form.email}
           onChange={(e) => setForm({...form, email: e.target.value})}/>
          </Grid>
          <Grid item xs={12} className="form-group">
            <TextField id ="phone" className="form-control" type="number" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth required value={form.phone}
           onChange={(e) => setForm({...form, phone: e.target.value})}/>
          </Grid>
          <Grid item xs={12} className="form-group">
            <TextField id ="address" className="form-control" placeholder="Enter address" label="Address" variant="outlined" fullWidth required value={form.address}
           onChange={(e) => setForm({...form, address: e.target.value})}/>
          </Grid>
        </Grid>
        <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Education
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your education information.
      </Typography>

        <Grid container spacing={1}>
          <Grid xs={12} sm={6} item>
            <TextField placeholder="Purdue University" label="Insitute Name" variant="outlined" fullWidth required value={educations.university}
           onChange={(e) => setEducations({...educations, university: e.target.value})}/>
          </Grid>
          <Grid xs={12} sm={6} item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Degree</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Degree"
                required value={educations.degree}
                onChange={(e) => setEducations({...educations, degree: e.target.value})}
              >
                <MenuItem value={10}>Bachelors</MenuItem>
                <MenuItem value={20}>Masters</MenuItem>
                <MenuItem value={30}>PHD</MenuItem>
              </Select>
            </FormControl>                
            </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineering" label="Major" variant="outlined" fullWidth  required value={educations.major}
           onChange={(e) => setEducations({...educations, major: e.target.value})}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Art and Design Studio" label="Minor" variant="outlined" fullWidth required value={educations.minor}
           onChange={(e) => setEducations({...educations, minor: e.target.value})}/>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField type="number" placeholder="4.0" label="GPA" variant="outlined" fullWidth  required value={educations.gpa}
           onChange={(e) => setEducations({...educations, gpa: e.target.value})}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              type="date"
              required value={educations.start_date}
              onChange={(e) => setEducations({...educations, start_date: e.target.value})}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="End date"
              type="date"
              required value={educations.end_date}
              onChange={(e) => setEducations({...educations, end_date: e.target.value})}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
        </Grid>


      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Experiences
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your education information.
      </Typography>
        <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Google" 
              label="Employer Name" 
              variant="outlined" fullWidth
              name="company_name"
              value = {experiences.company_name}
              onChange= {(e) => setExperiences({...experiences, company_name: e.target.value})}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineer" 
              label="Position" 
              variant="outlined" fullWidth
              name="title"
              value = {experiences.title}
              onChange= {(e) => setExperiences({...experiences, title: e.target.value})}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="San Diego" 
              label="Location" 
              variant="outlined" fullWidth
              name="location"
              value={experiences.location}
              onChange={(e) => setExperiences({...experiences, location: e.target.value})}
            />
            </Grid>
            <FormGroup>
            <FormControlLabel control={<Checkbox />} label="I currently work here" value={experiences.current_job }/>
            </FormGroup>
            <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              name="start_date"
              value={experiences.start_date}
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setExperiences({...experiences, start_date: e.target.value})}
            />       
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="End date"
              name="end_date"
              value={experiences.end_date}
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setExperiences({...experiences, end_date: e.target.value})}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} placeholder="" label="Description" 
            variant="outlined" fullWidth
            name="description"
            value={experiences.description} 
            onChange={(e) => setExperiences({...experiences, description: e.target.value})}
            />
          </Grid>
            </Grid>

      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Projects
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your projects information.
      </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Chefly" label="Project Name" variant="outlined" fullWidth value = {projects.company_name}
              onChange= {(e) => setProjects({...projects, company_name: e.target.value})}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              type="date"
              value = {projects.start_date}
              onChange= {(e) => setProjects({...projects, start_date: e.target.value})}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="End date"
              type="date"
              value = {projects.end_date}
              onChange= {(e) => setProjects({...projects, end_date: e.target.value})}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} placeholder="" label="Description" variant="outlined" fullWidth  value = {projects.description}
              onChange= {(e) => setProjects({...projects, description: e.target.value})}/>
          </Grid>
        </Grid>



      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Skills
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your skills.
      </Typography>

        <Grid item xs={12} sm={6}>
          <TextField placeholder="Java" label="Skills" variant="outlined" fullWidth value = {form.skills}
              onChange= {(e) => setForm({...form, skills: e.target.value})}/>
        </Grid>


      <Box my={10}>
      </Box>

      <Typography gutterBottom variant="h5">
        Links
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in any links you would like to share.
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} >
          <TextField placeholder="linkedin" label="links" variant="outlined" fullWidth required value={form.links.push}
           onChange={(e) => setForm({...form, links: e.target.value})}/>
        </Grid>
        </Grid>
        
        <Box my={10}>
      </Box>
        <Grid item xs={12} sm={6}>
          <Button type="submit" variant="contained" color="primary">Submit </Button>
        </Grid>

      </form>

      

      <Box my={10}>
      </Box>

    </Grid>
    </Grid>
  )
}


