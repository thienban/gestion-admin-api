var Express  = require('express'); 
var User   = require('../models/user'); 
var { Router } = Express;

function userApi(){
  var api = Router();

  // create a user
  api.post("/", function(req, res) {
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;

    if(req.body.organisation){
        user.organisation = req.body.organisation;
    }
    if(req.body.team){
        user.team = req.body.team;
    }

    // save user and check for errors
    user.save(function(err) {
      if (err) res.send(err);

      res.json({ message: "User created!" });
    });
  });

  // get all the user
  api.get("/", function(req, res) {
    User.find(function(err, user) {
      if (err) res.send(err);

      res.json(user);
    });
  });

  api.get("/:user_id", function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if (err) res.send(err);
      res.json(user);
    });
  });

  // update the user with this id
  api.put("/:user_id", function(req, res) {
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
        res.json({ message: "User updated!" });
      });
    });
  });

  // delete the user with this id
  api.delete("/:user_id", function(req, res) {
    User.remove(
      {
        _id: req.params.user_id
      },
      function(err, user) {
        if (err) res.send(err);

        res.json({ message: "Successfully deleted" });
      }
    );
  });

  return api;
};

module.exports = userApi;