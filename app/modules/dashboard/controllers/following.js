/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Orders page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("FollowingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,apiService,globalService) {
    var vm = this;

    vm.user_ID=globalService.GetUserDetails()._id;
    vm.userID=globalService.GetUserDetails().id;

vm.mybookfollowing=[];
    vm.Refresh= function () {


       /* apiService.getTopTen()
            .then(function (following) {
                vm.booksArray = following;
            }, function (err) {
            });*/


        apiService.hah(vm.user_ID)
            .then(function (following) {
                vm.booksArray = following;
                for(var i=0;i<vm.booksArray.length;i++){
                    var thisBook=vm.booksArray[i];
                    for(var j=0;j<thisBook.followersArray.length;j++){
                        if(thisBook.followersArray[j].userId==vm.user_ID){
                            vm.mybookfollowing.push(thisBook)
                        }
                    }


                }

            }, function (err) {
            });




       /* apiService.GetFollowingByUserId(vm.user_ID)
            .then(function (following) {
                vm.followingArray = following;
            }, function (err) {
            });*/
    };


    vm.Refresh();
}]);

