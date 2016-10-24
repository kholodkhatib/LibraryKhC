/*==========================================================
 Author      : Ranjithprabhu K
 Date Created: 13 Jan 2016
 Description : Controller to handle people page
 Change Log
 s.no      date    author     description


 ===========================================================*/

dashboard.controller("BooksOrderingHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$mdDialog', '$mdMedia', 'apiService', 'globalService',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash, $mdDialog, $mdMedia, apiService, globalService) {
        var vm = this;
//author
        vm.bookOrderingForEdit = {};
        vm.bookOrderingForDelete = {};
        vm.searchStatus = {};

        vm.Refresh = function () {

            apiService.getAllBooksOrdering()
                .then(function (booksOrdering) {

                    vm.booksOrderingArray = booksOrdering;
                }, function (err) {
                });
        };
        vm.newBookOrdering = {};


        vm.getStatusFilter = function (status) {
            vm.searchStatus.status = status;
        };


        function DialogController($scope, $mdDialog, apiService) {

            $scope.bookOrdering = {};
            $scope.bookOrderingForEdit = vm.example;
            $scope.bookOrderingForDelete = vm.bookOrderingForDelete;

            $scope.bookOrdering.issueDate = globalService.GetTodayDate();
            $scope.selectedPerson = {};

            apiService.getAllPeople()
                .then(function (people) {
                    $scope.peopleArray = people;
                }, function (err) {
                });

            $scope.selectedBook = {};

            apiService.search()
                .then(function (books) {
                    $scope.booksArray = books;

                }, function (err) {
                });


            $scope.DeleteBookOrdering = function () {

                console.log($scope.bookOrderingForDelete);

                apiService.DeleteBookOrdering($scope.bookOrderingForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditBookOrdering = function () {
                $scope.showLoading = true;
                apiService.EditBookOrdering($scope.bookOrderingForEdit)
                    .then(function (data) {

                        if ($scope.bookOrderingForEdit.status == "Finished" || $scope.bookOrderingForEdit.status == "Cancelled") {
                            $rootScope.$emit("RefreshLocalUser", {});
                        }
                        $scope.showLoading = false;
                        $mdDialog.cancel();
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        $scope.showLoading = false;
                        $mdDialog.cancel();
                        vm.Refresh();
                    });



            }


            $scope.CreateNewBookOrdering = function () {
                debugger
                vm.choosedBook = $scope.selectedPerson.originalObject;
                if ($scope.selectedPerson.originalObject) {
                    $scope.bookOrdering.userID = $scope.selectedPerson.originalObject.id;
                    $scope.bookOrdering.user_ID = $scope.selectedPerson.originalObject._id;
                    $scope.bookOrdering.status = 'Pending';

                }
                else {
                    Flash.create('danger', 'Fill All Data Please', 'large-text');
                    return
                }
                if ($scope.selectedBook.originalObject) {
                    $scope.bookOrdering.bookTitle = $scope.selectedBook.originalObject.title;
                    $scope.bookOrdering.book_ID = $scope.selectedBook.originalObject._id;
                    debugger
                    if ($scope.selectedBook.originalObject.bookStatus == 'Not Available') {
                        Flash.create('warning', 'this book is not available ', 'large-text');
                    } else {
                        debugger
                        if ($scope.bookOrdering.userID && $scope.bookOrdering.book_ID) {
                            apiService.createNewBookOrdering($scope.bookOrdering)
                                .then(function (data) {
                                    Flash.create('success', 'Order Done Succesfully for book : ' + $scope.bookOrdering.bookTitle, 'large-text');
                                    vm.choosedBook.bookStatus = "Not Available";
                                    vm.choosedBook.user = $scope.selectedPerson.originalObject._id;
                                    apiService.EditBook(vm.choosedBook).then(function (data) {
                                        vm.Refresh();
                                        $mdDialog.cancel();

                                    }, function (err) {
                                        /* vm.Refresh();*/
                                    });
                                    vm.Refresh();
                                    $mdDialog.cancel();
                                }, function (err) {
                                });
                        }
                        else {
                            Flash.create('danger', 'Fill All Data Please', 'large-text');
                        }
                    }
                }
                else {
                    Flash.create('danger', 'Fill All Data Please', 'large-text');
                }
            };


            $scope.getDateForOnGoing = function (statusValue) {


                if (statusValue == "OnGoing") {

                    $scope.bookOrderingForEdit.dueDate = globalService.GetTodayDate();
                }
                else if (statusValue == "Finished") {
                    $scope.bookOrderingForEdit.finishDate = globalService.GetTodayDate();
                }
                else {
                    $scope.bookOrderingForEdit.finishDate = "";
                    $scope.bookOrderingForEdit.dueDate = "";
                }
                $scope.bookOrderingForEdit.status = statusValue;
            }


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


        vm.showEditDialog = function (ev, bookOrderingForEdit) {
            vm.bookOrderingForEdit = bookOrderingForEdit;
            vm.example = angular.copy(vm.bookOrderingForEdit);


            var useFullScreen = ($mdMedia('sm') || $mdMedia('xs')) && vm.customFullscreen;

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'dialog2.tmpl.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose: true,
                //fullscreen: true
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

