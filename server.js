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

server.get('/thread/:threadId', (req, res) => {
    res.setHeader("Content-Type", "applicaiton/json" );
    console.log(`Getting thread with id ${req.params.id}`);
    model.Thread.findById(req.params.threadId, (error, thread) => {
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
            return;
        }
        res.status(200).json(thread);
    });
});

// POST /thread
server.post('/thread', (req, res) => {
    res.setHeader("Content-Type", "applicaiton/json" );
    var thread = new model.Thread({
      author: req.body.author,
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
    });
  
    thread.save().then((thread) => {
      console.log('Thread created');
      res.status(201).json(thread);
    }).catch(function (err) {
        if (err != null) {
            res.status(500).json({
                error: err,
                message: "Could not post Post"
            });
            return;
        } 
        res.status(201).json(thread);
    });
  });

// DELETE /thread/:id

server.delete("/thread/:id", (req, res) => {
    res.setHeader("Content-Type", "applicaiton/json" );
})

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
        {
            new: true,
        },
        (err, thread) => {
        if (err != null) {
            res.status(500).json({
                error: err,
                message: "Could not post Post"
            });
            return;
        } else if (thread === null) {
            res.status(404).json({
                error: err,
                message: "Could not post error 404"
            });
            return;
        }
        res.status(200).json(thread.posts[threads.post.length - 1]);
    });
});

// DELETE /post/:thread_id/:post_id

server.delete("/post/:thread_id/:post_id", (req, res) => {
    res.setHeader("Content-Type", "applicaiton/json");
    console.log(
        `deleting post with id ${req.params.post_id} on thread with id ${req.params.thread_id}`
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
                return;
            }

            let post;
            thead.posts.forEach((e) => {
                if (e._id == req.params.post_id) {
                    post = e;
                }
            });
            
            if (post == undefined) {
                res.status(404).json({
                    error: err,
                    message: "could not find post",
                });
                return;
            }
            res.status(200).json(post);
        }
    );
});