const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const videoSchema = mongoose.Schema(
  {
    writer: {
      type: mongoose.Schema.Types.ObjectId, // User의 정보(User.js) 에서 불러올 수 있다.
      ref: "User",
    },
    title: {
      type: String,
      maxlength: 100,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Number,
    },
    filePath: {
      type: String,
    },
    category: {
      type: String,
    },
    view: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true } // 만든 날짜와 업데이트한 날짜가 표기된다.
);

const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
