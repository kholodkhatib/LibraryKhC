/*==========================================================
 Author      : Ranjithprabhu K
 Date Created: 13 Jan 2016
 Description : Controller to handle people page
 Change Log
 s.no      date    author     description


 ===========================================================*/

dashboard.controller("BooksHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$mdDialog', '$mdMedia', 'apiService',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash, $mdDialog, $mdMedia, apiService) {
        var vm = this;

        vm.bookForEdit = {};
        vm.bookForDelete = {};
        vm.newbook = {};

        vm.Refresh = function () {
            debugger
            apiService.search()
                .then(function (books) {
                    vm.booksArray = books;
                }, function (err) {
                });
        };


        function DialogController($scope, $mdDialog, apiService) {

            apiService.getAllAuthors()
                .then(function (authors) {
                    $scope.authorsArray = authors;
                }, function (err) {
                });
            apiService.getAllCategories()
                .then(function (categories) {
                    $scope.categoriesArray = categories;
                }, function (err) {
                });

            apiService.getAllLanguages()
                .then(function (languages) {
                    $scope.languagesArray = languages;
                }, function (err) {
                });
            $scope.yearsArray = apiService.getAllYears();
            $scope.selectedAuthor = {};
            $scope.selectedCategory = {};
            $scope.selectedLanguage = {};
            $scope.selectedYear = {};

            $scope.book = {};
            $scope.bookForEdit = vm.example;
            $scope.bookForDelete = vm.bookForDelete;


            $scope.DeleteBook = function () {

                console.log($scope.bookForDelete);

                apiService.DeleteBook($scope.bookForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditBook = function () {
                debugger
                $scope.bookForEdit.author=vm.bookForEdit.author;
                console.log(vm.bookForEdit.author);
                console.log( $scope.bookForEdit.author);

                    $scope.bookForEdit.category=vm.bookForEdit.category;
                $scope.bookForEdit.language=vm.bookForEdit.language;
                $scope.bookForEdit.year=vm.bookForEdit.year;

                if ($scope.selectedAuthor.title) {
                    $scope.bookForEdit.author = $scope.selectedAuthor.title;
                }
                if ($scope.selectedCategory.title) {
                    $scope.bookForEdit.category = $scope.selectedCategory.title;
                }
                if ($scope.selectedLanguage.title) {

                $scope.bookForEdit.language = $scope.selectedLanguage.title;
            }
            if ($scope.selectedYear.title) {
                $scope.bookForEdit.year = $scope.selectedYear.title;
            }

                console.log(vm.bookForEdit);
                console.log( $scope.bookForEdit);
                debugger
            if ($scope.bookForEdit.author && $scope.bookForEdit.category && $scope.bookForEdit.language && $scope.bookForEdit.year && $scope.bookForEdit.year && $scope.bookForEdit.title) {

                apiService.EditBook($scope.bookForEdit)
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

        $scope.CreateNewBook = function () {
            console.log($scope.book);
            $scope.book.author = $scope.selectedAuthor.title;
            $scope.book.category = $scope.selectedCategory.title;
            $scope.book.language = $scope.selectedLanguage.title;
            $scope.book.year = $scope.selectedYear.title;
            $scope.book.user_ID = "";

            if ($scope.book.author && $scope.book.category && $scope.book.language && $scope.book.year && $scope.book.year && $scope.book.title) {

                apiService.createNewBook($scope.book)
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


vm.showEditDialog = function (ev, bookForEdit) {
    vm.bookForEdit = bookForEdit;
    vm.example = angular.copy(vm.bookForEdit);


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


vm.showDeleteDialog = function (ev, bookForDelete) {
    vm.bookForDelete = bookForDelete;

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


}])
;

