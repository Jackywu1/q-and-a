-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Questions'
--
-- ---

DROP DATABASE IF EXISTS `test`;

CREATE DATABASE test;
use test;

DROP TABLE IF EXISTS `Questions`;

CREATE TABLE Questions (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `product_id` INTEGER NULL DEFAULT NULL,
  `question_body` TEXT NULL DEFAULT NULL,
  `question_date` TEXT NULL DEFAULT NULL,
  `asker_name` TEXT NULL DEFAULT NULL,
  `reported` BIT DEFAULT 0,
  `question_helpfulness` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- header: id,product_id,body,date_written,asker_name,asker_email,reported,helpful
-- want to skip adding the asker_email column to this table

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS `Answers`;

CREATE TABLE Answers (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `answer_body` MEDIUMTEXT NULL DEFAULT NULL,
  `answer_date` DATE NULL DEFAULT NULL,
  `answerer_name` VARCHAR(30) NULL DEFAULT NULL,
  `helpfulness` INTEGER NULL DEFAULT NULL,
  `questions_id` INTEGER NULL DEFAULT NULL,
  `photo_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE Photos (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `photo_url` MEDIUMTEXT NULL DEFAULT NULL,
  `answers_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

-- ALTER TABLE `Answers` ADD FOREIGN KEY (questions_id) REFERENCES `Questions` (`id`);
-- ALTER TABLE `Answers` ADD FOREIGN KEY (photo_id) REFERENCES `Photos` (`id`);
-- ALTER TABLE `Photos` ADD FOREIGN KEY (answers_id) REFERENCES `Answers` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `Questions` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Answers` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `Photos` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;