angular.module('app')
  .controller('DoctorHomeController', ['$scope', '$rootScope', 'Patient', '$timeout', '$http', function($scope, $rootScope, Patient) {
  console.log('reached home controller');
  $rootScope.user = {
		firstname: $rootScope.currentUser.get('firstname'),
		lastname: $rootScope.currentUser.get('lastname'),
		age: $rootScope.currentUser.get('age'),
		gender: $rootScope.currentUser.get('gender'),
		email: $rootScope.currentUser.get('email'),
		phone: $rootScope.currentUser.get('phone'),
		imageURL: $rootScope.currentUser.get("photo").url(),
	};
}]);