import Grid from '@mui/material/Grid';
import { FormGroup, Box, MenuItem, InputLabel, Select, FormControl, Card, TextField, Typography, CardContent, Button, FormControlLabel, Checkbox, IconButton } from '@mui/material';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from 'uuid';

const id = "6336412aab0f0f35a5c36faf";
export default function EditProfile() {
 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   email: "",
   phone: "",
   address: "",
 });

 const [experiences, setExperiences] = useState([
  { id: uuidv4(), employerName: "", position: "", 
  location: "", startDate: "", endDate: "", description: "" },
]);

const [links, setLinks] = useState([
  { id: uuidv4(), link: "" },
]);
 const params = useParams();

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
  };
  console.log("params : "+params);
  console.log("id : "+params.id);
  
   await fetch(`http://localhost:5000/profileUpdate/${id}`, {
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

// function handleChangeInput(value: any) {
//   return setInputFields((prev) => {
//     return { ...prev,  ...value};
//   });
// }

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
              name="firstName"
              //value = {experience.employerName}
              //onChange= {(e) => handleChangeExperience(experience.id, e)}
             // onChange={event => handleChangeInput(inputField.id, event)}
              //onChange={(e) => handleChangeInput({ firstName: e.target.value })}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineer" 
              label="Position" 
              variant="outlined" fullWidth
              name="lastName"
              //value = {experience.position}
              //onChange= {(e) => handleChangeExperience(experience.id, e)}
             //onChange={(e) => handleChangeInput({ lastName: e.target.value })}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="San Diego" 
              label="Location" 
              variant="outlined" fullWidth
              name="lastName"
              //value={experience.location}
              //onChange={event => handleChangeInput(inputField.id, event)}
             //onChange={(e) => handleChangeInput({ lastName: e.target.value })}
            />
            </Grid>
            <FormGroup>
            <FormControlLabel control={<Checkbox />} label="I currently work here" />
            </FormGroup>
            <Grid item xs={12} sm={6}>
            <TextField
              id="date"
              label="Start date"
              //value={experience.startDate}
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
              //value={experience.endDate}
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
            //value={experience.description} 
            />
          </Grid>
            </Grid>
            <IconButton disabled={experience.length === 1} 
            //onClick={() => handleRemoveExperiences(experience.id)}
            >
              <RemoveCircleOutlineRoundedIcon />
            </IconButton>
            <IconButton
            //  onClick={handleAddExperiences}
            >
              <AddCircleOutlineRoundedIcon />
            </IconButton>
          </div>
        )) }



        {/* <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Google" label="Employer Name" variant="outlined" fullWidth  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineer" label="Position" variant="outlined" fullWidth  />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField placeholder="San Diego, California" label="Location" variant="outlined" fullWidth  />
          </Grid>
          <Box mx={5}>
          </Box>
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
        </Grid> */}



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

      {links.map(link => (
          <div key={link.id}>     
        <Grid item xs={12} sm={6}>
          <TextField placeholder="Java" label="Link" variant="outlined" fullWidth value = {links.link}
          onChange= {(e) => handleChangeLink(links.id, e)}
          />
        </Grid>
        <IconButton disabled={links.length === 1} 
            onClick={() => handleRemoveLinks(links.id)}
            >
              <RemoveCircleOutlineRoundedIcon />
            </IconButton>
            <IconButton
              onClick={handleAddLinks}
            >
              <AddCircleOutlineRoundedIcon />
            </IconButton>
            </div> ))}

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