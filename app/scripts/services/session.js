'use strict';

angular.module('veikkauslaarnioApp')
  .factory('Session', function ($resource) {
    return $resource('/api/session/');
  });
