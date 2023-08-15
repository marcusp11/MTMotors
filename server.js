"use strict";
var fs = require('fs');// allows server to read and write to files
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

var Stock = require('./models/stock.js');



// ***********************************************************************
// Mongoose Connection
var url = 'mongodb://localhost:27017/AppliancesWorld';
mongoose.connect('mongodb://127.0.0.1/AppliancesWorld');
var db = mongoose.connection;

db.on("error", function (error) {
    console.log("mongoose error: ", error);
});
db.on("open", function () {
    console.log("mongoose connection successful: ");
});

// ******************************ROUTES*****************************************

app.get('/', function (req, res) {
        res.sendFile(__dirname + '/index.html');
});

app.get('/home', function (req, res) {
        res.sendFile(__dirname + '/home.html');
    }
    //Change the filename below to the one you want loaded. This is the homepage

        res.sendFile(__dirname + '/index.html')
});

app.get('/toploadwashers', function (req, res) {
        res.sendFile(__dirname + '/TopLoadWashers.html');
    });
    app.get('/electricwashers', function (req, res) {
      res.sendFile(__dirname + '/ElectricWashers.html');
    });
    app.get('/frontloadwashers', function (req, res) {
        res.sendFile(__dirname +'/FrontLoadWashers.html' );
    });
    app.get('/lgelectronicswashers', function (req, res) {
        res.sendFile(__dirname +'/Lg.html' );
    });
    app.get('/samsungwashers', function (req, res) {
        res.sendFile(__dirname +'/Samsung.html' );
    });

    //Change the filename below to the one you want loaded


app.get('/dryers/electricdryers', function (req, res) {
        res.sendFile(__dirname + '/Electricdryers.html');
            });
app.get('/dryers/gasdryers', function (req, res) {
        res.sendFile(__dirname + '/GasDryers.html');
        });


});

// **********************************PROFILE*************************************
/*app.post("/stocks", function (req, res) {

    Stock.find(), function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});*/
app.get("/washer", function (req, res) {
    Stock.find({Description: "Washer"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});

app.get("/dryers", function (req, res) {
    Stock.find({Description: "Dryer"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
/*app.get("/washer", function (req, res) {

    Stock.find({Product name": "Top load washers"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.get("/washers", function (req, res) {

    Stock.find({Product name": "Front load washers"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/dryerstocks", function (req, res) {

    Stock.find({Product name": "Gas Dryer"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/dryerstocks", function (req, res) {

    Stock.find({Product name: "Electric Dryer"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/stocks", function (req, res) {

    Stock.find({Stackable: "Stackable"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/stocks", function (req, res) {

    Stock.find({Stackable: "Not Stackable"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/stocks", function (req, res) {

    Stock.find({Steam Function: "Steam"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/stocks", function (req, res) {

    Stock.find({Steam Function: "No Steam"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/stocks", function (req, res) {

    Stock.find({Stackable: "Stackable"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/stocks", function (req, res) {

    Stock.find({Stackable: "Not Stackable"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/stocks", function (req, res) {

    Stock.find({Steam Function: "Steam"}, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});
app.post("/stocks", function (req, res) {

    Stock.find({Price $range: [ <start>, <end>, <non-zero step> ] }, function (err, result) {
        if (err) {
            console.log(error);
        }
        else {
            console.log(result)
            res.json(result);
        }
    });
});*/
//Write new Queries Here

app.get('/create', function (req, res) {
    console.log("Here");
    res.sendFile(__dirname + '/Whirlpool.html')


});

server.listen(process.env.PORT || 3000);
console.log('Server is running on port 3000!');
