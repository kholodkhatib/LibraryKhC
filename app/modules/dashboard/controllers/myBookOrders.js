/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Orders page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("MyBookOrdersController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,apiService,globalService) {
    var vm = this;
    vm.searchStatus={};
    vm.userID=globalService.GetUserDetails().id;

    vm.getStatusFilter=function(status)
    {
        vm.searchStatus.status=status;
    };
    vm.Refresh= function () {

        apiService.GetBooksOrderingForUser(vm.userID)
            .then(function (booksOrdering) {
                vm.booksOrderingArray = booksOrdering;
            }, function (err) {
            });
    };


    vm.Refresh();
}]);

