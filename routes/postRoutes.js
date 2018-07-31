const mongoose = require("mongoose");
const fs = require('fs');
const _ = require('lodash');
const requireLogin = require('../middlewares/requireLogin');
const checkInfluencer = require('../middlewares/checkInfluencer');

const Post = mongoose.model('posts');


module.exports = app => {

    //post the new user post to the db
    app.post(
        '/api/post_db_posts',
        requireLogin,
        async (req, res) => {
            const {
                description,
                tags,
            } = req.body;

            const {
                data,
                mimetype
            } = req.files.image;

            const post = new Post({
                description: description,
                date: Date.now(),
                tags: tags.split(' '),
                _user: req.user._id,
                image: {
                    data: data,
                    contentType: mimetype
                }
            });

            try {
                const savedPost = await post.save();
                res.send(savedPost);
            } catch (err) {
                res.status(422).send(err);
            }
        });

    //get the user posts from db
    app.get(
        "/api/get_db_posts",
        requireLogin,
        async (req, res, next) => {
            const posts = await Post.find({
                _user: req.user._id,
            });
            res.send(posts);
        });

    //get all posts from db
    app.get(
        "/api/get_all_db_posts",
        requireLogin,
        async (req, res) => {
            const posts = await Post.find({});
            res.send(posts);
        });

    //get saved posts from db
    app.get("/api/get_post_db",
        requireLogin,
        async (req, res) => {

            const {
                posts
            } = req.query;

            const fetchedPosts = await Post.find({
                _id: {
                    $in: posts.map(post => [mongoose.Types.ObjectId(post)])
                }
            });

            res.send(fetchedPosts);
        });

    app.get(
        "/api/remove_db_post/:pid",
        requireLogin,
        async (req, res) => {
            const removePost = await Post.remove({
                _id: req.params.pid
            });
            res.send(removePost);
        });


    app.get(
        "/api/get_post_saves/:pid",
        async (req, res) => {
            const getNumberOfSaves = await Post.findById({
                _id: req.params.pid
            }).select('saves');

            res.send(getNumberOfSaves);
        }
    )

};