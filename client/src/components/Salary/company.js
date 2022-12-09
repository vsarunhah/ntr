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
  const [company, setCompany] = useState([]);
  const [level, setLevel] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const [companyData, setCompanyData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [companyRoleLevelDisplayData, setCompanyRoleLevelDisplayData] = useState([])

  const dropDownRoleHandleChange = (event) => {
    setRole(event.target.value);
    const newLevels = company[event.target.value];
    console.log("new levels: ", newLevels);
    if (newLevels) {
      setLevels(newLevels);
      console.log("\n\n LEVELS: ", levels);
    }
    // setGraphData(getGraphVals(role));
  };

  const dropDownLevelsHandleChange = (event) => {
    setGraphData(getGraphVals(role));
    setLevel(event.target.value);

    console.log("----------------companyData: ", companyData);
    console.log("----------------company: ", company);
    console.log("----------------role: ", role);
    console.log("----------------level: ", level);
    console.log("----------------levels: ", levels);

    console.log("company[role]", company[role]);
    console.log("company[role][level]", company[role][event.target.value]);

    console.log("what do i want to display", company[role][event.target.value]);
    const updatedRoleLevelDisplayData = {
      total: company[role][event.target.value].total,
      base: company[role][event.target.value].base,
      bonus: company[role][event.target.value].bonus,
      stock: company[role][event.target.value].stock,
    }
    setCompanyRoleLevelDisplayData(updatedRoleLevelDisplayData);
    document.getElementById("role-level-salary-details").style.display = "block";
  };


  async function searchCompany(company) {
    console.log("searching for ", company);
    navigate("/salary/company/" + company);
  }

  function DisplaySampleData(data) {
    const arr = Array.from(data.data.keys());
    return (
      <Stack direction="row" sx={{ flexWrap: "wrap" }}>
        {arr.map((key) => (
          <Typography variant="h6">
            <Button key={key}
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
              onClick={() => searchCompany(key.toLowerCase())}
            >
              {key}
            </Button>
          </Typography>
        ))}
      </Stack>
    )
  }

  function DisplayGraph() {

    return (
      <BarChart
        width={1000}
        height={500}
        data={graphData}
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
        <Bar dataKey="stock" fill="#ffc658" stackId="a" />
      </BarChart>
    )
  }

  function DisplayCustomDropDown(data) {
    console.log("data: ", data);
    const map = new Map(Object.entries(data.data));
    console.log("\n\n MAP: ", map);

    // var val = data.type === "Role" ? role : (levels? levels[0] : '');
    var val = data.type === "Role" ? role : level;
    const changeFunction = data.type === "Role" ? dropDownRoleHandleChange : dropDownLevelsHandleChange;

    console.log("val: ", val);

    if (!data.data || data === 'undefined' || data.data.length === 0) {
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
          {Array.from(map.keys()).map((key) => (
            <MenuItem value={key} key={key}>{key}</MenuItem>
          ))}
        </Select>
      </FormControl>
    )
  }

  function getGraphVals(val) {
    var sampleGraph = [];
    console.log("can i get swe? ", company[val]);
    if (company[val]) {
      const companyRoleMap = new Map(Object.entries(company[val]));
      console.log("keys:", companyRoleMap.keys());
      console.log("values: ", companyRoleMap.values());
      for (let [key, value] of companyRoleMap) {
        const graphLevels = {
          name: key,
          base: value.base,
          bonus: value.bonus,
          stock: value.stock,
          total: value.total,
        }
        console.log("gl: ", graphLevels);
        sampleGraph.push(graphLevels);
      }
    }

    return sampleGraph;
  }

  useEffect(() => {
    const scrapeSalary = async() => {
      console.log("before scraper");
      await axios.get("http://localhost:5000/salary/scrape").then((res) => {
        const map = new Map(Object.entries(res.data.data));
        // console.log("keys: ", map.keys());
        setCompanyData(map);
        setCompany(map.get(params.id.toLowerCase()));
        var sampleGraph = getGraphVals("software-engineer");
        // console.log("\n\nsample graph: ", sampleGraph);
        setGraphData(sampleGraph);
        console.log("company: ", map.get(params.id.toLowerCase()))
        return res.data;
      });
      return;
    }
    scrapeSalary()
    // make sure to catch any error
    .catch(console.error);;
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
                defaultValue={params.id}
                label="Search by company name"
              />
              <Button onClick={() => searchCompany(document.getElementById("company-search-text").value)}>
                <SearchIcon fontSize="large" />
              </Button>
            </Grid>
          </Grid>
          <Grid item direction="row" mt={1}>
            <DisplayCustomDropDown data={company ? company : ''} id="role-dropdown" type="Role" display="block"/>
            <DisplayCustomDropDown data={levels} id="levels-dropdown" type="Levels" display="none"/>
          </Grid>

          <Grid item id="role-level-salary-details" display="none">
            <h2>Salary Details</h2>
            <h3>Total Compensation: {companyRoleLevelDisplayData.total? companyRoleLevelDisplayData.total : ''}k</h3>
            <h3>Base: {companyRoleLevelDisplayData.total? companyRoleLevelDisplayData.base : ''}k</h3>
            <h3>Bonus: {companyRoleLevelDisplayData.total? companyRoleLevelDisplayData.bonus : ''}k</h3>
            <h3>Stock: {companyRoleLevelDisplayData.total? companyRoleLevelDisplayData.stock : ''}k</h3>
          </Grid>


          <Grid item id="discover-salaries">
            <h2>Statistics</h2>
            <DisplayGraph />
            <h2>More:</h2>
            <DisplaySampleData data={companyData} />

          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
