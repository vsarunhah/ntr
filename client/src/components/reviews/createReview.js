import React, { useState } from "react";
import { useNavigate } from "react-router";
 
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
 
   await fetch("http://localhost:5000/review/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newReview),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ companyName: "", description: ""});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Create New Review</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="companyName">CompanyName</label>
         <input
           type="text"
           className="form-control"
           id="companyName"
           value={form.companyName}
           onChange={(e) => updateForm({ companyName: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="description">Description</label>
         <input
           type="text"
           className="form-control"
           id="description"
           value={form.description}
           onChange={(e) => updateForm({ description: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Add review"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}