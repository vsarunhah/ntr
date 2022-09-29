import React, { useState } from "react";
import { useNavigate } from "react-router";
 
export default function Profile() {
 const [form, setForm] = useState({
   first_name: "",
   last_name: "",
   email: "",
   phone: "",
   address: "",
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
 
   await fetch("http://localhost:5000/dbprofile/add", {
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
 
   setForm({ first_name: "",
   last_name: "",
   email: "",
   phone: "",
   address: "",});
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Fill your resume</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="first_name">First Name</label>
         <input
           type="text"
           className="form-control"
           id="first_name"
           value={form.first_name}
           onChange={(e) => updateForm({ first_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="last_name">Last Name</label>
         <input
           type="text"
           className="form-control"
           id="last_name"
           value={form.last_name}
           onChange={(e) => updateForm({ last_name: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="email">Email</label>
         <input
           type="text"
           className="form-control"
           id="email"
           value={form.email}
           onChange={(e) => updateForm({ email: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="phone">Phone Number</label>
         <input
           type="text"
           className="form-control"
           id="phone"
           value={form.phone}
           onChange={(e) => updateForm({ phone: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="address">Address</label>
         <input
           type="text"
           className="form-control"
           id="address"
           value={form.address}
           onChange={(e) => updateForm({ address: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Create person"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}