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
