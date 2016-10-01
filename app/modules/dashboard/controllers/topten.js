/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Orders page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("ToptenController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,apiService,globalService) {
    var vm = this;

    vm.user_ID=globalService.GetUserDetails()._id;


    vm.Refresh= function () {

        vm.booksArray;
        apiService.getTopTen()
            .then(function (following) {
                vm.booksArray = following;
                vm.getStartsInfo();
            }, function (err) {
            });

       /* apiService.GetFollowingByUserId(vm.user_ID)
            .then(function (following) {
                vm.followingArray = following;
            }, function (err) {
            });*/
    };

    vm.postRate=function(book,SumRates) {
        var CountRates = book.CountRates;
        var AvgRates = book.AvgRates;
        var newAvg;
        if (CountRates && AvgRates) {

            var newSum=0
          newSum = (AvgRates * CountRates);
            newSum+= Number(SumRates)
        CountRates++;
            newAvg=newSum/CountRates;
        }
    else
    {
        CountRates=1;
        newAvg=SumRates;
    }
        // change view
        book.CountRates=CountRates;
        book.AvgRates=newAvg;
        //save to server
        apiService.AddRate(book)
            .then(function (following) {
                vm.Refresh();
            }, function (err) {
            });



    }

    vm.getStartsInfo=function(){


        for(var i=0; i<vm.booksArray.length;i++) {
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



    var today= globalService.GetTodayDate();












    /*******************************/

    vm.showOrderBook = function(ev,books) {

        vm.bookForOrder={};
        vm.choosedBook=books;
        vm.bookForOrder.bookTitle=books.title;

        vm.bookForOrder.userID=globalService.GetUserDetails().id;
        vm.bookForOrder.book_ID=books._id;
        vm.bookForOrder.user_ID=vm.user_ID;
        vm.bookForOrder.issueDate=today;
        vm.bookForOrder.status="Pending";
        vm.bookForOrder.user=vm.user_ID;


        apiService.createNewBookOrdering(vm.bookForOrder)
            .then(function (data) {

                console.log("Order Success");
                Flash.create('success', 'Order Done Succesfully for book : '+vm.bookForOrder.bookTitle, 'large-text');
                vm.choosedBook.bookStatus="Not Available";
                vm.choosedBook.user=vm.user_ID;
                books.user=vm.user_ID;
                apiService.EditBook(vm.choosedBook) .then(function (data) {
                    vm.Refresh();
                }, function (err) {
                    /* vm.Refresh();*/
                });



            }, function (err) {
                /* vm.Refresh();*/
            });



    }

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
        var un="";
        if(status==' unfollow'){
            un="Un"
        }
        vm.bookForfollow={};
        vm.bookForfollow.book_ID=books._id;
        vm.bookForfollow.status=status;
        vm.bookForfollow.user_ID=globalService.GetUserDetails()._id;

        apiService.FollowBook(vm.bookForfollow)
            .then(function (data) {

                apiService.FollowUser(vm.bookForfollow)
                    .then(function (data) {

                        console.log("Follow Success");
                        Flash.create('success', un+'Follow Done Successfully', 'large-text');
                        vm.Refresh();
                    }, function (err) {

                    });


            }, function (err) {
                /* vm.Refresh();*/
            });



    }

















    vm.Refresh();
}]);

