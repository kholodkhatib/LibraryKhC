/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle language page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("LanguagesHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService) {
    var vm = this;
//language
    vm.languageForEdit={};
    vm.languageForDelete={};
vm.Refresh= function () {

    apiService.getAllLanguages()
        .then(function (languages) {
            vm.languagesArray = languages;
        }, function (err) {
        });
};
vm.newlanguage={};




    function DialogController($scope, $mdDialog,apiService) {

        $scope.language= {};
        $scope.languageForEdit=vm.example;
        $scope.languageForDelete=vm.languageForDelete;






            $scope.DeleteLanguage=function(){

                console.log($scope.languageForDelete);

                apiService.DeleteLanguage($scope.languageForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditLanguage=function(){



                console.log($scope.language);
                if ($scope.languageForEdit.name) {
                    apiService.EditLanguage($scope.languageForEdit)
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

            $scope.CreateNewLanguage= function(){


                console.log($scope.language);
                if ($scope.language .name) {
                    apiService.createNewLanguage($scope.language)
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



    vm.showEditDialog = function(ev,languageForEdit) {
        vm.languageForEdit=languageForEdit;
        vm.example = angular.copy(vm.languageForEdit);


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


    vm.showDeleteDialog = function(ev,languageForDelete) {
        vm.languageForDelete=languageForDelete;

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

