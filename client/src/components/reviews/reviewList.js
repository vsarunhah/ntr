import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {Button, Box, Typography, Grid } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { NavLink } from "react-router-dom";
 
const Review = (props) => (
<Grid>
  <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
  {props.review.companyName}
	</Typography>
  <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
  {props.review.description}
        </Typography>
    <Button  className="btn btn-link" to={`/review/edit/${props.review._id}`} startIcon={<EditOutlinedIcon /> } > </Button>
    <Button  className="btn btn-link"
       onClick={() => {
         props.deleteReview(props.review._id);
       }}startIcon={<RemoveCircleOutlineRoundedIcon /> } > </Button>
     {/* <Link className="btn btn-link" to={`/review/edit/${props.review._id}`}>Edit</Link> | */}
     {/* <button className="btn btn-link"
       onClick={() => {
         props.deleteReview(props.review._id);
       }}
     >
       Delete
     </button> */}
   </Grid>

);
 
export default function ReviewList() {
 const [reviews, setReviews] = useState([]);
 
 // This method fetches the reviews from the database.
 useEffect(() => {
   async function getReviews() {
    await axios.get("http://localhost:5000/reviews/")
                                .then(res => setReviews(res.data))
                                .catch(err => window.alert(err));
   }
 
   getReviews();
   return;
 }, [reviews.length]);
 
 // This method will delete a review
 async function deleteReview(id) {
    //await axios.delete(`http://localhost:5000/${id}`);
    console.log("frontend reached")
    await fetch(`http://localhost:5000/reviews/${id}`, {
        method: "DELETE"
      });
 
   const newReviews = reviews.filter((el) => el._id !== id);
   setReviews(newReviews);
 }
 
 // This method will map out the reviews on the table
 function reviewList() {
   return reviews.map((review) => {
     return (
       <Review
         review={review}
         deleteReview={() => deleteReview(review._id)}
         key={review._id}
       />
     );
   });
 }
 
 // This following section will display the table with the reviews of individuals.
 return (
   <div>
     <Typography gutterBottom variant="h5">
					Company Reviews
				</Typography>
        
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <tbody>{reviewList()}</tbody>
     </table>
     <Button
  style={{ "height": "56px", "width": "30%",}}
  variant="outlined"
  to="/review/add"
  startIcon={<AddCircleOutlineRoundedIcon />}> Add review </Button>
  <NavLink className="nav-link1" to="/review/add">
               Add Review
             </NavLink>
   </div>
   
 );
}