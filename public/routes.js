angular.module('app')
    .config(function($routeProvider) {
      $routeProvider
        // route for the home page
      .when('/login', {
          templateUrl : 'common/views/login.html',
          controller  : 'LoginController'
      })
      .when('/home', {
          templateUrl : 'common/views/home.html'
      })
      .when('/signup', {
          templateUrl : 'common/views/signup.html'
      })
      .when('/doctor/profile', {
          templateUrl : 'doctor/views/doctorprofile.html'
      })
      .when('/patient/profile', {
          templateUrl : 'patient/views/patientprofile.html',
          controller  : 'PatientProfileController'
      })
      .when('/doctor/home', {
          templateUrl : 'doctor/views/Doctorhome.html'
      })
      .when('/patient/home', {
          templateUrl : 'patient/views/Prescription.html',
          controller : 'PatientPrescriptionController'
      })
      .when('/patient/MedCabinet', {
          templateURL: 'patient/views/medCabinet.html'
      })
      .when('/doctor/patientView', {
          templateURL: 'doctor/views/doctor_patientgraph.html'
      })
      .when('/doctor/doc_patient', {
          templateURL: 'doctor/views/doctor_patientprescription.html'
      })
      .otherwise({
          redirectTo  : '/'
      });
});
