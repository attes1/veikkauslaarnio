'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    matches = require('./matches');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.username = newUser.email;
  newUser.save(function(err) {
    if (err) return res.json(400, err);
    
    req.logIn(newUser, function(err) {
      if (err) return next(err);

      return res.json(req.user.userInfo);
    });
  });
};

var calculatePoints = function(game, prediction) {
  var points = 0;

  if(game && game.score1 != null && game.score2 != null) {
    if(prediction.score1 == game.score1 && prediction.score2 == game.score2) {
      points = 3;
    }
    else {
      if(prediction.score1 > prediction.score2 && game.score1 > game.score2) {
        points = 1;
      }

      if(prediction.score1 < prediction.score2 && game.score1 < game.score2) {
        points = 1;
      }

      if(prediction.score1 == prediction.score2 && game.score1 == game.score2) {
        points = 1;
      }
    }
  }

  return points;
};

var formatPredictions = function(predictions, exclude_upcoming, callback) {
  var ids = []; 

  predictions.forEach(function(prediction) {
    if(ids.indexOf(prediction.round) == -1) {
      ids.push(prediction.round);
    }
  });

  matches.getRounds(ids, exclude_upcoming, function(err, rounds) {
    var spliceIndeces = [];

    predictions.forEach(function(prediction) {
      if(rounds[prediction.round]) {
        var game = rounds[prediction.round].games.find(function(element, index, array) {
          if(element.key == prediction.match_code) {
            return true;
          }
        });

        prediction.points = calculatePoints(game, prediction);
      }
      else {
        spliceIndeces.push(predictions.indexOf(prediction));
      }
    });

    for(var i = 0; i < spliceIndeces.length; i++) {
      predictions.splice(spliceIndeces[i] - i, 1)
    }

    callback(predictions);
  });
};

var formatAllPredictions = function(users, callback) {
  var exclude_upcoming = true;

  matches.getAllRounds(exclude_upcoming, function(err, rounds) {  
    users.forEach(function(user) {
      var spliceIndeces = [];

      user.predictions.forEach(function(prediction) {
        if(rounds[prediction.round]) {
          var game = rounds[prediction.round].games.find(function(element, index, array) {
            if(element.key == prediction.match_code) {
              return true;
            }
          });

          prediction.points = calculatePoints(game, prediction);
        }
        else {
          spliceIndeces.push(user.predictions.indexOf(prediction));
        }
      });

      for(var i = 0; i < spliceIndeces.length; i++) {
        user.predictions.splice(spliceIndeces[i] - i, 1)
      }
    });

    callback(users);
  });
};

exports.kimmonpisteet = function(req, res, next) {
  return res.send({ kimmonpisteet: 0 });
}

/**
 *  Get profile of specified user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;
  var me = false;

  if(req.params.id == 'me') {
    userId = req.user._id;
    me = true;
  }

  User.findById(userId, function (err, user) {
    formatPredictions(user.predictions, !me, function(predictions) {
      user.predictions = predictions;

      if(err) {
        return next(err);
      }

      if(!user) {
        return res.send(404);
      }

      return res.send(user.profile);
    });
  });
};

exports.list = function(req, res, next) {
  User.find(function(err, users) {
    formatAllPredictions(users, function(users) {
      res.send(users);
    });
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return res.send(400);

        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.update = function(req, res, next) {
  var matches = req.body.new_predictions;
  
  var updated = [];

  User.findById(req.user._id, function(err, user) {
    if(err) {
      res.send(400);
    }
    else {
      // TEMP! FIX!!;SAD

      for(var match in matches) {
        var newpred = {
          match_code: match, 
          score1: matches[match].score1,
          score2: matches[match].score2, 
          round: matches[match].round,
          created: Date.now()
        }

        var exists = false;

        /*for(var prediction in user.predictions) {
          if(prediction.match_code == newpred.match_code) {
            prediction = newpred;
            exists = true;
          }
        }*/

        if(!exists) {
          user.predictions.push(newpred);
        }
      }

      user.save(function(err) {
        if(err) {
          console.log(err);
          return res.send(400);
        }
        else {
          res.send(200);
        }
      });
    }
  });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};