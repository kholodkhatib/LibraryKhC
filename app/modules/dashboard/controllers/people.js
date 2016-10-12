/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("PeopleController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService','globalService',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService,globalService) {
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
     /*   vm.userlocal=globalService.GetUserDetails();*/


        function DialogController($scope, $mdDialog,apiService) {


            $scope.person= {};
          //  $scope.personForEdit=vm.personForEdit;
            $scope.personForEdit=vm.example;

            $scope.personForDelete=vm.personForDelete;


            $scope.DeletePerson=function(){

                console.log($scope.personForDelete);

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

                if (  $scope.personForEdit.firstName && $scope.personForEdit.lastName && $scope.personForEdit.email&& $scope.personForEdit.birthday && $scope.personForEdit.password ) {

                    apiService.EditPerson($scope.personForEdit)
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
            $scope.CreateNewPeople= function(){

                if ( $scope.person.gender &&$scope.person.id && $scope.person.firstName && $scope.person.lastName && $scope.person.email && $scope.person.birthday && $scope.person.password ) {


                    apiService.createNewPeople($scope.person)
                        .then(function (data) {
                            Flash.create('success', 'Added Successfully', 'large-text');
                            vm.Refresh();
                            $mdDialog.cancel();
                        }, function (err) {
                            Flash.create('danger', '' + err.data, 'large-text');
                            $mdDialog.cancel();
                        });
                }
                else {
                    Flash.create('danger', 'Fill All Data Please', 'large-text');
                }

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
            vm.IsAdmin= personForEdit.isAdmin;
            vm.example = angular.copy(vm.personForEdit);

            vm.IsChecked=globalService.IsFemale(vm.personForEdit.gender);
           // vm.IsCheckedFemale=!vm.IsChecked;


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

