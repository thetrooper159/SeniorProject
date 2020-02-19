
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

/* Linen Request  */
app.get('/linen', function(req, res) {
    const connection = mysql.createConnection(sql);
  connection.query('SELECT familyhouse.linen.house, familyhouse.linen.room,familyhouse.linen.towels, familyhouse.linen.washcloths,familyhouse.linen.bathmats,familyhouse.linen.bluebag  FROM familyhouse.linen;',
   function(err, results, rows, fields){
    console.log(results);
    res.render('linen', {rows: results});
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
        var result = [];
        var sections = {
          //"1": [row1, row2],
          //"2": [row5, row6]
        };
        for (var i = 0; i < data.length; i++) {
          //console.log(data[i]);
          //if (data[i].section_Id === "1") {
            //console.log("is this working?");
            //console.log("section_id is " + data[i].section_Id);
            //console.log("Question is " + data[i].question);
            //console.log("answer is " + data[i].answer);
            //console.log("Order is " + data[i].Order);
            //console.log("Id is " + data[i].Id);
            //console.log("title is " + data[i].title);
            //console.log("code is " + data[i].code);
            //this is creating a new number every time there is not a number for section_Id
            if (!sections[data[i].section_Id]) {
              sections[data[i].section_Id] = {
                name: data[i].title,
                items: []
              }
            };
            sections[data[i].section_Id].items.push({
              id: data[i].Id,
              question: data[i].question,
              answer: data[i].answer,
              //order:  data[i].Order,
              //code: data[i].code,
            });
          //}
        }
        console.log(sections);
        for (var key in sections) {
          result.push(sections[key]);
        }
        res.send(result);
        //console.log(data);
        /*
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
        */
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
