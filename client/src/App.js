import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";
 
// We import all the components we need in our app
//import Navbar from "./components/navbar";
import Create from "./components/create";
import Navbar from './components/Navbar/Navbar'
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Profile from "./pages/Profile/Profile";
import Form from "./pages/Profile/Form";
 
const App = () => {
  const user = localStorage.getItem("token");
  console.log("user:", user);
 return (
   <div>
     <Navbar />
     <Routes>
      <Route exact path="/" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/" exact element={<Navigate replace to="/signup" />} /> */}
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/form" element={<Form />} />
     </Routes>
   </div>
   
 );
};
 
export default App;