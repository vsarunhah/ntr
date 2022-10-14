import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Box, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Rating from "@mui/material/Rating";

export default function CreateReview() {
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    rating: "0",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    const newReview = { ...form };

    await axios
      .post("http://localhost:5000/review/add", newReview)
      .catch((err) => window.alert(err));

    setForm({ companyName: "", description: "" });
    navigate("/reviews");
  }

  const handleChange = (event) => {
    updateForm({ rating: event.target.value });
  };

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
          <Typography variant="body2" color="textSecondary">
            Rating:
          </Typography>
          <Rating size="small" value={form.rating} onChange={handleChange} />
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
