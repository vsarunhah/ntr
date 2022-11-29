import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Grid } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Navbar from "../../components/Navbar/Navbar";
import { Review } from "./InterviewCard";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export default function InterviewList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function getReviews() {
      await axios
        .get("http://localhost:5000/interviews/")
        .then((res) => {
          setReviews(res.data);
          console.log("res: ", res);
        })
        .catch((err) => window.alert(err));
    }

    getReviews();
    return;
  }, [reviews.length]);



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
                //deleteReview={() => deleteReview(review.id)}
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
        //to="/review/add"
        startIcon={<AddCircleOutlineRoundedIcon />}
      >
        Add Interview Tip
      </Button>
    </Grid>
  );
}
