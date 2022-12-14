import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Navbar from "../../components/Navbar/Navbar";
import { InterviewCard, Review } from "./InterviewCard";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function InterviewList() {
  const [interview, setInterview] = useState([{
    company: "",
    role : "",
    tip : "",
    user_id : localStorage.getItem("user_id"),
  },]);

  useEffect(() => {
    async function getInterviews() {
      await axios
        .post("http://localhost:5000/interviews/")
        .then((res) => {
          setInterview(res.data);
          console.log("res: ", res);
        })
        .catch((err) => window.alert("in interview list", err));
    }

    getInterviews();
    return;
  }, [interview.length]);



  const tagList = [
    "Software Engineer",
    "Frontend Engineer",
    "Backend Engineer",
    "UX Designer",
    "Product Manager",
    "Hardware Engineer",
    "Graphics Tools Engineer",
    "Validation Engineer",
    "Marketing",
    "Publicity",
    "Machine Learning Engineer",
  ];

  const filterInterviews = (query, tags, interviews) => {
    if (!query && (!tags || tags.length == 0)) {
      return interviews;
    } else {
      let search = interviews;
      if (query) {
        search = search.filter((i) =>
          i.company.toLowerCase().includes(query)
        );
      }
      if (tags && tags.length != 0) {
        search = search.filter((i) => {
          let found = false;
          Array.from(tags).forEach((tag) => {
            if (i.role.includes(tag)) {
              found = true;
            }
          });
          return found;
        });
      }
      return search;
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [tagQuery, updateTagQuery] = useState([]);
  const filteredInterviews = filterInterviews(searchQuery, tagQuery, interview);

  return (
    <Grid mx={25}>
      <Navbar />
      <Typography variant="h5" style={{ margin: "70px", fontWeight: "bold" }}>
        All Interview Tips
      </Typography>
      <Grid container item spacing={2}>
        <Grid item style={{ marginLeft: "70px" }}>
          <TextField
            sx={{ width: "300px" }}
            id="outlined-basic"
            onInput={(e) => {
              setSearchQuery(e.target.value.toLowerCase());
            }}
            variant="outlined"
            fullWidth
            label="Search by company name"
          />
        </Grid>

        <Grid item sx={{ }}>
          <Box
            sx={{
              display: "flex",
              width: "57px",
              height: "56px",
              backgroundColor: "#ECECEC",
              borderRadius: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <SearchIcon fontSize="medium" />
          </Box>
        </Grid>
        <Grid>
        <FormControl sx={{ width: 300, marginLeft: '5vw', marginTop: '1.75vh' }}>
            <InputLabel>Job Title</InputLabel>
            <Select
              multiple
              value={Array.from(tagQuery)}
              onChange={(e) => updateTagQuery(Array.from(e.target.value))}
              input={<OutlinedInput label="Tags" />}
              MenuProps={MenuProps}
            >
              {tagList.map((tag) => (
                <MenuItem key={tag} value={tag}>
                  {tag}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <ul>
        <Grid container direction="row" spacing={2} style={{ margin: "20px" }}>
          {filteredInterviews.map((i) => (
            <Grid item>
              <InterviewCard
                interview={i}
              />
            </Grid>
          ))}
        </Grid>
      </ul>
      <Button
        style={{ margin: "70px", height: "56px", width: "30%" }}
        variant="outlined"
        component={Link}
        to="/createinterviewtip"
        startIcon={<AddCircleOutlineRoundedIcon />}
      >
        Add Interview Tips
      </Button>
    </Grid>
  );
}
