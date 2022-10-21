import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { Box, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import { v4 as uuidv4 } from 'uuid';

export default function CreateReview() {
  const [form, setForm] = useState({
    id: uuidv4(),
    companyName: "",
    description: "",
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

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newReview = { ...form };

    const data = {
      user_id: localStorage.getItem('user_id'),
      newReview: newReview,
    }

    try {
      await axios
        .post("http://localhost:5000/review/add", data)
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.log("oops");
    }

    setForm({ companyName: "", description: "" });
    navigate("/reviews");
  }

  return (
    <Grid>
      <Navbar />
      <Grid mx={35}>
        <Box my={10}></Box>
        <form onSubmit={onSubmit}>
          <Typography style={{ margin: "20px" }} gutterBottom variant="h5">
            Review
          </Typography>
          <Typography
            style={{ margin: "20px" }}
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
          >
            Please fill in the review information.
          </Typography>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6} className="form-group">
              <TextField
                style={{ width: "1000px", margin: "20px" }}
                placeholder="Enter company name"
                label="Company Name"
                variant="outlined"
                fullWidth
                required
                value={form.companyName}
                onChange={(e) => updateForm({ companyName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                style={{ width: "1000px", margin: "20px" }}
                multiline
                rows={4}
                placeholder=""
                label="Review Description"
                variant="outlined"
                fullWidth
                required
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
              />
            </Grid>
            <Box my={10}></Box>
            <div className="form-group">
              <input
                style={{ width: "200px", margin: "30px" }}
                type="submit"
                value="Add review"
                className="btn btn-primary"
              />
            </div>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
}
