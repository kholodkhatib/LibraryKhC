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


        apiService.getTopTen()
            .then(function (following) {
                vm.booksArray = following;
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

