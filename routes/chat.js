const express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");

// // 获取 sessionID
// router.get("/getSessionId", (req, res) => {
//   res.json({
//     success: true,
//     code: 200,
//     data: {
//       sessionId,
//       success: true,
//       message: "获取 sessionId 成功",
//     },
//   });
// });

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8091 });
let connections = {}; // 用于存储会话的集合

// 当有新的WebSocket连接创建时
wss.on("connection", (ws, req) => {
  // let id = uuidv4(); // 生成一个UUID作为用户标识
  // ws.id = id; //将唯一标识分配给ws连接
  console.log("新的wss");
  let url = new URL(req.url, `http://localhost:${process.env.PORT}`);
  let mineId = url.searchParams.get("mineId"); // 获取URL中的 发起聊天的 id
  ws.mineId = mineId;
  let targetId = url.searchParams.get("targetId"); // 获取URL中的 目标聊天对象的 id
  ws.targetId = targetId;
  let thisSessionId = [mineId, targetId].join("-");
  console.log("私聊的唯一标识thisSessionId", thisSessionId);
  ws.sessionTag = thisSessionId;
  // 把当前连接添加到对应thisSessionId的连接数组
  connections[thisSessionId] = [];
  connections[thisSessionId].push(ws);

  // 当收到这个连接的消息时
  ws.on("message", (message) => {
    // 如果消息是 Buffer，转换为字符串
    if (Buffer.isBuffer(message)) {
      message = message.toString();
    }

    let data = {};
    // 加入 timestamp
    data.timestamp = new Date().toISOString().slice(0, 10); // 使用ISO标准的日期时间字符串
    // 判断是否可以尝试解析字符串为JSON
    try {
      data.message = JSON.parse(message); // 消息
    } catch (error) {
      data.message = message; // 如果不是JSON，使用原字符串
    }
    // 如果connections中没有这个sessionId，则初始化一个空数组
    if (!connections[thisSessionId]) {
      connections[thisSessionId] = [];
    }
    // 如果thisSessionId仍存在于connections中, // 确保连接仍然打开，并给所有同一会话的连接发送消息，仅对目标用户
    if (connections[thisSessionId]) {
      connections[thisSessionId.split("-").reverse().join("-")].forEach(
        (client) => {
          console.log("client.mineId", client.mineId);
          console.log("ws.targetUserId", ws.targetId);
          if (
            client.readyState === WebSocket.OPEN
            // client.mineId === ws.targetId
          ) {
            console.log("发送了消息");
            client.send(JSON.stringify(data));
          }
        }
      );
    }
  });

  // 当连接关闭时
  ws.on("close", () => {
    // 从对应的thisSessionId中移除这个连接
    connections[thisSessionId] = connections[thisSessionId].filter(
      (client) => client.id !== mineId
    );

    // 删除没有任何连接的thisSessionId
    if (connections[thisSessionId].length === 0) {
      delete connections[thisSessionId];
    }
  });

  // 添加对错误事件的监听
  ws.on("error", (error) => {
    console.log(`发生了错误: ${error.message}`);
  });
});

module.exports = router;
