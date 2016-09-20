/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Rooms page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("RoomsController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService,globalService) {
    var vm = this;
    vm.chosedDay={};
    vm.choosenDate={};
    vm.statusHour=true;
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
vm.RemoveHour={};

     /*vm.choosenHour ={};*/

vm.choosenRoom={};


    vm.showRooms=false;
    vm.ShowRoomsInSelectedDates=function(d){

if(d=='today'){

    vm.choosenDate=vm.myDate;
        }else if(d=='tomorrow') {

    vm.choosenDate=vm.tomorowDate;
}
    else{

    vm.choosenDate=vm.afterTomorowDate;
    }

        vm.showRooms=true;
        vm.chosedDay=d;
    }

/*
    vm.ChooseHour = function(x){

        vm.choosenHour= x;
    }*/

    function DialogController($scope, $mdDialog,apiService) {

        $scope.showOrderInfo=false;
        $scope.hours=vm.hours;
        $scope.choosenHour={};
        $scope.choosenRoom=vm.choosenRoom;
        $scope.user=vm.userID;
        $scope.choosenDate=vm.choosenDate;

        $scope.ChooseHour=function($event,x) {
debugger
            if(x.status==false && x.user==$scope.user){
                $scope.choosenHour=x;
                vm.RemoveHour= x.hour
                vm.ShowRemoveOrder($event,$scope,x);
                $scope.showOrderInfo=false;
            }
            else if(x.status==false){
                vm.statusHour=false;
                Flash.create('warning', 'Cant Order This Room', 'large-text');
                $scope.showOrderInfo=false;
                //you cant choose this option
            }
            else{
                $scope.user=vm.userID;
                vm.statusHour=true;
                $scope.choosenHour=x;
                $scope.showOrderInfo=true;
            }



        }
        $scope.SaveRoomOrder=function() {

            if(vm.statusHour==false){
                Flash.create('danger', 'Cant Order This Room', 'large-text');
            }else {
                vm.roomOrder.hour = $scope.choosenHour.hour;
                /*
                 vm.roomOrder.date=$scope.choosenDate.getDate();
                 */
                vm.roomOrder._id = $scope.choosenRoom._id;
                vm.roomOrder.date = vm.chosedDay;
                vm.roomOrder.room = $scope.choosenRoom.name;
                vm.roomOrder.status = false;
                vm.roomOrder.userID=vm.userID;

                apiService.SaveOrderRoom(vm.roomOrder)
                    .then(function () {
                        console.log("Order Saved")
                        vm.Refresh();
                        Flash.create('success', 'Order Done Succesfully for Room : ' + vm.roomOrder.room + " at Hour: " + vm.roomOrder.hour + " on Date: " + vm.roomOrder.date, 'large-text');
                        $mdDialog.cancel();
                    }, function (err) {
                    });

                /*
                 $scope.choosenHour; TODO
                 */
            }

        }


        $scope.RemoveOrder=function() {
            vm.roomOrder.hour=vm.RemoveHour;
            vm.roomOrder._id=$scope.choosenRoom._id;
            vm.roomOrder.date=vm.chosedDay;
            vm.roomOrder.room=$scope.choosenRoom.name;
            vm.roomOrder.status=true;
            vm.roomOrder.userID="";

            apiService.SaveOrderRoom(vm.roomOrder)
                .then(function () {
                    console.log("Order Saved")
                    vm.Refresh();
                    Flash.create('success', 'Order Removed Succesfully for Room : '+vm.roomOrder.room +" at Hour: "+vm.roomOrder.hour+" on Date: "+vm.roomOrder.date, 'large-text');
                    $mdDialog.cancel();
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

    vm.ShowRemoveOrder = function(ev,$scope,x){

        $scope.choosenHour=x;


        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog4.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
                .then(function (answer) {
                    vm.status = 'You said the information was "' + answer + '".';
                }, function () {
                    vm.status = 'You cancelled the dialog.';
                });




        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            vm.customFullscreen = (wantsFullScreen === true);
        });

    }


    vm.showHoursForDate = function(ev,room) {

        vm.choosenRoom = room;
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;
        if (vm.chosedDay == "today") {


        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
            .then(function (answer) {
                vm.status = 'You said the information was "' + answer + '".';
            }, function () {
                vm.status = 'You cancelled the dialog.';
            });

    }
        else if(  vm.chosedDay=="tomorrow"){
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog2.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
                .then(function (answer) {
                    vm.status = 'You said the information was "' + answer + '".';
                }, function () {
                    vm.status = 'You cancelled the dialog.';
                });


        }
        else if(  vm.chosedDay=="afterTomorrow"){
            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog3.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                fullscreen: useFullScreen
            })
                .then(function (answer) {
                    vm.status = 'You said the information was "' + answer + '".';
                }, function () {
                    vm.status = 'You cancelled the dialog.';
                });


        }
        else{
            console.log("please choose date")
        }

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
    vm.tomorowDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth(),
        vm.myDate.getDate()+1);

    vm.afterTomorowDate= new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth(),
        vm.myDate.getDate()+2);
    vm.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }






}]);




