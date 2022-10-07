import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Grid from '@mui/material/Grid';
import { Box, TextField, Typography } from '@mui/material';
 
export default function EditReview() {
 const [form, setForm] = useState({
   companyName: "",
   description: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/reviews/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const review = await response.json();
     if (!review) {
       window.alert(`Review with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(review);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedReview = {
     companyName: form.companyName,
     description: form.description,
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5000/review/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedReview),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/reviews");
 }
 
 // This following section will display the form that takes input from the user to update the data.

 return (    
  <Grid>
    <Box my={10}></Box>
    <form onSubmit={onSubmit}> 
      <Typography style={{margin: "20px" }} gutterBottom variant="h5">
        Review
      </Typography>
      <Typography style={{margin: "20px" }} variant="body2" color="textSecondary" component="p" gutterBottom>
        Please update the review information.
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6} className="form-group">
            <TextField style={{ width: "1000px", margin: "20px" }} placeholder="Enter company name" label="Company Name" variant="outlined" fullWidth required 
            value={form.companyName} onChange={(e) => updateForm({ companyName: e.target.value })}/>
        </Grid>
        <Grid item xs={12}>
            <TextField style={{ width: "1000px", margin: "20px" }} multiline rows={4} placeholder="" label="Review Description" variant="outlined" fullWidth required
            value={form.description} onChange={(e) => updateForm({ description: e.target.value })} />
        </Grid>
        <Box my={10}></Box>
        <div className="form-group">
          <input
            style={{ width: "200px", margin: "30px" }}
            type="submit"
            value="Update Review"
            className="btn btn-primary"
          />
        </div>
      </Grid>
    </form>
  </Grid>
);

//  return (
//    <div>
//      <h3>Update Review</h3>
//      <form onSubmit={onSubmit}>
//        <div className="form-group">
//          <label htmlFor="companyName">Company Name: </label>
//          <input
//            type="text"
//            className="form-control"
//            id="companyName"
//            value={form.companyName}
//            onChange={(e) => updateForm({ companyName: e.target.value })}
//          />
//        </div>
//        <div className="form-group">
//          <label htmlFor="description">Description: </label>
//          <input
//            type="text"
//            className="form-control"
//            id="description"
//            value={form.description}
//            onChange={(e) => updateForm({ description: e.target.value })}
//          />
//        </div>
//        <br />
 
//        <div className="form-group">
//          <input
//            type="submit"
//            value="Update Review"
//            className="btn btn-primary"
//          />
//        </div>
//      </form>
//    </div>
//  );
}