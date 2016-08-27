/*==========================================================
    Author      : Kholod K
    Date Created: 13 Jan 2016
    Description : Controller to handle Orders page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("RoomOrdersController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,apiService,globalService) {
    var vm = this;

    vm.userID=globalService.GetUserDetails().id;
    vm.MYroomsArray=[];
    vm.roomsArray={};
    vm.Refresh= function () {

        apiService.getAllRooms()
            .then(function (room) {
                vm.roomsArray = room;
                vm.getByUserId();
            }, function (err) {
            });
    };
vm.getByUserId= function() {
    var i,j = 0
    for (i = 0; i < vm.roomsArray.length; i++) {
        var room = vm.roomsArray[i];

        for(j=0;j<room.Today.hours.length;j++){
            var hour = room.Today.hours[j];

            if(hour.user==vm.userID){
                hour.date="today";
                hour.room=room.name;
                hour.info=room.description;
                vm.MYroomsArray.push(hour);
            }
        }

        for(j=0;j<room.Tomorrow.hours.length;j++){

            var hour = room.Tomorrow.hours[j];

            if(hour.user==vm.userID){
                hour.date="Tomorrow";
                hour.room=room.name;
                hour.info=room.description;
                vm.MYroomsArray.push(hour);
            }
        }

        for(j=0;j<room.AfterTomorrow.hours.length;j++){
            var hour = room.AfterTomorrow.hours[j];

            if(hour.user==vm.userID){
                hour.date="After Tomorrow";
                hour.room=room.name;
                hour.info=room.description;
                vm.MYroomsArray.push(hour);
            }
        }

    }
}

    vm.Refresh();
}]);

