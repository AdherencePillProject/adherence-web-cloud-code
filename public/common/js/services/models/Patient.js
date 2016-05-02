angular
  .module('app')
  .factory('Patient', [function() {
    var patient = Parse.Object.extend("Patient", {
      // Instance methods
    }, {
      // Class methods
    });

    return patient;
  }]);
