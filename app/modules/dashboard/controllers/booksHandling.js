/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("BooksHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService) {
    var vm = this;

    vm.bookForEdit={};
    vm.bookForDelete={};
vm.Refresh= function () {

    apiService.search()
        .then(function (books) {
            vm.booksArray = books;
        }, function (err) {
        });
};
vm.newbook={};

  /*  vm.saveUser = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {_id: id});
    //    return $http.post('/saveUser', data);
    };

    // remove user
    vm.removeUser = function(index) {
        vm.users.splice(index, 1);
    };
    vm.checkName = function(data, id) {
        if (id === 2 && data !== 'awesome') {
            return "Username 2 should be `awesome`";
        }
    };*/

    /*
        vm.booksArray.development=[
            {  id:"123",
                firstName:"person1",
                lastName:"lastname",
                email:"person1@hotmail.com",
                address:"Yaffa",
                gender:"male",
            },
            {  id:"123",
                firstName:"person2",
                lastName:"lastname",
                email:"person2@hotmail.com",
                address:"Yaffa",
                gender:"male",
            },
            {  id:"123",
                firstName:"person3",
                lastName:"lastname",
                email:"person3@hotmail.com",
                address:"Yaffa",
                gender:"male",
            },
            {  id:"123",
                firstName:"person4",
                lastName:"lastname",
                email:"person4@hotmail.com",
                address:"Yaffa",
                gender:"male",
            }

        ];
    */


//haha


    function DialogController($scope, $mdDialog,apiService) {

        $scope.book= {};
        $scope.bookForEdit=vm.example;
        $scope.bookForDelete=vm.bookForDelete;


debugger



            $scope.DeleteBook=function(){

                console.log($scope.bookForDelete);
                debugger
                apiService.DeleteBook($scope.bookForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditBook=function(){

                debugger

                console.log($scope.book);
                debugger
                apiService.EditBook($scope.bookForEdit)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }

            $scope.CreateNewBook= function(){
                debugger

                console.log($scope.book);
                debugger
                apiService.createNewBook($scope.book)
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



    vm.showEditDialog = function(ev,bookForEdit) {
        vm.bookForEdit=bookForEdit;
        vm.example = angular.copy(vm.bookForEdit);

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


    vm.showDeleteDialog = function(ev,bookForDelete) {
        vm.bookForDelete=bookForDelete;
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

