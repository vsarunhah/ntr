import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
 
const Review = (props) => (
 <tr>
   <td>{props.review.companyName}</td>
   <td>{props.review.description}</td>
   <td>
     <Link className="btn btn-link" to={`/review/edit/${props.review._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteReview(props.review._id);
       }}
     >
       Delete
     </button>
   </td>
 </tr>
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
     <h3>Review List</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
           <th>CompanyName</th>
           <th>Description</th>
         </tr>
       </thead>
       <tbody>{reviewList()}</tbody>
     </table>
   </div>
 );
}