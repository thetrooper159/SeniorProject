var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.createAlert = function(name, callback){
  console.log("hello");

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


var sql_run = "INSERT INTO Alerts (`title`, `created`) VALUES('" + name + "', '" + today + "')";
	connection.query(
		sql_run,
		function(err, headers, fields) {
			if(err){
				console.log(err);
				callback(false, "Could not Create Alert... Please try again!");
			}else{
				callback(true, "Alert Created", headers.insertId);
			}
		}
	);

}
