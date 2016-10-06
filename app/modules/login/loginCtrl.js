/*==========================================================
 Author      : Ranjithprabhu K
 Date Created: 24 Dec 2015
 Description : Controller to handle Login module
 Change Log
 s.no      date    author     description


 ===========================================================*/

login.controller("loginCtrl", ['$rootScope', '$scope', '$state', '$location', 'loginService', 'Flash', 'apiService', 'globalService',
    function ($rootScope, $scope, $state, $location, loginService, Flash, apiService, globalService) {
        var vm = this;

        vm.getUser = {};
        vm.setUser = {};
        vm.signIn = true;


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


        //access login
        vm.login = function (data) {


            vm.userFound;
            apiService.GetPerson(data)
                .then(function (userFound) {

                    vm.userFound = userFound;
                    globalService.SetUserDetails(vm.userFound);
                    $state.go('app.simpleSearch');
                }, function (err) {
                    Flash.create('danger', '' + err.data, 'large-text');


                });

        };

        //get registration details
        vm.register = function () {
            if(vm.setUser.gender) {


                if (vm.setUser.confirmPassword == vm.setUser.password) {

                    vm.setUser.birthday = vm.myDate;
                    vm.setUser.isAdmin = false;

                    apiService.signUpreq(vm.setUser).then(function (obj) {
                        debugger
                        Flash.create('success', 'Register Done Succesfully', 'large-text');
                        globalService.SetUserDetails(obj);
                        $state.go('app.simpleSearch');

                    }, function (err) {
                        Flash.create('danger', '' + err.data, 'large-text');


                    });
                }
                else {

                    Flash.create('danger', 'Password are not Compatible', 'large-text');
                }
            }
            else{
                Flash.create('danger', 'Choose Gender Please', 'large-text');
            }
        };


    }]);

