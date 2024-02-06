# 宠友社后端

```
npm i

npm start

nodemon ./bin/www  （推荐使用）

port: 3001
```

> 响应格式参考：

```js
{
  success: true
  code: xxx,
  data: {
    message: '消息提示',
    list: [],
    total: 100
  }
}
```

数据库在根目录 afs.sql

## 项目当前存在的问题

- 上传完图片后，不能即时响应新的数据，即使数据库以及更新了，但是接口返回没更新。考虑是代码问题，并且不是每个路由都有问题,用户和动物修改已知有问题，没重新连接数据库获取，使用的还是缓存。 优先级：低

- 上传图片路径地址没确定，目前使用的是本地地址，上线后应该使用上线地址。没根据环境改变根路径，建议使用 env 尝试 。优先级：中

- 本地和线上用户数据应该是分开的，不应该直接把数据都导入，导入也没关系。优先级：低

- webSocket 报错导致项目停止（connections[thisSessionId.split("-").reverse().join("-")].forEach(
  ^

TypeError: Cannot read properties of undefined (reading 'forEach')）
