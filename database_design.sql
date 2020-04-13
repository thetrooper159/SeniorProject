/* Database Design For Family House Admin Backend */


/**************
Events Table
**************/


DROP TABLE IF EXISTS `Events`;

CREATE TABLE Events (
    `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `house_Id` int(11) unsigned,
    `title` varchar(64),
    `event_date` date,
    `content` TEXT,
    `created` date,
    `last_modified` date,
    `created_uid` int(11),
    `modified_uid` int(11)
);

/**************
Analytics Table
**************/

DROP TABLE IF EXISTS `analytics`;

CREATE TABLE analytics(
    `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `event` varchar(32),
    `value` tinyint,
    `content` varchar(128),
    `phone` tinyint,
    `date_create` date
);


/**************
Alerts Table
**************/

DROP TABLE IF EXISTS `alerts`;

CREATE TABLE alerts (
    `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `house_Id` int(11) unsigned,
    `title` varchar(64),
    `alert_date` date,
    `content` TEXT,
    `created` date,
    `house_Id_copy1` date,
    `last_modified` date,
    `created_uid` int(11),
    `modified_uid` int(11)
);


/**************
Events Table
**************/

DROP TABLE IF EXISTS `events`;

CREATE TABLE events (
    `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `guest` varchar(45),
    `house` int(11),
    `event` TEXT,
    `date_time` DATETIME,
    `message` VARCHAR(255),
    `alert_option` int(11)
);


/**************
FAQ Table
**************/

DROP TABLE IF EXISTS `faq`;

CREATE TABLE faq (
    `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `section_Id` int(11),
    `question` varchar(256),
    `answer` TEXT,
    `Order` int(11)
);

/**************
FAQ Sections Table
**************/

DROP TABLE IF EXISTS `faq_sections`;

CREATE TABLE faq_sections (
    `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `title` varchar(256),
    `question` varchar(128)
);


/**************
Houses Table
**************/

DROP TABLE IF EXISTS `familyhouse`;

CREATE TABLE familyhouse (
    `Id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `Name` varchar(256)
);


/**************
Linen Table
**************/

DROP TABLE IF EXISTS `linen`;

CREATE TABLE linen (
    `idlineen` int(11) AUTO_INCREMENT PRIMARY KEY,
    `house` int(11),
    `room` int(11),
    `guest` int(11),
    `towels` tinyint(4),
    `washcloths` tinyint(4),
    `bathmats` tinyint(4),
    `twinsheets` tinyint(10),
    `queensheets` tinyint(10),
    `bluebag` tinyint(4),
    `date` datetime,
    `pillowcases` tinyint(4),
    `isServed` tinyint(1),
    `phoneID` int(10),
    `lastname` varchar(45)
);


/**************
User Table
**************/

DROP TABLE IF EXISTS `user`;

CREATE TABLE user (
    `ID` int(11) AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(255),
    `password` varchar(255),
    `user_type` int(11)
);


/**************
Users Table
**************/

DROP TABLE IF EXISTS `users`;

CREATE TABLE users (
    `id` int(11) AUTO_INCREMENT PRIMARY KEY,
    `username` varchar(50),
    `password` varchar(255),
    `email` varchar(100),
    `admin` tinyint(1)
);
