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
          to={`/review/edit/${props.review._id}`}
          startIcon={<EditOutlinedIcon />}
        ></Button>
        <Button
          className="btn btn-link"
          onClick={() => {
            props.deleteReview(props.review._id);
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
    <div>
      <Typography
        gutterBottom
        variant="h5"
        style={{ margin: "100px", fontWeight: "bold" }}
      >
        Company Reviews
      </Typography>
      <ul>
        <Grid container direction="row" spacing={2} style={{ margin: "50px" }}>
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
        style={{ margin: "100px", height: "56px", width: "30%" }}
        variant="outlined"
        component={Link}
        to="/review/add"
        startIcon={<AddCircleOutlineRoundedIcon />}
      >
        Add review
      </Button>
    </div>
  );
}
