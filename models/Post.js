const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  //   userId: mongoose.Schema.Types.ObjectId,

  title: {
    type: String,
  },

  content: { type: String },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", PostSchema);
