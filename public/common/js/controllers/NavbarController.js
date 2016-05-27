angular.module('app')
  .controller('NavbarController', ['$rootScope', '$scope', '$location', 'User', function($rootScope, $scope, $location, User) {
      $scope.active = ('/login' === $location.path()) || ('/signup' === $location.path());

  }]);
