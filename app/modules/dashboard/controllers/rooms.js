﻿/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Rooms page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("RoomsController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService,globalService) {
    var vm = this;

    vm.userID=globalService.GetUserDetails().id;
vm.roomOrder={};
    vm.roomOrder.userID=vm.userID;
    vm.Refresh= function () {

        apiService.getAllRooms()
            .then(function (room) {
                vm.roomsArray = room;
            }, function (err) {
            });
    };
    vm.Refresh();


     vm.choosenHour ={hour:"Not Choosen yet.."};
vm.choosenRoom={};
    vm.hours = [
        {
            hour: 8,
        },
        {
            hour: 9,
        },
        {
            hour: 10,
        },  {
            hour: 11 ,
        },  {
            hour: 12 ,
        },  {
            hour: 13 ,
        },  {
            hour: 14 ,
        },
        {
            hour: 15 ,
        },  {
            hour: 16 ,
        },  {
            hour: 17 ,
        }


        ];

   /* vm.rooms = {};

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
    ];*/
    vm.showRooms=false;
    vm.ShowRoomsInSelectedDates=function(){

        vm.showRooms=true;
    }

/*
    vm.ChooseHour = function(x){

        vm.choosenHour= x;
    }*/

    function DialogController($scope, $mdDialog,apiService) {


        $scope.hours=vm.hours;
        $scope.choosenHour=vm.choosenHour;
        $scope.choosenRoom=vm.choosenRoom;
$scope.choosenDate=vm.myDate;

        $scope.ChooseHour=function(x) {
            $scope.choosenHour=x;


        }
        $scope.SaveRoomOrder=function() {
            vm.roomOrder.hour=$scope.choosenHour.hour;
/*
            vm.roomOrder.date=$scope.choosenDate.getDate();
*/
            vm.roomOrder.date="today"
            vm.roomOrder.room=$scope.choosenRoom.name;
debugger
            apiService.SaveOrderRoom(vm.roomOrder)
                .then(function () {
                    console.log("Order Saved")
                }, function (err) {
                });

/*
            $scope.choosenHour; TODO
*/


        }


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
    vm.showAdvanced = function(ev,room) {

        vm.choosenRoom=room;
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




