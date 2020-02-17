
/*****************

Controller For Family House

*****************/


//Required packages for project
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
//var mysql = require('mysql');
var mysql = require('mysql2');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var validator = require('validator');


/*
	BMR: JUST A NOTE TO ALL.... We will not be using npm package sql for our queries... instead we will be using mysql2
	This is built on top of mysql and makes quering data a lot simpler.
	For more information visit: https://www.npmjs.com/package/mysql2
*/




/*Required Modules */
var GLOBALS = require('./global_settings.js');
var sql = require('./settings.js');
var GET_Faq = require('./framework/get/get_faq.js');


/* Initializing App */
var app = express();


/* Adding locations for easier use within pages  */
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/framework'));

//static pages added by Lance
 app.use(express.static(__dirname + "/public"));
app.use(require("body-parser").urlencoded({ extended: true }));

/* Initializing Cookie Parser */
app.use(cookieParser());


/* Setting up Session vars, will be evenutally moved to its own export */
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true

}));


/* Setting Up bodparser inside of app */
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.urlencoded());


/* Setting Up express-handlebars... A little different from handlebars will a few extra features that work well within express */
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


/* Specific to express-handlebars that features agressive caching, This is extremely effective and should be kept off while working on application  */
//app.enable('view cache');



/* Setting Up our global variables that can be used anywhere through the site. */
app.locals.nav = GLOBALS.nav_items();


/* Where we set the port for the app */
app.set('port', process.env.PORT || 3000);



/**********************

Start of Routing Pages

***********************/

/* Home Page */
app.get('/', function(req, res) {
  res.render('home', {
  });
});

/* Push Notifications Page */
app.get('/push', function(req, res) {
  res.render('push', {
  });
});

/* Linen Request */
app.get('/linen', function(req, res) {
  res.render('linen', {
  });
});

app.get('/faq', function(req, res) {
	GET_Faq.getAll(function(data){
		if(data.error){
			res.redirect('/500');
		}else{
			res.render('faq', {
				headers           :    data.headers,
				general           :    data.general,
				allhouses         :    data.allhouses,
				families          :    data.forfamilies,
				transportation    :    data.transportation,
				neville           :    data.neville,
				shadyside         :    data.shadyside,
				university        :    data.universityplace
  			});
		}

	});
  connection.query(
    'SELECT * FROM faq WHERE section_Id=1',
    'SELECT * FROM faq WHERE section_Id=2',
    'SELECT * FROM faq WHERE section_Id=3',
    'SELECT * FROM faq WHERE section_Id=4',
    'SELECT * FROM faq WHERE section_Id=5',
    'SELECT * FROM faq WHERE section_Id=6',
    'SELECT * FROM faq WHERE section_Id=7',
  );
  if(err) return res.status(500).send('Error occurred: database error.');
  return;
});

app.post('/faq', function(req, res){
  connection.query(
    'INSERT INTO faq_sections'
  )
  a.save(function(err, a){
    if(err) return res.status(500).send('Error occurred: database error.');
    res.json({ id: a._id });
  });
});


//*******KEEP ALL ROUTES ABOVE THIS ******************//

/* 404 Error Page */
app.use(function(req, res, next){
  res.status(404);
  res.render('404');
});

/* 500 Error Page */
app.use(function(err, req, res, next){
  console.log(err.stack);
  res.status(500);
  res.render('500');
});


/**********************

Stop of Routing Pages

***********************/

/* Start Server */
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
