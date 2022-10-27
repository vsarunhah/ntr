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
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default SampleForm;