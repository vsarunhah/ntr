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

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="profile" element={<Profile />} />
        <Route path="applications" element={<Applications />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);