import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import './App.css';

function SampleForm () {
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
  
  const handleProjectChange = (event, index) => {
    let data = [...projects];
    data[index][event.target.name] = event.target.value;
    setProjects(data);
  }

  const handleSkillChange = (event, index) => {
    let data = [...skills];
    data[index] = event.target.value;
    setSkills(data);
  }
  const handleLinkChange = (event, index) => {
    let data = [...links];
    data[index] = event.target.value;
    setLinks(data);
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
      projects: projects,
      skills: skills
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
      console.log("experiences retreived:");
      console.log(data.experiences);
      // data.map((i)=> {console.log("i : ", i)});
    } catch (error) {
      console.log(error);
      console.log("oops");
    }
    //getting educations
    try {
      const { data: res } = await axios.post("http://localhost:5000/profile/get_educations", data);
      console.log("educations retreived : ");
      console.log(data.educations);
    } catch (error) {
      console.log(error);
      console.log("oops");
    }
    //getting educations
    try {
      const { data: res } = await axios.post("http://localhost:5000/profile/get_projects", data);
      console.log("projects retreived : ");
      console.log(data.projects);
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
    <div className="App">
      <form onSubmit={submit}>
        {experiences.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='title'
                placeholder='Title'
                onChange={event => handleExperienceChange(event, index)}
                value={form.name}
              />
              <input
                name='company_name'
                placeholder='Company Name'
                onChange={event => handleExperienceChange(event, index)}
                value={form.age}
              />
              <button onClick={() => removeExperiences(index)}>Remove</button>
            </div>
          )
        })} 
      </form>
      <button onClick={addExperiences}>Add Experience..</button>
      <br />
      <form onSubmit={submit}>
        {educations.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='university'
                placeholder='University'
                onChange={event => handleEducationChange(event, index)}
                value={form.name}
              />
              <input
                name='degree'
                placeholder='Degree'
                onChange={event => handleEducationChange(event, index)}
                value={form.age}
              />
              <button onClick={() => removeEducations(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <button onClick={addEducations}>Add Education..</button>
      <br />
      <form onSubmit={submit}>
        {projects.map((form, index) => {
          return (
            <div key={index}>
              <input
                name='name'
                placeholder='chefly'
                onChange={event => handleProjectChange(event, index)}
                value={form.name}
              />
              <input
                name='description'
                placeholder='Degree'
                onChange={event => handleProjectChange(event, index)}
                value={form.age}
              />
              <button onClick={() => removeProjects(index)}>Remove</button>
            </div>
          )
        })}
      </form>
      <button onClick={addProjects}>Add Projects..</button>
      <br />
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default SampleForm;