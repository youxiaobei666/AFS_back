/*
 Navicat Premium Data Transfer

 Source Server         : youxiaobei
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : afs

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 07/10/2023 00:40:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for animal
-- ----------------------------
DROP TABLE IF EXISTS `animal`;
CREATE TABLE `animal`  (
  `animal_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `animal_id` int NOT NULL AUTO_INCREMENT,
  `animal_img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '照片',
  `animal_color` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '毛色',
  `animal_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '地址',
  `status` int NULL DEFAULT NULL COMMENT '是否被领养，1代表被领养 ，0 代表无人领养',
  `animal_age` int NULL DEFAULT NULL COMMENT '大概年龄',
  PRIMARY KEY (`animal_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of animal
-- ----------------------------
INSERT INTO `animal` VALUES ('kk', 2, 'http://localhost:3001/public/uploads/file-1696607009013.png', '1233', '秦皇岛市', 0, 12);
INSERT INTO `animal` VALUES ('Nakamori Ayano', 3, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '茉莉黄', '海珠区江南西路732号', 1, 5);
INSERT INTO `animal` VALUES ('Miyamoto Yamato', 4, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '白色', '乐丰六路386号', 1, 1);
INSERT INTO `animal` VALUES ('Kong Lai Yan', 5, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '亮珊瑚色', '锦江区红星路三段930号', 1, 8);
INSERT INTO `animal` VALUES ('Pamela Boyd', 6, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '印度红', '福田区深南大道977号', 0, 0);
INSERT INTO `animal` VALUES ('Joanne Gonzales', 7, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '暗灰', '罗湖区蔡屋围深南东路643号', 0, 6);
INSERT INTO `animal` VALUES ('Nomura Riku', 8, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '咖啡色', '成华区双庆路224号', 0, 5);
INSERT INTO `animal` VALUES ('Pang Tak Wah', 9, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '暗灰', '龙岗区布吉镇西环路235号', 1, 10);
INSERT INTO `animal` VALUES ('Watanabe Nanami', 10, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '橙色', '京华商圈华夏街581号', 1, 3);
INSERT INTO `animal` VALUES ('Xiong Yuning', 11, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '亮灰色', '白云区小坪东路237号', 0, 2);
INSERT INTO `animal` VALUES ('Imai Hina', 12, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '金色', '乐丰六路357号', 0, 7);
INSERT INTO `animal` VALUES ('Bobby Lewis', 13, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '银色', '房山区岳琉路598号', 0, 2);
INSERT INTO `animal` VALUES ('Yamamoto Kasumi', 14, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '卡其色', '東城区東直門內大街643号', 1, 4);
INSERT INTO `animal` VALUES ('Qin Xiaoming', 15, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '沙棕', '天河区大信商圈大信南路965号', 0, 4);
INSERT INTO `animal` VALUES ('Yeow Wing Sze', 16, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '奶油色', '坑美十五巷753号', 0, 2);
INSERT INTO `animal` VALUES ('Yamaguchi Misaki', 17, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '橘色', '龙岗区布吉镇西环路244号', 1, 8);
INSERT INTO `animal` VALUES ('Arimura Kenta', 18, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '巧克力色', '西城区复兴门内大街788号', 0, 8);
INSERT INTO `animal` VALUES ('Sugiyama Sakura', 19, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '印度红', '龙岗区学园一巷585号', 0, 6);
INSERT INTO `animal` VALUES ('Kimura Kaito', 20, 'https://pic3.zhimg.com/80/v2-4ecd8211189b4a304c388bf61ad398ae_r.jpg', '驼色', '京华商圈华夏街202号', 0, 8);

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '123456' COMMENT '密码',
  `img` varchar(300) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '头像',
  `city` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '城市',
  `hobby` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '爱好',
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  `age` varchar(3) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '年龄',
  `permission` varchar(45) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'admin', '123456', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', '九江市', '2', '123', '20', 'userManage,authManage,animalManage');
INSERT INTO `users` VALUES (2, '蔡徐坤', '123456', 'http://localhost:3001/public/uploads/file-1695823709477.png', '武汉市', '4', 'caixunkun123@qq.com', '30', NULL);
INSERT INTO `users` VALUES (3, '库里', '123456', 'https://pic2.zhimg.com/80/v2-369ef38975f8aa1fe720be42d5530ca9_r.jpg', '洛杉矶', '2,3,4', 'kurry1234@gmail.com', '36', NULL);
INSERT INTO `users` VALUES (4, '村花', '123456', 'https://picx.zhimg.com/80/v2-78ac42c240838ab610bc1328094932ab_r.jpg', '南昌市', '4', 'cunhua999@qq.com', '18', NULL);
INSERT INTO `users` VALUES (5, '校草', '123456', 'https://pic2.zhimg.com/80/v2-2853b66da07fbc99cbbc53d9dcc0b9fb_r.jpg', '长沙市', '1', 'xiaocao2344@163.com', '19', NULL);
INSERT INTO `users` VALUES (6, '杰尼司', '123456', 'https://pic2.zhimg.com/80/v2-c9e26a8a020d4f4c5421d5809a5dcfb1_qhd.jpg', '广州市', '2', 'jienisi877@qq.com', '23', NULL);
INSERT INTO `users` VALUES (7, 'teacherLiu', '123456', 'https://pic1.zhimg.com/80/v2-6f1cca401c5ce83235d77c6f6e08b416_qhd.jpg', '桂林市', '3,4', 'liuteacher123@163.com', '37', NULL);
INSERT INTO `users` VALUES (8, 'James Baker', 'nVuQ3Njvgq', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'London', 'AysqsM9TsH', 'james9@yahoo.com', '4', NULL);
INSERT INTO `users` VALUES (9, 'Yoshida Mai', 'zTXGSWX8Hd', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Brooklyn', 'YgM6yhT0uu', 'yoshidamai63@icloud.com', '50', NULL);
INSERT INTO `users` VALUES (10, 'Susan Rogers', '9cwaRsFMgw', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Shenzhen', 'E3piu0rlR3', 'rsusan@outlook.com', '4', NULL);
INSERT INTO `users` VALUES (11, 'Jacqueline Morales', 'afQfdANM6P', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Chicago', 'ay3BCy3Uya', 'jacquelinemora@gmail.com', '25', NULL);
INSERT INTO `users` VALUES (12, 'Meng Zhennan', 'tLkS4D2gqK', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Shenzhen', 'EZfIqJ7ir8', 'mengzhennan@outlook.com', '40', NULL);
INSERT INTO `users` VALUES (13, 'Kao Lik Sun', 'Eb1WYqi12a', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Birmingham', 'eQGwQrmSbt', 'lsk@icloud.com', '38', NULL);
INSERT INTO `users` VALUES (14, 'Tracy Munoz', 'hW69QOks7L', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Dongguan', 'M6CLtk9PBp', 'mtracy@icloud.com', '55', NULL);
INSERT INTO `users` VALUES (15, 'Hung Tin Lok', 'Nuf3HlrWkQ', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Osaka', 'CK0jTWza5d', 'tinlohung128@gmail.com', '8', NULL);
INSERT INTO `users` VALUES (16, 'Shimada Kazuma', 'xOp6rljqC3', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Albany', 'Y0fXcf2tZm', 'shk@icloud.com', '42', NULL);
INSERT INTO `users` VALUES (17, 'Marvin Wagner', 'Z2g0ujUFKa', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Shanghai', 'T4fHfgfSzw', 'marvin823@gmail.com', '18', NULL);
INSERT INTO `users` VALUES (18, 'Clara Cook', 'cloR7yqaus', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Liverpool', 'AaZ86CRWBA', 'claracook@icloud.com', '42', NULL);
INSERT INTO `users` VALUES (19, 'Troy Marshall', '4iZo2QNbKz', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'London', 'q1wJnInoU5', 'troymars@yahoo.com', '48', NULL);
INSERT INTO `users` VALUES (20, 'Luo Yunxi', 'UFYSoef00k', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Chengdu', 'MXEEXdzaIq', 'yunxiluo@outlook.com', '15', NULL);
INSERT INTO `users` VALUES (21, 'Diana Bailey', 'RqAYvDjseS', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Liverpool', '5azERkiAQV', 'diabai@icloud.com', '3', NULL);
INSERT INTO `users` VALUES (22, 'John Martin', 'dkw6AhxHPz', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Osaka', 'WJguwR4bpf', 'johnm08@gmail.com', '27', NULL);
INSERT INTO `users` VALUES (23, 'Fong Wai Lam', '4zz2mshMQy', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Shanghai', '1tCTU2nYWX', 'fongwailam@gmail.com', '2', NULL);
INSERT INTO `users` VALUES (24, 'Chic Ling Ling', 'LOK0o7Su8q', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Chicago', 'JOhRsLThrR', 'linglingc7@mail.com', '41', NULL);
INSERT INTO `users` VALUES (25, 'Jin Xiaoming', '6fWPrXLvnC', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Nara', 'vw92OKXzWD', 'xiaomjin3@outlook.com', '41', NULL);
INSERT INTO `users` VALUES (26, 'Zhang Anqi', 'yamzZ9Wb0K', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Osaka', '79tB0ZgkCG', 'anqizhang@outlook.com', '11', NULL);
INSERT INTO `users` VALUES (27, 'Wu Ling Ling', 'I0F2f4285Z', 'https://pic3.zhimg.com/80/v2-d46a1175619e3d0ec964a76592d73f4c_r.jpg', 'Leicester', '7eJMyIU9Fu', 'wulingling418@icloud.com', '11', NULL);

SET FOREIGN_KEY_CHECKS = 1;
