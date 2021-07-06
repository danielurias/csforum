const express = require("express");
const cors = require("cors");
const model = require('./model');

const server = express();

server.use(cors());
server.use(express.json({}));

// this is where we will do our own middleware
server.use((req, res, next) => {
  console.log(
    "Time: ",
    Date.now(),
    " - Method: ",
    req.method,
    " - Path: ",
    req.originalUrl,
    " - Body: ",
    req.body
  );
  next();
});

module.exports = server;

// GET /thread

// this is where we will do our own middleware

server.get('/thread', (req, res) => {
    res.setHeader("Content-Type", "applicaiton/json" );
    console.log("Gettin all the threads.")
    model.Thread.find({}, (err, threads) => {
        if (err != null) {
            res.status(500).json({
                error: err,
                message: "Could not list thread"
            });
            return;
        }
        res.status(200).json(threads);
    });
});

// GET /thread/:id

server.get('/thread/:id', (req, res) => {
    res.setHeader("Content-Type", "applicaiton/json" );
    console.log(`Getting thread with id ${req.params}`);
    model.Thread.findById(req.params.id, (error, thread) => {
        if (err != null) {
            res.status(500).json({
                error: err,
                message: "Could not list thread"
            });
            return;
        } else if (err === null) {
            res.status(404).json({
                error: err,
                message: "Could not list thread error 404"
            });
        }
    });
});

// POST /thread


// DELETE /thread/:id

// POST /post
server.post('/post', (req, res) => {
    res.setHeader("Content-Type", "applicaiton/json" );
    console.log("Posting thread", req.body);

    let newPost = {
        author: req.body.author || "",
        body: req.body.body || "",
        thread_id: req.body.thread_id || ""
    };

    model.Thread.findByIdAndUpdate(
        req.body.thread_id, 
        {
            $push: {posts: newPost},
        },
        (err, threads) => {
        if (err != null) {
            res.status(500).json({
                error: err,
                message: "Could not post Post"
            });
            return;
        } else if (err === null) {
            res.status(404).json({
                error: err,
                message: "Could not post error 404"
            });
        }
    });
});

// DELETE /post/:thread_id/:post_id

server.delete("/post/:id", (req, res) => {
    res.setHeader("Content-Type", "applicaiton/json");
    console.log(
        `deleting post with id ${req.params.thread_id}`
    );
    model.Thread.findByIdAndUpdate(
        req.params.thead_id,
        {
            $pull: {
                posts: {
                    _id: req.params.post_id,
                },
            },
        },
        {
            new: true,
        },
        (err, thread) => {
            if (err != null) {
                res.status(500).json({
                    error: err,
                    message: "Could not list thread"
                });
                return;
            } else if (err === null) {
                res.status(404).json({
                    error: err,
                    message: "Could not list thread error 404"
                });
            }
        }
    );
});