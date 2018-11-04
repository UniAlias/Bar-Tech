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
    // db.close();
  });
  db.createCollection("keys", function(err, res) {
    console.log("Keys collection created!");
    // db.close();
  });
});

//Inserting Data into the 'users' Collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var myobj = [
//     {username: 'shona110', password: 'keymaster123', clearance: '3'},
//     {username: 'admin', password: 'uniAdmin', clearance: '3'}
//   ];
//   db.collection("users").insertMany(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("Number of users inserted: " + res.insertedCount);
//     db.close();
//   });
// });

//Inserting data into the 'keys' collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var myObj = [
//     {id: 'k234', type: 'Master', allocated: 'John', storage: 'cabinet', lock: 'N533', num: 4},
//     {id: '452', type: 'normal', allocated: 'Available', storage: 'locker', lock: 'N527', num: 2},
//     {id: 'k666', type: 'super master', allocated: 'Available', storage: 'cabinet 2', lock: 'N420', num: 6},
//     {id: 'k75', type: 'sub master', allocated: 'Hagrid', storage: 'cabinet', lock: 'N529', num: 1},
//     {id: 'k212', type: 'normal', allocated: 'Mark', storage: 'cabinet 4', lock: 'N117', num: 3}
//   ];
//   db.collection("keys").insertMany(myObj, function(err, res) {
//     if (err) throw err;
//     console.log("Number of keys inserted: " + res.insertedCount);
//     // db.close();
//   });
// });


//Inserting data into the 'people' collection
// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var myObj = [
//     {name: 'John Isaacs'},
//     {name: 'Mark Zarb'},
//     {name: 'Roger McDermot'}
//   ];
//   db.collection("people").insertMany(myObj, function(err, res) {
//     if (err) throw err;
//     console.log("Number of people inserted: " + res.insertedCount);
//     // db.close();
//   });
// });



//================RENDER PAGES===============
//filter Page
app.get('/filter', function(req, res) {
  db.collection("keys").find().toArray(function(err, result) {
    db.collection("people").find().toArray(function(err, results) {


    if (err) throw err;
    console.log(result);
    // var output = "";
    // for (var i = 0; i < result.length; i++) {
    //   output += "<tr>"
    //   output += "<td>" + result[i].id + "</td>"
    //   output += "<td>" + result[i].type + "</td>"
    //   output += "<td>" + result[i].allocated + "</td>"
    //   output += "<td>" + result[i].storage + "</td>"
    //   output += "<td>" + result[i].lock + "</td>"
    //   output += "<td>" + result[i].num + "</td>"
    //   output += "</tr>"
    // }
    // res.send(output);
  // console.log(keys);
  res.render('pages/filter', {
    keys: result,
    people: results
  });
});
});
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

// //add user (admin)
// app.post('/adduser', function(req, res) {
//   //check we are logged in
//   //if(!req.session.loggedin){res.redirect('/');return;}
//
//   //we create the data string from the form components that have been passed in
//
// var datatostore = {
//   {username: req.body.add_username, req.body.add_password, clearance: req.body.value}
// };
//
//
// //once created we just run the data string against the database and all our new data will be saved/
//   db.collection('users').save(datatostore, function(err, result) {
//     if (err) throw err;
//     console.log("User",JSON.stringify(req.body.add_username),"was added to database!");
//     //when complete redirect to the index
//     res.redirect('back')
//   })
// });

//=================================ADD USER==========================
app.post('/adduser', function(req, res) {

});


//===================================REMOVE USER=======================
app.post('/removeuser', function(req, res) {

});

//==================================UPDATE RIGHTS========================
app.post('/updaterights', function(req, res) {

});

//============================CHANGE PASSWORD========================
app.post('/changepassword', function(req, res) {

});



//=====================================================================
//========================FILTER ROUTES================================
//=====================================================================


//===========================ISSUE KEY=============================
app.post('/issue', function(req, res) {
    //db.collection("keys").findOne("id": req.body.keyid, function(err, result) {
    console.log(JSON.stringify(req.body))
      // db.collection("keys").update({"id": req.body.issuekey}, {$set:{
      //   "allocated" : req.body.peopleselect
      // }});
      db.collection("keys").findOne({"id": req.body.issuekey}, function(err, result) {
        if (err) throw err;
        db.collection("keys").insert({"id": req.body.issuekey,"type": result.type, "allocated": req.body.peopleselect, "storage": result.storage, "lock": result.lock, "num": result.num});
        try {
          db.collection("keys").updateMany({"id": req.body.issuekey}, {$set: {"num": (result.num - 1)}});
        }
        catch (e) {
          console.log("Error in updating");
        }
      res.redirect("/filter");
    });
});

//==========================RETURN KEY===============================
app.post('/return', function(req, res) {
    console.log(JSON.stringify(req.body))
      db.collection("keys").update({"id": req.body.keyreturn}, {$set:{
        "allocated" : "Available"
      }});
      res.redirect("/filter");
});

//==========================ADD KEY==================================
app.post('/addkey', function(req, res) {
    console.log(JSON.stringify(req.body))
    var datastore = {
      "id": req.body.id,
      "type": req.body.type,
      "allocated": "Available",
      "storage": req.body.storage,
      "lock": req.body.room,
      "num": req.body.availableKeys
    };
    db.collection("keys").save(datastore, function (err, result) {
      if (err) throw err;
      res.redirect('/filter');
    })
});

//==========================REMOVE KEY=============================
app.post('/removekey', function(req, res) {
    console.log(JSON.stringify(req.body))
    db.collection("keys").remove({"id": req.body.keyselector})
    res.redirect('/filter');
});
