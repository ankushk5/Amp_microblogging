import React, { useEffect, useState } from "react";
import "../CreatePost/createPost.css";
import axios from "axios";
import FormComponent from "../container-components/FormComponent";

const EditPost = (props) => {
  const [postFormData, setPostFormData] = useState({
    title: "",
    content: "",
  });
  //   console.log(props);

  const postData = props.location.state && props.location.state.postData;

  // for setting intial state for showing content in input
  useEffect(() => {
    setPostFormData({
      title: postData ? postData.title : "",
      content: postData ? postData.content : "",
    });
  }, [postData]);

  // Changing component state for controlling form input
  const onChange = (e) => {
    setPostFormData({
      ...postFormData,
      [e.target.name]: e.target.value,
    });
  };

  // Creating new post
  const EditPost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("/api/post", postFormData);

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
      <div className="heading">Edit Your Post</div>
      <hr></hr>
      <div className="container create-post">
        <FormComponent
          postData={postFormData}
          setPostData={setPostFormData}
          onChange={onChange}
          submitForm={EditPost}
        />
      </div>
    </>
  );
};

export default EditPost;