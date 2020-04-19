//Lance dummy data file for the linen table
//reference taken from file get_faq.js and linens table found in mysql

//sql credentials
var mysql = require('mysql2');
var sql = require('../../settings.js');

//connection to database
const connection = mysql.createConnection(sql);


exports.get_requests = function(callback){
	connection.query(
		'SELECT l.idlinen, l.house, l.room, l.guests, l.towels, l.washcloths, l.bathmats, l.twinsheets, l.queensheets, l.bluebag, l.pillowcases, l.isServed, l.phoneID, l.lastname,  DATE_FORMAT(l.date, "%M %d %Y") as date , a.Id, a.Name FROM linen as l, houses as a WHERE l.house = a.Id',
		function(err, rows, fields) {
			if(err){
				console.log(err);
				callback(false, null);
			}else{
				callback(true, rows);
				//console.log(true, headers);
			}
		}
	);
}
