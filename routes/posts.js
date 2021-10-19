const express = require("express");
const router = express.Router();
const Posts = require("../models/Post");

/**
 * GET method
 * Getting all the list
 *
 */
router.get("/", async (req, res) => {
  try {
    const allPosts = await Posts.find({});
    res.send(allPosts);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

/**
 * POST method
 * adding new Post
 *
 */
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  // console.log(req.body);

  //   const userId = req.user.id;

  // console.log(userId);

  try {
    const newPost = new Posts({
      //   userId,
      title,
      content,
    });

    const data = await newPost.save();
    // console.log(data);

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * DELETE method
 *
 * deleteing single list using list id
 */
router.delete("/:id", async (req, res) => {
  const postid = req.params.id;
  // console.log(postid);

  try {
    const data = await Posts.findByIdAndDelete(postid);

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/**
 * PUT method
 *
 * updating the post using post id
 */
router.put("/", async (req, res) => {
  const { title, content, id } = req.body;

  if (!id) {
    res.status(500).send("Please Provide a post id");
  }

  console.log(req.body);

  try {
    const data = await Posts.findByIdAndUpdate(
      { _id: id },
      { $set: { title, content } },
      { new: true }
    );

    console.log(data);

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
