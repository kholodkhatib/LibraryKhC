/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle people page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("EventsHandlingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService) {
    var vm = this;


    vm.Refresh= function () {

        apiService.getAllEvents()
            .then(function (event) {
                vm.eventsArray = event;
            }, function (err) {
            });
    };
    vm.newevent={};

 /*   vm.eventsArray=[
        {  id:"123",
            name:"person1",
            description:"lastname",
            time:"person1@hotmail.com",
            date:"Yaffa",

        },
        {  id:"123",
            name:"person1",
            description:"lastname",
            time:"person1@hotmail.com",
            date:"Yaffa",

        },
        {  id:"123",
            name:"person1",
            description:"lastname",
            time:"person1@hotmail.com",
            date:"Yaffa",

        },
        {  id:"123",
            name:"person1",
            description:"lastname",
            time:"person1@hotmail.com",
            date:"Yaffa",

        }


    ];*/



    function DialogController($scope, $mdDialog,apiService) {

        debugger
        $scope.event= {};
        $scope.CreateNewEventt= function(){
            debugger

            console.log($scope.event);
            debugger
            apiService.createNewEvent($scope.event)
                .then(function (data) {
                    vm.Refresh();
                    $mdDialog.cancel();
                }, function (err) {
                });
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






    vm.removeItem = function removeItem(row) {
        var index = vm.peopleArray.indexOf(row);
        if (index !== -1) {
            vm.peopleArray.splice(index, 1);
        }
    }
    vm.Refresh();
}]);

