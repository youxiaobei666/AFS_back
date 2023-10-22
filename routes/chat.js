const express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
// 这是一个GET路由，当有客户端向服务器发出GET请求时，它将返回一个响应。这个函数的功能暂时为空。
router.get("/getSessionId", (req, res) => {
  let sessionId = uuidv4(); // 生成新的sessionId
  res.json({
    success: true,
    code: 200,
    data: {
      sessionId,
      success: true,
      message: "获取 sessionId 成功",
    },
  });
});

const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8091 });
let connections = {}; // 用于存储会话的集合

// 当有新的WebSocket连接创建时
wss.on("connection", (ws, req) => {
  let id = uuidv4(); // 生成一个UUID作为用户标识
  ws.id = id; //将唯一标识分配给ws连接
  let url = new URL(req.url, `http://localhost:${process.env.PORT}`);

  let sessionId = url.searchParams.get("sessionId"); // 获取URL中的sessionId

  // 如果connections中没有这个sessionId，则初始化一个空数组
  if (!connections[sessionId]) {
    connections[sessionId] = [];
  }

  // 把当前连接添加到对应sessionId的连接数组
  connections[sessionId].push(ws);

  // 当收到这个连接的消息时
  ws.on("message", (message) => {
    let parsedMessage;
     // 如果消息是 Buffer，转换为字符串
  if (Buffer.isBuffer(message)) {
    message = message.toString();
  }
    // 判断是否可以尝试解析字符串为JSON
    try {
      parsedMessage = JSON.parse(message);
    } catch (error) {
      console.log(message);
      parsedMessage = message; // 如果不是JSON，使用原字符串
    }

    // 如果sessionId仍存在于connections中
    if (connections[sessionId]) {
      connections[sessionId].forEach((client) => {
        // 确保连接仍然打开，并给所有同一会话的连接发送消息，除了发送消息的连接自己
        if (client.readyState === WebSocket.OPEN && client.id !== ws.id) {
          client.send(
            typeof parsedMessage === "string"
              ? parsedMessage
              : JSON.stringify(parsedMessage)
          );
        }
      });
    }
  });

  // 当连接关闭时
  ws.on("close", () => {
    // 从对应的sessionId中移除这个连接
    connections[sessionId] = connections[sessionId].filter(
      (client) => client.id !== id
    );

    // 删除没有任何连接的sessionId
    if (connections[sessionId].length === 0) {
      delete connections[sessionId];
    }
  });

  // 添加对错误事件的监听
  ws.on("error", (error) => {
    console.log(`发生了错误: ${error.message}`);
  });
});

module.exports = router;
