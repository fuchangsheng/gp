 /*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : wb_crf

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-03-22 15:27:09
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_admin_user_info`
-- ----------------------------
DROP TABLE IF EXISTS `tb_admin_user_info`;
CREATE TABLE `tb_admin_user_info` (
  `id` varchar(11) NOT NULL COMMENT '手机号',
  `type` int(2) NOT NULL DEFAULT '1' COMMENT '管理员种类(0-super 1-normal)',
  `name` varchar(11) DEFAULT '',
  `password` varchar(20) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_admin_user_info
-- ----------------------------
INSERT INTO `tb_admin_user_info` VALUES ('13657251093', '1', '余文婧', '13657251093', '2017-03-22 14:56:57', '2017-03-22 14:56:57');
INSERT INTO `tb_admin_user_info` VALUES ('15527941667', '0', '付昌盛', '52902**Fcs', '2017-03-22 14:55:37', '2017-03-22 14:56:17');

-- ----------------------------
-- Table structure for `tb_msg_info`
-- ----------------------------
DROP TABLE IF EXISTS `tb_msg_info`;
CREATE TABLE `tb_msg_info` (
  `id` int(64) NOT NULL,
  `user_id` int(64) NOT NULL,
  `process_id` int(64) NOT NULL,
  `text` text NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `process_id` (`process_id`),
  CONSTRAINT `process_id` FOREIGN KEY (`process_id`) REFERENCES `tb_process_info` (`id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `tb_user_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_msg_info
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_process_info`
-- ----------------------------
DROP TABLE IF EXISTS `tb_process_info`;
CREATE TABLE `tb_process_info` (
  `id` int(64) NOT NULL COMMENT '等于处理前微博id',
  `admin_user_id` varchar(11) DEFAULT NULL,
  `status` int(2) NOT NULL DEFAULT '0' COMMENT '0-未处理 1-已处理',
  `event_type` int(2) NOT NULL DEFAULT '0' COMMENT '0-未定义 1-金融 2-交通',
  `who` text,
  `whom` text,
  `how` text,
  `when` text,
  `where` text,
  `whywho` text,
  `whyhow` text,
  `trigger` text,
  `startwho` int(3) DEFAULT NULL,
  `endwho` int(3) DEFAULT NULL,
  `startwhom` int(3) DEFAULT NULL,
  `endwhom` int(3) DEFAULT NULL,
  `starthow` int(3) DEFAULT NULL,
  `endhow` int(3) DEFAULT NULL,
  `startwhen` int(3) DEFAULT NULL,
  `endwhen` int(3) DEFAULT NULL,
  `startwhere` int(3) DEFAULT NULL,
  `endwhere` int(3) DEFAULT NULL,
  `startwhywho` int(3) DEFAULT NULL,
  `endwhywho` int(3) DEFAULT NULL,
  `startwhyhow` int(3) DEFAULT NULL,
  `endwhyhow` int(3) DEFAULT NULL,
  `starttrigger` int(3) DEFAULT NULL,
  `endtrigger` int(3) DEFAULT NULL,
  `evaluation` varchar(255) DEFAULT NULL COMMENT '处理人备注',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `admin_user_id` (`admin_user_id`),
  CONSTRAINT `admin_user_id` FOREIGN KEY (`admin_user_id`) REFERENCES `tb_admin_user_info` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_process_info
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_user_info`
-- ----------------------------
DROP TABLE IF EXISTS `tb_user_info`;
CREATE TABLE `tb_user_info` (
  `id` int(64) NOT NULL,
  `name` varchar(30) NOT NULL DEFAULT '' COMMENT '用户名',
  `location` varchar(30) DEFAULT NULL COMMENT '用户所在地',
  `description` varchar(128) DEFAULT NULL COMMENT '个性签名、自我描述',
  `gender` varchar(2) NOT NULL DEFAULT 'n' COMMENT 'm-男 f-女 n-未知',
  `followers_count` int(11) NOT NULL DEFAULT '0' COMMENT '粉丝数量',
  `friends_count` int(11) NOT NULL DEFAULT '0' COMMENT '关注数量',
  `statuses_count` int(6) NOT NULL DEFAULT '0' COMMENT '微博数量',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of tb_user_info
-- ----------------------------
