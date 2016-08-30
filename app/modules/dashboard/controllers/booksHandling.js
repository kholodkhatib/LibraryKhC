/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("BooksHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService','$uibModal',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService,$uibModal) {
    var vm = this;

    vm.bookForEdit={};
    vm.bookForDelete={};
    vm.newbook={};


/*vm.openCreateBookForm=function(){
    debugger

    const modalInstance = $uibModal.open({
            animation: true,
            template: 'app/modules/dashboard/views/createbookmodal.html',
            controller: 'BooksHandlingController',
        resolve: {
            loadPlugin: function ($ocLazyLoad) {
                return $ocLazyLoad.load([
                    {
                        files: ['js/plugins/footable/footable.all.min.js', 'css/plugins/footable/footable.core.css']
                    },
                    {
                        name: 'ui.footable',
                        files: ['js/plugins/footable/angular-footable.js']
                    }
                ]);
            }

        }

});
return modalInstance;
}*/





    vm.Refresh= function () {

    apiService.search()
        .then(function (books) {
            vm.booksArray = books;
        }, function (err) {
        });
};



    function DialogController($scope, $mdDialog,apiService) {

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
        debugger
        apiService.getAllLanguages()
            .then(function (languages) {
                $scope.languagesArray = languages;
            }, function (err) {
            });
        $scope.yearsArray=   apiService.getAllYears();

     /*   debugger
        $scope.yearsArray =   vm.years;
        debugger
*/

/*
        $scope.$watch('selectAuthor', function() {
           $scope.book.author=$scope.selectedAuthor.title;
            $scope.bookForEdit.author=$scope.selectedAuthor.title;
        });
        $scope.$watch('selectCategory', function() {
            $scope.book.category=$scope.selectedCategory.title;

            $scope.bookForEdit.category=$scope.selectedCategory.title;

        });
        $scope.$watch('selectLanguage', function() {
            $scope.book.language=$scope.selectedLanguage.title;

            $scope.bookForEdit.language=$scope.selectedLanguage.title;

        });
        $scope.$watch('selectYear', function() {
            $scope.book.year=$scope.selectedYear.title;

            $scope.bookForEdit.year=$scope.selectedYear.title;

        });*/



        $scope.selectedAuthor={};
        $scope.selectedCategory={};
        $scope.selectedLanguage={};
        $scope.selectedYear={};

        $scope.book= {};
        $scope.bookForEdit=vm.example;
        $scope.bookForDelete=vm.bookForDelete;






            $scope.DeleteBook=function(){

                console.log($scope.bookForDelete);

                apiService.DeleteBook($scope.bookForDelete)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }
            $scope.EditBook=function(){



                console.log($scope.book);
                $scope.bookForEdit.author=$scope.selectedAuthor.title;
                $scope.bookForEdit.category=$scope.selectedCategory.title;
                $scope.bookForEdit.language=$scope.selectedLanguage.title;
                $scope.bookForEdit.year=$scope.selectedYear.title;

                apiService.EditBook($scope.bookForEdit)
                    .then(function (data) {
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                        vm.Refresh();
                    });

            }

            $scope.CreateNewBook= function(){
                console.log($scope.book);
                $scope.book.author=$scope.selectedAuthor.title;
                $scope.book.category=$scope.selectedCategory.title;
                $scope.book.language=$scope.selectedLanguage.title;
                $scope.book.year=$scope.selectedYear.title;

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

