import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from './components/Navbar/Navbar'
import Navbar from './components/Navbar/Navbar'
import Signup from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Form from "./pages/Profile/Form";
import Profile from './pages/Profile/Profile';
import Applications from './pages/Applications/Applications';
import Reviews from './pages/Reviews/Reviews';
import MainReviewPage from './pages/Reviews/MainReviewPage';
import EditProfile from "./pages/Profile/EditProfile";
import ManualOrResume from "./pages/Profile/ManualOrResume"
 
const App = () => {
  const user = localStorage.getItem("token");
  console.log("user:", user);
 return (
   <div>
     <Navbar />
     <Routes>
     </Routes>
   </div>
   
 );
};
 
export default App;
