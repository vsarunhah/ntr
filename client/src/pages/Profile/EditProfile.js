import Grid from '@mui/material/Grid';
import { FormGroup, Box, MenuItem, InputLabel, Select, FormControl, Card, TextField, Typography, CardContent, Button, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';

export default function EditProfile() {
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
const [links, setLinks] = useState([
  { id: uuidv4(), link: "" },
]);
 const params = useParams();

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
        window.alert(`Record with id not found`);
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
   const editedPerson = {
    first_name: form.first_name,
    last_name: form.last_name,
    email: form.email,
    phone: form.phone,
    address: form.address,
    links : form.links,
    skills: form.skills,
    user_id: localStorage.getItem("user_id"),    
  };
  const editedExp = {
    id: experiences.id, 
    title: experiences.title, 
    company_name: experiences.company_name, 
    start_date: experiences.start_date, 
    end_date: experiences.end_date, 
    current_job: experiences.current_job,
    description: experiences.description,
    location: experiences.location,
    user_id: localStorage.getItem("user_id"),
  };
  const editedEducation = {
      id: educations.id, 
      university: educations.university,
      degree: educations.degree,
      start_date: educations.start_date,
      end_date: educations.end_date,
      major: educations.major,
      minor: educations.minor,
      gpa: educations.gpa,
      other: educations.other,
      user_id: localStorage.getItem("user_id"),
  };
  const editedProject = {
    id: projects.id, 
    title: projects.title, 
    company_name: projects.company_name, 
    start_date: projects.start_date, 
    end_date: projects.end_date, 
    current_job: projects.current_job,
    description: projects.description,
    location: projects.location,
    user_id: localStorage.getItem("user_id"),
  };
  
   await fetch(`http://localhost:5000/profileUpdate/`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(editedPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
   await fetch(`http://localhost:5000/expUpdate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedExp),
  })
  .catch(error => {
    window.alert(error);
    return;
  });
  await fetch(`http://localhost:5000/educationUpdate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedEducation),
  })
  .catch(error => {
    window.alert(error);
    return;
  });
  await fetch(`http://localhost:5000/projectUpdate/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(editedProject),
  })
  .catch(error => {
    window.alert(error);
    return;
  });
 }



const handleChangeExperience = (id, event) => {
  const newExperiences = experiences.map(i => {
    if(id === i.id) {
      i[event.target.name] = event.target.value;
    }
    return i;
  })
  setExperiences(newExperiences);
}

const handleChangeLink = (id, event) => {
  const newLink = links.map(i => {
    if(id === i.id) {
      i[event.target.name] = event.target.value;
    }
    return i;
  })
setLinks(newLink);
}


const handleAddExperiences = () => {
  setExperiences([...experiences, { id: uuidv4(),  employerName: '', position: '', 
  location: '', startDate: '', endDate: '', description: '' }])
}

const handleRemoveExperiences = (id) => {
  const values  = [...experiences];
  values.splice(values.findIndex(value => value.id === id), 1);
  setExperiences(values);
}

const handleAddLinks = () => {
  setLinks([...links, { id: uuidv4(),  link: ''}])
}

const handleRemoveLinks = (id) => {
  const values  = [...links];
  values.splice(values.findIndex(value => value.id === id), 1);
  setLinks(values);
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
        Please Edit your personal information.
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
            <TextField placeholder="Software Engineering" label="Major" variant="outlined" fullWidth required value={educations.major}
                onChange={(e) => setEducations({...educations, major: e.target.value})}/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Art and Design Studio" label="Minor" variant="outlined" fullWidth  required value={educations.minor}
           onChange={(e) => setEducations({...educations, minor: e.target.value})}/>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField type="number" placeholder="4.0" label="GPA" variant="outlined" fullWidth required value={educations.gpa}
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
              onChange={(e) => setExperiences({...experiences, company_name: e.target.value})}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineer" 
              label="Position" 
              variant="outlined" fullWidth
              name="title"
              value = {experiences.title}
              onChange={(e) => setExperiences({...experiences, title: e.target.value})}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="San Diego" 
              label="Location" 
              variant="outlined" fullWidth
              name="location"
              value = {experiences.location}
              onChange={(e) => setExperiences({...experiences, location: e.target.value})}
            />
            </Grid>
            <FormGroup>
            <FormControlLabel control={<Checkbox />} label="I currently work here" name="current_job"
              value = {experiences.current_job}
              onChange={(e) => setExperiences({...experiences, current_job: e.target.value})}/>
            </FormGroup>
            <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              name="start_date"
              value = {experiences.start_date}
              onChange={(e) => setExperiences({...experiences, start_date: e.target.value})}
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
              name="start_date"
              value = {experiences.end_date}
              onChange={(e) => setExperiences({...experiences, end_date: e.target.value})}
              type="date"
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} placeholder="" label="Description" 
            variant="outlined" fullWidth
             name="description"
              value = {experiences.description}
              onChange={(e) => setExperiences({...experiences, description: e.target.value})}
            />
          </Grid>
            </Grid>
            <IconButton disabled={true} 
            //onClick={() => handleRemoveExperiences(experience.id)}
            >
              <RemoveCircleOutlineRoundedIcon />
            </IconButton>
            <IconButton
            //  onClick={handleAddExperiences}
            >
              <AddCircleOutlineRoundedIcon />
            </IconButton>

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
            <TextField multiline rows={4} placeholder="" label="Description" variant="outlined" fullWidth value = {projects.description}
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
          <TextField placeholder="Java" label="Skills" variant="outlined" fullWidth  value = {form.skills}
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
      <Grid item xs={12} sm={6}>
          <TextField placeholder="Java" label="Link" variant="outlined" fullWidth value = {form.links}
          onChange= {(e) => setForm({...form, links: e.target.value})}/>
        </Grid>

        <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>


      </form>

      

      <Box my={10}>
      </Box>

    </Grid>
  )

}