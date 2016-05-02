var app = angular.module('app', ['ngRoute']);

app.run(function($rootScope) {
  Parse.initialize("BDo39lSOtPuBwDfq0EBDgIjTzztIQE38Fuk03EcR", "ox76Y4RxB06A69JWAleRHSercHKomN2FVu61dfu3");
  $rootScope.currentUser = Parse.User.current();
});

app.controller('NavController', function($scope, $location) {
  $scope.isActive = function (viewLocation) {

      return $location.absUrl().indexOf(viewLocation) != -1;
  };
});
