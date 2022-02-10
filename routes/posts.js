const express = require('express');
const Posts = require('../models/posts');

const router = express.Router();

//save posts
router.post('/post/save', (req, res) => {
    let newPost = new Posts(req.body);

    newPost.save((err) => {
        if (err) {
            return res.status(400).json({
                message:"Post Save Unsuccessful",
                error: err
            });
        }
        return res.status(200).json({
            success: "Posts Saved Successfully"
        });
    });
});

//get posts  
router.get('/posts', (req, res) => {
    Posts.find().exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                message:"Posts Fetching Unsuccesful",
                error: err
            }); 
        }
        return res.status(200).json({
            success: true,
            existingPosts: posts
        });
    });
});

//get specific post 
router.get('/post/:id', (req, res) => {
    let postId = req.params.id;

    Posts.findById(postId, (err, post) => {
        if (err) {
            return res.status(400).json({ success: false, err });
        }
        return res.status(200).json({
            success: true,
            post
        });
    });
});


//update posts
router.put("/post/update/:id", (req, res) => {
    Posts.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err, posts) => {
    if (err) {
        return res.status(400).json({
        message:"Update Unsuccessful",
        error: err
      });
    }
    return res.status(200).json({
      success:"Updated Successfully"
    });
  });
});

//delete posts
router.delete('/post/delete/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
        if (err) return res.status(400).json({
            message: "Delete Unsuccessful",
            error: err
        });
        return res.json({
            success: "Delete Successfull", deletedPost
        });
    });
});


module.exports = router;