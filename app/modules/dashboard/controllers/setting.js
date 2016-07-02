/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Setting page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("SettingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http) {
    var vm = this;

    vm.message = {};
    vm.myDate = new Date();
    vm.minDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth() - 2,
        vm.myDate.getDate());
    vm.maxDate = new Date(
        vm.myDate.getFullYear(),
        vm.myDate.getMonth() + 2,
        vm.myDate.getDate());


    vm.onlyWeekendsPredicate = function(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
    }


    vm.submitForm = function () {
        console.log(vm.message);
        var request = $http({
            method: "post",
            url: "contact.php",
            data: vm.message,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        /* Check whether the HTTP Request is successful or not. */
        request.success(function (data) {
            console.log(data);
            if (data == "success") {
                Flash.create('success', 'Message Sent Succesfully', 'large-text');
                vm.message = {};
                vm.contactForm.$pristine();
                vm.contactForm.$setUntouched();

            }
        });
    };
    console.log("coming to Contact controller");

}]);

