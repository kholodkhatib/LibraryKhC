/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle categories page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("CategoriesHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService) {
    var vm = this;
//author
    vm.categoryForEdit={};
    vm.categoryForDelete={};
vm.Refresh= function () {

    apiService.getAllCategories()
        .then(function (categories) {
            vm.categoriesArray = categories;
        }, function (err) {
        });
};
vm.newcategory={};




    function DialogController($scope, $mdDialog,apiService) {

        $scope.category= {};
        $scope.categoryForEdit=vm.example;
        $scope.categoryForDelete=vm.categoryForDelete;






            $scope.DeleteCategory=function(){

                console.log($scope.categoryForDelete);

                apiService.DeleteCategory($scope.categoryForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditCategory=function(){



                console.log($scope.category);
                if ($scope.categoryForEdit.name) {
                    apiService.EditCategory($scope.categoryForEdit)
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

            $scope.CreateNewCategory= function(){


                console.log($scope.category);
                if ($scope.category.name) {
                    apiService.createNewCategory($scope.category)
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



    vm.showEditDialog = function(ev,categoryForEdit) {
        vm.categoryForEdit=categoryForEdit;
        vm.example = angular.copy(vm.categoryForEdit);


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


    vm.showDeleteDialog = function(ev,categoryForDelete) {
        vm.categoryForDelete=categoryForDelete;

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

