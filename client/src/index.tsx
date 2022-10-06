import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Profile from './pages/Profile/Profile';
import Applications from './pages/Applications/Applications';
import Reviews from './pages/Reviews/Reviews';
import Form from "./pages/Profile/Form";
import EditProfile from "./pages/Profile/EditProfile";
import Signup from "./components/SignUp";
import Login from "./components/Login";

ReactDOM.render(
  <BrowserRouter>
  <App></App>
    <Routes>
        <Route path="/" element={<App />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="/form" element={<Form />} />
        <Route path="editProfile/" element={<EditProfile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);