'use strict';

angular.module('veikkauslaarnioApp')
  .controller('MatchesCtrl', function ($scope, $http, $routeParams, User) {
    $scope.match_dates = {
        suiecu4: new Date(2014, 5, 15, 19, 0, 0, 0),
        frahon4: new Date(2014, 5, 15, 22, 0, 0, 0),
        argbih4: new Date(2014, 5, 16, 1, 0, 0, 0),
        mexcmr2: new Date(2014, 5, 13, 19, 0, 0, 0),
        espned2: new Date(2014, 5, 13, 22, 0, 0, 0),
        chiaus2: new Date(2014, 5, 14, 1, 0, 0, 0),
        irnnga5: new Date(2014, 5, 16, 22, 0, 0, 0),
        gerpor5: new Date(2014, 5, 16, 19, 0, 0, 0),
        ghausa5: new Date(2014, 5, 17, 1, 0, 0, 0),
        bracro1: new Date(2014, 5, 12, 22, 0, 0, 0),
        colgre3: new Date(2014, 5, 14, 19, 0, 0, 0),
        civjpn3: new Date(2014, 5, 15, 4, 0, 0, 0),
        urucrc3: new Date(2014, 5, 14, 22, 0, 0, 0),
        engita3: new Date(2014, 5, 15, 1, 0, 0, 0),
        belalg6: new Date(2014, 5, 17, 19, 0, 0, 0),
        ruskor6: new Date(2014, 5, 18, 1, 0, 0, 0),
        bramex6: new Date(2014, 5, 17, 22, 0, 0, 0),
        cmrcro7: new Date(2014, 5, 19, 1, 0, 0, 0),
        espchi7: new Date(2014, 5, 18, 22, 0, 0, 0),
        ausned7: new Date(2014, 5, 18, 19, 0, 0, 0),
        colciv8: new Date(2014, 5, 19, 19, 0, 0, 0),
        jpngre8: new Date(2014, 5, 20, 1, 0, 0, 0),
        urueng8: new Date(2014, 5, 19, 22, 0, 0, 0),
        itacrc9: new Date(2014, 5, 20, 19, 0, 0, 0),
        suifra9: new Date(2014, 5, 20, 22, 0, 0, 0),
        honecu9: new Date(2014, 5, 21, 1, 0, 0, 0),
        argirn10: new Date(2014, 5, 21, 19, 0, 0, 0),
        ngabih10: new Date(2014, 5, 22, 1, 0, 0, 0),
        gergha10: new Date(2014, 5, 21, 22, 0, 0, 0),
        usapor11: new Date(2014, 5, 23, 1, 0, 0, 0),
        belrus11: new Date(2014, 5, 22, 19, 0, 0, 0),
        koralg11: new Date(2014, 5, 22, 22, 0, 0, 0),
        cmrbra12: new Date(2014, 5, 23, 23, 0, 0, 0),
        cromex12: new Date(2014, 5, 23, 23, 0, 0, 0),
        ausesp12: new Date(2014, 5, 23, 19, 0, 0, 0),
        nedchi12: new Date(2014, 5, 23, 19, 0, 0, 0),
        jpncol13: new Date(2014, 5, 24, 23, 0, 0, 0),
        civgre13: new Date(2014, 5, 24, 23, 0, 0, 0),
        itauru13: new Date(2014, 5, 24, 19, 0, 0, 0),
        crceng13: new Date(2014, 5, 24, 19, 0, 0, 0),
        honsui14: new Date(2014, 5, 25, 23, 0, 0, 0),
        ecufra14: new Date(2014, 5, 25, 23, 0, 0, 0),
        ngaarg14: new Date(2014, 5, 25, 19, 0, 0, 0),
        bihirn14: new Date(2014, 5, 25, 19, 0, 0, 0),
        usager15: new Date(2014, 5, 26, 19, 0, 0, 0),
        porgha15: new Date(2014, 5, 26, 19, 0, 0, 0),
        korbel15: new Date(2014, 5, 26, 23, 0, 0, 0),
        algrus15: new Date(2014, 5, 26, 23, 0, 0, 0),
    	brachi16: new Date(2014, 5, 28, 19, 0, 0, 0),
    	coluru16: new Date(2014, 5, 28, 23, 0, 0, 0),
    	nedmex16: new Date(2014, 5, 29, 19, 0, 0, 0),
    	crcgre16: new Date(2014, 5, 29, 23, 0, 0, 0),
    	franga16: new Date(2014, 5, 30, 19, 0, 0, 0),
    	geralg16: new Date(2014, 5, 30, 23, 0, 0, 0),
    	argsui16: new Date(2014, 6, 1, 19, 0, 0, 0),
    	belusa16: new Date(2014, 6, 1, 23, 0, 0, 0),
    	bracol17: new Date(2014, 6, 4, 23, 0, 0, 0),
    	frager17: new Date(2014, 6, 4, 19, 0, 0, 0),
    	nedcrc17: new Date(2014, 6, 5, 23, 0, 0, 0),
    	argbel17: new Date(2014, 6, 5, 19, 0, 0, 0),
    	brager18: new Date(2014, 6, 8, 23, 0, 0, 0),
    	nedarg18: new Date(2014, 6, 9, 23, 0, 0, 0)
    };

    $scope.user = null;

    $scope.score1_predictions = {};
    $scope.score2_predictions = {};
    $scope.score1_predictions_backup = {};
    $scope.score2_predictions_backup = {};
    $scope.new_predictions = {};

    $scope.points = {};

    $http.get('/api/rounds').success(function(worldcup) {
        $scope.rounds = [];
        worldcup.rounds.forEach(function(round) {
            $scope.rounds[round.pos] = round;

            $http.get('/api/rounds/' + round.pos).success(function(games) {
                $scope.rounds[games.round.pos].games = games.games;
            });
        });
    });

    var userid = 'me';
    $scope.isOwnProfile = true;

    if($routeParams.userid) {
    	userid = $routeParams.userid;
        $scope.isOwnProfile = false;
    }

    $http.get('/api/profiles/' + userid).success(function(user) {
        $scope.user = user;

        if($scope.user.predictions) {
            $scope.user.predictions.forEach(function(pred) {
                $scope.score1_predictions[pred.match_code] = pred.score1;
                $scope.score2_predictions[pred.match_code] = pred.score2;
                $scope.points[pred.match_code] = pred.points;
            });

            $scope.score1_predictions_backup = angular.copy($scope.score1_predictions);
            $scope.score2_predictions_backup = angular.copy($scope.score2_predictions);
        }
    });

    $scope.isModelChanged = function() {
        return !_.isEmpty($scope.new_predictions);
    };

    $scope.setModelChange = function(match_code, score1, score2, round) {
    	$scope.new_predictions[match_code] = { score1: score1, score2: score2, round: round }; 
    };

    $scope.saveChanges = function() {
        $scope.score1_predictions_backup = angular.copy($scope.score1_predictions);
        $scope.score2_predictions_backup = angular.copy($scope.score2_predictions);
        $scope.user.new_predictions = angular.copy($scope.new_predictions);       
        User.update({ id: 'me' }, $scope.user);
        $scope.new_predictions = {};
    };

    $scope.cancelChanges = function() {
        $scope.score1_predictions = angular.copy($scope.score1_predictions_backup);
        $scope.score2_predictions = angular.copy($scope.score2_predictions_backup);
        $scope.new_predictions = {};
    };

    $scope.isMatchScore = function(match) {
        return match.score1 != null && match.score2 != null;
    };

    $scope.isOvertime = function(match) {
        return match.score1ot != null && match.score2ot != null;
    }

    $scope.isPrediction = function(key) {
        return $scope.predictions[key];
    };

    $scope.isPredictionCorrect = function(match) {
        return $scope.isMatchScore(match) && $scope.points[match.key] > 0;
    };

    $scope.isScorePredictionCorrect = function(match) {
        return $scope.isMatchScore(match) && $scope.points[match.key] == 3;
    };

    $scope.hasMatchStarted = function(play_at, match_code) {
        if($scope.match_dates[match_code].getTime() < Date.now()) {
            return true;
        }

        return false;
    };
  });
