/** @format */

var createError = require("http-errors");
var cors = require("cors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var { expressjwt: jwt } = require("express-jwt");
require("dotenv").config();
// 生成密钥
const MY_SECRET_KEY = "my_secret_key";
// 导入bodyParser
const bodyParser = require("body-parser");

// 导入路由
var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");
var registerRouter = require("./routes/register");
var profileRouter = require("./routes/profile");
var userInfoRouter = require("./routes/userInfo");
var uploadRouter = require("./routes/upload");
var animalList = require("./routes/animalList");
var chatRouter = require("./routes/chat");
var messageRouter = require("./routes/message");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 使用 cors 中间件
app.use(cors());
// app.use(cors({
//   origin: 'http://xxx.com' // 只允许这个域进行跨域请求
// }));

app.use(logger("dev"));
app.use(express.json()); // 解析 body req.body
app.use(
  jwt({
    secret: MY_SECRET_KEY,
    algorithms: ["HS256"], // 加密算法
  }).unless({
    path: ["/", "/login", "/register", /^\/public\/uploads\/.*/], // 除了这些地址，其他的URL都需要验证
  })
);

app.use(express.urlencoded({ extended: false })); // 为了访问请求体中的 JSON 数据
app.use(cookieParser());
// 使用 bodyParser
app.use(bodyParser.json());
// app.use('/uploads', express.static('uploads'));
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "public/uploads"))
);

// 注册路由
app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/profile", profileRouter);
app.use("/userinfo", userInfoRouter);
app.use("/upload", uploadRouter);
app.use("/animal", animalList);
app.use("/chat", chatRouter);
app.use("/message", messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
