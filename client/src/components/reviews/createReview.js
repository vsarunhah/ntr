import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Grid from '@mui/material/Grid';
import { Box, TextField, Typography } from '@mui/material';


export default function CreateReview() {
 const [form, setForm] = useState({
    companyName: "",
    description: "",
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newReview= { ...form };

  try {
    await axios.post("http://localhost:5000/review/add", newReview).then(res => {
      console.log(res.data);
    })
  } catch (error) {
    console.log("oops");
  }
 
   setForm({ companyName: "", description: ""});
   navigate("/");
 }
 


	return (    
		<Grid>
        <Box my={10}></Box>
			<form onSubmit={onSubmit}> 
				<Typography gutterBottom variant="h5">
					Review
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p" gutterBottom>
					Please fill in the review information.
				</Typography>
                <Grid container spacing={1}>
                <Grid xs={12} sm={6} item className="form-group">
                    <TextField placeholder="Enter company name" label="Company Name" variant="outlined" fullWidth required 
                    value={form.companyName} onChange={(e) => updateForm({ companyName: e.target.value })}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField multiline rows={4} placeholder="" label="Review description" variant="outlined" fullWidth
                    value={form.description} onChange={(e) => updateForm({ description: e.target.value })} />
                </Grid>
                <div className="form-group">
                  <input
                    type="submit"
                    value="Add review"
                    className="btn btn-primary"
                  />
                </div>
                </Grid>
			</form>
		</Grid>
	);




 // This following section will display the form that takes the input from the user.
//  return (
//    <div>
//      <h3>Create New Review</h3>
//      <form onSubmit={onSubmit}>
//        <div className="form-group">
//          <label htmlFor="companyName">CompanyName</label>
//          <input
//            type="text"
//            className="form-control"
//            id="companyName"
//            value={form.companyName}
//            onChange={(e) => updateForm({ companyName: e.target.value })}
//          />
//        </div>
//        <div className="form-group">
//          <label htmlFor="description">Description</label>
//          <input
//            type="text"
//            className="form-control"
//            id="description"
//            value={form.description}
//            onChange={(e) => updateForm({ description: e.target.value })}
//          />
//        </div>
//        <div className="form-group">
//          <input
//            type="submit"
//            value="Add review"
//            className="btn btn-primary"
//          />
//        </div>
//      </form>
//    </div>
//  );
}