angular.module('app')
  .controller('SignupController', ['$rootScope', '$scope', 'User', 'UI', '$location', function($rootScope, $scope, User, UI, $location) {

      $scope.user = {
        first_name: "",
        last_name: "",
        sex: "",
        phone: "",
        account_type: "",
        password: "",
        confirm_password: ""
      };

      $scope.doctor = {
        hospital_name: "",
        hospital_address: "",
        hospital_city: "",
        hospital_zip: ""
      };

      $scope.pharmacy = {
        pharmacy_name: "",
        hospital_address: "",
        hospital_city: "",
        hospital_zip: ""
      };


      $(document).ready(function() {
          $('select').material_select();
      });


      $scope.signUp = function () {
        User.signUp($scope.username, $scope.password, $scope.attr, {
          success: function(user) {
            UI.success("Success!", "Your account has been registered. Logging in...");
            User.logIn($scope.username, $scope.password, {
              success: function(u) {
                console.log("Success!");
                $rootScope.currentUser = u;
                $scope.apply(function() {
                  $location.path("/");
                });
              },
              error: function(u, err) {
                UI.error("Error: " + error.code, error.message);
              }
            });
          },
          error: function(user, error) {
            UI.error("Error: " + error.code, error.message);
            }
          });
      };



    // // This function will create a new patient.
    // function CreateNewPatient(username, password, email, phone, firstname, lastname) {
    // 	var patient = new Object();
    // 	patient.username = username;
    // 	patient.password = password;
    // 	patient.email = email;
    // 	patient.phone = phone;
    // 	return patient;
    // }
    //
    // // Save the new user to Parse
    // function saveNewUser(user, accountType, additionalInfo, redirectUrl){
    // 	event.preventDefault();
    // 	newUser = new Parse.User();
    // 	newUser.set("username", user.email);
    // 	newUser.set("password", user.password);
    // 	newUser.set("email", user.email);
    // 	newUser.set("phone", user.phone);
    // 	newUser.set("firstname", user.firstname);
    // 	newUser.set("lastname", user.lastname);
    // 	if(user.gender == 0){
    // 		newUser.set("gender", "Male");
    // 	}else if(user.gender == 1){
    // 		newUser.set("gender", "Female");
    // 	}
    //
    // 	var query = new Parse.Query(Parse.User);
    //     query.equalTo("email", user.email);
    //     query.first({
    //     	success: function (foundUser) {
    //     		if (foundUser) {
    // 	    		var pp = foundUser.get("patientPointer");
    // 	        var dp = foundUser.get("doctorPointer");
    // 	    		if ((pp != null) & (accountType == "Patient")) {
    // 	    			alert("There already exists a patient profile registered to this email");
    // 	    		}
    // 	    		else if ((dp != null) & (accountType == "Doctor"))
    // 	    			alert("There already exists a doctor profile associated with this email");
    // 	    		else if (accountType == "Doctor" & (dp == null)) {
    // 	    			var r = confirm("This email already has a patient profile. Would you also like to create a doctor profile for this email?");
    // 	    			if (r == true) {
    // 	    				var doctor = new Parse.Object("Doctor");
    // 						doctor.set("address", additionalInfo.address);
    // 						doctor.set("hospitalCity", additionalInfo.hospitalCity);
    // 						doctor.set("hospitalName", additionalInfo.hospitalName);
    // 						doctor.set("userAccount", foundUser);
    // 						doctor.save(null, {
    // 							success: function(doc) {
    // 									Parse.Cloud.run('saveUserWithNewPointer', { user: foundUser.id, pointer: doc.id, newRole: "Doctor" }, {
    // 									success: function (s) {
    // 										alert("user saved, " + s);
    // 										window.location.replace(redirectUrl);
    // 									},
    // 									error: function (e) {
    // 										alert("error: " + e.message);
    // 										window.location.replace(redirectUrl);
    // 									}
    // 								});
    //
    // 							}
    // 						});
    // 	    			}
    // 	    		}
    // 	    		else if (accountType == "Patient" & (pp == null)) {
    // 	    			var r = confirm("This email already has a doctor profile. Would you also like to create a patient profile for this email?");
    // 	    			if (r == true) {
    // 	    				var patient = new Parse.Object("Patient");
    // 						patient.set("userAccount", foundUser);
    // 						patient.save(null, {
    // 							success: function(pat) {
    //
    // 								Parse.Cloud.run('saveUserWithNewPointer', { user: foundUser.id, pointer: pat.id, newRole: "Patient" }, {
    // 									success: function (s) {
    // 										alert("user saved, " + s);
    // 										window.location.replace(redirectUrl);
    // 									},
    // 									error: function (e) {
    // 										alert("error: " + e.message);
    // 										window.location.replace(redirectUrl);
    // 									}
    // 								});
    // 							}
    // 						});
    // 	    			}
    // 	    		}
    //
    // 	    	}
    // 	    	else {
    // 	    		newUser.signUp(null, {
    // 					success: function(newUser) {
    // 						setUR(newUser, user, accountType, additionalInfo,redirectUrl);
    // 					},
    // 					error: function(newUser, error) {
    // 						alert("Error: " + error.code + " " + error.message);
    // 					}
    // 				})
    //
    // 	    	}
    // 		}
    //     });
    // }
    //
    //
    // function setUR(newUser, user, accountType, additionalInfo, redirectUrl) {
    // 	Parse.Cloud.run('setUserRole', { accountType: user.accountType }, {
    // 		success: function(role) {
    //   			alert("The user role has been successfully set to " + user.accountType);
    //   			if(accountType.toLowerCase() == "patient"){
    // 				Parse.Cloud.run('setPatient', { username: newUser.getUsername() }, {
    //   					success: function(newUser) {
    //   						alert("The patient is successfully set");
    //   						window.location.replace(redirectUrl);
    //   					},
    //   					error: function(error) {
    //   						alert("Failed to set patient " + error.code + " " + error.message);
    //   					}
    // 				});
    // 			}else if(accountType.toLowerCase() == "doctor"){
    // 				var doctor = new Parse.Object("Doctor");
    // 				doctor.set("address", additionalInfo.address);
    // 				doctor.set("hospitalCity", additionalInfo.hospitalCity);
    // 				doctor.set("hospitalName", additionalInfo.hospitalName);
    // 				doctor.set("userAccount", newUser);
    // 				doctor.save(null, {
    // 					success: function(doc) {
    // 						newUser.set("doctorPointer", doc);
    // 						newUser.save();
    // 						window.location.replace(redirectUrl);
    // 					}
    // 				});
    //
    // 			}else if(accountType.toLowerCase() == "pharmacy"){
    // 				newUser.set("userType", ["PharmacyStuff"]);
    // 			}
    // 		},
    // 		error: function(error) {
    //   			alert("Failed to set user role to " + user.accountType + " " + error.code + " " + error.message);
    //   		}
    // 	});
    // 	alert("Successfully registered");
    // }
    //


  }]);
