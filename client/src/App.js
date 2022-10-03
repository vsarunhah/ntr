import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import CreateReview from "./components/reviews/createReview";
import ReviewList from "./components/reviews/reviewList";
import EditReview from "./components/reviews/editReview";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/review/edit/:id" element={<EditReview />} />
       <Route path="/reviews" element={<ReviewList />} />
       <Route path="/review/add" element={<CreateReview />} />
     </Routes>
   </div>
 );
};
 
export default App;