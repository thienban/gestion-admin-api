// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose'); // mongoDB
var Organisation   = require('./models/organisation'); // schema
var Team   = require('./models/team'); // schema
var userApi   = require('./api/user'); 


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//enable CORS
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

var port = process.env.PORT || 8080;        // set our port

// connect to our database
mongoose.connect('mongodb://uy0knrwayg0bsaao7s8k:Ep6HPAAJ0FnpF4wV5jc9@byvnl6kbyswdcjp-mongodb.services.clever-cloud.com:27017/byvnl6kbyswdcjp');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here
// on routes that end in /user
// ----------------------------------------------------
router.use('/user', userApi());

router.route('/organisation')
    // create a organisation
    .post(function(req, res) {

        var organisation = new Organisation();
        organisation.name = req.body.name;

        organisation.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'organisation created!' });
        });

    })
    .get(function(req, res) {
        Organisation.find(function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

router.route('/team')
    .post(function(req, res) {

        var team = new Team();
        team.name = req.body.name;

        team.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'team created!' });
        })
    })
      .get(function(req, res) {
        Team.find(function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);