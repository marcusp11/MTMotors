"use strict";
var fs = require('fs');// allowsserver to read and write to files
var logger = require('morgan');
var express = require('express');
var mongo = require('mongodb');
var app = express();
var mongoose = require('mongoose');
var Promise = require("bluebird");
mongoose.Promise = Promise;
var session = require('express-session');
var connectRedis = require('connect-redis')(session);
var bodyParser = require('body-parser'); // renders content from the front end to be used in the back end
var cookieParser = require("cookie-parser");
var datetime = require('node-datetime');// used to create a "now" date and time for the server
var moment = require('moment');
var assert = require('assert');
const path = require('path');
var server = require('http').createServer(app);
var multer = require('multer');
var io = require('socket.io')(server);

var multerConfig = {

	storage: multer.diskStorage({
		//Setup where the user's file will go
		destination: function (req, file, next) {
			next(null, './img-storage/');
		},

		//Then give the file a unique name
		filename: function (req, file, next) {
			const ext = file.mimetype.split('/')[1];
			next(null, file.fieldname + '-' + Date.now() + '.' + ext);
		}
	}),

	//A means of ensuring only images are uploaded.
	fileFilter: function (req, file, next) {
		if (!file) {
			next();
		}
		const image = file.mimetype.startsWith('image/');
		if (image) {
			console.log('photo uploaded');
			next(null, true);
		} else {
			console.log("file not supported");

			//TODO:  A better message response to user on failure.
			return next();
		}
	}
};


//************************************************************************


// Sets up the Express app to handle data parsing


app.engine('html', require('ejs').renderFile);
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(session({ secret: "This information is secret" }));



app.use(express.static(__dirname + '/'));  //set the base directory for static files like js and css


//************************************************************************

var User = require('./models/user.js');
var Reviews = require('./models/reviews.js');


// ***********************************************************************
// Mongoose Connection
var url = 'mongodb://localhost:27017/MTMotors';
mongoose.connect('mongodb://127.0.0.1/MTMotors');
var db = mongoose.connection;

db.on("error", function (error) {
	console.log("mongoose error: ", error);
});
db.on("open", function () {
	console.log("mongoose connection successful: ");
});

// ******************************ROUTES*****************************************

app.get('/', function (req, res) {
	if (req.session.uName && req.session.psw) {
		res.sendFile(__dirname + '/home.html');
	}

	else {
		res.sendFile(__dirname + '/index.html');
	}
});

app.get('/home', function (req, res) {
	console.log(req.session.uName);
	console.log(req.session.psw);
	if (req.session.uName && req.session.psw) {
		res.sendFile(__dirname + '/home.html');
	}
	//Change the filename below to the one you want loaded
	else {
		res.sendFile(__dirname + '/index.html')
	}


});

app.get('/tesla', function (req, res) {
	console.log("Here");
	console.log(req.session.uName);
	console.log(req.session.psw);
	if (req.session.uName && req.session.psw) {
		res.sendFile(__dirname + '/tesla.html');
	}

	else {
		res.sendFile(__dirname + '/index.html')
	}
	//Change the filename below to the one you want loaded


});

app.get('/tesla/model3', function (req, res) {
	console.log("Here");
	console.log(req.session.uName);
	console.log(req.session.psw);
	if (req.session.uName && req.session.psw) {
		res.sendFile(__dirname + '/Model3.html');
	}
	//Change the filename below to the one you want loaded
	else {
		res.sendFile(__dirname + '/index.html')
	}



});


app.get('/create', function (req, res) {
	console.log("Here");

	res.sendFile(__dirname + '/signup.html')


});
// **********************************PROFILE*************************************
app.post("/reviews", function (req, res) {
	var carModel = req.body.model;
	console.log(carModel);
	Reviews.find({ model: carModel }, function (err, result) {
		if (err) {
			console.log(error);
		}
		else {
			console.log(result)
			res.json(result);
		}
	});
});


app.post('/addReview', function (req, res) {

	var dt = datetime.create();
	var review = {
		model: req.body.model,
		uName: req.session.uName,
		comment: {
			subject: req.body.subject,
			body: req.body.body
		},
		date: dt._now
	}
	var newReviews = new Reviews(review); // variable "newPosts" = new "insert model name"("insert record name")
	newReviews.save(function (err, newReview) {
		if (err) {
			console.log(error);
		}
		else {
			console.log(newReview);
			res.json(newReview);
		}
	});
});

// **********************************LOGIN/SIGN UP*************************************
app.post('/signin', function (req, res, next) {
	//console.log(usersInDatabase);

	var message = {
		msg: "",
		name: ""
	};
	var uName = req.body.uname;
	var psw = req.body.psw;
	console.log(uName, psw);

	User.findOne({ uName: uName, psw: psw }, function (error, user) {

		if (!user) {

			console.log("Username and/or password incorrect. Please try again.");
			message.msg = "Username and/or password incorrect. Please try again.";
			res.json(message);
		}

		else if (user) {

			console.log(user);
			message.msg = "yes";
			message.name = user.first + " " + user.last;
			console.log(message);
			console.log("We found the user");
			req.session.name = message.name;
			req.session.uName = req.body.uname;
			req.session.psw = req.body.psw;
			req.session.photo = user.photo;
			console.log(req.session.name);
			console.log(req.session.uName);
			console.log(req.session.psw);
			console.log(req.session.photo);
			res.json(message);
		}
	});
});




app.post('/signup', function (req, res) {


	var message = {
		msg: "",
		msg2: "",
		name: ""

	};

	var first = req.body.first;
	var last = req.body.last;
	var uname = req.body.uname;
	var psw = req.body.psw;



	User.findOne({ uName: uname, psw: psw }, function (err, user) {
		if (user) {
			message.msg = "That username is already in use. Please use a different username";
			res.json(message);
		}

		else {


			var newUser = {
				first: req.body.first,
				last: req.body.last,
				uName: req.body.uname,
				psw: req.body.psw,
				photo: ''
			}

			console.log(newUser);
			message.msg2 = "Welcome " + req.body.uname;
			message.name = req.body.first;
			message.msg = "yes";
			req.session.name = message.name;
			req.session.uName = req.body.uname;
			req.session.psw = req.body.psw;
			var newUsers = new User(newUser); // variable "newUsers" = new "insert model name"("insert record name")
			newUsers.save(function (err, newUser) {
				if (err) res.json(err);
				else {
					res.json(message);
					console.log(message);
					console.log('A new user ' + req.session.name + 'has been added to the database.')

				}
			});
			console.log(req.session.name);
			console.log(req.session.uName);
			console.log(req.session.psw);

		}


	});
});



server.listen(process.env.PORT || 3000);
console.log('Server is running on port 3000!');
