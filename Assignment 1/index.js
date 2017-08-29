//install
// express morgon fs pug path 

var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var fs = require("fs");
var path = require("path");
var app = express();

app.set("view engine","hbs");
app.listen(3000);

var File = fs.createWriteStream(path.join(__dirname,"request.log"));
app.use(morgan("combined",{stream : File}));

app.use("/",bodyParser.urlencoded({extended : false}));

app.use("/assets",express.static(__dirname + "/assets"));
app.use("/form",function (req,res) {
	res.sendFile(__dirname + '/Assets/form.html' );
})

app.get("/",function (req,res) {
	res.sendFile(__dirname + '/Assets/form.html');
})

app.post("/submit",function (req,res) {
	var name = req.body.name;
	var dob = req.body.DOB;
	var living = Math.round( (new Date() - new Date(dob))/(1000*60*60*24));
res.render(
	"index.hbs",
	{name : name, x : living}
	);	
});





