angular.module('app')
  .controller('NavbarController', ['$rootScope', '$scope', '$location', function($rootScope, $scope, $location) {
      $scope.active = ('/login' === $location.path()) || ('/signup' === $location.path());

      $scope.logOut = function() {
        console.log(Parse.User.current())
        console.log($rootScope.currentUser)
        Parse.User.logOut({
          success: function() {
            $rootScope.currentUser = null;
          },
          error: function() {
            alert("Error!");
          }
        });
        console.log(Parse.User.current())
        console.log($rootScope.currentUser)
      };

  }]);
