import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Rating from "@mui/material/Rating";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { v4 as uuidv4 } from "uuid";

const tagList = [
  "Compensation",
  "Culture",
  "Work/Life Balance",
  "Benefits",
  "Management",
  "Career Growth",
  "Diversity",
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

export default function CreateReview() {
  const [form, setForm] = useState({
    id: uuidv4(),
    companyName: "",
    description: "",
    rating: "0",
    tags: [],
  });
  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newReview = { ...form };
    const data = {
      user_id: localStorage.getItem("user_id"),
      newReview: newReview,
    };

    try {
      await axios.post("http://localhost:5000/review/add", data).then((res) => {
        console.log(res.data);
      });
    } catch (error) {
      console.log("oops");
    }

    navigate("/reviews");
  }

  return (
    <Grid mx={35} style={{ display: "grid" }}>
      <Navbar />
      <form onSubmit={onSubmit}>
        <Grid item>
          <Typography my={"20px"} variant="h5">
            New Review
          </Typography>
          <Typography my={"20px"} variant="body2" color="textSecondary">
            Please fill in the review information.
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
            value={form.companyName}
            onChange={(e) => updateForm({ companyName: e.target.value })}
          />
        </Grid>
        <Grid item style={{ display: "grid", alignItems: "left" }} my={"20px"}>
          <TextField
            style={{ width: "1000px" }}
            multiline
            rows={4}
            placeholder="Enter Review Description"
            label="Review Description"
            variant="outlined"
            fullWidth
            required
            value={form.description}
            onChange={(e) => updateForm({ description: e.target.value })}
          />
        </Grid>
        <Grid item style={{ display: "grid", alignItems: "left" }} my={"20px"}>
          <Typography variant="body2" color="textSecondary">
            Rating:
          </Typography>
          <Rating
            value={form.rating}
            onChange={(e) => updateForm({ rating: e.target.value })}
          />
        </Grid>
        <Grid item my={"20px"}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel>Tags</InputLabel>
            <Select
              multiple
              value={form.tags}
              onChange={(e) => updateForm({ tags: e.target.value })}
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
          <input
            style={{ width: "200px" }}
            my={"20px"}
            type="submit"
            value="Create Review"
            className="btn btn-primary"
          />
        </div>
      </form>
    </Grid>
  );
}

export { tagList, MenuProps };
