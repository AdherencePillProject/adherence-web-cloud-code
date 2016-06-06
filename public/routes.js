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
          templateUrl : 'common/views/signup.html',
          controller: 'SignupController'
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
          controller  : 'patient_graphCtrl',
          css : 'doctor/css/doctor_table.css'
      })
      .when('/doctor/docpatient', {
          templateUrl: 'doctor/views/doctor_patientprescription.html',
          controller  : 'DoctorPrescriptionController'
      })
      .when('/doctor/graph', {
          templateURL: 'doctor/views/doctor_patientgraph.html',
          controller: 'patient_graphCtrl',
          css: 'doctor_patientgraph.css'
       })
      .when('/patient/home', {
          templateUrl : 'patient/views/Prescription.html',
          controller : 'prescriptionCtrl',
          css: 'patient/css/patient_prescription.css'
      })
      .when('/patient/MedCabinet', {
          templateUrl: 'patient/views/medCabinet.html',
          controller: 'MedCabinetController',
          css: 'patient/css/medcabinet.css'
      })
      .when('/doctor/patientView', {
          templateUrl: 'doctor/views/doctor_patientgraph.html'
      })
      .otherwise({
          redirectTo  : '/'
      });
});
