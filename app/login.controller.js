(function(){
	'use strict'
	angular
		.module('mainApp')
		.controller('loginController', loginController);

	function loginController($http){
		var vm = this;

		vm.username="";
		vm.password="";
		vm.loginUser=loginUser;

		vm.newUser = {};
		vm.user = [];
		vm.addUser = addUser;

		function loginUser(){
			var credentials={
				username: vm.username,
				password: vm.password
			}
			$http.post('/login', credentials)
				.then(function (response){
					var redirect = response.data.redirect;
					console.log(redirect);
					if (redirect === '/'){
						window.location.href=redirect;
					}	
				}, function (response){
				});
		}

		function addUser(){
	        console.log(vm.newUser);
	        $http
		        .post('/register', vm.newUser)
		        .then(function(response){
		              var insertedUser = {
		                "accountid": response.data.id,
		                "username": vm.newUser.username,
		                "password": vm.newUser.password,
		                "accounttype": normal_user,
		                "firstname": vm.newUser.firstname,
		                "middlename": vm.newUser.firstname,
		                "lastname": vm.newUser.firstname,
		                "contactno": vm.newUser.contactno,
		                "address": vm.newUser.address,
		                "email": vm.newUser.email
		              }
		            },
		            function(response){
		              console.log("Error. User cannot be added!");
		            }
		        )
	     }
	}

})();