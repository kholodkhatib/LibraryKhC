/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Contact page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("ContactController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http','apiService','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http,apiService,globalService) {
    var vm = this;
    vm.userID=globalService.GetUserDetails().id;
    vm.userName=globalService.GetUserDetails().firstName;
    vm.message = {};

    vm.submitForm = function () {
        vm.message.senderUser= vm.userID;
        vm.message.receiverUser="311538417";
        vm.message.isRead=false;
        vm.message.senderName=vm.userName;
        vm.message.receiverName="Admin";

        console.log(vm.message);


        apiService.createNewMessage(vm.message)
            .then(function (data) {
                console.log("msg sent");
                $state.go('app.simpleSearch');
            }, function (err) {
                console.log("msg error");
            });

       /* var request = $http({
            method: "post",
            url: "contact.php",
            data: vm.message,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });*/

        /* Check whether the HTTP Request is successful or not. */
      /*  request.success(function (data) {
            console.log(data);
            if (data == "success") {
                Flash.create('success', 'Message Sent Succesfully', 'large-text');
                vm.message = {};
                vm.contactForm.$pristine();
                vm.contactForm.$setUntouched();

            }
        });*/
    };
    console.log("coming to Contact controller");

}]);

