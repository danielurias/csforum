const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        author: String,
        body: String,
        thread_id: { type: mongoose.Schema.Types.ObjectId, ref: "Thread" },
    },
    { timestamps: true }
);

// const Post = mongoose.model("Post", postSchema);

const threadSchema = mongoose.Schema(
    {
        author: String,
        name: String,
        description: String,
        posts: [postSchema],
        category: String,
    },
    { timestamps: true }
);

const Thread = mongoose.model("Thread", threadSchema);

module.exports = {
  Thread,
};

// TODO Schema
// name: String,
// description: String,
// done: Boolean,
// deadline: Date,