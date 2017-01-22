// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o');
var Bear = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

router.use(function(req, res, next) {
        // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)

router.get('/', function(req, res) {
    //res.json({ message: 'hooray! welcome to our api!' });   
    var fs = require('fs');
    var array = fs.readFileSync('/Users/dwd/Documents/Processing/dataReceiver/totalScores.txt').toString().split("\n");
    res.json({message : array[0] + ' ' + array[1]})
});

router.route('/bears')

// create a bear (accessed at POST http://localhost:8080/api/bears)
//.post(function(req, res) {
//        
//})

// get all the bears (accessed at GET http://localhost:8080/api/bears)
.get(function(req, res) {
    Bear.find(function(err, bears) {
        if (err)
            res.send(err);

        res.json(bears);
    });
});
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
