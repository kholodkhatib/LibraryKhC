/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("EventsHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService) {
    var vm = this;


    vm.Refresh= function () {

        apiService.getAllEvents()
            .then(function (event) {
                vm.eventsArray = event;
            }, function (err) {
            });
    };
    vm.newevent={};

 /*   vm.eventsArray=[
        {  id:"123",
            name:"person1",
            description:"lastname",
            time:"person1@hotmail.com",
            date:"Yaffa",

        },
        {  id:"123",
            name:"person1",
            description:"lastname",
            time:"person1@hotmail.com",
            date:"Yaffa",

        },
        {  id:"123",
            name:"person1",
            description:"lastname",
            time:"person1@hotmail.com",
            date:"Yaffa",

        },
        {  id:"123",
            name:"person1",
            description:"lastname",
            time:"person1@hotmail.com",
            date:"Yaffa",

        }


    ];*/



    function DialogController($scope, $mdDialog,apiService) {


        $scope.event= {};

         $scope.newObject = jQuery.extend(true, {}, vm.eventForDelete);
        $scope.eventForEdit=vm.example;
        $scope.eventForDelete= $scope.newObject;


        $scope.DeleteEvent=function(){

            console.log($scope.eventForDelete);

            apiService.DeleteEvent($scope.eventForDelete)
                .then(function (data) {
                    vm.Refresh();
                    $mdDialog.cancel();
                }, function (err) {
                    vm.Refresh();
                });

        }
        $scope.EditEvent=function(){



            console.log($scope.event);
            if ($scope.eventForEdit.name && $scope.eventForEdit.description && $scope.eventForEdit.time &&$scope.eventForEdit.date) {
                apiService.EditEvent($scope.eventForEdit)
                    .then(function (data) {
                        Flash.create('success', 'Edited Successfully', 'large-text');
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });
            }
            else{
                Flash.create('danger', 'Fill All Data Please', 'large-text');
            }


        }


        $scope.CreateNewEventt= function(){


            console.log($scope.event);
            if ($scope.event.name && $scope.event.description && $scope.event.time &&$scope.event.date) {
                apiService.createNewEvent($scope.event)
                    .then(function (data) {
                        Flash.create('success', 'Added Successfully', 'large-text');
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                    });
            }
            else{
                Flash.create('danger', 'Fill All Data Please', 'large-text');
            }

        };
        $scope.hide = function() {

            $mdDialog.hide();
            vm.Refresh();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
            vm.Refresh();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }



    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    vm.showAdvanced = function(ev) {

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


    vm.showEditDialog = function(ev,eventForEdit) {
        vm.eventForEdit=eventForEdit;
        vm.example = angular.copy(vm.eventForEdit);


        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog2.tmpl.html',
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


    vm.showDeleteDialog = function(ev,eventForDelete) {
        vm.eventForDelete=eventForDelete;

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog3.tmpl.html',
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






    vm.Refresh();
}]);

