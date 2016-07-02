/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Rooms page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("RoomsController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia) {
    var vm = this;

    vm.rooms = {};

    //development stack
    vm.rooms.development = [
        {
            NumberOfSeats: "4 seats",
            RoomName: "Room 1",
            theme: "yellow",
            image: "mongodb"
        },
        {
            NumberOfSeats: "4 seats",
            RoomName: "Room 1",
            theme: "aqua",
            image: "express"
        },
        {
            NumberOfSeats: "4 seats",
            RoomName: "Room 1",
            theme: "green",
            image: "angular"
        },
        {
            NumberOfSeats: "4 seats",
            RoomName: "Room 1",
            theme: "purple",
            image: "node"
        },
        {
            NumberOfSeats: "4 seats",
            RoomName: "Room 1",
            theme: "maroon",
            image: "javascript"
        },
        {
            NumberOfSeats: "4 seats",
            RoomName: "Room 1",
            theme: "teal",
            image: "typescript"
        },
        {
            NumberOfSeats: "4 seats",
            RoomName: "Room 1",
            theme: "yellow",
            image: "jquery"
        },
        {
            NumberOfSeats: "4 seats",
            RoomName: "Room 1",
            theme: "red",
            image: "joomla"
        }
    ];
    vm.showRooms=false;
    vm.ShowRoomsInSelectedDates=function(){

        vm.showRooms=true;
    }
    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }
    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    vm.showAdvanced = function(ev) {
        debugger
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        })
            .then(function(answer) {
                vm.status = 'You said the information was "' + answer + '".';
            }, function() {
                vm.status = 'You cancelled the dialog.';
            });



        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            vm.customFullscreen = (wantsFullScreen === true);
        });

    };

    vm.myDate = new Date();
    vm.minDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth() - 2,
        vm.myDate.getDate());
    vm.maxDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth() + 2,
        vm.myDate.getDate());
    vm.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }





}]);




