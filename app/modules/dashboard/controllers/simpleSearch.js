/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle Contact page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("SimpleSearchController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash', '$http','apiService',
function ($rootScope, $scope, $state, $location, dashboardService, Flash, $http,apiService) {
    //
    //apiService.search()
    //    .then(function (books) {
    //        vm.booksArray = books;
    //    }, function (err) {
    //    });

    var vm = this;
    vm.bookForSearch={};
    vm.showSimple=true;
    vm.showAdvanced =false;
    vm.message = {};
    vm.showResults=false;




    vm.filterExpression=function(books){

        if(vm.showSimple){
            return vm.showSimple

        }else{

        }
    }
    vm.showAdvancedSearch= function(flag){

        vm.showAdvanced=flag;
        vm.showSimple=!flag;


    }

    vm.submitForm = function () {
        vm.showResults=true;
    };

/*

    vm.submitForm = function () {
        console.log(vm.message);
        var request = $http({
            method: "post",
            url: "contact.php",
            data: vm.message,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });



        /!* Check whether the HTTP Request is successful or not. *!/
        request.success(function (data) {
            vm.showResults=true;
            console.log(data);
            if (data == "success") {
                Flash.create('success', 'Message Sent Succesfully', 'large-text');
                vm.message = {};
                vm.contactForm.$pristine();
                vm.contactForm.$setUntouched();

            }
        });
    };
*/



    vm.submitFormAdvancedSearch = function () {


        apiService.AdvancedBookSearch(vm.bookForSearch)
            .then(function (data) {

                vm.booksArray=data;
            }, function (err) {
            });
        vm.showResults=true;



    };
    console.log("coming to Contact controller");

}]);

