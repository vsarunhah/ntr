import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Profile() {
 const [form, setForm] = useState({
   resume: "",
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
   const newPerson = { ...form };
 
   await fetch("http://localhost:5000/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return;
   });
 
   setForm({ resume: "" });
//    console.log(form);
//    console.log(form.resume);
   if (form.level === "Manually Fill Out Resume") {
    console.log("TRUE");
    navigate("/manual");
   }
   else{
    navigate("/");
   }   
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Choose method for creating profile</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="resumeOptions"
             id="resumeupload"
             value="Upload Resume"
             checked={form.level === "Upload Resume"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="resumeupload" className="form-check-label">Upload Resume</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="resumeOptions"
             id="resumeManual"
             value="Manually Fill Out Resume"
             checked={form.level === "Manually Fill Out Resume"}
             onChange={(e) => updateForm({ level: e.target.value })}
           />
           <label htmlFor="resumeManual" className="form-check-label">Manually Fill Out Resume</label>
         </div>
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Submit"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}