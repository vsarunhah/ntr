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
  CardActions,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import Navbar from "../../components/Navbar/Navbar";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";

const styles = {
  card: {
    width: 300,
    height: 200,
    margin: "auto",
    transition: "0.3s",
    "&:hover": {
      boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
    },
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
  },
  content: {
    textAlign: "left",
    direction: "column",
  },
  heading: {
    fontWeight: "bold",
  },
  subheading: {
    lineHeight: 1.8,
  },
  actions: {
    marginBottom: "10px",
  },
};

const Review = (props) => (
  <Grid container direction="column" alignItems="center">
    <Card className="card" style={styles.card}>
      <CardContent className="content" style={styles.content}>
        <Grid item>
          <Typography
            className={"MuiTypography--heading"}
            variant={"h6"}
            gutterBottom
          >
            {props.review.companyName}
          </Typography>
        </Grid>
        {/* <Grid item>
          <Rating
            size="small"
            // name="simple-controlled"
            // value={value}
            // onChange={(event, newValue) => {
            //   setValue(newValue);
            // }}
          />
        </Grid> */}
        <Grid item>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {props.review.description}
          </Typography>
        </Grid>
      </CardContent>
      <CardActions
        disableSpacing
        sx={{ borderTop: 0.5, justifyContent: "flex-end" }}
      >
        <IconButton
          className="btn btn-link"
          component={Link}
          to={`/review/edit/${props.review._id}`}
        >
          <EditOutlinedIcon />
        </IconButton>
        <IconButton
          className="btn btn-link"
          onClick={() => {
            props.deleteReview(props.review._id);
          }}
        >
          <RemoveCircleOutlineRoundedIcon />
        </IconButton>
      </CardActions>
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
        .then((res) => setReviews(res.data))
        .catch((err) => window.alert(err));
    }

    getReviews();
    return;
  }, [reviews.length]);

  // This method will delete a review
  async function deleteReview(id) {
    //await axios.delete(`http://localhost:5000/${id}`);
    console.log("frontend reached");
    await fetch(`http://localhost:5000/reviews/${id}`, {
      method: "DELETE",
    });

    const newReviews = reviews.filter((el) => el._id !== id);
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
                deleteReview={() => deleteReview(review._id)}
                key={review._id}
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
