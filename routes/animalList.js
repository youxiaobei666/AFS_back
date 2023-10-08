// 导入 express
const express = require("express");
// 导入 mysql2
const mysql2 = require("mysql2");
// 导入数据库配置
const databaseConfig = require('../constants/database')

// 定义所有用户信息列表
let animalInfo = [];
// 配置数据库
const connection = mysql2.createConnection(databaseConfig);
// 连接数据库
connection.connect();
// 定义查询所有用户的语句
const selectAllAnimal = `SELECT * FROM  ${process.env.databaseName}.animal`;
// 开始查询
connection.query(selectAllAnimal, (err, res) => {
  // 处理数据库错误
  if (err) {
    console.log(err);
  }
  // 赋值给 users
  animalInfo = res;
});

// 生成以下路由
const router = express.Router();

/**
 * 写路由内部规则和路径，注意路径为 / ，而不是 login ,如果写了 /login ,
 * 那么实际结果 /login/login
 * 使用 router.get 或者 router.post 确定方法
 */

router.get("/query-list", (req, res) => {
  // 返回token
  res.json({
    success: true,
    code: 200,
    data: {
      animalInfo,
      total: animalInfo.length,
      message: "获取所有动物表成功!"
    },
  });
});

/**
 * 修改动物信息
 */
router.post("/save", (req, res) => {
  const { animal_age, animal_address, animal_name, animal_color, animal_id, animal_img, status } = req.body;

  if (!animal_id) {
    return res.status(400).json({
      message: "ID 是必须的",
      success: false,
    });
  }

  let updateFields = [];
  let updateValues = [];

  if (animal_age) {
    updateFields.push("animal_age = ?");
    updateValues.push(animal_age);
  }
  if (animal_address) {
    updateFields.push("animal_address = ?");
    updateValues.push(animal_address);
  }
  if (status) {
    updateFields.push("status = ?");
    updateValues.push(status);
  }
  if (animal_color) {
    updateFields.push("animal_color = ?");
    updateValues.push(animal_color);
  }
  if (animal_img) {
    updateFields.push("animal_img = ?");
    updateValues.push(animal_img);
  }
  if (animal_name) {
    updateFields.push("animal_name = ?");
    updateValues.push(animal_name);
  }

  if (updateFields.length === 0) {
    return res.status(400).json({
      message: "至少包含一个非空的字段",
      success: false,
    });
  }
  const updateUser = `UPDATE  ${process.env.databaseName}.animal SET ${updateFields.join(
    ","
  )} WHERE animal_id = ?`;
  updateValues.push(animal_id);

  connection.query(updateUser, updateValues, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        data: {
          message: "更新动物信息时出错",
          success: false,
        },
      });
    }

    res.json({
      success: true,
      code: 200,
      data: {
        message: "动物信息更新成功！",
        success: true,
      },
    });
  });
});

/**
 * 删除动物，根据 id
 */
router.delete("/delete/:animal_id", async (req, res) => {
  const animalId = req.params.animal_id;

  if (!animalId) {
    return res.status(400).json({
      success: true,
      data: {
        message: "animal_id 必传",
        success: true,
      },
    });
  }

  try {
    const deleteAnimal = "DELETE FROM animal WHERE animal_id = ?";
    const [result] = await connection.promise().query(deleteAnimal, [animalId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        data: {
          message: "动物未找到",
          success: false,
        },
      });
    }

    const [allAnimals] = await connection.promise().query(selectAllAnimal);

    res.status(200).json({
      success: true,
      data: {
        message: "动物删除成功",
        success: true,
        users: allAnimals,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {
        message: "删除失败",
        success: false,
      },
    });
  }
});

// 导出这个路由
module.exports = router;
