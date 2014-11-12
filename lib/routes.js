'use strict';

var matches = require('./controllers/matches'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  //app.route('/api/matches')
  //  .all(middleware.auth)
  //  .get(matches);

  app.route('/api/rounds')
    .all(middleware.auth)
    .get(matches.rounds);

  app.route('/api/rounds/:round_id')
    .all(middleware.auth)
    .get(matches.round);
  
  app.route('/api/users')
    .post(users.create)
    .put(middleware.auth, users.changePassword);

  app.route('/api/users/me')
    .all(middleware.auth)
    .get(users.me)
    .put(users.update);

  app.route('/api/profiles')
    .get(users.list)

  app.route('/api/profiles/:id')
    .all(middleware.auth)
    .get(users.show);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

  app.route('/api/kimmonpisteet')
    .get(users.kimmonpisteet);

  app.route('/debug/matchlist')
    .get(matches.matchCodeList);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};