angular
  .module('app')
  .factory('User', [function() {
    var user = Parse.User;

    return user;
  }]);
