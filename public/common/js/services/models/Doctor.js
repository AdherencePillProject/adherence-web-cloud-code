angular
  .module('app')
  .factory('Doctor', ['Parse', function(Parse) {
    var doctor = Parse.Object.extend("Doctor", {
      // Instance methods
    }, {
      // Class methods
    });

    return doctor;
  }]);
