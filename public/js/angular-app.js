var app = angular.module('adherence-partials', []);

app.controller('MainController', function($scope) {
  // $scope.msg = "Hello from main controller";
  // $scope.hi= function(){console.log('hi');};
});

app.controller('NavController', function($scope) {
	// $scope.id= $attrs.model;
	// console.log($scope.id)
	// angular.element('#' + $scope.id).addClass("active");
	this.tab = 1;

    this.setTab = function (tabId) {
        this.tab = tabId;
    };

    this.isSet = function (tabId) {
        return this.tab === tabId;
    };
});

