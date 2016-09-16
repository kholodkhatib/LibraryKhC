/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("BooksOrderingHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService,globalService) {
    var vm = this;
//author
    vm.bookOrderingForEdit={};
    vm.bookOrderingForDelete={};
    vm.searchStatus={};

vm.Refresh= function () {

    apiService.getAllBooksOrdering()
        .then(function (booksOrdering) {
            vm.booksOrderingArray = booksOrdering;
        }, function (err) {
        });
};
vm.newBookOrdering={};



    vm.getStatusFilter=function(status)
    {
        vm.searchStatus.status=status;
    };



    function DialogController($scope, $mdDialog,apiService) {

        $scope.bookOrdering= {};
        $scope.bookOrderingForEdit=vm.example;
        $scope.bookOrderingForDelete=vm.bookOrderingForDelete;


        $scope.selectedPerson={};

        apiService.getAllPeople()
            .then(function (people) {
                $scope.peopleArray = people;
            }, function (err) {
            });

        $scope.selectedBook={};

        apiService.search()
            .then(function (books) {
                $scope.booksArray = books;
            }, function (err) {
            });




            $scope.DeleteBookOrdering=function(){

                console.log($scope.bookOrderingForDelete);

                apiService.DeleteBookOrdering($scope.bookOrderingForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditBookOrdering=function(){



              /*  console.log($scope.bookOrderingForEdit);
                if($scope.bookOrderingForEdit.status=="Finished"){
                    debugger
                    apiService.OrderBookIsFinished($scope.bookOrderingForEdit.book_ID)
                        .then(function (data) {
                            vm.Refresh();
                            $mdDialog.cancel();
                        }, function (err) {
                            vm.Refresh();
                        });
                }
*/
                apiService.EditBookOrdering($scope.bookOrderingForEdit)
                    .then(function (data) {

                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });



            }




            $scope.CreateNewBookOrdering= function(){


                console.log($scope.bookOrdering);

                apiService.createNewBookOrdering($scope.bookOrdering)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                    });
            };


        $scope.getDateForOnGoing=function(statusValue) {


            if (statusValue == "OnGoing") {

            $scope.bookOrderingForEdit.dueDate = globalService.GetTodayDate();
            }
            else if (statusValue == "Finished"){
                $scope.bookOrderingForEdit.finishDate = globalService.GetTodayDate();
            }
            else{
                $scope.bookOrderingForEdit.finishDate="";
                $scope.bookOrderingForEdit.dueDate="";
            }
            $scope.bookOrderingForEdit.status=statusValue;
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



    vm.showEditDialog = function(ev,bookOrderingForEdit) {
        vm.bookOrderingForEdit=bookOrderingForEdit;
        vm.example = angular.copy(vm.bookOrderingForEdit);


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


    vm.showDeleteDialog = function(ev,bookOrderingForDelete) {
        vm.bookOrderingForDelete=bookOrderingForDelete;

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

