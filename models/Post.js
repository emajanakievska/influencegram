const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  description: { type: String, default: "" },
  date: Date,
  saves: { type: Number, default: 0 },
  image: { contentType: String, data: Buffer },
  _user: { type: Schema.Types.ObjectId, ref: "User" },
  tags: [String]
});

mongoose.model("posts", postSchema);
