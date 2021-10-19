const express = require("express");
const router = express.Router();
const Posts = require("../models/Post");

/**
 * GET method
 * Getting all the list
 *
 */
router.get("/:offset", async (req, res) => {
  const offset = req.params.offset;
  try {
    const allPosts = await Posts.find({})
      .skip(parseInt(offset))
      .limit(parseInt(5));

    res.send(allPosts);
  } catch (error) {
    res.status(500).send("Server error");
  }
});

/**
 * GET METHOD
 * Filtering posts based on keyword
 *
 *
 */
router.get("/filteredPost/:keyword/:offset", async (req, res) => {
  const keyword = req.params.keyword;
  const offset = req.params.offset;

  try {
    const filteredData = await Posts.find({
      $text: { $search: keyword },
    })
      .limit(parseInt(5))
      .skip(parseInt(offset));

    res.send(filteredData);
  } catch (error) {
    console.log(error);
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

  // console.log(req.body);

  try {
    const data = await Posts.findByIdAndUpdate(
      { _id: id },
      { $set: { title, content } },
      { new: true }
    );

    // console.log(data);

    res.send(data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
