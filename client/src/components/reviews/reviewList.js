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
import IconButton from "@mui/material/IconButton";
import Navbar from "../../components/Navbar/Navbar";
import Rating from "@mui/material/Rating";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import BalanceIcon from "@mui/icons-material/Balance";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import GroupsIcon from "@mui/icons-material/Groups";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Diversity2Icon from "@mui/icons-material/Diversity2";
// import { tagList } from "./createReview.js";
import Chip from "@mui/material/Chip";

let tagIconMap = new Map([
  ["None", <div></div>],
  [
    "Compensation",
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        backgroundColor: "#ECECEC",
        padding: "2px",
      }}
    >
      <AttachMoneyIcon fontSize="small" sx={{}} />
    </Box>,
    // <Chip
    //   icon={<AttachMoneyIcon fontSize="small" sx={{ marginRight: 0.5 }} />}
    // />,
  ],
  [
    "Culture",
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        backgroundColor: "#ECECEC",
        padding: "2px",
      }}
    >
      <Diversity1Icon fontSize="small" sx={{}} />
    </Box>,
  ],
  [
    "Work/Life Balance",
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        backgroundColor: "#ECECEC",
        padding: "2px",
      }}
    >
      <BalanceIcon fontSize="small" sx={{}} />
    </Box>,
    // <BalanceIcon fontSize="small" sx={{ marginRight: 1 }} />,
  ],
  [
    "Benefits",
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        backgroundColor: "#ECECEC",
        padding: "2px",
      }}
    >
      <VolunteerActivismIcon fontSize="small" sx={{}} />
    </Box>,
    //<VolunteerActivismIcon fontSize="small" sx={{ marginRight: 1 }} />,
  ],
  [
    "Management",
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        backgroundColor: "#ECECEC",
        padding: "2px",
      }}
    >
      <GroupsIcon fontSize="small" sx={{}} />
    </Box>,
    // <GroupsIcon fontSize="small" sx={{ marginRight: 1 }} />,
  ],
  [
    "Career Growth",
    // <ShowChartIcon fontSize="small" sx={{ marginRight: 1 }} />,
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        backgroundColor: "#ECECEC",
        padding: "2px",
      }}
    >
      <ShowChartIcon fontSize="small" sx={{}} />
    </Box>,
  ],
  [
    "Diversity",
    <Box
      sx={{
        display: "flex",
        borderRadius: 1,
        backgroundColor: "#ECECEC",
        padding: "2px",
      }}
    >
      <Diversity2Icon fontSize="small" sx={{}} />
    </Box>,
    //<Diversity2Icon fontSize="small" sx={{ marginRight: 1 }} />
  ],
]);
import { v4 as uuidv4 } from "uuid";

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

function displayRating(rating) {
  if (rating) {
    return (
      <Grid item>
        <Rating size="small" value={rating} readOnly />
      </Grid>
    );
  }
}

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
        {displayRating(props.review.rating)}
        <Grid item>
          <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {props.review.description}
          </Typography>
        </Grid>
        {/* <Typography
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
        <Divider className="divider" style={styles.divider} /> */}
      </CardContent>
      <CardActions
        sx={{
          borderTop: 0.5,
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Grid
          container
          sx={{ justifyContent: "space-between", flexDirection: "row" }}
        >
          <Grid item style={{ display: "flex" }} flex-direction="row">
            {props.review.tags.map((tag) => (
              <Grid item mr="7px" mt="9px">
                {tagIconMap.get(tag)}
              </Grid>
            ))}
          </Grid>
          <Grid item style={{ display: "flex" }} flex-direction="row">
            <Grid item>
              <IconButton
                className="btn btn-link"
                component={Link}
                to={`/review/edit/${props.review._id}`}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                className="btn btn-link"
                onClick={() => {
                  props.deleteReview(props.review._id);
                }}
              >
                <RemoveCircleOutlineRoundedIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
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
    // await axios
    //   .delete(`http://localhost:5000/reviews/${id}`)
    //   .catch((err) => window.alert(err));
    console.log("delete review: ", id);
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

  // This following section will display the table with the reviews of individuals.
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
