-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Questions'
--
-- ---

DROP DATABASE IF EXISTS `QA`;

CREATE DATABASE QA;
use QA;

DROP TABLE IF EXISTS `Questions`;

CREATE TABLE Questions (
  `id` INTEGER AUTO_INCREMENT,
  `product_id` INTEGER,
  `body` TEXT,
  `date_written` DATETIME,
  `asker_name` TEXT,
  `asker_email` TEXT,
  `reported` TINYINT,
  `helpful` INTEGER,
  PRIMARY KEY (`id`)
);

LOAD DATA LOCAL INFILE 'etl/data/cleaned/questions_cleaned.csv'
INTO TABLE Questions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id,
  product_id,
  body,
  date_written,
  asker_name,
  asker_email,
  reported,
  helpful
);
-- SET date_written=FROM_UNIXTIME(@date_written/1000);

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS `Answers`;

CREATE TABLE Answers (
  `id` INTEGER AUTO_INCREMENT,
  `questions_id` INTEGER,
  `answer_body` TEXT,
  `answer_date` DATETIME,
  `answerer_name` TEXT,
  `answerer_email` TEXT,
  `reported` TINYINT,
  `helpful` INTEGER,
  PRIMARY KEY (`id`)
);

LOAD DATA LOCAL INFILE 'etl/data/cleaned/answers_cleaned.csv'
INTO TABLE Answers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id,
  questions_id,
  answer_body,
  answer_date,
  answerer_name,
  answerer_email,
  reported,
  helpful
);

-- ---
-- Table 'Photos'
--
-- ---

DROP TABLE IF EXISTS `Photos`;

CREATE TABLE Photos (
  `id` INTEGER NOT NULL AUTO_INCREMENT,
  `answer_id` INTEGER NULL DEFAULT NULL,
  `photo_url` MEDIUMTEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

LOAD DATA LOCAL INFILE 'etl/data/cleaned/answers_photos_cleaned.csv'
INTO TABLE Photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id,
  answer_id,
  photo_url
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