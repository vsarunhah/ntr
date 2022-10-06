
import Grid from '@mui/material/Grid';
import {IconButton, FormGroup, Box, MenuItem, InputLabel, Select, FormControl, Card, TextField, Typography, CardContent, Button, FormControlLabel, Checkbox } from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

import MaxWidthDialog from '../../components/DialogueBox/Confirmation';
import { List } from '@material-ui/core';
//import { useNavigate } from "react-router";
localStorage.setItem("user_id", "idme");

if (localStorage.getItem("user_id") === null) {
  alert("Please login first");
  window.location.href = "/login";
}
export  default function Form() {
 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   email: "",
   phone: "",
   address: "",
   user_id : localStorage.getItem("user_id"),
   links : [],
 });

 const [experiences, setExperiences] = useState([
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
]);


const handleChangeExperience = (id, event) => {
  const newExperiences = experiences.map(i => {
    if(id === i.id) {
      i[event.target.name] = event.target.value;
    }
    return i;
  })
  setExperiences(newExperiences);
}

const handleAddExperiences = () => {
  setExperiences([...experiences, { 
    id: uuidv4(),
    title: "", 
    company_name: "", 
    start_date: "", 
    end_date: "", 
    current_job: "",
    description: "",
    location: "",
    user_id: localStorage.getItem("user_id"), }])
}

const handleRemoveExperiences = (id) => {
  const values  = [...experiences];
  values.splice(values.findIndex(value => value.id === id), 1);
  setExperiences(values);
}
 //const navigate = useNavigate();
 
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
   newPerson.links.push("linkedin.com");
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
 
   setForm({ first_name: "",
   last_name: "",
   email: "",
   phone: "",
   address: "",
   user_id : "",
   links: [],});
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
   
   //navigate("/");
 }
 
  return (
    
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
            <TextField placeholder="Purdue University" label="Insitute Name" variant="outlined" fullWidth  />
          </Grid>
          <Grid xs={12} sm={6} item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Degree</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Degree"
              >
                <MenuItem value={10}>Bachelors</MenuItem>
                <MenuItem value={20}>Masters</MenuItem>
                <MenuItem value={30}>PHD</MenuItem>
              </Select>
            </FormControl>                
            </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineering" label="Major" variant="outlined" fullWidth  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Art and Design Studio" label="Minor" variant="outlined" fullWidth  />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField type="number" placeholder="4.0" label="GPA" variant="outlined" fullWidth  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              type="date"
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

      {experiences.map(experience => (
          <div key={experience.id}>
            <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Google" 
              label="Employer Name" 
              variant="outlined" fullWidth
              name="company_name"
              value = {experience.company_name}
              onChange= {(e) => handleChangeExperience(experience.id, e)}
             // onChange={event => handleChangeInput(inputField.id, event)}
              //onChange={(e) => handleChangeInput({ firstName: e.target.value })}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineer" 
              label="Position" 
              variant="outlined" fullWidth
              name="lastName"
              value = {experience.title}
              onChange= {(e) => handleChangeExperience(experience.id, e)}
             //onChange={(e) => handleChangeInput({ lastName: e.target.value })}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="San Diego" 
              label="Location" 
              variant="outlined" fullWidth
              name="lastName"
              value={experience.location}
              onChange={event => handleChangeInput(experience.id, event)}
             //onChange={(e) => handleChangeInput({ lastName: e.target.value })}
            />
            </Grid>
            <FormGroup>
            <FormControlLabel control={<Checkbox />} label="I currently work here" value={experience.current_job }/>
            </FormGroup>
            <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              value={experience.start_date}
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChangeInput(experience.id, event)}
            />       
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="End date"
              value={experience.end_date}
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={event => handleChangeInput(experience.id, event)}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} placeholder="" label="Description" 
            variant="outlined" fullWidth
            value={experience.description} 
            onChange={event => handleChangeInput(experience.id, event)}
            />
          </Grid>
            </Grid>
            <IconButton disabled={experience.length === 1} 
            onClick={() => handleRemoveExperiences(experience.id)}
            >
              <RemoveCircleOutlineRoundedIcon />
            </IconButton>
            <IconButton
              onClick={handleAddExperiences}
            >
              <AddCircleOutlineRoundedIcon />
            </IconButton>
          </div>
        )) }



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
            <TextField placeholder="Chefly" label="Project Name" variant="outlined" fullWidth  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              type="date"
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
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} placeholder="" label="Description" variant="outlined" fullWidth  />
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
          <TextField placeholder="Java" label="Skills" variant="outlined" fullWidth />
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
          <Button type="submit" variant="contained" color="primary" >Submit </Button>
        </Grid>

      </form>

      

      <Box my={10}>
      </Box>

    </Grid>
  )
}


