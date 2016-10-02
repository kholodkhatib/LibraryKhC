/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("AuthorsHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService) {
    var vm = this;
//author
    vm.authorForEdit={};
    vm.authorForDelete={};
vm.Refresh= function () {

    apiService.getAllAuthors()
        .then(function (authors) {
            vm.authorsArray = authors;
        }, function (err) {
        });
};
vm.newauthor={};




    function DialogController($scope, $mdDialog,apiService) {

        $scope.author= {};
        $scope.authorForEdit=vm.example;
        $scope.authorForDelete=vm.authorForDelete;






            $scope.DeleteAuthor=function(){

                console.log($scope.authorForDelete);

                apiService.DeleteAuthor($scope.authorForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditAuthor=function() {


                console.log($scope.author);
                if ($scope.authorForEdit.name) {

                apiService.EditAuthor($scope.authorForEdit)
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

            $scope.CreateNewAuthor= function(){


                console.log($scope.author);
                if ($scope.author.name) {
                    apiService.createNewAuthor($scope.author)
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



    vm.showEditDialog = function(ev,authorForEdit) {
        vm.authorForEdit=authorForEdit;
        vm.example = angular.copy(vm.authorForEdit);


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


    vm.showDeleteDialog = function(ev,authorForDelete) {
        vm.authorForDelete=authorForDelete;

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

