-- ---
-- Globals
-- ---

-- ---
-- Table 'Questions'
--
-- ---

DROP DATABASE IF EXISTS `QA`;

CREATE DATABASE QA;
use QA;

DROP TABLE IF EXISTS `Questions`;

-- CREATE TABLE Questions (
--   `id` INTEGER AUTO_INCREMENT,
--   `product_id` INTEGER,
--   `body` TEXT,
--   `date_written` DATETIME,
--   `asker_name` TEXT,
--   `asker_email` TEXT,
--   `reported` TINYINT,
--   `helpful` INTEGER,
--   PRIMARY KEY (`id`)
-- );

-- LOAD DATA LOCAL INFILE 'etl/data/subset/questions_cleaned.csv'
-- INTO TABLE Questions
-- FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   product_id,
--   body,
--   @date_written,
--   asker_name,
--   asker_email,
--   reported,
--   helpful
-- )
-- SET date_written=FROM_UNIXTIME(@date_written/1000);

CREATE TABLE Questions (
  `question_id` INTEGER AUTO_INCREMENT,
  `product_id` INTEGER,
  `question_body` TEXT,
  `question_date` DATETIME,
  `asker_name` TEXT,
  `asker_email` TEXT,
  `reported` TINYINT,
  `question_helpfulness` INTEGER,
  PRIMARY KEY (`question_id`)
);

LOAD DATA LOCAL INFILE 'etl/data/subset/questions_cleaned.csv'
INTO TABLE Questions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  question_id,
  product_id,
  question_body,
  @question_date,
  asker_name,
  asker_email,
  reported,
  question_helpfulness
)
SET question_date=FROM_UNIXTIME(@question_date/1000);

-- ---
-- Table 'Answers'
--
-- ---

DROP TABLE IF EXISTS `Answers`;

-- CREATE TABLE Answers (
--   `id` INTEGER AUTO_INCREMENT,
--   `questions_id` INTEGER,
--   `answer_body` TEXT,
--   `answer_date` DATETIME,
--   `answerer_name` TEXT,
--   `answerer_email` TEXT,
--   `reported` TINYINT,
--   `helpful` INTEGER,
--   PRIMARY KEY (`id`)
-- );

-- LOAD DATA LOCAL INFILE 'etl/data/subset/answers_cleaned.csv'
-- INTO TABLE Answers
-- FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   questions_id,
--   answer_body,
--   @answer_date,
--   answerer_name,
--   answerer_email,
--   reported,
--   helpful
-- )
-- SET answer_date=FROM_UNIXTIME(@answer_date/1000);

CREATE TABLE Answers (
  `answer_id` INTEGER AUTO_INCREMENT,
  `questions_id` INTEGER,
  `body` TEXT,
  `date` DATETIME,
  `answerer_name` TEXT,
  `answerer_email` TEXT,
  `reported` TINYINT,
  `helpfulness` INTEGER,
  PRIMARY KEY (`answer_id`)
);

LOAD DATA LOCAL INFILE 'etl/data/subset/answers_cleaned.csv'
INTO TABLE Answers
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  answer_id,
  questions_id,
  body,
  @date,
  answerer_name,
  answerer_email,
  reported,
  helpfulness
)
SET date=FROM_UNIXTIME(@date/1000);

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

LOAD DATA LOCAL INFILE 'etl/data/subset/answers_photos_cleaned.csv'
INTO TABLE Photos
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id,
  answer_id,
  photo_url
);

DELETE FROM Photos WHERE NOT EXISTS (SELECT * FROM Answers AS t1 WHERE t1.answer_id = Photos.answer_id);

-- ---
-- Foreign Keys
-- -- ---

-- ALTER TABLE `Answers` ADD FOREIGN KEY (questions_id) REFERENCES `Questions` (`id`);
-- ALTER TABLE `Photos` ADD FOREIGN KEY (answer_id) REFERENCES `Answers` (`id`);

ALTER TABLE `Answers` ADD FOREIGN KEY (questions_id) REFERENCES `Questions` (`question_id`);
ALTER TABLE `Photos` ADD FOREIGN KEY (answer_id) REFERENCES `Answers` (`answer_id`);
