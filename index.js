/*****************

Controller For Family House

*****************/


//Required package for project
var express = require('express');
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
const fs = require('fs');
var mysql = require('mysql');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var path = require('path');
var validator = require('validator');





//Required Files that give us credentials and other data
//var modules = require('./lib/modules.js');
//var login = require('./framework/login.js');


var app = express();

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/framework'));

app.use(cookieParser());

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.urlencoded());



app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.set('port', process.env.PORT || 3000);



app.get('/', function(req, res) {
 res.render('home', {
	});
 });

//working code for previously used form
 app.post('/requ', function(req, res) {
   var name = req.body.name;
   var email = req.body.email;
   var message = req.body.message;

   var submit = {
       name: req.body.name,
       email: req.body.email,
       message: req.body.message
       }
         var conn = mysql.createConnection(credentials.connection);
         conn.query('INSERT INTO contact SET ?', submit, function(err, results, rows, fields) {
           if (err) {
             res.redirect(303, '/linen?error='+err);
           }else{
               res.redirect('/requested');
             }
           })
         });

 app.use(function(req, res, next){
    res.status(404);
    res.render('404');
});
app.use(function(err, req, res, next){
   console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
 console.log( 'Express started on http://localhost:' +
 app.get('port') + '; press Ctrl-C to terminate.' );
});
