import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from './components/Navbar/Navbar'
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";

import Signup from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";

import Profile from './pages/Profile/Profile';
import Applications from './pages/Applications/Applications';
import Reviews from './pages/Reviews/Reviews';
import MainReviewPage from './pages/Reviews/MainReviewPage';
import Form from "./pages/Profile/Form";
import EditProfile from "./pages/Profile/EditProfile";
import ManualOrResume from "./pages/Profile/ManualOrResume"
 
const App = () => {
  const user = localStorage.getItem("token");
  console.log("user:", user);
 return (
   <div>
     <Navbar />
     <Routes>
       {/* <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} /> */}
        <Route path="/" element={<ManualOrResume />}/>
        <Route path="manualorresume" element={< ManualOrResume/>} />
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="reviews" element={<MainReviewPage />} />
        <Route path="form" element={<Form />} />
        <Route path="editProfile/" element={<EditProfile />} />
      {/* <Route exact path="/" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} /> */}
     </Routes>
   </div>
 );
};
 
export default App;