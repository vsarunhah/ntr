import React from "react";

// We use Route in order to define the different routes of our application
import { Route, Routes, Navigate } from "react-router-dom";

// We import all the components we need in our app
import Navbar from "./components/Navbar/Navbar";
import Edit from "./components/edit";
import Create from "./components/create";
import CreateReview from "./components/reviews/createReview";
import ReviewList from "./components/reviews/reviewList";
import EditReview from "./components/reviews/editReview";

import Signup from "./components/SignUp";
import Login from "./components/Login";
import Main from "./components/Main";
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";

import Profile from "./pages/Profile/Profile";
import Applications from "./pages/Applications/Applications";
import Form from "./pages/Profile/Form";
import EditProfile from "./pages/Profile/EditProfile";
import ManualOrResume from "./pages/Profile/ManualOrResume";

import Applied from "./components/applied";

import SampleForm from "./components/sampleForm";

import PersonalWebsiteEdit from "./pages/PersonalWebsite/PersonalWebsiteEdit";
import PersonalWebsiteView from "./pages/PersonalWebsite/PersonalWebsiteView";
import PersonalWebsite from "./pages/PersonalWebsite/PersonalWebsite";
import CreatePersonalWebsite from "./pages/PersonalWebsite/CreatePersonalWebsite";

import ParserResume from "./pages/Profile/ParseResume";

import Salary from "./components/Salary/salary";
import SalaryPage from "./components/Salary/salaryPage";
import Company from "./components/Salary/company";
import Role from "./components/Salary/role";
import AddSalary from "./components/Salary/addSalary";
import InterviewList from "./pages/Interviews/InterviewList";
import CreateInterviewTip from "./pages/Interviews/CreateInterviewTip";



const App = () => {
  const user = localStorage.getItem("token");
  // console.log("user:", user);
  const user_id = localStorage.getItem("user_id");
  // console.log("user_id:", user_id);
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/" exact element={<Navigate replace to="/login" />} /> */}
        <Route path="/users/:id/verify/:token" element={<EmailVerify />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset/:id/:token" element={<PasswordReset />} />
        <Route
          exact
          path="/"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        {/* <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} /> */}
        <Route path="/manualorresume" element={<ManualOrResume />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/form" element={<Form />} />
        <Route path="/editProfile/" element={<EditProfile />} />
        <Route path="/create" element={<Create />} />
        <Route path="/review/edit/:id" element={<EditReview />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/review/add" element={<CreateReview />} />
        <Route path="/applied" element={<Applied />} />
        <Route path="/sampleForm" element={<SampleForm />} />
        <Route path="/personalwebsiteedit" element={<PersonalWebsiteEdit />} />
        <Route path="/personalwebsiteview" element={<PersonalWebsiteView />} />
        <Route path="/personalwebsite" element={<PersonalWebsite />} />
        <Route path="/salary1" element={<Salary />} />
        <Route path="/ParseResume" element={<ParserResume />} />
        <Route path="/salary" element={<SalaryPage />} />
        <Route path="/salary/company/:id" element={<Company />} />
        <Route path="/salary/role/:id" element={<Role />} />
        <Route path="/addsalary" element={<AddSalary />} />
        <Route path="/personalwebsite/:id" element={<PersonalWebsite />} />
        <Route path="/ParseResume" element={<ParserResume />} />
        <Route path="/interviewlist" element={<InterviewList />} />
        <Route path="/createinterviewtip" element={<CreateInterviewTip />} />
        <Route path="/createpersonalwebsite" element={<CreatePersonalWebsite />} />
      </Routes>
    </div>
  );
};

export default App;
