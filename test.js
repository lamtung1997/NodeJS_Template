var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser')

app.set("view engine", "ejs");
app.set("views", "public");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/node_modules',  express.static(__dirname + '/node_modules'));

var con = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'tung'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.listen(3000);

app.get('/',function(req,res){
  con.query('SELECT * from persons', function(err, rows, fields) {
    const data = JSON.parse(JSON.stringify(rows));
    // console.log(data);
    res.render('home.ejs', {user: data});
  });
});

app.post('/tung', function(req, res) {
  con.query('insert into persons values (' + req.body.id + "," + req.body.name + ')');
  res.send('hello');
})