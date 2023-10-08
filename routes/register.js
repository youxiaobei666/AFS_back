// 导入 express
const express = require("express");
// 导入 mysql2
const mysql2 = require("mysql2");
// 导入数据库配置
const databaseConfig = require("../constants/database");
// 配置数据库
const connection = mysql2.createConnection(databaseConfig);
// 连接数据库
connection.connect();
// 定义查询用户的语句
const selectUser = `SELECT * FROM ${process.env.databaseName}.users WHERE username = ?`;
// 定义插入用户的语句
const insertUser = `INSERT INTO ${process.env.databaseName}.users (username, password, permission) VALUES (?, ?, ?)`;

// 生成以下路由
const router = express.Router();

/**
 * 写路由内部规则和路径，注意路径为 / ，而不是 register ,如果写了 /register ,
 * 那么实际结果 /register/register
 * 使用 router.get 或者 router.post 确定方法
 */

router.post("/", (req, res) => {
  // 解构数据
  const { username, password, permission } = req.body;
  // 查询数据库中是否已经存在该用户名
  connection.query(selectUser, [username], (err, results) => {
    // 处理数据库错误
    if (err) {
      console.log(err);
      return res.json({
        success: false,
        code: 500,
        data: {
          message: "服务器异常",
          success: false,
        },
      });
    }
    // 如果存在该用户名
    if (results.length > 0) {
       return res.json({
        success: false,
        code: 409,
        data: {
          message: "用户已存在",
          success: false,
        },
      });
    }
    // 插入新用户到数据库中
    connection.query(
      insertUser,
      [username, password, permission],
      (err, results) => {
        // 处理数据库错误
        if (err) {
          console.log(err);
          return res.json({ success: false, code: 500, data: {message: "服务器错误，请稍后再试！" }});
        }
        // 返回成功信息
        res.json({ code: 200, success: true,data: {message: "注册成功！"}, });
      }
    );
  });
});

// 导出这个路由
module.exports = router;
