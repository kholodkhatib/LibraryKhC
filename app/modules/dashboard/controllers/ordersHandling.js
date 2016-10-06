/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("OrdersHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','apiService','globalService','$mdDialog', '$mdMedia','globalService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,apiService,globalService,$mdDialog, $mdMedia,globalService) {
    var vm = this;
    vm.userID=globalService.GetUserDetails().id;
    vm.user_ID=globalService.GetUserDetails()._id;
    vm.userName=globalService.GetUserDetails().firstName;
    vm.isAdmin=globalService.GetUserDetails().isAdmin;
    vm.text={};
    vm.searchFilterInbox={};
   /* vm.searchFilterInbox.receiverUser= vm.userID;*/
    vm.searchFilterInbox.receiverUser_ID= vm.user_ID;
    vm.searchFilterMSG={};
  /*  vm.searchFilterMSG.senderUser= vm.userID;*/
    vm.searchFilterMSG.senderUser_ID= vm.user_ID;
    vm.ShowInboxRow=true;
vm.msgtoEdit={};
    vm.userlocal=globalService.GetUserDetails();

    vm.Refresh= function () {

        apiService.GetMessagesForThisUser(vm.userID)
            .then(function (array) {
                vm.messagesArray = array;
            }, function (err) {
            });

    };





    vm.ShowInbox=function(){

          vm.ShowInboxRow=true;

    };
    vm.HideInbox=function(){

        vm.ShowInboxRow=false;

    };


    vm.changeStatus=function(msg,status){
        debugger
        vm.msgtoEdit=msg;
        vm.msgtoEdit.isRead= !vm.msgtoEdit.isRead;

        apiService.EditMessage(  vm.msgtoEdit)
            .then(function (data) {
                vm.Refresh();


                //TODO


                if(vm.msgtoEdit.isRead){
                    vm.userlocal.MessagesLength--;
                }
                else {
                    vm.userlocal.MessagesLength++;
                }


                globalService.SetUserDetails(vm.userlocal);


                    $rootScope.$emit("CallParentMethod", {});


            }, function (err) {
                vm.Refresh();
            });

    }


    function DialogController($scope, $mdDialog,apiService) {
        $scope.selectedPerson={};

        apiService.getAllPeople()
            .then(function (people) {
                $scope.peopleArray = people;
            }, function (err) {
            });

        $scope.message= {};
        $scope.message.senderUser= vm.userID;
        $scope.message.senderUser_ID= vm.user_ID;
        $scope.message.senderName=vm.userName;
console.log($scope.selectedPerson.title);

        $scope.CreateNewMSG= function(){
            debugger
            if(!$scope.selectedPerson.originalObject){
                Flash.create('danger', 'Choose Person Please', 'large-text');
                return;
            }
            $scope.message.receiverUser=$scope.selectedPerson.originalObject.id;
            $scope.message.receiverUser_ID=$scope.selectedPerson.originalObject._id;
            $scope.message.receiverName=$scope.selectedPerson.originalObject.firstName;
debugger

            if ($scope.message.content) {
                apiService.createNewMessage($scope.message)
                    .then(function (data) {
                        if ($scope.message.receiverUser_ID == vm.user_ID) {
                            vm.userlocal.MessagesLength++;
                            globalService.SetUserDetails(vm.userlocal);
                            $rootScope.$emit("CallParentMethod", {});
                        }
                        Flash.create('success', 'Message Sent Successfully', 'large-text');
                        vm.Refresh();
                        $mdDialog.cancel();
                    }, function (err) {
                    });
            }
            else{
                Flash.create('danger', 'Choose Person & Fill  Message Content Please', 'large-text');
            }
        };

        $scope.CreateNewToAdminMSG= function() {
            debugger
            $scope.message.receiverUser = "311538417";
            $scope.message.receiverUser_ID = "578222e48b1293d035e0341c";
            $scope.message.receiverName = "Secretary";


            if ($scope.message.content) {

            apiService.createNewMessage($scope.message)
                .then(function (data) {
                    if ($scope.message.receiverUser_ID == vm.user_ID) {
                        vm.userlocal.MessagesLength++;
                        globalService.SetUserDetails(vm.userlocal);


                        $rootScope.$emit("CallParentMethod", {});
                    }
                    Flash.create('success', 'Message Sent Successfully', 'large-text');
                    vm.Refresh();
                    $mdDialog.cancel();
                }, function (err) {
                });
        }
        else {
                Flash.create('danger', 'Fill  Message Content Please', 'large-text');
            }
        };


        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

    vm.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
    vm.showAdvanced = function(ev) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog1.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        })
            .then(function(answer) {
                vm.status = 'You said the information was "' + answer + '".';
            }, function() {
                vm.status = 'You cancelled the dialog.';
            });



        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            vm.customFullscreen = (wantsFullScreen === true);
        });

    };


    vm.showSendToAdmin = function(ev) {

        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && vm.customFullscreen;

        $mdDialog.show({
            controller: DialogController,
            templateUrl: 'dialog2.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: useFullScreen
        })
            .then(function(answer) {
                vm.status = 'You said the information was "' + answer + '".';
            }, function() {
                vm.status = 'You cancelled the dialog.';
            });



        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            vm.customFullscreen = (wantsFullScreen === true);
        });

    };


     vm.Refresh();

}]);

