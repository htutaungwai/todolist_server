import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: String,
  },

  checked: {
    type: Boolean,
    default: false,
  },

  dateCreated: {
    type: Date,
    default: Date.now,
  },

  dateUpdated: {
    type: Date,
    default: Date.now,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

postSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
