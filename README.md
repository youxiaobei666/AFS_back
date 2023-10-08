# 项目技术点总结

```
npm i

npm start h

nodemon ./bin/www

port: 3000
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

## 1. 开发 login 登陆模块

- 导入数据库，配置数据库对象，连接数据库，获取用户表

- 鉴权：通过 find 方法遍历获取到用户

- 导入 jwt 加密模块 返回 token，设置过期时长

## 2. 开发 profile 用户信息模块

> 在前端登陆成功拿到 `token` 以后，需要判断是否存在用户数据,不存在就调用 profile 接口获取数据

- 通过全局的 `express-jwt` 检测是否是正确的 token, 但要注意忽略一部分路径比如 ` "/" ``'/login' `
- 从用户总表里获取对应的数据返回给客户端
