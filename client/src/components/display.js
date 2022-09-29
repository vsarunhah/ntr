import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Display() {
 const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
   records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     //const id = params.id.toString();
     const response = await fetch(`http://localhost:5000/dbprofile/6335e9e1b2baf0a7e353325a`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
    //  if (!record) {
    //    window.alert(`Record with id ${id} not found`);
    //    navigate("/");
    //    return;
    //  }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     name: form.name,
     position: form.position,
     level: form.level,
     first_name: form.first_name,
     last_name: form.last_name,
     email: form.email,
     phone: form.phone,
     address: form.address,
   };
 
   // This will send a post request to update the data in the database.
//    await fetch(`http://localhost:5000/update/${params.id}`, {
//      method: "POST",
//      body: JSON.stringify(editedPerson),
//      headers: {
//        'Content-Type': 'application/json'
//      },
//    });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Update Record</h3>
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
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}