import React from "react";
import Navbar from './components/Navbar/Navbar'
import { Outlet } from "react-router-dom";
import Grid from '@mui/material/Grid';
 

 
const App = () => {
 return (
   <Grid container>
     <Navbar />
     {/* <MainPage /> */}
     <Outlet/>
   </Grid>
 );
};
 
export default App;