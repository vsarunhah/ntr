import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Grid, InputAdornment, Stack } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from "react-router";
import { defaultRoleList, defaultCompanyData } from "./sampleData";
import { grey } from '@mui/material/colors';


export default function SalaryPage() {

    const [salary, setSalary] = useState("");
    const [companySearchQuery, setCompanySearchQuery] = useState("");
    const [roleSearchQuery, setRoleSearchQuery] = useState("");
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

    async function scrape(company) {
        console.log("scraping ", company);
    }

    async function searchCompany(company) {
        console.log("searching for ", company);
        navigate("/salary/company/" + company);
    }

    async function searchRole(company) {
        console.log("searching for ", company);
        navigate("/salary/company/" + company);
    }


    function DisplayCompanyData(data) {
        return (
            <Stack direction="row" sx={{ flexWrap: "wrap" }}>
                {data.data.map(({ name, base, bonus, stocks }) => (
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
                            onClick={() => searchCompany("display company data")}
                        >
                            {name}
                        </Button>
                    </Typography>
                ))}
            </Stack>
        )
    }

    function DisplayCompanySearchBar() {
        return (
            <Grid item xs={5} display="block" id="company-search">
                <TextField
                    sx={{ width: "800px" }}
                    onInput={(e) => {
                        setCompanySearchQuery(e.target.value.toLowerCase());
                    }}
                    variant="outlined"
                    fullWidth
                    label="Search for a company"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Link>
                                    <SearchIcon fontSize="large" onClick={() => {
                                        searchCompany(companySearchQuery)
                                    }} />
                                </Link>
                            </InputAdornment>
                        ),
                    }}

                />
                <Link onClick={() => {
                    switchToRole(companySearchQuery)
                }}> Search by Role instead </Link>
            </Grid>
        );
    }

    return (
        <Grid container direction="row">
            <Grid item xs={2} mx={1}>
                <Navbar />
            </Grid>
            <Grid item sx={{ flexWrap: "wrap" }} xs={9}>
                <Typography variant="h5" mt={5}>
                    Salary
                </Typography>
                <Grid item xs={5} display="none" id="company-search" direction="column">
                    <TextField
                        sx={{ width: "800px" }}
                        id="company-search-text"
                        onInput={(e) => {
                            setCompanySearchQuery(e.target.value.toLowerCase());
                        }}
                        variant="outlined"
                        fullWidth
                        label="Search by company name"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Link>
                                        <SearchIcon fontSize="large" onClick={() => {
                                            searchCompany(companySearchQuery)
                                        }} />
                                    </Link>
                                </InputAdornment>
                            ),
                        }}

                    />
                    <Link onClick={switchToRole}> Search by Role instead </Link>
                </Grid>
                <Grid item xs={5} display="block" id="role-search">
                    <TextField
                        sx={{ width: "800px" }}
                        id="role-search-text"
                        onInput={(e) => {
                            setRoleSearchQuery(e.target.value.toLowerCase());
                        }}
                        variant="outlined"
                        fullWidth
                        label="Search by role name"
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <Link>
                                        <SearchIcon fontSize="large" onClick={() => {
                                            searchRole(roleSearchQuery)
                                        }} />
                                    </Link>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Link onClick={switchToCompany}> Search by Company instead </Link>

                </Grid>
                <Typography variant="h6" mt={5}>
                    Discover Companies
                </Typography>
                <DisplayCompanyData data={defaultCompanyData}></DisplayCompanyData>
            </Grid>

        </Grid>
    );
}
