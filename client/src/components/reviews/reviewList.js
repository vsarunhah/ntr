import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button, Typography, Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Navbar from "../../components/Navbar/Navbar";
import { Review } from "./reviewCard";

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

  return (
    <Grid mx={25}>
      <Navbar />
      <Typography variant="h5" style={{ margin: "70px", fontWeight: "bold" }}>
        All Company Reviews
      </Typography>
      <ul>
        <Grid container direction="row" spacing={2} style={{ margin: "20px" }}>
          {reviews.map((review) => (
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
