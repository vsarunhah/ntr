import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import { Box, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Rating from "@mui/material/Rating";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { tagList, MenuProps } from "./createReview.js";

export default function EditReview() {
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    rating: null, //set back to 0 if things break
    tags: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:5000/reviews/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const review = await response.json();
      if (!review) {
        window.alert(`Review with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(review);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedReview = {
      companyName: form.companyName,
      description: form.description,
      rating: form.rating,
      tags: form.tags,
    };

    await axios
      .post(`http://localhost:5000/review/update/${params.id}`, editedReview)
      .catch((err) => window.alert(err));

    navigate("/reviews");
  }

  return (
    <Grid mx={35} style={{ display: "grid" }}>
      <Navbar />
      <form onSubmit={onSubmit}>
        <Grid item>
          <Typography my={"20px"} variant="h5">
            Edit Review
          </Typography>
          <Typography my={"20px"} variant="body2" color="textSecondary">
            Please update the review information.
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
        <Grid
          item
          container
          style={{ display: "flex", alignItems: "left" }}
          my={"20px"}
          flex-direction="row"
        >
          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Rating:
            </Typography>
            <Rating
              value={form.rating}
              onChange={(e) => updateForm({ rating: e.target.value })}
            />
          </Grid>
          <Grid item marginLeft={"20px"}>
            <IconButton
              onClick={() => {
                updateForm({ rating: null });
              }}
              size="small"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
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
            value="Update Review"
            className="btn btn-primary"
          />
        </div>
      </form>
    </Grid>
  );
}
