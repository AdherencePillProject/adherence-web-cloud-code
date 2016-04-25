angular.module('app')
    .config(function($routeProvider) {
      $routeProvider
        // route for the home page
      .when('/login', {
          templateUrl : 'common/views/login.html',
          controller : 'LoginController'
      })
      .when('/home', {
          templateUrl : 'common/views/home.html'
      })
      .when('/signup', {
          templateUrl : 'common/views/signup.html'
      })
      .when('/profile/doctor', {
          templateUrl : 'doctor/views/doctorprofile.html'
      })
      .when('/profile/patient', {
          templateUrl : 'patient/views/patientprofile.html'
      })
      .otherwise({
          redirectTo  : '/'
      });
});
