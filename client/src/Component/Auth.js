import React, { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material';
const Auth = () => {

  const[isSignup , setisSignup] = useState(false)
  return (
    <div>
      <form>
<Box display = 'flex' flexDirection={'column'} alignItems='center' justifyContent={'center'} boxShadow="10px 10px 20px #ccc" padding={3} margin='auto' marginTop={5} borderRadius={5} maxWidth={400}>
  <Typography variant="h4" padding={3} textAlign={"center"}>Login</Typography>

 {isSignup && <TextField label="Name"
              margin="normal"    
              name="name"/>}

  <TextField name="email"         
            type="email"
            label="Email"
            margin="normal"
           />

  <TextField name="password"         
            type="password"
            label="Password"
            margin="normal"
           />

  <Button type='submit' sx={{ borderRadius: 3, marginTop: 3 }} variant="contained">Submit</Button>

  <Button sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained" onClick={()=>setisSignup(!isSignup)}>Switch to {isSignup ? "login" : "signup"}</Button>
</Box>
      </form>

    </div>
  )
}

export default Auth
