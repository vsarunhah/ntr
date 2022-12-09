import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Grid, Stack, TextField, InputLabel, Select, MenuItem, FormControl } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate, useParams } from "react-router";
import { defaultRoleList, defaultCompanyData, defaultLevels } from "./sampleData";
import { grey } from '@mui/material/colors';

export default function Company() {

  /* constants */

  const [role, setRole] = useState('');
  const [levels, setLevels] = useState([]);
  const [level, setLevel] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const [companyData, setCompanyData] = useState('');

  const dropDownRoleHandleChange = (event) => {
    console.log("----------------companyData: ", companyData);
    setRole(event.target.value);
    const newLevels = defaultRoleList.filter(role => role.name === event.target.value);
    console.log("new levels: ", newLevels);
    if (newLevels) {
      setLevels(newLevels[0].levels);
      console.log(levels);
    }
    console.log("dropdown role");
  };

  const dropDownLevelsHandleChange = (event) => {
    setLevel(event.target.value);
  };


  async function searchCompany(company) {
    console.log("searching for ", company);
    navigate("/salary/company/" + company);
  }

  function DisplaySampleData(data) {
    return (
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {data.data.map(({ name }) => (
          <Typography variant="h6">
            <Button key={name}
              sx={{
                width: 100,
                height: 50,
                backgroundColor: grey[500],
                '&:hover': {
                  backgroundColor: grey[300],
                  opacity: [0.9, 0.8, 0.7],
                },
                color: "black",
                margin: 1,
              }}
              onClick={() => searchCompany(name)}
            >
              {name}
            </Button>
          </Typography>
        ))}
      </Stack>
    )
  }

  function DisplayGraph() {
    return (
      <BarChart
        width={500}
        height={500}
        data={defaultCompanyData.slice(0, 5)}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="base" fill="#8884d8" stackId="a" />
        <Bar dataKey="bonus" fill="#82ca9d" stackId="a" />
        <Bar dataKey="stocks" fill="#ffc658" stackId="a" />
      </BarChart>
    )
  }

  function DisplayCustomDropDown(data) {
    console.log("data: ", data);
    console.log("data.data: ", data.data);

    // var val = data.type === "Role" ? role : (levels? levels[0] : '');
    var val = data.type === "Role" ? role : level;
    const changeFunction = data.type === "Role" ? dropDownRoleHandleChange : dropDownLevelsHandleChange;

    console.log("val: ", val);

    if (!data.data || data.data.length == 0) {
      return (
        <div></div>
      )
    }

    return (
      <FormControl sx={{ width: 300 }} display={data.display}>
        <InputLabel id={data.id}>{data.type}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="DropDown"
          value={val}
          onChange={changeFunction}
        >
          {data.data.map(({ name}) => (
            <MenuItem value={name} key={name}>{name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  useEffect(() => {
    // declare the data fetching function
    const companyData = defaultCompanyData.filter(company => company.name.toLowerCase() === params.id.toLowerCase());
    setCompanyData(companyData);
    setLevels([]);
  }, [params])


  return (
    <Grid container direction="row">
      <Grid item xs={2} mx={1}>
        <Navbar />
      </Grid>
      <Grid item sx={{ flexWrap: "wrap" }} xs={9}>
        <Typography variant="h5" style={{ fontWeight: "bold" }} mt={5}>
          Company
        </Typography>

        <Typography variant="body2">
          <Grid item>
            <Grid item xs={10} display="block" id="company-search" direction="column">
              <TextField
                sx={{ width: "800px" }}
                id="company-search-text"
                variant="outlined"
                fullWidth
                defaultValue={companyData[0] ? companyData[0].name : ""}
                label="Search by company name"
              />
              <Button onClick={() => searchCompany(document.getElementById("company-search-text").value)}>
                <SearchIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
          <Grid item direction="row" mt={1}>
            <DisplayCustomDropDown data={companyData[0] ? companyData[0].roles : ''} id="role-dropdown" type="Role" display="block" />
            <DisplayCustomDropDown data={levels} id="levels-dropdown" type="Levels" display="none" />
          </Grid>


          <Grid item id="discover-salaries">
            <h2>Statistics</h2>
            <DisplayGraph />
            <h2>More:</h2>
            <DisplaySampleData data={defaultCompanyData} />

          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
