angular.module('app')
    .config(function($routeProvider) {
      $routeProvider
        // route for the home page
      .when('/inbox', {
            templateUrl : 'common/views/inbox.html',
            controller  : 'InboxController'
      })
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
          templateUrl : 'doctor/views/doctorprofile.html',
          controller: 'DoctorProfileController'
      })
      .when('/patient/profile', {
          templateUrl : 'patient/views/patientprofile.html',
          controller  : 'PatientProfileController'
      })
      .when('/doctor/home', {
          templateUrl : 'doctor/views/Doctorhome.html',
          controller  : 'DoctorHomeController'
      })
      .when('/doctor/docpatient', {
          templateUrl: 'doctor/views/doctor_patientprescription.html',
          controller  : 'DoctorPrescriptionController'
      })
      .when('/patient/home', {
          templateUrl : 'patient/views/Prescription.html',
          controller : 'PatientPrescriptionController'
      })
      .when('/patient/MedCabinet', {
          templateUrl: 'patient/views/medCabinet.html'
      })
      .when('/doctor/patientView', {
          templateUrl: 'doctor/views/doctor_patientgraph.html'
      })
      .otherwise({
          redirectTo  : '/'
      });
});
