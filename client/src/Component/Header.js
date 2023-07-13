import React, { useState } from 'react'
import {AppBar, Button, Toolbar, Typography , Box , Tabs , Tab } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Header = () => {

    const[val , setVal] = useState(0);
    const isLoggedIn = useSelector(state=>state.isLoggedIn)

  return (
    <AppBar position='sticky' sx = {{background:"black"}}>
    <Toolbar>
        <Typography variant='h6'>Ticket Reservation System</Typography>

       { isLoggedIn && <Box display={'flex'}>
            <Tabs value = {val} textColor='inherit' onChange={(e,value)=> setVal(value)}>
            <Tab LinkComponent={Link} to = "/home" label = "Home"/>
            <Tab LinkComponent={Link} to = "/cartpage" label = "Cart"/>
            <Tab LinkComponent={Link} to = "/booking" label = "Bookings"/>
            </Tabs>
        </Box>}

        <Box  display='flex'  marginLeft= 'auto'>

        <Button LinkComponent={Link} to = "/auth" variant="contained" sx={{margin : 1 , borderRadius : 10}}color='warning'>SignUp</Button>

        <Button LinkComponent={Link} to = "/auth" variant="contained" sx={{margin : 1 , borderRadius : 10}}color='warning'>Login</Button>

            {isLoggedIn && <Button variant="contained" LinkComponent={Link} to = "/auth" sx={{margin : 1 , borderRadius : 10}} color='warning'>Logout</Button>}
            
        </Box>
    </Toolbar>  
    </AppBar>
  )
}

export default Header
