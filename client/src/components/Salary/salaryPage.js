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
    console.log("before scraper");
    await axios.get("http://localhost:5000/salary/scrape").then((res) => {
      console.log("after scraper: ", res.data);
      return res.data;
    });
    return;
  }

  useEffect(() => {
    scrapeSalary();
    return;
  }, []);

  return (
    <Grid mx={25}>
      <Navbar />
      <Typography variant="h5" style={{ margin: "70px", fontWeight: "bold" }}>
        Salary Page
      </Typography>
    </Grid>
  );
}
