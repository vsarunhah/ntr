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

export default function Role() {

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

    async function searchRole(role) {
        console.log("searching for ", role);
        navigate("/salary/role/" + role);
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
                            onClick={() => searchRole(key.toLowerCase())}
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


    function getGraphVals(val) {
        var sampleGraph = [];

        console.log("GRAPH: ", val);



        for (let [key, value] of val) {
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

        console.log("SAMPLE GRAPH: ", sampleGraph);

        return sampleGraph;
    }

    useEffect(() => {
        const scrapeSalary = async () => {
            console.log("before scraper");
            await axios.get("http://localhost:5000/salary/scrape").then((res) => {
                const map = new Map(Object.entries(res.data.data));
                console.log("map: ", map);
                console.log("map[google]: ", map.get("google"));
                const googleMap = new Map(Object.entries(map.get("google")));
                console.log("gmap:", googleMap);
                console.log("googleMap[swe]", googleMap.get(params.id.toLowerCase()));
                // var sampleGraph = getGraphVals(googleMap.get(params.id.toLowerCase()));
                var sampleGraph = getGraphVals(new Map(Object.entries(googleMap.get(params.id.toLowerCase()))))
                console.log("\n\nsample graph: ", sampleGraph);
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

    }, [params.id])


    return (
        <Grid container direction="row">
            <Grid item xs={2} mx={1}>
                <Navbar />
            </Grid>
            <Grid item sx={{ flexWrap: "wrap" }} xs={9}>
                <Typography variant="h5" style={{ fontWeight: "bold" }} mt={5}>
                    Role
                </Typography>

                <Typography variant="body2">
                    <Grid item>
                        <Grid item xs={10} display="block" id="role-search" direction="column">
                            <TextField
                                sx={{ width: "800px" }}
                                id="role-search-text"
                                variant="outlined"
                                fullWidth
                                defaultValue={params.id}
                                label="Search by role name"
                            />
                            <Button onClick={() => searchRole(document.getElementById("role-search-text").value)}>
                                <SearchIcon fontSize="large" />
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid item id="role-level-salary-details" display="none">
                        <h2>Salary Details</h2>
                        <h3>Total Compensation: {companyRoleLevelDisplayData.total ? companyRoleLevelDisplayData.total : ''}k</h3>
                        <h3>Base: {companyRoleLevelDisplayData.total ? companyRoleLevelDisplayData.base : ''}k</h3>
                        <h3>Bonus: {companyRoleLevelDisplayData.total ? companyRoleLevelDisplayData.bonus : ''}k</h3>
                        <h3>Stock: {companyRoleLevelDisplayData.total ? companyRoleLevelDisplayData.stock : ''}k</h3>
                    </Grid>


                    <Grid item id="discover-salaries">
                        <h2>Statistics</h2>
                        <DisplayGraph />

                    </Grid>
                </Typography>
            </Grid>
        </Grid>
    );
}
