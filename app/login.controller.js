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
		vm.addUser = addUser;
		vm.openModal = openModal;
		vm.closeModal = closeModal;

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

		function addUser() {
			vm.newUser.dateadded = new Date();
			vm.newUser.accounttype = 'normal_user';
	        $http
		        .post('/register', vm.newUser)
		        .then(function(response){
						console.log(response.data);
						console.log('Success. User added!')
		            },
		            function(response){
		              	console.log("Error. User cannot be added!");
		            });
			closeModal();
	     }

		 function openModal() {
			 $('.ui.modal')
			 	.modal('setting', {
					 closable: false
				})
				.modal('show');
		 }
		 
		 function closeModal() {
			 $('.ui.modal')
			 	.modal('hide');
			vm.newUser = {};	
		 }
	}

})();