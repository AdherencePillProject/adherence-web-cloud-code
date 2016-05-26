'use strict';
angular
.module('app')
.controller('prescriptionCtrl', ['$scope', '$rootScope', 'Patient', function($scope, $rootScope, Patient) {
	$scope.checked = false;// if the patient have taken this pill: showing checked span
	$scope.unchecked = !$scope.checked;// else showing unchecked;
    console.log($scope.unchecked);

	// funtion: addZero
	// add 0 to one digit numbers to modify the format of time
	var addZero = function(i) {
          if (i < 10) {
              i = "0" + i;
          }
          return i;
        };


    $scope.month = "";
    $scope.date = "";
    var currentdate = new Date();

    $scope.month = addZero(currentdate.getMonth()+1);
    $scope.date = addZero(currentdate.getDate());
    console.log($scope.month);
    console.log(currentdate.getDate());
    // get the abbrevation of day_of_week
    
    var weekday = new Array(7);
	    weekday[0] = "Sun";
	    weekday[1] = "Mon";
	    weekday[2] = "Tue";
	    weekday[3] = "Wed";
	    weekday[4] = "Thu";
	    weekday[5] = "Fri";
	    weekday[6] = "Sat";

    $scope.day_of_week = weekday[currentdate.getDay()];
    console.log(currentdate.getDay());
    console.log($scope.day_of_week);
    console.log('current user is', $rootScope.currentUser.get('prescription'));
    // pill_info 
    // include the information of pills a patient should take, please retrieve from database

    $scope.pill_info = [
    	{
    		"index": "0",
    		"name" :"Antihistamine",
    		"dose" :"2",
    		"time":"09:30",
    		"intro":"Here is the detailed introduction to this pill and prescription inforamtion"
    	},

        {
            "index": "1",
            "name" :"Sonata",
            "dose" :"1",
            "time":"11:30",
            "intro":"Here is the detailed introduction to"
        }
    ];

    query.find({
        var relation = User.relation('prescription');
    })

    //function:show_detail
    //click the the pill and show pill_detail
  //   $scope.showDetaili = true;
  //   $scope.show_detail = function(){
		// $scope.showDetail = ! $scope.showDetail;
  //   };


  $scope.open = function(item){
        if ($scope.isOpen(item)){
            $scope.opened = undefined;
        } else {
            $scope.opened = item;
        }        
    };
    
    $scope.isOpen = function(item){
        return $scope.opened === item;
    };
    
    $scope.anyItemOpen = function() {
        return $scope.opened !== undefined;
    };
    
    $scope.close = function() {
        $scope.opened = undefined;
    };


}]);