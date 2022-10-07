import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
// import Profile from './pages/Profile/Profile';
// import Applications from './pages/Applications/Applications';
// import Reviews from './pages/Reviews/Reviews';
// import MainReviewPage from './pages/Reviews/MainReviewPage';
// import Form from "./pages/Profile/Form";
// import EditProfile from "./pages/Profile/EditProfile";
// import ManualOrResume from "./pages/Profile/ManualOrResume"

// import Signup from "./components/SignUp";
// import Login from "./components/Login";
// import Main from "./components/Main";
// import EmailVerify from "./components/EmailVerify";
// import ForgotPassword from "./components/ForgotPassword";
// import PasswordReset from "./components/PasswordReset";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        {/* <Route path="/" element={<App />}>
        <Route path="manualorresume" element={<Reviews />} />
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="reviews" element={<MainReviewPage />} />
        <Route path="form" element={<Form />} />
        <Route path="editProfile/" element={<EditProfile />} /> */}
        {/* <Route exact path="/" element={<Main />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" exact element={<Navigate replace to="/login" />} />
      <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/password-reset/:id/:token" element={<PasswordReset />} /> */}
      {/* </Route> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);