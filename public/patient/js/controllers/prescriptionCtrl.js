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


    $scope.prescriptions = [];
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
    // pill_info
    // include the information of pills a patient should take, please retrieve from database

    var query = $rootScope.currentUser.relation('prescription').query();
    // query.limit(5);
    // query.descending('createdAt');
    query.find({
      success: function(res) {
        $scope.$apply(function() {
          $scope.prescriptions = res;
        });
      },
      error: function(err) {
        console.log('this didnt work')
        console.log(err);
      }
    });


    console.log('current user is', $rootScope.currentUser.get('prescription'));
    // pill_info 
    // include the information of pills a patient should take, please retrieve from database

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


<<<<<<< HEAD
}]);
=======
}]);
>>>>>>> 8bbc931b0b0b85338166bfee7d9cdceadbd2249b
