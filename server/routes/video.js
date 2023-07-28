const express = require("express");
const router = express.Router();
const { Video } = require("../models/Video");
const multer = require("multer");
const { auth } = require("../middleware/auth");
var ffmpeg = require("fluent-ffmpeg");
const { Subscriber } = require("../models/Subscriber");

let storage = multer.diskStorage({
  // 어디에 파일을 저장할지 설정,
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  // 저장 시 어떠한 파일 이름으로 설정할지
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },

  // 파일 형식을 mp4만 되게 설정
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4 is allowed"), false);
    }
    cb(null, true);
  },
});

// 파일은 하나만 업로드 할 수 있게 사용
const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

router.post("/uploadfiles", (req, res) => {
  // 비디오를 서버에 저장한다.
  upload(req, res, (err) => {
    // 에러가 나면 동작할 함수
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    }); // url: 파일이 저장된 경로, fileName: 저장된 파일의 이름
  });
});

// 썸네일 생성 하고 비디오 러닝 타임도 가져오기
router.post("/thumbnail", (req, res) => {
  let filePath = "";
  let fileDuration = "";

  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.dir(metadata); // all meatadata
    console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.url) // 비디오 파일으 ㅣ경로
    .on("filenames", function (filenames) {
      // 파일 이름 생성
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);
      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      // 썸네일을 생성하고 난 뒤 할 함수
      console.log("ScreenShots taken");
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    .on("error", function (err) {
      console.log(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3, // 3개의 썸네일을 찍을 수 있음
      folder: "uploads/thumbnails",
      size: "320x240",
      filename: "thumnail-%b.png", // %b : 파일 확장자를 뺀 파일 이름
    });
});

router.post("/uploadVideo", (req, res) => {
  // 비디오 정보들을 DB에 저장한다.
  const video = new Video(req.body);

  video.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

router.get("/getVideos", (req, res) => {
  //비디오를 DB에서 가져와서 클라이언트에게 보낸다.
  Video.find() // 비디오 컬렉션에서 모든 정보를 가져온다.
    .populate("writer") // 그중에 writer 만 가져온다.
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});

router.post("/getVideoDetail", (req, res) => {
  console.log("id: ", req.body.videoId);
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).send(err);
      return res.status(200).json({ success: true, videoDetail });
    });
});

router.post("/getSubscriptionVideos", (req, res) => {
  // 자신의 아이디를 가지고 구독하는 사람들을 찾는다.
  Subscriber.find({ userFrom: req.body.userFrom }).exec((err, subscriberInfo) => {
    if (err) return res.status(400).send(err);

    const subscribedUser = [];

    subscriberInfo.map((subscriber, i) => {
      subscribedUser.push(subscriber.userTo);
    });

    Video.find({ writer: { $in: subscribedUser } })
      .populate("writer")
      .exec((err, videos) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({ success: true, videos });
      });
  });

  // 찾은 사람들의 비디오를 가지고 온다.

  // 찾은 사람들의 비디오를 가지고 온다.
});

router.post("/getMyVideos", (req, res) => {
  console.log(req.body.userId);
  Video.find({ writer: req.body.userId })
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});

router.post("/increaseVideoView", (req, res) => {
  const videoId = req.body.videoId;
  Video.findOneAndUpdate(
    { _id: videoId },
    { $inc: { view: 1 } },
    { new: true },
    (err, video) => {
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true, video });
    }
  );
});

router.post("/searchVideos", (req, res) => {
  Video.find({
    title: { $regex: req.body.query, $options: "i" }, // 'i' option makes it case insensitive
  })
    .populate("writer")
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
});

module.exports = router;
