var mysql = require('mysql2');
var sql = require('../../settings.js');

const connection = mysql.createConnection(sql);


exports.createEvent = function(name, callback){

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


var sql_run = "INSERT INTO Events (`title`, `created`) VALUES('" + name + "', '" + today + "')";
	connection.query(
		sql_run,
		function(err, headers, fields) {
			if(err){
				console.log(err);
				callback(false, "Could not Create Event... Please try again!");
			}else{
				callback(true, "Event Created", headers.insertId);
			}
		}
	);

}
