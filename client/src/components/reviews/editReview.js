import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import { Box, TextField, Typography } from "@mui/material";
import Navbar from "../../components/Navbar/Navbar";
import Rating from "@mui/material/Rating";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";

export default function EditReview() {
  const [form, setForm] = useState({
    companyName: "",
    description: "",
    rating: "0",
    records: [],
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

  const handleChange = (event) => {
    updateForm({ rating: event.target.value });
  };

  async function onSubmit(e) {
    e.preventDefault();
    const editedReview = {
      companyName: form.companyName,
      description: form.description,
      rating: form.rating,
    };

    await axios
      .post(`http://localhost:5000/review/update/${params.id}`, editedReview)
      .catch((err) => window.alert(err));

    navigate("/reviews");
  }

  function deleteRating() {
    updateForm({ rating: null });
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
            <Rating size="small" value={form.rating} onChange={handleChange} />
          </Grid>
          <Grid item marginLeft={"20px"}>
            <IconButton
              onClick={() => {
                deleteRating();
              }}
              size="small"
            >
              <DeleteOutlineIcon />
            </IconButton>
          </Grid>
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
