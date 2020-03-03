/*****************

Controller For Family House

*****************/


//Required packages for project
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
const hbs = require('hbs');
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
app.get('/notifications', function(req, res) {
  res.render('notifications', {
  });
});

app.post('/sendpushnotification', (req, res) => {
  const event = req.body.notification_type;
  const alert = req.body.select_house;
  console.log(event);
  res.redirect('/notifications')
});

/* Linen Request  */
app.get('/linen', function(req, res) {

    const connection = mysql.createConnection(sql);

  connection.query('SELECT l.*, a.Id, a.Name FROM linen as l, houses as a WHERE l.house = a.Id')
  connection.query('SELECT familyhouse.linen.house, familyhouse.linen.room,familyhouse.linen.towels, familyhouse.linen.washcloths,familyhouse.linen.bathmats,familyhouse.linen.bluebag  FROM familyhouse.linen;',

   function(err, results, rows, fields){
    console.log(results);

    var sortby = req.query.sortby;
    // sort results based on query parameter
    if (!sortby) {
      sortby = "isServed";
    }
    results.sort(function(x, y) {
      if(!req.query.reverse) {
      if (typeof x[sortby] === "string") {
        return x[sortby].localeCompare(y[sortby]);
      }
      else {
        return x[sortby] - y[sortby];
      }
      }
      else{
      if (typeof x[sortby] === "string") {
        return y[sortby].localeCompare(x[sortby]);
      }
      else {
        return y[sortby] - x[sortby];
      }
    }
    });

    res.render('linen', {rows: results, reverse: !req.query.reverse});
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
				forfamilies       :    data.families,
				transportation    :    data.transportation,
				neville           :    data.neville,
				shadyside         :    data.shadyside,
				universityplace   :    data.universityplace
  			});
		}
	});
});

//routes for faq

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE faq SET question='"+req.body.question+"', answer='"+req.body.answer+"' WHERE Id="+req.body.Id;
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.redirect('/faq');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM faq WHERE Id="+req.body.Id+"";
  let query = connection.query(sql, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.redirect('/faq');
  });
});

app.get('/api/v1/faq', function(req, res) {
  var mysql = require('mysql2');
  var sql = require('./settings.js');
  const connection = mysql.createConnection(sql);
  connection.query('SELECT * FROM faq, faq_sections WHERE faq.section_Id = faq_sections.Id',
    function(err, data, fields) {
      if (err) {
        console.log(err);
        res.status(500);
        res.render('500');
      }
      else {
        for (var i = 0; i < data.length; i++) {
          console.log(data[i]);
        }
        //console.log(data);
        res.send([{
          name: "General",
          items: [{
            id: 13,
            question: "Question ...",
            answer: "Answer ...",
          }, {
            id: 14,
            question: "Question ...",
            answer: "Answer ...",
          }]
        }, {
          name: "For Families",
          items: [{
            id: 15,
            question: "Question ...",
            answer: "Answer ...",
          }, {
            id: 16,
            question: "Question ...",
            answer: "Answer ...",
          }]
        }]);
      }
    });
});

app.post('/api/v1/linens_request', function(req, res) {
  // add record to database with linens request
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
