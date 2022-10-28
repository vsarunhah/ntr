import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Grid, IconButton, FormGroup, Box, MenuItem, InputLabel, Select, FormControl, Card, TextField, Typography, CardContent, Button, FormControlLabel, Checkbox } from '@mui/material';
import Navbar from '../components/Navbar/Navbar'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from "react-router-dom";
// import './App.css';

function SampleForm () {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/profile`; 
    navigate(path);
  }

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
      location: "",
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
    }
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

  const handleExperienceChange = (event, index) => {
    let data = [...experiences];
    data[index][event.target.name] = event.target.value;
    setExperiences(data);
  }

  const handleEducationChange = (event, index) => {
    let data = [...educations];
    data[index][event.target.name] = event.target.value;
    setEducations(data);
  }

  const submit = async (e) => {
    e.preventDefault();
    console.log(experiences);
    console.log(educations);
    console.log(projects);
    // SEND EXPERIENCES AND EDUCATIONS TO SERVER
    const data = {
      user_id: localStorage.getItem('user_id'),
      experiences: experiences,
      educations: educations,
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
      const { data: res } = await axios.post("http://localhost:5000/profile/get_experiences", data);
      console.log(data);
      console.log(res);
      console.log(res.data);
      console.log(res.data);
      // data.map((i)=> {console.log("i : ", i)});
    } catch (error) {
      console.log(error);
      console.log("oops");
    }
  }


  const addExperiences = () => {
    let object = {
      id: uuidv4(), 
      title: "", 
      company_name: "", 
      start_date: "", 
      end_date: "", 
      current_job: "",
      description: "",
      location: ""
    }

    setExperiences([...experiences, object])
  } 

  const addProjects = () => {
    let object = {
      id: uuidv4(),
      name: "", 
      start_date: "", 
      end_date: "",
      description: "",
    }

    setProjects([...projects, object])
  }

  const addSkills = () => {
    let object = {
      skill : ""
    }
    setSkills([...skills, object])
  }
  const addLinks = () => {
    let object = {
      link : ""
    }
    setLinks([...links, object])
  }

  const addEducations = () => {
    let object = {
      id: uuidv4(), 
      university: "",
      degree: "",
      start_date: "",
      end_date: "",
      major: "",
      minor: "",
      gpa: "",
      other: "",
    }

    setEducations([...educations, object])
  }

  const removeExperiences = (index) => {
    let data = [...experiences];
    data.splice(index, 1)
    setExperiences(data)
  }

  const removeEducations = (index) => {
    let data = [...educations];
    data.splice(index, 1)
    setEducations(data)
  }

  return (
    <Grid>
    <div className="App">
       <Navbar />
    <Grid mx ={35}>

    <Box my={10}>
      </Box>
      <Typography gutterBottom variant="h5">
        Profile
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your personal information.
      </Typography>
      <form onSubmit={submit}>
      <Grid container spacing={1}>
          <Grid xs={12} sm={6} item className="form-group">
            <TextField placeholder="Enter first name" label="First Name" variant="outlined" fullWidth required  value={profile.first_name}
           onChange={(e) => setProfile({...profile, first_name: e.target.value})}/>
          </Grid>
          <Grid xs={12} sm={6} item className="form-group">
            <TextField id ="last_name" className="form-control" placeholder="Enter last name" label="Last Name" variant="outlined" fullWidth required value={profile.last_name}
           onChange={(e) => setProfile({...profile, last_name: e.target.value})}/>
          </Grid>
          <Grid item xs={12} className="form-group">
            <TextField id ="email" className="form-control" type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required value={profile.email}
           onChange={(e) => setProfile({...profile, profileEmail: e.target.value})}/>
          </Grid>
          <Grid item xs={12} className="form-group">
            <TextField id ="phone" className="form-control" type="number" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth required value={profile.phone}
           onChange={(e) => setProfile({...profile, phone: e.target.value})}/>
          </Grid>
          <Grid item xs={12} className="form-group">
            <TextField id ="address" className="form-control" placeholder="Enter address" label="Address" variant="outlined" fullWidth required value={profile.address}
           onChange={(e) => setProfile({...profile, address: e.target.value})}/>
          </Grid>
        </Grid>
        </form>
        <Box my={10}>
      </Box>
      <form onSubmit={submit}>
      <Typography gutterBottom variant="h5">
        Education
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your education information.
      </Typography>
        {educations.map((form, index) => {
          return (
            <div key={index}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                <TextField name='university'
                onChange={event => handleEducationChange(event, index)}
                value={form.name}
                placeholder="Purdue University" label="Insitute Name" variant="outlined" fullWidth
                />
                </Grid>
                <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Degree</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Degree"
                      name="degree"
                      placeholder='Degree'
                      onChange={event => handleEducationChange(event, index)}
                      //value={educations.degree} 
                    >
                      <MenuItem value={'Bachelors'} >Bachelors</MenuItem>
                      <MenuItem value={'Masters'} >Masters</MenuItem>
                      <MenuItem value={'PHD'} >PHD</MenuItem>
                    </Select>
                  </FormControl>                
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField placeholder="Software Engineering" label="Major" variant="outlined" fullWidth
                name='major'
                onChange={event => handleEducationChange(event, index)}
                value={form.name}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name = "minor" placeholder="Art and Design Studio" label="Minor" variant="outlined" fullWidth value={educations.minor}
                onChange={event => handleEducationChange(event, index)}/>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField name = "gpa" type="number" placeholder="4.0" label="GPA" variant="outlined" fullWidth  value={educations.gpa}
                onChange={event => handleEducationChange(event, index)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    label="Start date"
                    type="date"
                    name="start_date"
                    value={educations.start_date}
                    onChange={event => handleEducationChange(event, index)}
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
                    name="end_date"
                    value={educations.end_date}
                    onChange={event => handleEducationChange(event, index)}
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />       
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button onClick={() => removeEducations(index)} color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
            </div>
          )
        })}
      </form>
      <Grid item xs={12} sm={6}>
        <Button onClick={addEducations} color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      </Grid>
      
      <Box my={10}>
      </Box>

      <form onSubmit={submit}>
      <Typography gutterBottom variant="h5">
        Experiences
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your experience information.
      </Typography>
        {experiences.map((form, index) => {
          return (
            
            <div key={index}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
              <TextField placeholder="Google" 
              label="Employer Name" 
              variant="outlined" fullWidth
              name='company_name'
              onChange={event => handleExperienceChange(event, index)}
              value={form.age}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineer" 
              label="Position" 
              variant="outlined" fullWidth
              name='title'
              onChange={event => handleExperienceChange(event, index)}
              //value={}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="San Diego" 
              label="Location" 
              variant="outlined" fullWidth
              name="location"
              value={experiences.location}
              onChange={event => handleExperienceChange(event, index)}
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
              onChange={event => handleExperienceChange(event, index)}
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
              onChange={event => handleExperienceChange(event, index)}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} placeholder="" label="Description" 
            variant="outlined" fullWidth
            name="description"
            value={experiences.description} 
            onChange={event => handleExperienceChange(event, index)}
            />
          </Grid>

              
              <Grid item xs={12} sm={6}>
                <Button onClick={() => removeExperiences(index)} color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
              </Grid>
            </div>
          )
        })} 
      </form>
      <Grid item xs={12} sm={6}>
        <Button onClick={addExperiences} color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      </Grid>
      <Box my={10}>
      </Box>
      
      <form onSubmit={submit}>
      <Typography gutterBottom variant="h5">
        Projects
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in your projects information.
      </Typography>
      {projects.map((form, index) => {
          return (
            
        <div key={index}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField name= "name" placeholder="Chefly" label="Project Name" variant="outlined" fullWidth value = {projects.company_name}
              onChange={event => handleProjectChange(event, index)}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name= "start_date"
              id="date"
              label="Start date"
              type="date"
              value = {projects.start_date}
              onChange={event => handleProjectChange(event, index)}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name= "end_date"
              id="date"
              label="End date"
              type="date"
              value = {projects.end_date}
              onChange={event => handleProjectChange(event, index)}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField name= "description" multiline rows={4} placeholder="" label="Description" variant="outlined" fullWidth  value = {projects.description}
              onChange={event => handleProjectChange(event, index)}/>
          </Grid>

          <Grid item xs={12} sm={6}>
                <Button onClick={() => removeProjects(index)} color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
        </Grid>
        </div>
          )
        })}
      </form>
      <Grid item xs={12} sm={6}>
        <Button onClick={addProjects} color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      </Grid>
      <Box my={10}>
      </Box>
      <form onSubmit={submit}>
      <Typography gutterBottom variant="h5">
        Skills
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in any links you would like to share.
      </Typography>
      {skills.map((form, index) => {
          return (
            
        <div key={index}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} >
          <TextField name = 'skill' placeholder="Java" label="Skills" variant="outlined" fullWidth required value={skills.skill}
           onChange={event => handleSkillChange(event, index)}/>
        </Grid>
        <Grid item xs={12} sm={6}>
                <Button onClick={() => removeSkills(index)} color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
        </Grid>
        <Box my={1}>
        </Box>
        </div>
        
          )
        })}
        </form>

        <Grid item xs={12} sm={6}>
        <Button onClick={addSkills} color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      </Grid>
        
        <Box my={10}>
      </Box>


      <form onSubmit={submit}>
      <Typography gutterBottom variant="h5">
        Links
      </Typography>
      <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Please fill in any links you would like to share.
      </Typography>
      {links.map((form, index) => {
          return (
            
        <div key={index}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} >
          <TextField name = "link" placeholder="LinkedIn" label="link" variant="outlined" fullWidth required value={links.link}
           onChange={event => handleLinkChange(event, index)}/>
        </Grid>
        <Grid item xs={12} sm={6}>
                <Button onClick={() => removeLinks(index)} color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
        </Grid>
        <Box my={1}>
        </Box>
        </div>
          )
        })}
      </form>
      <button onClick={addEducations}>Add Education..</button>
      <br />
      <button onClick={submit}>Submit</button>
    </div>
    </Grid>
  );
}

export default SampleForm;