angular
  .module('app')
  .factory('Doctor', [function() {
    var doctor = Parse.Object.extend("Doctor", {
      // Instance methods
    }, {
      // Class methods
    });

    return doctor;
  }]);
