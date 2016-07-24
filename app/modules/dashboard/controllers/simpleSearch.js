/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Contact page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("SimpleSearchController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http','$mdDialog', '$mdMedia','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http,$mdDialog, $mdMedia,apiService,globalService) {
    //
    //apiService.search()
    //    .then(function (books) {
    //        vm.booksArray = books;
    //    }, function (err) {
    //    });

    var vm = this;
    vm.bookForSearch={};
    vm.showSimple=true;
    vm.showAdvanced =false;
    vm.message = {};
    vm.showResults=false;




    vm.filterExpression=function(books){

        if(vm.showSimple){
            return vm.showSimple

        }else{

        }
    }
    vm.showAdvancedSearch= function(flag){

        vm.showAdvanced=flag;
        vm.showSimple=!flag;


    }

    vm.submitForm = function () {
        vm.showResults=true;
    };
    /***********************************************************/


    vm.selectedAuthor={};
    vm.authorsArray={};
    apiService.getAllAuthors()
        .then(function (authors) {
            vm.authorsArray = authors;
        }, function (err) {
        });
    apiService.getAllCategories()
        .then(function (categories) {
            vm.categoriesArray = categories;
        }, function (err) {
        });
    debugger
    apiService.getAllLanguages()
        .then(function (languages) {
            vm.languagesArray = languages;
        }, function (err) {
        });
    vm.yearsArray=   apiService.getAllYears();
    debugger
/*
    vm.$watch('selectAuthor', function() {

        vm.bookForSearch.author=$scope.selectedAuthor.title;
    });*/

    /***********************************************************/
    vm.submitFormAdvancedSearch = function () {
        vm.bookForSearch.author=$scope.selectedAuthor.title;


        apiService.AdvancedBookSearch(vm.bookForSearch)
            .then(function (data) {

                vm.booksArray=data;
            }, function (err) {
            });
        vm.showResults=true;



    };
    console.log("coming to Contact controller");

}]);

