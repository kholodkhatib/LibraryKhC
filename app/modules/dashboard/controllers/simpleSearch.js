/*==========================================================
 Author      : Ranjithprabhu K
 Date Created: 13 Jan 2016
 Description : Controller to handle Contact page
 Change Log
 s.no      date    author     description


 ===========================================================*/

dashboard.controller("SimpleSearchController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', '$mdDialog', '$mdMedia', 'apiService', 'globalService',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, $mdDialog, $mdMedia, apiService, globalService) {


        var vm = this;
        vm.bookForSearch = {};
        vm.showSimple = true;
        vm.showAdvanced = false;
        vm.showResults = false;
        vm.choosedBook = {};
        vm.resultLength = 0;

        vm.bookForSimpleSearch = {};
        vm.user_ID = globalService.GetUserDetails()._id;

        //==============date============================

        var today = globalService.GetTodayDate();
        //==============================================


        vm.filterExpression = function (books) {

            if (vm.showSimple) {
                return vm.showSimple

            } else {

            }
        }
        vm.showAdvancedSearch = function (flag) {

            vm.showAdvanced = flag;
            vm.showSimple = !flag;
            vm.showResults = false;

        }

        vm.submitForm = function () {
            vm.showResults = true;
        };
        /***********************************************************/


        vm.selectedAuthor = {};
        vm.authorsArray = {};
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
        vm.yearsArray = apiService.getAllYears();


        /******************Simple**************************/

        vm.submitFormSimpleSearch = function () {

            apiService.AdvancedBookSearch(vm.bookForSimpleSearch)
                .then(function (data) {

                    vm.booksArray = data;
                    /*vm.RefreshFollowers();*/

                    vm.resultLength = vm.booksArray.length;
                    vm.getStartsInfo();
                }, function (err) {
                });
            vm.showResults = true;

        };


        /************************Advanced***********************************/
        vm.submitFormAdvancedSearch = function () {
            if ($scope.selectedAuthor) {
                vm.bookForSearch.author = $scope.selectedAuthor.title;
            }
            if ($scope.selectedCategory) {
                vm.bookForSearch.category = $scope.selectedCategory.title;
            }
            if ($scope.selectedLanguage) {
                vm.bookForSearch.language = $scope.selectedLanguage.title;
            }


            apiService.AdvancedBookSearch(vm.bookForSearch)
                .then(function (data) {

                    vm.booksArray = data;
                    vm.resultLength = vm.booksArray.length;
                    vm.getStartsInfo();

                }, function (err) {
                });
            vm.showResults = true;

        };
//get user

        /*******************************/

        vm.showOrderBook = function (ev, books) {

            vm.bookForOrder = {};
            vm.choosedBook = books;
            vm.bookForOrder.bookTitle = books.title;

            vm.bookForOrder.userID = globalService.GetUserDetails().id;
            vm.bookForOrder.book_ID = books._id;
            vm.bookForOrder.user_ID = globalService.GetUserDetails()._id;
            vm.bookForOrder.issueDate = today;
            vm.bookForOrder.status = "Pending";
            vm.bookForOrder.user = vm.user_ID;

            console.log(vm.bookForOrder);

            apiService.createNewBookOrdering(vm.bookForOrder)
                .then(function (data) {
                    /*   vm.Refresh();*/
                    console.log("Order Success");
                    Flash.create('success', 'Order Done Succesfully for book : ' + vm.bookForOrder.bookTitle, 'large-text');
                    vm.choosedBook.bookStatus = "Not Available";
                    /* books.followersArray.push({userId:vm.bookForOrder.user_ID});*/
                    books.user = vm.user_ID;
                    apiService.EditBook(vm.choosedBook).then(function (data) {

                    }, function (err) {
                        /* vm.Refresh();*/
                    });


                }, function (err) {
                    /* vm.Refresh();*/
                });


        }

        vm.isToFollow = function (book) {
            var i = 0;
            if (!book.followersArray) {
                return true;
            }
            for (i = 0; i < book.followersArray.length; i++) {
                if (book.followersArray[i].userId == vm.user_ID) {
                    return false
                }
            }
            return true
        }

        vm.followBook = function (ev, books, status) {

            vm.bookForfollow = {};
            vm.bookForfollow.book_ID = books._id;
            vm.bookForfollow.status = status;
            vm.bookForfollow.user_ID = globalService.GetUserDetails()._id;

            apiService.FollowBook(vm.bookForfollow)
                .then(function (data) {

                    apiService.FollowUser(vm.bookForfollow)
                        .then(function (data) {

                            console.log("Follow Success");
                            Flash.create('success', 'Follow Done Successfully', 'large-text');
                            vm.submitFormAdvancedSearch();
                        }, function (err) {

                        });


                }, function (err) {
                    /* vm.Refresh();*/
                });


        }


        vm.postRate = function (book, SumRates) {
            var CountRates = book.CountRates;
            var AvgRates = book.AvgRates;
            var newAvg;
            if (CountRates && AvgRates) {

                var newSum = 0
                newSum = (AvgRates * CountRates);
                newSum += Number(SumRates)
                CountRates++;
                newAvg = newSum / CountRates;
            }
            else {
                CountRates = 1;
                newAvg = SumRates;
            }
            // change view
            book.CountRates = CountRates;
            book.AvgRates = newAvg;
            //save to server
            apiService.AddRate(book)
                .then(function (following) {
                    vm.getStartsInfo();
                }, function (err) {
                });


        }

        vm.getStartsInfo = function () {


            for (var i = 0; i < vm.booksArray.length; i++) {
                var book = vm.booksArray[i];
                var CountRates = book.CountRates;
                var AvgRates = book.AvgRates;
                vm.case;
                if (CountRates && AvgRates) {

                    if (AvgRates >= 0 && AvgRates < 1) {
                        vm.case = 0;
                    }
                    if (AvgRates >= 1 && AvgRates < 2) {
                        vm.case = 1;
                    }
                    if (AvgRates >= 2 && AvgRates < 3) {
                        vm.case = 2;
                    }
                    if (AvgRates >= 3 && AvgRates < 4) {
                        vm.case = 3;
                    }
                    if (AvgRates >= 4 && AvgRates < 5) {
                        vm.case = 4;
                    }
                    if (AvgRates >= 5) {
                        vm.case = 5
                    }


                } else {
                    vm.case = 0;
                }

                vm.booksArray[i].case = vm.case;
            }

        }


        console.log("coming to Contact controller");

    }]);

