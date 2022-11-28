import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Navbar from "../Navbar/Navbar";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function SalaryPage() {
  async function scrapeSalary() {
    // console.log("before scraper");
    // const sal = await axios.get("http://localhost:5000/salary/scraper");
    // console.log("after scraper: ", sal.data);
    // return sal.data;
    await axios.get("http://localhost:5000/salary/scraper/company");
    return;
  }

  // const [salary, setSalary] = useState("");

  //runs on first render only
  useEffect(async () => {
    // const getSalary = async () => {
    //   const sal = await scrapeSalary();
    //   console.log("sal: ", sal.data);
    //   setSalary(sal.data);
    // };

    // getSalary();
    await scrapeSalary();
    return;
  }, []);

  // useEffect(() => {
  //   setSalary("25k");
  // }, []);

  return (
    <Grid mx={25}>
      <Navbar />
      <Typography variant="h5" style={{ margin: "70px", fontWeight: "bold" }}>
        Salary Page
      </Typography>
      {/* <Typography variant="body2" style={{ margin: "70px" }}>
        {salary}
      </Typography> */}
    </Grid>
  );
}
