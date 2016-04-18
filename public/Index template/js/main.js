var apbApp = angular.module('apbApp', ['ui.router']);

apbApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/prescription');

    $stateProvider

        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        .state('prescription', {
            url:'/prescription'
            templateUrl: 'prescription.html'
        })

        .state('prescription', {
            url:'/prescription'
            templateUrl: 'prescription.html'
        })

        .state('patient-profile', {
            url:'/patient-profile'
            templateUrl: 'patient-profile.html'
        })

        .state('MedCabinet', {
            url:'/MedCabinet'
            templateUrl: 'MedCabinet.html'
        });

});
