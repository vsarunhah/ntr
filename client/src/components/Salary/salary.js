import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Grid, Stack } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router";
import { defaultRoleList, defaultCompanyData } from "./sampleData";
import { grey } from '@mui/material/colors';

export default function SalaryPage() {

  /* constants */

  const navigate = useNavigate();


  function switchToCompany() {
    document.getElementById("company-search").style.display = "block";
    document.getElementById("role-search").style.display = "none";
    document.getElementById("discover-salaries").style.display = "block";
    document.getElementById("discover-roles").style.display = "none";
  }

  function switchToRole() {
    document.getElementById("role-search").style.display = "block";
    document.getElementById("company-search").style.display = "none";
    document.getElementById("discover-roles").style.display = "block";
    document.getElementById("discover-salaries").style.display = "none";
  }

  function searchCompany(company) {
    console.log("searching for ", company);
    let path = `/salary/company/` + company;
    console.log("path: ", path);
    navigate(path);
  }

  function searchRole(role) {
    console.log("searching for ", role);
    navigate("/salary/role/" + role);
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
              onClick={() => searchCompany(name.toLowerCase())}
            >
              {name}
            </Button>
          </Typography>
        ))}
      </Stack>
    )
  }


  function DisplayCompanyGraph() {
    return (
      <BarChart
        width={700}
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

  function DisplayRoleGraph() {
    return (
      <BarChart
        width={700}
        height={500}
        data={defaultRoleList.slice(0, 5)}
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
        <Bar dataKey="avgTotalComp" fill="#8884d8" />
      </BarChart>
    )
  }

  // useEffect(() => {
  //   // declare the data fetching function
  //   const getSalary = async () => {
  //     const sal = await scrapeSalary();
  //     // console.log("sal: ", sal.data);
  //     setSalary(sal.data);
  //   };

  //   getSalary()
  //     .catch(console.error);
  // },)


  return (
    <Grid container direction="row">
      <Grid item xs={2} mx={1}>
        <Navbar />
      </Grid>
      <Grid item sx={{ flexWrap: "wrap" }} xs={9}>
        <Typography variant="h5" style={{ fontWeight: "bold" }} mt={5}>
          Salary
        </Typography>

        <Typography variant="body2">
          <Grid item>
            <Grid item xs={10} display="block" id="company-search" direction="column">
              <TextField
                sx={{ width: "800px" }}
                id="company-search-text"
                variant="outlined"
                fullWidth
                label="Search by company name"
              />
              <Button onClick={() => searchCompany(document.getElementById("company-search-text").value)}>
                <SearchIcon fontSize="large" />
              </Button>
              <Link onClick={switchToRole}> Search by Role instead </Link>

            </Grid>
            <Grid item xs={10} display="none" id="role-search">
              <TextField
                sx={{ width: "800px" }}
                id="role-search-text"
                variant="outlined"
                fullWidth
                label="Search by role name"
              />
              <Button onClick={() => searchRole(document.getElementById("role-search-text").value)}>
                <SearchIcon fontSize="large" />
              </Button>
              <Link onClick={switchToCompany}> Search by Company instead </Link>

            </Grid>
          </Grid>
          <Grid item id="discover-salaries">
            <h2>Discover Salaries:</h2>
            <DisplaySampleData data={defaultCompanyData} />
            <h2>Statistics</h2>
            <DisplayCompanyGraph />
          </Grid>
          <Grid item id="discover-roles" display="none">
            <h2>Discover Roles:</h2>
            <DisplaySampleData data={defaultRoleList} />
            <h2>Statistics</h2>
            <DisplayRoleGraph />
          </Grid>
        </Typography>
      </Grid>
    </Grid>
  );
}
