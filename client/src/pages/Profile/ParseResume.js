import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import {Grid, IconButton, FormGroup, Box, MenuItem, InputLabel, Select, FormControl, Card, TextField, Typography, CardContent, Button, FormControlLabel, Checkbox } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { useNavigate } from "react-router-dom";

function parserResume() {
    const [selectedFile, setSelectedFile] = useState();
    const [loading, setLoading] = useState(true);
    let navigate = useNavigate(); 
	const changeHandler = (event) => {
        setSelectedFile(event.target.files[0])
        setLoading(true);
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
                let address_line = ""; let city = ""; let state = ""; let postal_code = "";
                if (res.data.data.location != null) {
                    address_line = res.data.data.location.rawInput;
                    city = res.data.data.location.city;
                    state = res.data.data.location.state;
                    postal_code = res.data.data.location.postalCode;
                }
                let first_name = "", last_name = "", email = "", phoneNumber = 0;
                if (res.data.data.name != null) {
                    first_name = res.data.data.name.first;
                    last_name = res.data.data.name.last;
                }
                if ( res.data.data.emails != null){
                    email =  res.data.data.emails[0];
                }
                if (res.data.data.phoneNumbers != null) phoneNumber = res.data.data.phoneNumbers[0];
                const profile = {
                    first_name : first_name,
                    last_name : last_name,
                    profileEmail : email,
                    phone: phoneNumber,
                    address_line: address_line,
                    city: city,
                    state: state,
                    postal_code: postal_code,
                    user_id : localStorage.getItem("user_id"),
                }
                let temp_phone = profile.phone.replace("-", "");
                temp_phone = parseInt(temp_phone);
                profile.phone = temp_phone;
                const experiences = [];
                console.log("consolidated profile : ", profile);
                res.data.data.workExperience.map((exp, index) => {
                    //todo : format dates
                    let location = ""; let start_date = ""; let end_date = ""; let current_job = "";
                    if (exp.location != null) {location = exp.location.rawInput;}
                    if (exp.dates != null) {
                        start_date = exp.dates.startDate;
                        end_date = exp.dates.endDate;
                        current_job = exp.dates.isCurrent;
                    }
                    const data = {
                        title: exp.jobTitle,
                        company_name: exp.organization,
                        start_date: start_date,
                        end_date: end_date,
                        current_job: current_job,
                        location: location,
                        description: exp.jobDescription,
                    }
                    experiences.push(data);                   
                })
                console.log("consildated exps : ", experiences);
                const educations = [];
                res.data.data.education.map((edu, index) => {
                    //todo : format dates
                    let degree = ""; let start_date = ""; let end_date = ""; let gpa = 0;
                    if (edu.accreditation != null) degree = edu.accreditation.education;
                    if (edu.grade != null) gpa= edu.grade.value;
                    if (edu.dates != null) {
                        start_date= edu.dates.startDate;
                        end_date = edu.dates.completionDate;
                    }
                    const data = {
                        university: edu.organization,
                        degree: degree,
                        start_date: start_date,
                        end_date: end_date,
                        gpa: gpa,
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
                    address_line: profile.address_line,
                    city: profile.city,
                    state: profile.state,
                    postal_code: profile.postal_code,
                    links: links,
                    skills: skills
                  }
                  console.log(" data: ", data);
                  try {
                    await axios
                      .post("http://localhost:5000/profile/add", data)
                      .then((res) => {
                        console.log(res.data);
                        navigate(`/editProfile/`);
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