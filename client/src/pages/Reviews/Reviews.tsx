import React from 'react';
import Grid from '@mui/material/Grid';
import { Box, TextField, Typography } from '@mui/material';

const Reviews = () => {
	return (
        
		<Grid  mx ={35}>
			
            <Box my={10}>
                </Box>
			<form>
            
				<Typography gutterBottom variant="h5">
					Review
				</Typography>
				<Typography variant="body2" color="textSecondary" component="p" gutterBottom>
					Please fill in the review information.
				</Typography>
                <Grid container spacing={1}>
                <Grid xs={12} sm={6} item className="form-group">
                    <TextField placeholder="Enter first name" label="Company Name" variant="outlined" fullWidth required />
                </Grid>
                <Grid item sm={12}>
                    <TextField multiline rows={4} placeholder="" label="Review description" variant="outlined" fullWidth  />
                </Grid>
                </Grid>
			</form>
		</Grid>
	);
};

export default Reviews;
