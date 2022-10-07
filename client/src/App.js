import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

import Signup from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
 
import Applied from "./components/applied";

const App = () => {
  const user = localStorage.getItem("token");
  console.log("user:", user);
  const uid = localStorage.getItem("uid");
  console.log("uid:", uid);
 return (
   <div>
     <Navbar />
     <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route exact path="/" element={user ? <Main /> : <Navigate to="/login" />}/>
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      <Route path="/create" element={<Create />} />
      <Route path="/applied" element={<Applied />} />
     </Routes>
   </div>
 );
};
 
export default App;