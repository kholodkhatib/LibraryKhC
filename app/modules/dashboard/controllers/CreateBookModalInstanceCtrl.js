/**
 * Created by kholod on 9/2/2016.
 */
/*==========================================================
 Author      : Ranjithprabhu K
 Date Created: 13 Jan 2016
 Description : Controller to handle people page
 Change Log
 s.no      date    author     description


 ===========================================================*/

dashboard.controller("CreateBookModalInstanceCtrl", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService','$uibModal',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService,$uibModal) {
        var vm = this;

        vm.bookForEdit={};
        vm.bookForDelete={};
        vm.newbook={};


        vm.Refresh= function () {

            apiService.search()
                .then(function (books) {
                    vm.booksArray = books;
                }, function (err) {
                });
        };



            $scope.selectedAuthor={};
            $scope.selectedCategory={};
            $scope.selectedLanguage={};
            $scope.selectedYear={};

            $scope.book= {};
            $scope.bookForEdit=vm.example;
            $scope.bookForDelete=vm.bookForDelete;




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




        vm.Refresh();








    }]);

