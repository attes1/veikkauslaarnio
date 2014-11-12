'use strict';

var mongoose = require('mongoose'),
    request = require('request'),
    async = require('async');


exports.matchCodeList = function(req, res, next) {
	var rounds = [];
	var output = 'var match_dates = {\r\n';

	var rounds_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/rounds';
	request(rounds_url, function(err, response, body) {
		if(err) {
			console.log(err);
			return res.send(400);
		}
		else {
			var ids = [];

			var temp = JSON.parse(body);

			temp.rounds.forEach(function(round) {
				ids.push(round.pos);
			});

			async.each(ids, function(id, each_callback) {
				var round_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/round/' + id;
				request(round_url, function(err, response, body) {
					if(err) {
						console.log(err);
					}
					else {
						var round = JSON.parse(body);
						
						round.games.forEach(function(game) {
							output += '\'' + game.team1_key + game.team2_key + round.round.pos + '\': ';
							output += 'new Date(),\r\n';
						});	

						each_callback();
					}
				});
			}, function(err) {
				if(err) {
					console.log(err);
					res.send(err);
				}
				else {
					output += '};';
					res.writeHead(200, {"Content-Type":"text/plain"});
					res.write(output);
					res.end();
				}
			});
		}
	});
}

exports.rounds = function(req, res, next) {
	var rounds_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/rounds';
	request(rounds_url, function(err, response, body) {
		if(err) {
			console.log(err);
			return res.send(400);
		}
		else {
			var worldcup = JSON.parse(body); 

			worldcup.rounds.map(function(round) { 
				round.start_at = new Date(round.start_at);
				round.end_at = new Date(round.end_at);
			});

			return res.send(body);
		}
	});
};

exports.round = function(req, res, next) {
	var round_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/round/' + req.params.round_id;

	request(round_url, function(err, response, body) {
		if(err) {
			console.log(err);
			return res.send(400);
		}
		else {
			var round = JSON.parse(body);

			round.games.map(function(game) { 
				game.key = game.team1_key + game.team2_key + round.round.pos;
				game.play_at = new Date(game.play_at);
			});

			return res.send(round);
		}
	});
};

exports.getAllRounds = function(exclude_upcoming, callback) {
	var rounds = [];

	var rounds_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/rounds';
	request(rounds_url, function(err, response, body) {
		if(err) {
			console.log(err);
			return res.send(400);
		}
		else {
			var ids = [];

			var temp = JSON.parse(body);

			temp.rounds.forEach(function(round) {
				ids.push(round.pos);
			});

			async.each(ids, function(id, each_callback) {
				var round_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/round/' + id;
				request(round_url, function(err, response, body) {
					if(err) {
						console.log(err);
					}
					else {
						var round = JSON.parse(body);
						
						round.games.map(function(game) {
							game.key = game.team1_key + game.team2_key + round.round.pos;
							game.play_at = new Date(game.play_at);
						});	

						if(!exclude_upcoming || new Date(round.round.start_at) < Date.now())
						{
							rounds[id] = round;
						}

						each_callback();
					}
				});
			}, function(err) {
				if(err) {
					console.log(err);
					callback(err);
				}
				else {
					callback(null, rounds);
				}
			});
		}
	});
};

exports.getRounds = function(ids, exclude_upcoming, callback) {
	var rounds = [];

	async.each(ids, function(id, each_callback) {
		var round_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/round/' + id;
		request(round_url, function(err, response, body) {
			if(err) {
				console.log(err);
			}
			else {
				var round = JSON.parse(body);
				
				round.games.map(function(game) {
					game.key = game.team1_key + game.team2_key + round.round.pos;
					game.play_at = new Date(game.play_at);
				});	

				if(!exclude_upcoming || new Date(round.round.start_at) < Date.now())
				{
					rounds[id] = round;
				}

				each_callback();
			}
		});
	}, function(err) {
		if(err) {
			console.log(err);
			callback(err);
		}
		else {
			callback(null, rounds);
		}
	});
};

/*
module.exports = function(req, res, next) {
	var rounds_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/rounds';
	var rounds_meta = [];

	request(rounds_url, function(err, response, body) {
		if(err) {
			console.log(err);
		}
		else {
			rounds_meta = JSON.parse(body);

			var rounds = [];

			async.each(rounds_meta.rounds, function(round, callback) {
				var round_url = 'http://footballdb.herokuapp.com/api/v1/event/world.2014/round/' + round.pos;

				request(round_url, function(err, response, body) {
					if(err) {
						console.log(err);
					}
					else {
						var round = JSON.parse(body);

						round.games.map(function(game) {
							game.key = game.team1_key + game.team2_key + round.round.pos;
						});

						rounds.push(round);
						callback();
					}
				});
			}, function(err) {
				if(!err) {
					res.json(rounds);
				}
				else {
					console.log(err);
				}
			});
		}
	});
};*/