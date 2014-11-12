'use strict';

angular.module('veikkauslaarnioApp')
  .controller('StatisticsCtrl', function ($scope, $http) {
    $http.get('/api/profiles').success(function(profiles) {
    	profiles.forEach(function(profile) {
    		var points = {};

    		profile.predictions.forEach(function(prediction) {
	    		if(prediction.points != null) {
	    			points[prediction.match_code] = prediction.points;
	    		}
	    	});

	    	profile.points = 0;

	    	for(var p in points) {
	    		profile.points += points[p];
	    	}
    	});


      	$scope.users = profiles;
    });
  });
