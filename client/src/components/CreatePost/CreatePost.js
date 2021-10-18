import React, { useState } from "react";
import "./createPost.css";
import axios from "axios";
import FormComponent from "../container-components/FormComponent";

const CreatePost = () => {
  const [postData, setPostData] = useState({
    title: "",
    content: "",
  });

  // Changing component state for controlling form input
  const onChange = (e) => {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  };

  // Creating new post
  const submitNewPost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/post", postData);

      if (response) {
        // success toast and redirect to all posts
      } else {
        // TODO - show a different toast
      }
    } catch (error) {
      // TODO -  Show a Toast
    }
  };

  return (
    <>
      <div className="heading">Create New Post</div>
      <hr></hr>
      <div className="container create-post">
        <FormComponent
          postData={postData}
          setPostData={setPostData}
          onChange={onChange}
          submitForm={submitNewPost}
        />
      </div>
    </>
  );
};

export default CreatePost;
