import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Comment'
    },
  ],
});

const Post = mongoose.model('Post');
export default Post;
