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
    vm.user_ID=globalService.GetUserDetails()._id;
    vm.userName=globalService.GetUserDetails().firstName;
    vm.message = {};
    vm.userlocal=globalService.GetUserDetails();
    vm.submitForm = function () {
        vm.message.senderUser= vm.userID;
        vm.message.receiverUser="311538417";
        vm.message.senderUser_ID= vm.user_ID;
        vm.message.receiverUser_ID="578222e48b1293d035e0341c";
        vm.message.isRead=false;
        vm.message.senderName=vm.userName;
        vm.message.receiverName="Admin";

        console.log(vm.message);

        if (vm.message.content) {
        apiService.createNewMessage(vm.message)
            .then(function (data) {

                if( vm.message.receiverUser_ID==vm.user_ID){
                    vm.userlocal.MessagesLength++;
                    globalService.SetUserDetails(vm.userlocal);


                    $rootScope.$emit("CallParentMethod", {});
                }
                Flash.create('success', 'Message Sent Successfully', 'large-text');
                $state.go('app.simpleSearch');
            }, function (err) {
                console.log("msg error");
            });}
        else{
            Flash.create('danger', ' Fill  Message Content Please', 'large-text');
        }

    };
    console.log("coming to Contact controller");

}]);

