import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { authActions } from "../store";
 
function Auth() {
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  //  const [email,setEmail]= useState("");
  //  const [password,setPassword]=useState("")

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type="login") => {
    const res = await axios
      .post(`http://localhost:5001/api/user/${type}`, {
        name:inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data)
    return data;
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=> navigate("/blogs"))
      
    }else {
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
      .then(()=>dispatch(authActions.login()))
      .then(()=>navigate("/blogs"))
     
    }

  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow=" 10px 10px 20px #ccc"
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              onChange={handleChange}
              name="name"
              margin="normal"
              value={inputs.name}
              placeholder="Name"
            />
          )}
          <TextField
            // onChange={(e)=>{setEmail(e.target.value)}}
            onChange={handleChange}
            name="email"
            type="email"
            vaule={inputs.email}
            placeholder="Email"
            margin="normal"
          />
          <TextField
            // onChange={(e)=>{setPassword(e.target.value)}}
            onChange={handleChange}
            name="password"
            type="password"
            value={inputs.password}
            placeholder="Password"
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Auth;
