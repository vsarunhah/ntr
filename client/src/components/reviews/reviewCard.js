import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import BalanceIcon from "@mui/icons-material/Balance";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import GroupsIcon from "@mui/icons-material/Groups";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import Diversity2Icon from "@mui/icons-material/Diversity2";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';

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
  tags: {
    display: "flex",
    borderRadius: 4,
    backgroundColor: "#ECECEC",
    padding: "2px",
  },
};

let tagIconMap = new Map([
  ["None", <div></div>],
  [
    "Compensation",
    <Box style={styles.tags}>
      <AttachMoneyIcon fontSize="small" />
    </Box>,
  ],
  [
    "Culture",
    <Box style={styles.tags}>
      <Diversity1Icon fontSize="small" />
    </Box>,
  ],
  [
    "Work/Life Balance",
    <Box style={styles.tags}>
      <BalanceIcon fontSize="small" />
    </Box>,
  ],
  [
    "Benefits",
    <Box style={styles.tags}>
      <VolunteerActivismIcon fontSize="small" />
    </Box>,
  ],
  [
    "Management",
    <Box style={styles.tags}>
      <GroupsIcon fontSize="small" />
    </Box>,
  ],
  [
    "Career Growth",
    <Box style={styles.tags}>
      <ShowChartIcon fontSize="small" />
    </Box>,
  ],
  [
    "Diversity",
    <Box style={styles.tags}>
      <Diversity2Icon fontSize="small" />
    </Box>,
  ],
]);

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
                onClick={() => {
                  props.upvoteReview(props.review.user);
                }}
              >
                {props.alreadyUpvoted ? <ThumbUpIcon /> : <ThumbUpAltOutlinedIcon />}
              </IconButton>
              <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {props.review.upvotes ? props.review.upvotes.length : 0}
          </Typography>
            </Grid>
            <Grid item>
              <IconButton
                className="btn btn-link"
                onClick={() => {
                  props.downvoteReview(props.review.user);
                }}
              >
                {props.alreadyDownvoted ? <ThumbDownIcon /> : <ThumbDownAltOutlinedIcon />}
              </IconButton>
              <Typography
            className={"MuiTypography--subheading"}
            variant={"caption"}
          >
            {props.review.downvotes ? props.review.downvotes.length : 0}
          </Typography>
            </Grid>
            {props.user == localStorage.getItem("user_id") && <Grid item>
              <IconButton
                className="btn btn-link"
                component={Link}
                to={`/review/edit/${props.review.id}`}
              >
                <EditOutlinedIcon />
              </IconButton>
            </Grid>}
            <Grid item>
              <IconButton
                className="btn btn-link"
                onClick={() => {
                  props.deleteReview(props.review.id);
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

export { Review };
