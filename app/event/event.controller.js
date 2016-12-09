(function() {
	'use strict'
	angular
		.module('mainApp')
		.controller('eventController', eventController);

	function eventController($http){
		var vm = this;

	    vm.events = [];
        vm.allEvents = [];

        vm.searchCategory = 'eventname';
        vm.searchFilter = '';
        vm.searchYear = '1970';
        vm.searchMonth = '01';
        vm.searchDate = '01';

        vm.search = search;


        $http
            .get('/events')
            .then(function(response) {
            if (response.data){
            vm.events = response.data;
            vm.allEvents = vm.events;
            }
        });

        function search() {
            console.log('searching?');
            if (vm.searchCategory !== 'eventdate') {
                vm.events = vm.allEvents.filter(event => {
                    return event[vm.searchCategory].toLowerCase().includes(vm.searchFilter.toLowerCase());
                });
            } else {
                if (vm.searchYear) var year = vm.searchYear;
                else var year = '\\d{4}';

                if (vm.searchMonth) var month = vm.searchMonth;
                else var month = '\\d{2}';

                if (vm.searchDate) var date = vm.searchDate;
                else var date = '\\d{2}';

                var re = new RegExp(year+'-'+month+'-'+date);
                console.log(re);
                vm.events = vm.allEvents.filter(event => {
                    if (event.eventdate.match(re))
                        return true;
                    return false;
                });
            }
        }


	}
})();