import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BlogDetail() {
  const navigate = useNavigate();

  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState({});
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const fetchDetails = async () => {
    const res = await axios
      .get(`http://localhost:5001/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data.blog);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`http://localhost:5001/api/blog/update/${id}`, {
        title: inputs.title,
        description: inputs.description,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest().then(() => navigate("/myBlogs"));
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="linear-gradient(52deg, rgba(34,193,195,1) 0%, rgba(78,159,214,1) 100%)"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin="auto"
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              paddin={3}
              color="grey"
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog
            </Typography>
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
            >
              Title
            </InputLabel>
            <TextField
              onChange={handleChange}
              name="title"
              value={inputs.title}
              placeholder="title"
              marign="normal"
              variant="outlined"
            />
            <InputLabel
              sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}
            >
              Description
            </InputLabel>
            <TextField
              onChange={handleChange}
              name="description"
              value={inputs.description}
              placeholder="description"
              marign="normal"
              variant="outlined"
            />

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
}

export default BlogDetail;
