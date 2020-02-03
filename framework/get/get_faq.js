/****************************************

For Getting Information for the faq page

This is a great example module on sql queries for data. 

The tables used are faq and faq_sections. 
faq_sections have an Id and title
faq has Id, section_Id, question, answer, and Order

The faq table is going connecting to the faq_sections through the section_Id column which will match the Id column in faq_sections

In this, we will have different functions that return values for each section.


For this to work correctly you will have to understand callbacks which is a tricky concecpt to pick up


******************************************/


/* Need To Require our sql credentials and sql2... Need to figure out a way in node to have a global route setting */
var mysql = require('mysql2');
var sql = require('../../settings.js');

//Creating Connection To our database
const connection = mysql.createConnection(sql);





/* 
	Function For Getting all the Headers We will be using callback to get our data to our variable 
	I will only be commenting heavily on this function on this page, all the others will be minimal comments
*/
function GetHeaders(callback){
	//Initiating query from our connection... In mysql2 there is no need to close connection when you set it as a constant
	connection.query(
		//Our Query This is very Simple Since all we need is all the headers
		'SELECT title FROM faq_sections',
		/* 
			After our query we run this function. err is if the query spits an error... eventually we should check for this. Results is the query results aka what you will want to return! fields is a bunch of other things that you will never need to worry about
			Note: These field names can be called anything, noting this just for understanding purposes :0
		*/
		function(err, results, fields) {
			if(err){
				//This should never happen when getting the data
				console.log(err);
			}else{
				//No error, data has been retrieved so give it to them, success parameter is only there to keep everything uniform
				callback("success", results);

			}
		}
	
	);
}

/* Now we call our function so we can put the data from our callback inside of an export... Doing it this way keeps our index.js clean */
GetHeaders(function(status, results){ 
	exports.headers = results;
});



/* Function For Getting all for general */
function GetGeneral(callback){
	connection.query(
		'SELECT * FROM faq WHERE section_Id=1',
		function(err, results, fields) {
			if(err){
				//This should never happen when getting the data
				console.log(err);
			}else{
				//No error, data has been retrieved so give it to them, success parameter is only there to keep everything uniform
				callback("success", results);
			}
		}
	);
}

/* Getting all for general */
GetGeneral(function(status, results){
	exports.general = results;
});


/* Function For Getting all for For Families */
function GetFamilies(callback){
	connection.query(
		'SELECT * FROM faq WHERE section_Id=2',
		function(err, results, fields) {
			if(err){
				//This should never happen when getting the data
				console.log(err);
			}else{
				//No error, data has been retrieved so give it to them, success parameter is only there to keep everything uniform
				callback("success", results);
			}
		}
	);
}
/* Getting all for For all houses */
GetFamilies(function(status, results){
	exports.all_houses = results;
});

/* Function For Getting all for For Families */
function GetAllHouses(callback){
	connection.query(
		'SELECT * FROM faq WHERE section_Id=3',
		function(err, results, fields) {
			if(err){
				//This should never happen when getting the data
				console.log(err);
			}else{
				//No error, data has been retrieved so give it to them, success parameter is only there to keep everything uniform
				callback("success", results);
			}
		}
	);
}

/* Getting all for For all houses */
GetAllHouses(function(status, results){
	exports.families = results;
});


/* Function For Getting all for Transportation */
function GetTransportation(callback){
	connection.query(
		'SELECT * FROM faq WHERE section_Id=4',
		function(err, results, fields) {
			if(err){
				//This should never happen when getting the data
				console.log(err);
			}else{
				//No error, data has been retrieved so give it to them, success parameter is only there to keep everything uniform
				callback("success", results);
			}
		}
	);
}

/* Getting all for For all houses */
GetTransportation(function(status, results){
	exports.transportation = results;
});



/* Function For Getting all for Transportation */
function GetNeville(callback){
	connection.query(
		'SELECT * FROM faq WHERE section_Id=5',
		function(err, results, fields) {
			if(err){
				//This should never happen when getting the data
				console.log(err);
			}else{
				//No error, data has been retrieved so give it to them, success parameter is only there to keep everything uniform
				callback("success", results);
			}
		}
	);
}

/* Getting all for For all houses */
GetNeville(function(status, results){
	exports.neville = results;
});


/* Function For Getting all for Transportation */
function GetShadyside(callback){
	connection.query(
		'SELECT * FROM faq WHERE section_Id=6',
		function(err, results, fields) {
			if(err){
				//This should never happen when getting the data
				console.log(err);
			}else{
				//No error, data has been retrieved so give it to them, success parameter is only there to keep everything uniform
				callback("success", results);
			}
		}
	);
}

/* Getting all for For all houses */
GetShadyside(function(status, results){
	exports.shadyside = results;
});

/* Function For Getting all for Transportation */
function GetUniversityPlace(callback){
	connection.query(
		'SELECT * FROM faq WHERE section_Id=7',
		function(err, results, fields) {
			if(err){
				//This should never happen when getting the data
				console.log(err);
			}else{
				//No error, data has been retrieved so give it to them, success parameter is only there to keep everything uniform
				callback("success", results);
			}
		}
	);
}

/* Getting all for For all houses */
GetUniversityPlace(function(status, results){
	exports.university = results;
});

