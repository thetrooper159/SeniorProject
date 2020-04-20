var mysql = require('mysql2');
var sql = require('../../settings.js');


const connection = mysql.createConnection(sql);


exports.createAlert = function(title, house_Id, date, alert_text, user, callback){

    //Getting Data to format our date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }
    if(mm<10)
    {
        mm='0'+mm;
    }
    //Setting date to the date format required fopr sql
    today = yyyy+'-'+mm+'-'+dd;



var sql_run = "INSERT INTO Alerts (`title`,`house_Id`,  `alert_date`, `alert_text`, `created`, `last_modified`, `created_uid`, `modified_uid`) VALUES(?,?,?,?,?,?,?,?)";
	connection.query(
		sql_run,
        [title, house_Id, date, alert_text, today, today, user, user],
		function(err, headers, fields) {
            console.log(headers);
			if(err){
				console.log(err);
				callback(false, "Could not Create Alert... Please try again!");
			}else{
				callback(true, "Alert Created", headers.insertId);
			}
		}
	);

}

exports.createAlertEvent = function(title, house_Id, date, alert_text, user, event_Id, callback){

    //Getting Data to format our date
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();
    if(dd<10)
    {
        dd='0'+dd;
    }
    if(mm<10)
    {
        mm='0'+mm;
    }
    //Setting date to the date format required fopr sql
    today = yyyy+'-'+mm+'-'+dd;



var sql_run = "INSERT INTO Alerts (`title`,`house_Id`,  `alert_date`, `alert_text`, `created`, `last_modified`, `created_uid`, `modified_uid`, `event_Id`) VALUES(?,?,?,?,?,?,?,?,?)";
	connection.query(
		sql_run,
        [title, house_Id, date, alert_text, today, today, user, user, event_Id],
		function(err, headers, fields) {
            console.log(headers);
			if(err){
				console.log(err);
				callback(false, "Could not Create Alert... Please try again!");
			}else{
				callback(true, "Alert Created", headers.insertId);
			}
		}
	);

}
