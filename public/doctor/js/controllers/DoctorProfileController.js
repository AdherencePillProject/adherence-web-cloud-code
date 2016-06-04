angular.module('app')
  .controller('DoctorProfileController', ['$scope', '$rootScope', 'Doctor', '$timeout', '$http', function($scope, $rootScope, Doctor, $timeout, $http) {
  var profileImage;
  if (angular.isUndefined($rootScope.currentUser.get("photo"))) {
    profileImage = "http://files.parsetfss.com/658c91b7-5524-4d6d-901d-467f243eda11/tfss-8a768afb-cf7f-4941-894a-3a0927280ffe-defaultAvatar.png";
  }
  else {
    profileImage = $rootScope.currentUser.get("photo").url()
  }
  $rootScope.user = {
		firstname: $rootScope.currentUser.get('firstname'),
		lastname: $rootScope.currentUser.get('lastname'),
		age: $rootScope.currentUser.get('age'),
		gender: $rootScope.currentUser.get('gender'),
		email: $rootScope.currentUser.get('email'),
		phone: $rootScope.currentUser.get('phone'),
		imageURL: profileImage,
	};
 $(function() {
    var file;
    // This function is called when the user clicks on Upload to Parse. It will create the REST API request to upload this image to Parse.
    $('#uploadbutton').click(function() {
      var base64 = "V29ya2luZyBhdCBQYXJzZSBpcyBncmVhdCE=";
      //var file = new Parse.File("myfile.txt", { base64: base64 });
      var fileUploadControl = $("#fileselect")[0];
      if (fileUploadControl.files.length > 0) {
        var file = fileUploadControl.files[0];
        var name = "photo.jpg";
        var parseFile = new Parse.File(name, file);
      }
      parseFile.save().then(function() {
        console.log('image saved');
      }, function(error) {
        console.log('image not saved');
      });
      $rootScope.currentUser.set('photo', parseFile);
      $rootScope.currentUser.save();
      $rootScope.user.imageURL = parseFile.url();
    });


  });



  $rootScope.saveUser = function() {
    // $scope.user already updated!

		$rootScope.currentUser.save(null, {
			success: function(currentUser) {
				// Now let's update it with some new data. In this case, only cheatMode and score
				// will get sent to the cloud. playerName hasn't changed.
				currentUser.set('firstname', $scope.user.firstname);
				currentUser.set('lastname', $scope.user.lastname);
				currentUser.set('gender', $scope.user.gender);
				currentUser.set('email', $scope.user.email);
				currentUser.set('phone', $scope.user.phone);
				currentUser.set('age', $scope.user.age);
				currentUser.save();
			},
			error: function(currentUser, error) {
				alert("Error: " + error.code + " " + error.message);
			}
		});
       
  };






  }]);


