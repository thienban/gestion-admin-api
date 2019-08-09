// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var mongoose   = require('mongoose'); // mongoDB
var User     = require('./models/user'); // schema

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
router.route('/user')

    // create a user
    .post(function(req, res) {

        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;

        // save user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });

    })
    // get all the user
    .get(function(req, res) {
        User.find(function(err, user) {
            if (err)
                res.send(err);

            res.json(user);
        });
    });

router.route('/user/:user_id')
    // get the user with ID
    .get(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {
            if (err)
                res.send(err);
            res.json(user);
        });
    })
     // update the user with this id
     .put(function(req, res) {
        User.findById(req.params.user_id, function(err, user) {

            if (err) {
                res.send(err);
            }
            user.name = req.body.name;
            user.email = req.body.email;
            // save user
            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'User updated!' });
            });

        });
    })
    // delete the user with this id
    .delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);