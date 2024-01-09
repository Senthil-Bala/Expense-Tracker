import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'purple' }}>
        <Toolbar>
       
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' , fontWeight:"bolder"}}>
            Logo
          </Typography>
          <Button color="inherit" sx={{ fontWeight: 'bold', marginLeft: 'auto' }}>FeedBack</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
