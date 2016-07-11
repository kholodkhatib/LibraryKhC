﻿/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("PeopleController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService) {
    var vm = this;



        vm.personForEdit={};
        vm.personForDelete={};

        vm.Refresh= function () {

            apiService.getAllPeople()
                .then(function (person) {
                    vm.peopleArray = person;
                }, function (err) {
                });
        };
        vm.newperson={};



        function DialogController($scope, $mdDialog,apiService) {


            $scope.person= {};
            $scope.personForEdit=vm.personForEdit;
            $scope.personForDelete=vm.personForDelete;
            debugger

            $scope.DeletePerson=function(){

                console.log($scope.personForDelete);
                debugger
                apiService.DeletePerson($scope.personForDelete) // to countine
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditPerson=function(){

                debugger

                console.log($scope.person);
                debugger
                apiService.EditPerson($scope.personForEdit)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.CreateNewPeople= function(){
                debugger

                console.log($scope.person);
                debugger
                apiService.createNewPeople($scope.person)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                    });
            };




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

        vm.showEditDialog = function(ev,personForEdit) {
            vm.personForEdit=personForEdit;
            debugger
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


        vm.showDeleteDialog = function(ev,personForDelete) {
            vm.personForDelete=personForDelete;
            debugger
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

