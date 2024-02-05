var express = require("express");
var multer = require("multer");
var path = require("path");
const router = express.Router();

// 配置存储
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// 初始化 multer
var upload = multer({ storage: storage });

// 定义前端使用的文件输入字段（字段名）
router.post("/", upload.single("file"), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send({ message: "未上传文件" });
  }

  // TODO 上传地址到底使用什么？
  const fileUrl = "http://127.0.0.1:3001/" + req.file.path.replace(/\\/g, "/");
  // const fileUrl = "http://youxiaobei.top/" + req.file.path.replace(/\\/g, "/");
  res.status(201).send({ url: fileUrl });
});

module.exports = router;
