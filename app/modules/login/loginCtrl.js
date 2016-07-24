/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 24 Dec 2015
    Description : Controller to handle Login module
    Change Log
    s.no      date    author     description     


 ===========================================================*/

login.controller("loginCtrl", ['$rootScope', '$scope', '$state', '$location', 'loginService', 'Flash','apiService','globalService',
function ($rootScope, $scope, $state, $location, loginService, Flash, apiService,globalService) {
        var vm = this;

        vm.getUser = {};
        vm.setUser = {};
        vm.signIn = true;

        //access login
        vm.login = function (data) {


vm.userFound;
            apiService.GetPerson(data)
                .then(function (userFound) {

                    vm.userFound = userFound;
                    globalService.SetUserDetails(vm.userFound);
                    $state.go('app.simpleSearch');
                }, function (err) {
                    Flash.create('danger', ''+err.data, 'large-text');


                });
            debugger

/*            if (data.Username == vm.userFound.id) {
                debugger
                if (data.Password == vm.userFound.password) {
                    debugger
                    $state.go('app.simpleSearch');
                }
                else
                    Flash.create('danger', 'Invalid Password', 'large-text');
            }
            else
                Flash.create('danger', 'Invalid Username', 'large-text');*/
        };

        //get registration details
        vm.register = function () {
            if (vm.setUser.confirmPassword == vm.setUser.Password){
                loginService.registerUser(vm.setUser).then(function (response) {
                    if (response.message == 'success')
                console.log('after post>>',response);
                //if (response.length > 0)
                //    $state.go('app');
                //else
                //    Flash.create('danger', 'Invalid Credentials', 'large-text');
            });
            }
        };

    }]);

