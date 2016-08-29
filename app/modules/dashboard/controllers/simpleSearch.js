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
    vm.message = {};
    vm.showResults=false;
    vm.choosedBook={};
    vm.resultLength=0;

    vm.bookForSimpleSearch={};
vm.user_ID=globalService.GetUserDetails()._id;

    //==============date============================

    var today= globalService.GetTodayDate();
    //==============================================



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

    apiService.getAllLanguages()
        .then(function (languages) {
            vm.languagesArray = languages;
        }, function (err) {
        });
    vm.yearsArray=   apiService.getAllYears();

/*
    vm.$watch('selectAuthor', function() {

        vm.bookForSearch.author=$scope.selectedAuthor.title;
    });*/




    /******************Simple**************************/

    vm.submitFormSimpleSearch = function () {

        apiService.AdvancedBookSearch(vm.bookForSimpleSearch)
            .then(function (data) {

                vm.booksArray=data;
                /*vm.RefreshFollowers();*/

                vm.resultLength= vm.booksArray.length;
            }, function (err) {
            });
        vm.showResults=true;

    };


    /************************Advanced***********************************/
    vm.submitFormAdvancedSearch = function () {
        if ($scope.selectedAuthor) {
        vm.bookForSearch.author = $scope.selectedAuthor.title;}
        if ($scope.selectedCategory) {
            vm.bookForSearch.category = $scope.selectedCategory.title;}
        if ($scope.selectedLanguage) {
            vm.bookForSearch.language = $scope.selectedLanguage.title;}

        debugger
        apiService.AdvancedBookSearch(vm.bookForSearch)
            .then(function (data) {

                vm.booksArray=data;
                vm.resultLength= vm.booksArray.length;
                debugger
            }, function (err) {
            });
        vm.showResults=true;

    };
//get user



    vm.showOrderBook = function(ev,books) {

        vm.bookForOrder={};
        vm.choosedBook=books;
        vm.bookForOrder.bookTitle=books.title;

        vm.bookForOrder.userID=globalService.GetUserDetails().id;
        vm.bookForOrder.book_ID=books._id;
        vm.bookForOrder.user_ID=globalService.GetUserDetails()._id;
        vm.bookForOrder.issueDate=today;
        vm.bookForOrder.status="Pending";

            console.log(vm.bookForOrder);

            apiService.createNewBookOrdering(vm.bookForOrder)
                .then(function (data) {
                 /*   vm.Refresh();*/
                    console.log("Order Success");
                    Flash.create('success', 'Order Done Succesfully for book : '+vm.bookForOrder.bookTitle, 'large-text');
                    vm.choosedBook.bookStatus="Not Available";
                    apiService.EditBook(vm.choosedBook) .then(function (data) {

                    }, function (err) {
                        /* vm.Refresh();*/
                    });



                }, function (err) {
                   /* vm.Refresh();*/
                });



    }

   /* vm.RefreshFollowers= function(){
        var i=0;
        if(!book.followersArray){
            return true;
        }
        for(i=0;i<book.followersArray.length;i++){
            if(book.followersArray[i].userId==vm.user_ID){
                return false
            }
        }
        return true
    };*/

    vm.isToFollow=function(book){
        var i=0;
        if(!book.followersArray){
            return true;
        }
        for(i=0;i<book.followersArray.length;i++){
            if(book.followersArray[i].userId==vm.user_ID){
                return false
            }
        }
        return true
    }

    vm.followBook = function(ev,books,status) {

        vm.bookForfollow={};
        vm.bookForfollow.book_ID=books._id;
        vm.bookForfollow.status=status;
        vm.bookForfollow.user_ID=globalService.GetUserDetails()._id;
        console.log(vm.bookForOrder);
        apiService.FollowBook(vm.bookForfollow)
            .then(function (data) {
                /*   vm.Refresh();*/
                console.log("Follow Success");
                Flash.create('success', 'Follow Done Successfully', 'large-text');
                //change to unfollow
                vm.submitFormAdvancedSearch();



            }, function (err) {
                /* vm.Refresh();*/
            });



    }


































    console.log("coming to Contact controller");

}]);

