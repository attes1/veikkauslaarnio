'use strict';

angular.module('veikkauslaarnioApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Ottelut',
      'link': '/matches'
    }, {
      'title': 'Tilastot',
      'link': '/statistics'
    }];
    
    $scope.logout = function() {
      Auth.logout()
      .then(function() {
        $location.path('/login');
      });
    };
    
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
