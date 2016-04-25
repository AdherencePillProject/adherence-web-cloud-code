angular
  .module('app')
  .factory('User', ['Parse', function(Parse) {
    var user = Parse.User;

    return user;
  }]);
