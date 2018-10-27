const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/Bar-Tech";
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser')
const app = express();

app.use(session({ secret: 'example' }));

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

//set the view engine to ejs
app.set('view engine', 'ejs');

var db;

MongoClient.connect(url, function(err, database) {
if (err) throw err;
db = database;
app.listen(8080);
console.log('8080 is the port');
});

//Creating the people collection
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("users", function(err, res) {
    console.log("Collection created!");
    db.close();
  });
});

//Inserting Data into the 'users' Collection
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var myobj = [
    {username: 'shona110', password: 'keymaster123', clearance: '3'},
    {username: 'admin', password: 'uniAdmin', clearance: '3'}
  ];
  db.collection("users").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("Number of users inserted: " + res.insertedCount);
    db.close();
  });
});



//================RENDER PAGES===============
//filter Page
app.get('/filter', function(req, res) {
  res.render('pages/filter');
});

//account page
app.get('/account', function(req, res) {
  res.render('pages/account');
});

//admin page
app.get('/admin', function(req, res) {
  res.render('pages/admin');
});

//login page
app.get('/', function(req, res) {
  res.render('pages/login');
});


//================POST ROUTES==================
//Login post ROUTE
app.post('/dologin', function(req, res) {
  console.log(JSON.stringify(req.body));
  var uname = req.body.username;
  var pword = req.body.password;

  db.collection('users').findOne({"username":uname}, function(err, result) {
    if (err) throw err;
    if (!result){console.log("You are not a user.");res.redirect('/');return}
    if(result.password == pword){req.session.loggedin = true;res.redirect('/filter')}
    else {res.redirect('/')}
  });
});
