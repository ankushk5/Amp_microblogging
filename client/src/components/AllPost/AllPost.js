import axios from "axios";
import React, { useEffect, useState } from "react";
import PostListComponent from "./PostListComponent";

const AllPost = () => {
  const [postList, setPostList] = useState([]);
  const [Loading, setLoading] = useState(false);

  const requestData = async () => {
    setLoading(true);
    try {
      const allPosts = await axios.get("/api/post");

      if (allPosts) {
        console.log(allPosts);
        setPostList(allPosts.data);
      } else {
        // ToDO - No Data Found Toast
      }

      setLoading(false);
    } catch (error) {
      // TODO - error toast
    }
  };

  useEffect(() => {
    requestData();
  }, []);

  return (
    <div>
      <div className="heading">All Posts</div>
      <hr></hr>
      {Loading && <div>Loading....</div>}

      {postList.length > 0 && !Loading ? (
        postList.map(({ _id, title, content }) => {
          return (
            <PostListComponent
              key={_id}
              id={_id}
              title={title}
              content={content}
              postList={postList}
              setPostList={setPostList}
            />
          );
        })
      ) : (
        <div>No Posts Found</div>
      )}
    </div>
  );
};

export default AllPost;
