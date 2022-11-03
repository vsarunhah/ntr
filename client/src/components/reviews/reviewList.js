import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Navbar from "../../components/Navbar/Navbar";
import { Review } from "./reviewCard";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      await axios
        .get("http://localhost:5000/reviews/")
        .then((res) => {
          setReviews(res.data);
          console.log("res: ", res);
        })
        .catch((err) => window.alert(err));
    }

    getReviews();
    return;
  }, [reviews.length]);

  async function deleteReview(id) {
    const data = {
      user_id: localStorage.getItem("user_id"),
      reviewId: id,
    };
    await axios
      .post("http://localhost:5000/reviews/delete", data)
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => window.alert(err));

    const newReviews = reviews.filter((el) => el.id !== id);
    setReviews(newReviews);
  }

  const filterReviews = (query, reviews) => {
    if (!query) {
      return reviews;
    } else {
      return reviews.filter((review) =>
        review.companyName.toLowerCase().includes(query)
      );
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredReviews = filterReviews(searchQuery, reviews);

  return (
    <Grid mx={25}>
      <Navbar />
      <Typography variant="h5" style={{ margin: "70px", fontWeight: "bold" }}>
        All Company Reviews
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
        <Grid item sx={{ position: "absolute", top: 157, right: 800 }}>
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
      </Grid>
      <ul>
        <Grid container direction="row" spacing={2} style={{ margin: "20px" }}>
          {filteredReviews.map((review) => (
            <Grid item>
              <Review
                review={review}
                deleteReview={() => deleteReview(review.id)}
                key={review.id}
              />
            </Grid>
          ))}
        </Grid>
      </ul>
      <Button
        style={{ margin: "70px", height: "56px", width: "30%" }}
        variant="outlined"
        component={Link}
        to="/review/add"
        startIcon={<AddCircleOutlineRoundedIcon />}
      >
        Add review
      </Button>
    </Grid>
  );
}
