/*****************

Controller For Family House

*****************/


//Required packages for project
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var validator = require('validator');






/*Required Modules */
var GLOBALS = require('./global_settings.js');


/* Initializing App */
var app = express();


/* Adding locations for easier use within pages  */
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/framework'));

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

Start of Routing Pages

***********************/

/* Start Server */
app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );

});
