import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {Grid, IconButton, FormGroup, Box, MenuItem, InputLabel, Select, FormControl, Card, TextField, Typography, CardContent, Button, FormControlLabel, Checkbox } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from "react-router-dom";
import { useFilePicker } from 'use-file-picker';

function parserResume() {
    const [selectedFile, setSelectedFile] = useState();
    let navigate = useNavigate(); 
	const changeHandler = (event) => {
        setSelectedFile(event.target.files[0])
	};

	const handleSubmission = async (e) => {
        console.log("selected file",selectedFile);
        const data = {
            fileName : selectedFile.name
        };
        try {
            await axios
              .post("http://localhost:5000/parser/file", data)
              .then(async (res) => {
                console.log(res.data);
                //console.log("exps : ", res.data.data.workExperience);
                const profile = {
                    first_name : res.data.data.name.first,
                    last_name : res.data.data.name.last,
                    profileEmail : res.data.data.emails[0],
                    phone: res.data.data.phoneNumbers[0],
                    address: "",
                    user_id : localStorage.getItem("user_id"),
                }
                let temp_phone = profile.phone.replace("-", "");
                temp_phone = parseInt(temp_phone);
                profile.phone = temp_phone;
                const experiences = [];
                console.log("consolidated profile : ", profile);
                res.data.data.workExperience.map((exp, index) => {
                    //todo : format dates
                    const data = {
                        title: exp.jobTitle,
                        company_name: exp.organization,
                        start_date: exp.dates.startDate,
                        end_date: exp.dates.endDate,
                        current_job: exp.dates.isCurrent,
                        location: exp.location.rawInput,
                        description: exp.jobDescription,
                    }
                    experiences.push(data);                   
                })
                console.log("consildated exps : ", experiences);
                const educations = [];
                res.data.data.education.map((edu, index) => {
                    //todo : format dates
                    const data = {
                        university: edu.organization,
                        degree: edu.accreditation.education,
                        start_date: edu.dates.startDate,
                        end_date: edu.dates.completionDate,
                        gpa: edu.grade.value,
                    }
                    educations.push(data);                   
                })
                console.log("consildated edus : ", educations);
                const projects = [];
                res.data.data.sections.map((thing, index) => {
                    if (thing.sectionType == "Projects"){
                        const data = {
                            name : thing.text,
                            description: thing.text
                        }
                        projects.push(data);   
                    }                
                })
                console.log("projects: ", projects);
                const skills = [];
                res.data.data.skills.map((s, index) => {
                    const data = {
                        skill : s.name
                    }
                    skills.push(data);                   
                })
                console.log("skills : ", skills);
                const links = [];
                res.data.data.websites.map((l, index) => {
                    const data = {
                        link : l
                    }
                    links.push(data);                   
                })
                console.log("links : ", links);
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
                    skills: skills
                  }
                  console.log(" data: ", data);
                  try {
                    await axios
                      .post("http://localhost:5000/profile/add", data)
                      .then((res) => {
                        console.log(res.data);
                        let path = `/editProfile/`; 
                        navigate(path);
                      });
                  } catch (error) {
                    console.log("oops");
                  }
              });
          } catch (error) {
            console.log("oops");
          }

          
	};

	return(
        <Grid>
        <div className="App">
           <Navbar />
        <Grid mx ={35}>
        <Box my={10}>
      </Box>
      <Typography gutterBottom variant="h5">
        Upload resume
      </Typography>
      <Typography variant="body2" color="textPrimary" component="p" gutterBottom>
        Please select a file to upload
      </Typography>
      <br></br>
        <div>
			<input type="file" name="file" onChange={changeHandler} />
			<div>
                <br></br>
				<button onClick={handleSubmission}>Submit</button>
			</div>
		</div>
        
        </Grid>
        </div>
        </Grid>
	)
}
export default parserResume;