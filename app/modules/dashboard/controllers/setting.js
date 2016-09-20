/*==========================================================
 Author      : Ranjithprabhu K
 Date Created: 13 Jan 2016
 Description : Controller to handle Setting page
 Change Log
 s.no      date    author     description


 ===========================================================*/

dashboard.controller("SettingController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http', 'globalService', 'apiService',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http, globalService, apiService) {
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


        vm.onlyWeekendsPredicate = function (date) {
            var day = date.getDay();
            return day === 0 || day === 6;
        }


        vm.submitForm = function () {
            console.log(vm.message);
            var request = $http({
                method: "post",
                url: "contact.php",
                data: vm.message,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
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

        vm.userlocal = globalService.GetUserDetails();

        vm.IsChecked = globalService.IsFemale(vm.userlocal.gender);
        vm.userlocalToEdit = vm.userlocal;
        vm.userlocalToEdit.confirmPassword = vm.userlocalToEdit.password;

        vm.cancel = function () {
            $state.go('app.simpleSearch');
        };


        vm.saveChanges = function () {
            debugger
            if (vm.userlocalToEdit.confirmPassword == vm.userlocalToEdit.password) {

                /* vm.userlocalToEdit.birthday = vm.myDate;*/


                apiService.EditPerson(vm.userlocalToEdit)
                    .then(function (data) {
                        Flash.create('success', 'Editing Done Succesfully', 'large-text');
                        globalService.SetUserDetails(vm.userlocalToEdit);
                        $state.go('app.simpleSearch');

                        /*  vm.booksOrderingArray = booksOrdering;*/
                    }, function (err) {
                    });

            }
            else {

                Flash.create('danger', 'Password are not Compatible', 'large-text');
            }
            ;
        }

    }]);

