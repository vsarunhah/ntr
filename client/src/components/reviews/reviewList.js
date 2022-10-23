import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Button,
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Navbar from "../../components/Navbar/Navbar";
import { v4 as uuidv4 } from 'uuid';

const styles = {
  card: {
    width: 300,
    height: 200,
    margin: "auto",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
  },
  content: {
    textAlign: "left",
  },
  divider: {
    margin: "40px",
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
};

const Review = (props) => (
  <Grid item direction="row" alignItems="center">
    <Card className="card" style={styles.card}>
      <CardContent className="content" style={styles.content}>
        <Typography
          className={"MuiTypography--heading"}
          variant={"h6"}
          gutterBottom
        >
          {props.review.companyName}
        </Typography>
        <Typography className={"MuiTypography--subheading"} variant={"caption"}>
          {props.review.description}
        </Typography>
        <Button
          marginLeft="auto"
          className="btn btn-link"
          component={Link}
          to={`/review/edit/${props.review.id}`}
          startIcon={<EditOutlinedIcon />}
        ></Button>
        <Button
          className="btn btn-link"
          onClick={() => {
            props.deleteReview(props.review.id);
          }}
          startIcon={<RemoveCircleOutlineRoundedIcon />}
        >
          {" "}
        </Button>
        <Divider className="divider" style={styles.divider} />
      </CardContent>
    </Card>
  </Grid>
);

export default function ReviewList() {
  const [reviews, setReviews] = useState([]);

  // This method fetches the reviews from the database.
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

  // This method will delete a review
  async function deleteReview(id) {
    console.log("delete review: ", id);
    const data = {
      user_id: localStorage.getItem('user_id'),
      reviewId: id,
    }
    await axios
        .post("http://localhost:5000/reviews/delete", data)
        .then((res) => {
          console.log("res: ", res);
        })
        .catch((err) => window.alert(err));

    const newReviews = reviews.filter((el) => el.id !== id);
    setReviews(newReviews);
  }

  // This following section will display the table with the reviews of individuals.
  return (
    <Grid mx={35}>
      <Navbar />
      <Typography
        gutterBottom
        variant="h5"
        style={{ margin: "70px", fontWeight: "bold" }}
      >
        Company Reviews
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
