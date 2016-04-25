angular
  .module('app')
  .factory('Patient', ['Parse', function(Parse) {
    var patient = Parse.Object.extend("Patient", {
      // Instance methods
    }, {
      // Class methods
    });

    return patient;
  }]);
