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
        author: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        posts: [postSchema],
        category: {
            type: String,
            required: true,
            enum: ['all', 'clothing', 'hunting', 'books', 'cards', 'coins', 'keychains', 'comic books', 'misc.']
        },
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