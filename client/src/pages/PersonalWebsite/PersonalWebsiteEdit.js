import Grid from '@mui/material/Grid';
import {MenuItem, Select, InputLabel, FormControl, FormControlLabel, FormGroup, Checkbox, TextField, Divider, DialogActions, DialogContent, DialogContentText, DialogTitle, Dialog, Button, Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, LinkProps } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../../components/Navbar/Navbar'
import CoPresentRoundedIcon from '@mui/icons-material/CoPresentRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import MuiDialog from '../../components/DialogueBox/Confirmation'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';


const PersonalWebsiteEdit = () => {



    const viewAllThemes = (index) => {
      MuiDialog();
    }

    const changeTheme = (index) => {
     //MuiDialog();
    }

    const [open, setOpen] = useState(false)

    const openInNewTab = url => {
      window.open(url, '_blank', 'noopener,noreferrer');
    };
    //use this once the id comes
    let navigate = useNavigate();
    const routeChange = () => { 
        let path = `/personalwebsiteview/`; 
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
           address: profile.address,
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
             address: res.data.address,
             user_id : localStorage.getItem("user_id"),
           };
           console.log("user profile : ", user_profile);
           setProfile(user_profile);
           setLinks(res.data.links);
           setSkills(res.data.skills);
         });
          await axios.post("http://localhost:5000/profile/get_experiences", data).then((res) => {
           console.log("inside experiences post req");
           console.log(res.data);
           setExperiences(res.data);
         });
         await axios.post("http://localhost:5000/profile/get_educations", data).then((res) => {
           console.log("inside educations post req");
           console.log(res.data);
           setEducations(res.data);
         });
         await axios.post("http://localhost:5000/profile/get_projects", data).then((res) => {
           console.log("inside projects post req");
           console.log(res.data);
           setProjects(res.data);
         });
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

      const submit = async (e) => {
        e.preventDefault();
        console.log(experiences);
        console.log(educations);
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
    
        routeChange();
      }

      

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

      wrapper: {
        border: '1px solid blue',
      }

    };

    return (
      <Grid mx ={35}>
      <Navbar />

     <Box my={10}>
    </Box>
    <Typography gutterBottom variant="h4">
        Chosen Theme: 
    </Typography>
    <div style={styles.circlePink} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "pink"})} >
    </div>
    <div style={styles.circlePurple} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "purple"})}>
    </div>
    <div style={styles.circleBlue} onClick={(e) => setPersonalWebsite({...personalWebsite, theme: "blue"})}>
    </div>
    <Box my={1}>
    </Box>
      <MuiDialog></MuiDialog>
    <Box my={10}>
    </Box>
    <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Profile
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showProfile: !personalWebsite.showProfile})} startIcon={<VisibilityIcon />}> </Button>
      </Grid>
      <div>
      {
       

       personalWebsite.showProfile ? <Grid><Typography  variant="body1" color="textSecondary">
        <Box fontWeight='fontWeightBold' display='inline'>First Name:</Box> {profile.first_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Last Name:</Box> {profile.last_name}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Email:</Box> {profile.profileEmail}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Phone:</Box>  {profile.phone}
       </Typography>

       <Typography variant="body1" color="textSecondary">
       <Box fontWeight='fontWeightBold' display='inline'>Address:</Box>  {profile.address}
        </Typography>  
        </Grid>: null
      

      }
      </div>
      <Box my={2}>
       </Box>

       <Divider></Divider>
       <Box my={10}>
      </Box>
      <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Experiences
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showExperiences: !personalWebsite.showExperiences})}  startIcon={<VisibilityIcon />}> </Button>
      </Grid>
      <div>
      {
       

       personalWebsite.showExperiences ?
       <div>
        <form onSubmit={submit}>
        {experiences.map((form, index) => {
          return (
            
            <div key={index}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
              <TextField placeholder="Google" 
              label="Employer Name" 
              variant="outlined" fullWidth
              name='company_name'
              //onChange={event => handleExperienceChange(event, index)}
              value={form.company_name}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="Software Engineer" 
              label="Position" 
              variant="outlined" fullWidth
              name='title'
              //onChange={event => handleExperienceChange(event, index)}
              value={form.title}
            />
            </Grid>
            <Grid item xs={12} sm={6}>
            <TextField placeholder="San Diego" 
              label="Location" 
              variant="outlined" fullWidth
              name="location"
              value={form.location}
              //onChange={event => handleExperienceChange(event, index)}
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
              //onChange={event => handleExperienceChange(event, index)}
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
              //onChange={event => handleExperienceChange(event, index)}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} placeholder="" label="Description" 
            variant="outlined" fullWidth
            name="description"
            value={form.description} 
            //onChange={event => handleExperienceChange(event, index)}
            />
          </Grid>

              
              <Grid item xs={12} sm={6}>
                <Button 
                //onClick={() => removeExperiences(index)} 
                color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
              </Grid>
              <Box my={2}>
            </Box>
            </div>
            
          )
        })}
        </form>
        <Grid item xs={12} sm={6}>
        <Button 
        //onClick={addExperiences} 
        color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      </Grid>
      </div>
      : null
      

      }
      </div>


       <Box my={10}>
      </Box>

      <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Skills
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showSkills: !personalWebsite.showSkills})}  startIcon={<VisibilityIcon />}> </Button>
      </Grid>
      <div>
      {
         personalWebsite.showSkills ?
         <form onSubmit={submit}>
         <div>
       <div class="container" style={{display: "flex" , flexWrap: 'wrap'}}>
       
       {skills.map((form, index) => {
          return (
            
        <div key={index}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} >
          <TextField name = 'skill' placeholder="Java" label="Skills" variant="outlined" fullWidth required value={form.skill}
           //onChange={event => handleSkillChange(event, index)}
           />
        </Grid>
        <Grid item xs={12} sm={6}>
                <Button 
                //onClick={() => removeSkills(index)} 
                color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
        </Grid>
        <Box my={1}>
        </Box>
        </div>
        
          )
        })}
        

      </div>
        
       </div>
       <Grid item xs={12} sm={6}>
        <Button 
        //onClick={addSkills} 
        color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      </Grid>
       </form>
       
       : null
      

      }
      </div>
      <Box my={2}>
      </Box>
      <Divider></Divider>


    

     <Box my={10}>
    </Box>

    
    <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Education
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showEducation: !personalWebsite.showEducation})} startIcon={<VisibilityIcon />}> </Button>
      </Grid>
      <div>
      {
       

       personalWebsite.showEducation ?
       <form onSubmit={submit}>
       <div>
      {educations.map((form, index) => {
          return (
            <div key={index}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={6} item>
                <TextField name='university'
                //onChange={event => handleEducationChange(event, index)}
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
                      //onChange={event => handleEducationChange(event, index)}
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
                //onChange={event => handleEducationChange(event, index)}
                value={form.major}/>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField name = "minor" placeholder="Art and Design Studio" label="Minor" variant="outlined" fullWidth value={educations.minor}
                //onChange={event => handleEducationChange(event, index)}
                />
                </Grid>
                <Grid item xs={6} sm={3}>
                  <TextField name = "gpa" type="number" placeholder="4.0" label="GPA" variant="outlined" fullWidth  value={form.gpa}
                //onChange={event => handleEducationChange(event, index)}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="date"
                    label="Start date"
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    //onChange={event => handleEducationChange(event, index)}
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
                    //onChange={event => handleEducationChange(event, index)}
                    defaultValue="2017-05-24"
                    sx={{ width: 220 }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />       
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button 
                //onClick={() => removeEducations(index)} 
                color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
            </div>
          )
        })}
        <Grid item xs={12} sm={6}>
        <Button 
        //onClick={addEducations} 
        color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
        </Grid>
        </div>
        </form>
     : null
     

     }
     </div>

      <Box my={10}>
      </Box>


      <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Projects
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showProjects: !personalWebsite.showProjects})} startIcon={<VisibilityIcon />}> </Button>
      </Grid>
      <div>
      {
       

       personalWebsite.showProjects ?
       <form onSubmit={submit}>
       <div>
      {projects.map((form, index) => {
          return (
            
        <div key={index}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <TextField name= "name" placeholder="Chefly" label="Project Name" variant="outlined" fullWidth value = {form.name}
              //onChange={event => handleProjectChange(event, index)}
              />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name= "start_date"
              id="date"
              label="Start date"
              type="date"
              value = {form.start_date}
              //onChange={event => handleProjectChange(event, index)}
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
              //onChange={event => handleProjectChange(event, index)}
              defaultValue="2017-05-24"
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />       
          </Grid>
          <Grid item xs={12}>
            <TextField name= "description" multiline rows={4} placeholder="" label="Description" variant="outlined" fullWidth  value = {form.description}
              //onChange={event => handleProjectChange(event, index)}
              />
          </Grid>

          <Grid item xs={12} sm={6}>
                <Button 
                //onClick={() => removeProjects(index)} 
                color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
        </Grid>
        </div>
          )
        })}
        <Grid item xs={12} sm={6}>
        <Button 
        //</Grid>onClick={addProjects} 
        color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
        </Grid>
        </div>
        </form>
     : null
     

     }
     </div>

     <Box my={10}>
      </Box>

    <Grid container direction="row" >
      <Typography gutterBottom variant="h4">
        Links
      </Typography>
      <Button color="primary" onClick={(e) => setPersonalWebsite({...personalWebsite, showLinks: !personalWebsite.showLinks})}  startIcon={<VisibilityIcon />}> </Button>
      </Grid>
      <div>
      {
       

       personalWebsite.showLinks ?
       <form onSubmit={submit}>
       <div>
       <div class="container" style={{display: "flex"}}>
       {links.map((form, index) => {
          return (
            
        <div key={index}>
      <Grid container spacing={1}>
          <TextField name = "link" placeholder="LinkedIn" label="link" variant="outlined" fullWidth required value={form.link}
           //onChange={event => handleLinkChange(event, index)}
           />

        <Grid item xs={12} sm={6}>
               <Button //</Grid>onClick={() => removeLinks(index)} 
                color="primary" startIcon={<RemoveCircleOutlineRoundedIcon />}> </Button>
              </Grid>
        </Grid>
        <Box my={1}>
        </Box>
        </div>
          )
        })}</div>
        <Grid>
        <Button 
        //</Grid>onClick={addLinks} 
        color="primary" startIcon={<AddCircleOutlineRoundedIcon />}> </Button>
      </Grid>
     </div>
     
     </form>
     : null
     

     }
     </div>
     <Box my={2}>
       </Box>
        <Divider></Divider>


        <Box my={10}>
      </Box>


      <Button onClick={submit} variant="outlined" startIcon={<SaveOutlinedIcon /> } >
        Save
      </Button>
      <Box my={10}>
       </Box>

    </Grid>
    
    )
}

export default PersonalWebsiteEdit
