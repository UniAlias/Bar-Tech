var express = require('express');
var app = express();

app.use(express.static('public'))

//set the view engine to ejs
app.set('view engine', 'ejs');

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
app.get('/login', function(req, res) {
  res.render('pages/login');
});


app.listen(8080);
console.log('8080 is the port');
