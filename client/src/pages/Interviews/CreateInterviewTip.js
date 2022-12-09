import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { TextField, Typography, Button } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Rating from "@mui/material/Rating";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { v4 as uuidv4 } from "uuid";

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

export default function CreateInterviewTip() {
  const [interview, setInterview] = useState({
    company: "",
    role : "",
    tip : "",
    user_id : localStorage.getItem("user_id"),
  },);
  const navigate = useNavigate();


  async function onSubmit(e) {
    e.preventDefault();
    const data = {
      user_id: localStorage.getItem("user_id"),
      company : interview.company,
      role : interview.role,
      tip : interview.tip,
    };

    try {
      await axios.post("http://localhost:5000/interview/add", data).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log("oops");
    }

    navigate("/interviewlist");
  }

  return (
    <Grid mx={35} style={{ display: "grid" }}>
      <Navbar />
      <form onSubmit={onSubmit}>
        <Grid item>
          <Typography my={"20px"} variant="h5">
            New Interview Tip
          </Typography>
          <Typography my={"20px"} variant="body2" color="textSecondary">
            Please fill in the interview tips information.
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            my={"20px"}
            style={{ width: "1000px" }}
            placeholder="Enter company name"
            label="Company Name"
            variant="outlined"
            fullWidth
            required
            value={interview.company}
            onChange={(e) => setInterview({ ...interview, company: e.target.value })}
          />
        </Grid>
        <Grid item style={{ display: "grid", alignItems: "left" }} my={"20px"}>
          <TextField
            style={{ width: "1000px" }}
            multiline
            rows={4}
            placeholder="Enter Interview Tips"
            label="Interview Tips"
            variant="outlined"
            fullWidth
            required
            value={interview.tip}
            onChange={(e) => setInterview({ ...interview, tip: e.target.value })}
          />
        </Grid>
        <Grid item my={"20px"}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel>Tags</InputLabel>
            <Select
              value={interview.role}
              onChange={(e) => setInterview({ ...interview, role: e.target.value })}
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
        <div className="form-group">
          <Button
            style={{height: "56px", width: "30%" }}
            variant="outlined"
            type="submit"
            value="Create Interview Tip"
            className="btn btn-primary"
          >
            Add Interview Tip
          </Button>
        </div>
      </form>
    </Grid>
  );
}

export { tagList, MenuProps };
