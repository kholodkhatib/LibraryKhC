/*==========================================================
 Author      : Ranjithprabhu K
 Date Created: 13 Jan 2016
 Description : Controller to handle room page
 Change Log
 s.no      date    author     description


 ===========================================================*/

dashboard.controller("RoomsHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$mdDialog', '$mdMedia', 'apiService',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash, $mdDialog, $mdMedia, apiService) {
        var vm = this;

        vm.Refresh = function () {

            apiService.getAllRooms()
                .then(function (room) {
                    vm.roomsArray = room;
                }, function (err) {
                });
        };
        vm.newroom = {};


        function DialogController($scope, $mdDialog, apiService) {

            $scope.room = {};
            $scope.roomForEdit = vm.example;
            $scope.roomForDelete = vm.roomForDelete;
            $scope.room.status = 'Available';
            vm.IsChecked = $scope.roomForEdit;

            $scope.DeleteRoom = function () {

                console.log($scope.roomForDelete);

                apiService.DeleteRoom($scope.roomForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditRoom = function () {


                console.log($scope.room);
                if ($scope.roomForEdit.name && $scope.roomForEdit.description) {
                    apiService.EditRoom($scope.roomForEdit)
                        .then(function (data) {
                            Flash.create('success', 'Edited Successfully', 'large-text');
                            vm.Refresh();
                            $mdDialog.cancel();
                        }, function (err) {
                            vm.Refresh();
                        });

                }
                else {
                    Flash.create('danger', 'Fill All Data Please', 'large-text');
                }
            }


            $scope.CreateNewRoom = function () {

                if ($scope.room.name && $scope.room.description) {

                    apiService.createNewRoom($scope.room)
                        .then(function (data) {
                            Flash.create('success', 'Added Successfully', 'large-text');
                            vm.Refresh();
                            $mdDialog.cancel();
                        }, function (err) {
                        });
                }
                else {
                    Flash.create('danger', 'Fill All Data Please', 'large-text');
                }
            };
            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.answer = function (answer) {
                $mdDialog.hide(answer);
            };
        }


        vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
        vm.showAdvanced = function (ev) {

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

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


            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });

        };


        vm.showEditDialog = function (ev, roomForEdit) {
            vm.roomForEdit = roomForEdit;
            vm.example = angular.copy(vm.roomForEdit);


            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

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


            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });

        };


        vm.showDeleteDialog = function (ev, roomForDelete) {
            vm.roomForDelete = roomForDelete;

            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

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


            $scope.$watch(function () {
                return $mdMedia('xs') || $mdMedia('sm');
            }, function (wantsFullScreen) {
                vm.customFullscreen = (wantsFullScreen === true);
            });

        };


        vm.Refresh();


    }]);

