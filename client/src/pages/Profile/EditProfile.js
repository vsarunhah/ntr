import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Grid, IconButton, FormGroup, Box, MenuItem, InputLabel, Select, FormControl, Card, TextField, Typography, CardContent, Button, FormControlLabel, Checkbox } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from "react-router-dom";
// import './App.css';

function EditProfile () {

  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/profile`; 
    navigate(path);
  }

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
       skills: skills,
       personalWebsite: personalWebsite,
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
       console.log("user profile : ", user_profile);
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
     await axios.post("http://localhost:5000/profile/get_personalWebsite", data).then((res) => {
       console.log("inside personal website post req");
       console.log(res.data);
       setPersonalWebsite(res.data);
     });
    }
  
    fetchData();
 
    return;
  }, []);

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

  const handleProjectChange = (event, index) => {
    let data = [...projects];
    data[index][event.target.name] = event.target.value;
    setProjects(data);
  }

  const handleSkillChange = (event, index) => {
    let data = [...skills];
    data[index][event.target.name] = event.target.value;
    setSkills(data);
  }
  const handleLinkChange = (event, index) => {
    let data = [...links];
    data[index][event.target.name] = event.target.value;
    setLinks(data);
  }

  const submit = async (e) => {
    e.preventDefault();
    console.log(experiences);
    console.log(educations);
    // SEND EXPERIENCES AND EDUCATIONS TO SERVER
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
      skills: skills,
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
    routeChange();
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

  const removeProjects = (index) => {
    let data = [...projects];
    data.splice(index, 1);
    setProjects(data);
  }

  const removeSkills = (index) => {
    let data = [...skills];
    data.splice(index, 1);
    setSkills(data);
  }
  const removeLinks = (index) => {
    let data = [...links];
    data.splice(index, 1);
    setLinks(data);
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
            <TextField id ="email" className="form-control" type="email" placeholder="Enter email" label="Email" variant="outlined" fullWidth required value={profile.profileEmail}
           onChange={(e) => setProfile({...profile, profileEmail: e.target.value})}/>
          </Grid>
          <Grid item xs={12} className="form-group">
            <TextField id ="phone" className="form-control" type="number" placeholder="Enter phone number" label="Phone" variant="outlined" fullWidth required value={profile.phone}
           onChange={(e) => setProfile({...profile, phone: e.target.value})}/>
          </Grid>
          
          <Grid item xs={12} className="form-group">
            <TextField id ="address" className="form-control" placeholder="Enter Address Line 1" label="Address Line 1" variant="outlined" fullWidth value={profile.address_line}
           onChange={(e) => setProfile({...profile, address_line: e.target.value})}/>
          </Grid>
          <Grid item xs={12} className="form-group">
            <TextField id ="address" className="form-control" placeholder="Enter City" label="City" variant="outlined" fullWidth required value={profile.city}
           onChange={(e) => setProfile({...profile, city: e.target.value})}/>
          </Grid>
          <Grid xs={12} sm={6} item>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" required>State</InputLabel>
                    <Select
                      labelId=""
                      id=""
                      label="State"
                      name="state"
                      placeholder='State'
                      value={profile.state}  onChange={(e) => setProfile({...profile, state: e.target.value})}>
                      <MenuItem value="AL">Alabama</MenuItem>
                      <MenuItem value="AK">Alaska</MenuItem>
                      <MenuItem value="AZ">Arizona</MenuItem>
                      <MenuItem value="AR">Arkansas</MenuItem>
                      <MenuItem value="CA">California</MenuItem>
                      <MenuItem value="CO">Colorado</MenuItem>
                      <MenuItem value="CT">Connecticut</MenuItem>
                      <MenuItem value="DE">Delaware</MenuItem>
                      <MenuItem value="DC">District Of Columbia</MenuItem>
                      <MenuItem value="FL">Florida</MenuItem>
                      <MenuItem value="GA">Georgia</MenuItem>
                      <MenuItem value="HI">Hawaii</MenuItem>
                      <MenuItem value="ID">Idaho</MenuItem>
                      <MenuItem value="IL">Illinois</MenuItem>
                      <MenuItem value="IN">Indiana</MenuItem>
                      <MenuItem value="IA">Iowa</MenuItem>
                      <MenuItem value="KS">Kansas</MenuItem>
                      <MenuItem value="KY">Kentucky</MenuItem>
                      <MenuItem value="LA">Louisiana</MenuItem>
                      <MenuItem value="ME">Maine</MenuItem>
                      <MenuItem value="MD">Maryland</MenuItem>
                      <MenuItem value="MA">Massachusetts</MenuItem>
                      <MenuItem value="MI">Michigan</MenuItem>
                      <MenuItem value="MN">Minnesota</MenuItem>
                      <MenuItem value="MS">Mississippi</MenuItem>
                      <MenuItem value="MO">Missouri</MenuItem>
                      <MenuItem value="MT">Montana</MenuItem>
                      <MenuItem value="NE">Nebraska</MenuItem>
                      <MenuItem value="NV">Nevada</MenuItem>
                      <MenuItem value="NH">New Hampshire</MenuItem>
                      <MenuItem value="NJ">New Jersey</MenuItem>
                      <MenuItem value="NM">New Mexico</MenuItem>
                      <MenuItem value="NY">New York</MenuItem>
                      <MenuItem value="NC">North Carolina</MenuItem>
                      <MenuItem value="ND">North Dakota</MenuItem>
                      <MenuItem value="OH">Ohio</MenuItem>
                      <MenuItem value="OK">Oklahoma</MenuItem>
                      <MenuItem value="OR">Oregon</MenuItem>
                      <MenuItem value="PA">Pennsylvania</MenuItem>
                      <MenuItem value="RI">Rhode Island</MenuItem>
                      <MenuItem value="SC">South Carolina</MenuItem>
                      <MenuItem value="SD">South Dakota</MenuItem>
                      <MenuItem value="TN">Tennessee</MenuItem>
                      <MenuItem value="TX">Texas</MenuItem>
                      <MenuItem value="UT">Utah</MenuItem>
                      <MenuItem value="VT">Vermont</MenuItem>
                      <MenuItem value="VA">Virginia</MenuItem>
                      <MenuItem value="WA">Washington</MenuItem>
                      <MenuItem value="WV">West Virginia</MenuItem>
                      <MenuItem value="WI">Wisconsin</MenuItem>
                      <MenuItem value="WY">Wyoming</MenuItem>
                    </Select>
                  </FormControl>                
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField name = "postalCode" type="number" placeholder="47906" label="Postal Code" variant="outlined" fullWidth  value={profile.postal_code}
                onChange={e =>  setProfile({...profile, postal_code: e.target.value})}
                />
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
                value={form.university}
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
                      value={form.degree} 
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
                value={form.major}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name = "minor" placeholder="Art and Design Studio" label="Minor" variant="outlined" fullWidth value={educations.minor}
                onChange={event => handleEducationChange(event, index)}/>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField name = "gpa" type="number" placeholder="4.0" label="GPA" variant="outlined" fullWidth  value={form.gpa}
                onChange={event => handleEducationChange(event, index)}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    label="Start date"
                    type="date"
                    name="start_date"
                    value={form.start_date}
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
                    value={form.end_date}
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
              value={form.company_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineer" 
              label="Position" 
              variant="outlined" fullWidth
              name='title'
              onChange={event => handleExperienceChange(event, index)}
              value={form.title}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="San Diego" 
              label="Location" 
              variant="outlined" fullWidth
              name="location"
              value={form.location}
              onChange={event => handleExperienceChange(event, index)}
            />
            </Grid>
            <FormGroup>
            <FormControlLabel control={<Checkbox />} label="I currently work here" value={form.current_job }/>
            </FormGroup>
            <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              name="start_date"
              value={form.start_date}
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
              value={form.end_date}
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
            value={form.description} 
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
            <TextField name= "name" placeholder="Chefly" label="Project Name" variant="outlined" fullWidth value = {form.name}
              onChange={event => handleProjectChange(event, index)}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name= "start_date"
              id="date"
              label="Start date"
              type="date"
              value = {form.start_date}
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
              value = {form.end_date}
              onChange={event => handleProjectChange(event, index)}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField name= "description" multiline rows={4} placeholder="" label="Description" variant="outlined" fullWidth  value = {form.description}
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
          <TextField name = 'skill' placeholder="Java" label="Skills" variant="outlined" fullWidth required value={form.skill}
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
          <TextField name = "link" placeholder="LinkedIn" label="link" variant="outlined" fullWidth required value={form.link}
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

        <Grid item xs={12} sm={6}>
        <Button onClick={addLinks} color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      </Grid>
        
        <Box my={10}>
      </Box>

      <Grid item xs={12} sm={6}>
        <Button onClick={submit} variant="contained" color="primary">Submit </Button>
      </Grid>
      </Grid>
      
    </div>
    </Grid>
  );
}

export default EditProfile;