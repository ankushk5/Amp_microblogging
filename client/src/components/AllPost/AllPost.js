import axios from "axios";
import React, { useEffect, useState } from "react";
import PostListComponent from "./PostListComponent";
import { ToastContainer } from "react-toastify";
import LoadingComponent from "../container-components/LoadingComponent";
import SearchComponent from "../container-components/SearchComponent";
import "./AllPost.css";
import Button from "react-bootstrap/Button";
import AlertComponent from "../container-components/AlertComponent";

const AllPost = () => {
  const [postList, setPostList] = useState([]);
  const [Loading, setLoading] = useState(false);

  const [offset, setOffset] = useState(0);

  const [searchText, setSearchText] = useState("");

  const [filteredState, setFilteredState] = useState(false);

  const requestData = async () => {
    setLoading(true);

    try {
      const allPosts = await axios.get(`/api/post/${offset}`);

      if (allPosts) {
        // console.log(allPosts);
        setPostList(allPosts.data);
      } else {
        // ToDO - No Data Found Toast
      }

      setLoading(false);
    } catch (error) {
      // TODO - error toast
      AlertComponent.error("Some Error Occured");
    }
  };

  // this method will call when we click on Search
  const filterPosts = async (e) => {
    e.preventDefault();

    if (searchText === "") {
      return;
    }
    try {
      const filteredPost = await axios.get(
        `/api/post/filteredPost/${searchText}/0`
      );

      if (filteredPost) {
        setPostList(filteredPost.data);
        setFilteredState(true);
      }
    } catch (error) {
      // TODO - Error Alert
      AlertComponent.error("Some Error Occured");
    }
  };

  //When clearing search Text
  const onClear = (e) => {
    e.preventDefault();
    setSearchText("");
    requestData();
  };

  /// fetching more post

  const fetchMore = async (e) => {
    setOffset(offset + 5);
  };

  // fetching post whenver offset is updated
  useEffect(() => {
    if (offset === 0) {
      return;
    }

    (async () => {
      if (!filteredState) {
        try {
          const morePosts = await axios.get(`/api/post/${offset}`);

          if (morePosts.data) {
            // console.log(morePosts.data);
            setPostList([...postList, ...morePosts.data]);
          }
        } catch (error) {
          // AN Error Toast
          AlertComponent.error("Some Error Occured");
        }
      } else {
        try {
          const morePosts = await axios.get(
            `/api/post/filteredPost/${searchText}/${offset}`
          );

          if (morePosts.data) {
            // console.log(morePosts.data);
            setPostList([...postList, ...morePosts.data]);
          }
        } catch (error) {
          // AN Error Toast
          AlertComponent.error("Some Error Occured");
        }
      }
    })();
  }, [offset]);

  useEffect(() => {
    requestData();
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="search-component">
        <SearchComponent
          onSearch={filterPosts}
          searchText={searchText}
          setSearchText={setSearchText}
          onClear={onClear}
        />
      </div>
      <div className="heading">All Posts</div>
      <hr></hr>
      {Loading && (
        <div>
          <LoadingComponent />{" "}
        </div>
      )}

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
        <h1 style={{ textAlign: "center" }}>No Posts Found</h1>
      )}

      <div style={{ textAlign: "center", marginBottom: "16px" }}>
        {postList.length > 0 && (
          <Button onClick={fetchMore}> Fetch More Posts</Button>
        )}
      </div>
    </div>
  );
};

export default AllPost;
