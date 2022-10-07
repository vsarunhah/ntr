

import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { ChangeEvent } from 'react';
import Grid from '@mui/material/Grid';
import {Button, Box, Typography } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Link, LinkProps } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";



function MainReviewPage() {

  //const classes = useStyles()


  return (
    <Grid mx ={35}>
    
            <Box my={10}>
                </Box>
            
				<Typography gutterBottom variant="h5">
					Company Reviews
				</Typography>
        
        

        <Box my={10}>
                </Box>

        <Grid container>
        <Grid item xs={6}>
        <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
					Company Name
				</Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        </Grid>

        <Grid item xs={6}>
        <Button  startIcon={<EditOutlinedIcon /> } > </Button>
        <Button  startIcon={<RemoveCircleOutlineRoundedIcon /> } > </Button>

        </Grid>
        </Grid>
        <Box my={10}>
                </Box>

        <Grid container>
        <Grid item xs={6}>
        <Typography variant="body1" color="textSecondary" component="p" gutterBottom>
					Company Name
				</Typography>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
        aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
        </Grid>

        <Grid item xs={6}>
        <Button  startIcon={<EditOutlinedIcon /> } > </Button>
        <Button  startIcon={<RemoveCircleOutlineRoundedIcon /> } > </Button>

        </Grid>
        </Grid>
        <Box my={10}>
                </Box>

      <Button
  style={{ "height": "56px", "width": "30%",}}
  variant="outlined"
  startIcon={<AddCircleOutlineRoundedIcon />}> Add review </Button>
       
        
     
		</Grid>
  );
}

export default MainReviewPage;