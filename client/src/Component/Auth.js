import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch } from "react-redux";

const Auth = () => {
const URL = "http://localhost:8080";
const dispatch = useDispatch()

  const [isSignup, setisSignup] = useState(false);

  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendRequest = async (type="login") => {
    const res = await axios
      .post(`${URL}/api/user/${type}`,{
        name : input.name,
        email: input.email,
        password: input.password,
      })
      .catch((err) => console.log("ERROR", err.message));
      const data = await res.data; 
      return data;
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
      sendRequest("register")
      .then((data)=>{
        console.log(data)
      })
    } else {
      sendRequest()
      .then((data)=>{
        console.log(data)
      })
    }
    console.log(input);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          maxWidth={400}
        >
          <Typography variant="h4" padding={3} textAlign={"center"}>
            {isSignup ? "SignUp" : "Login"}
          </Typography>

          {isSignup && (
            <TextField
              label="Name"
              margin="normal"
              name="name"
              value={input.name}
              onChange={handleChange}
            />
          )}

          <TextField
            name="email"
            type="email"
            label="Email"
            margin="normal"
            value={input.email}
            onChange={handleChange}
          />

          <TextField
            name="password"
            type="password"
            label="Password"
            margin="normal"
            value={input.password}
            onChange={handleChange}
          />

          <Button
            type="submit"
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
          >
            Submit
          </Button>

          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            variant="contained"
            onClick={() => setisSignup(!isSignup)}
          >
            Switch to {isSignup ? "login" : "signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
