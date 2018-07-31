const instagramApi = require("instagram-node").instagram();
const requireLogin = require("../middlewares/requireLogin");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const Post = mongoose.model("posts");

module.exports = app => {
  //get the current user from the request instagram used in auth
  app.get("/api/get_instagram_user", async (req, res) => {
    res.send(req.user);
  });

  //get current logged in user from DB 
  app.get("/api/get_db_user", requireLogin, async (req, res) => {
    const userData = await User.findById({
      _id: req.user._id
    });
    res.send(userData);
  });

  //get user from Db by requested id
  app.get("/api/get_user_data/:uid", async (req, res, next) => {
    const userData = await User.findById({
      _id: req.params.uid
    });
    res.send(userData);
  });


  //get user saved posts from db by user id
  app.get("/api/get_saved_posts/:uid", async (req, res) => {
    const userSavedPosts = await User.findById({
      _id: req.params.uid,
    }).select('savedPosts');

    res.send(userSavedPosts);
  });

  //add new post to saved posts for user with id - uid and post with id - pid
  app.get(
    "/api/save_new_post/:uid/:pid",
    async (req, res) => {
      const addNewSavePost = await User.update({
        _id: req.params.uid
      }, {
        $addToSet: {
          savedPosts: req.params.pid
        }
      });

      const updatePost = await Post.update({
        _id: req.params.pid
      }, {
        $inc: {
          saves: 1
        }
      });

      res.send(addNewSavePost);
    });

  app.get("/api/remove_saved_post/:uid/:pid",
    async (req, res) => {
      const removePost = await User.findOneAndUpdate({
        _id: req.params.uid
      }, {
        $pull: {
          savedPosts: {
            $in: [req.params.pid]
          }
        }
      });

      const updatePost = await Post.findByIdAndUpdate({
        _id: req.params.pid
      }, {
        $inc: {
          saves: -1
        }
      });

      res.send(updatePost);
    }
  );
};