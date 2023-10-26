/**
 * 获取消息列表
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

// 生成以下路由
const router = express.Router();

router.post("/query-message", (req, res) => {
  let { userId } = req.body;
  console.log(userId);
  let querySql = `SELECT * FROM ${databaseConfig.database}.messageList WHERE userId = ${userId}`;
  connection.query(querySql, (err, res1) => {
    console.log(res1);
    if (err) {
      console.log("查询消息列表失败：", err.message);
      return;
    } else {
      // 配合使用 Promise.all 和 map 来适应多个异步操作
      Promise.all(res1.map((i) => {
        return new Promise((resolve, reject) => {
          let queryAvator = `SELECT img FROM ${databaseConfig.database}.users WHERE id = ${i.messageFrom}`;
          connection.query(queryAvator, (err, avatorRes) => {
            if (err) reject(err);
              i.avatar = avatorRes[0].img;
              resolve(i);
            });
        });
      })).then((updatedRes1) => {
        // updatedRes1 就是所有更新头像之后的消息列表
        return res.json({
          success: true,
          code: 200,
          data: {
            success: true,
            message: "查询消息列表成功",
            messageList: updatedRes1,
          },
        });
      }).catch((error) => {
        console.log("查询失败：", error.message);
      });
    }
  });
});

// 删除
router.post("/delete-message", (req, res) => {
  let { id } = req.body;
  
  let deleteSql = `DELETE FROM ${databaseConfig.database}.messageList WHERE  id = ${id}`;
  connection.query(deleteSql, (err, result) => {
    if (err) {
      console.log("删除消息失败：", err.message);
      return res.json({
        success: false,
        code: 500,
        data: {
          success: false,
          message: "删除消息失败",
        },
      });
    } else {
      console.log("删除消息成功");
      return res.json({
        success: true,
        code: 200,
        data: {
          success: true,
          message: "删除消息成功",
        },
      });
    }
  });
});


// 导出这个路由
module.exports = router;
