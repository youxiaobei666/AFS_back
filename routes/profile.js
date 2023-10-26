/**
 * 获取用户信息
 */

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
var userInfo = {};
// 生成以下路由
const router = express.Router();

router.post("/", (req, res) => {
  console.log(req.body);
  const { username, id } = req.body;
  console.log("id", id);
  if (!username && !id) {
    // 如果没有提供 username 或 id，返回错误信息
    return res.json({
      success: false,
      code: 500,
      data: {
        success: false,
        message: "服务器异常，需要提供用户名或用户ID",
      },
    });
  }

  // 修改了查询用户的语句，添加了通过 id 查询的可能
  var getUserInfo = `SELECT * FROM ${process.env.databaseName}.users where username = '${username}' OR id = '${id}'`;

  // 开始查询
  connection.query(getUserInfo, (err, queryRes) => {
    // 处理数据库错误
    if (err) {
      console.log(err);
    }
    // 赋值给 users
    userInfo = queryRes[0];

    // if (userInfo.friends) {
    //   friendIDs = userInfo.friends.split(",").map((id) => parseInt(id, 10));
    // } else {
    //   console.log("userInfo.friends is null");
    // }

    // 是否 有好友
   if(userInfo.friends) {
     // 查询好友信息
     var getFriendsInfo = `SELECT * FROM ${
      process.env.databaseName
    }.users WHERE id IN (${userInfo.friends})`;
    connection.query(getFriendsInfo, (err, friendsRes) => {
      if (err) {
        console.log(err);
        return res.json({
          success: false,
          code: 500,
          data: {
            success: true,
            message: "服务器异常，获取好友信息失败",
          },
        });
      }

      // 构建好友信息数组
      const userFriendsList = friendsRes.map((friend) => ({
        id: friend.id,
        username: friend.username,
        friend_img: friend.img,
        friend_city: friend.city,
        friend_email: friend.email,
        friend_age: friend.age,
      }));

      // 将好友信息添加到userInfo中
      userInfo.userFriendsList = userFriendsList;

      res.json({
        success: true,
        code: 200,
        data: {
          userInfo,
          success: true,
          message: "请求用户数据成功！",
        },
      });
    });
   } else {
    res.json({
      success: true,
      code: 200,
      data: {
        success: true,
        userInfo,
        message: "请求成功，但用户无好友",
      },
    });
   }
  });
});

// 导出这个路由
module.exports = router;
