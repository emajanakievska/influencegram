const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  instagramId: String,
  influencer: Boolean,
  accessToken: String,
  instagramUsername: String,
  instagramProfilePicture: String,
  instagramFullName: String,
  instagramBio: String,
  instagramWebsite: String,
  instagramBusiness: Boolean,
  instagramMedia: Number,
  instagramFollows: Number,
  instagramFollowedBy: Number,
  savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }]
});

mongoose.model("users", userSchema);
