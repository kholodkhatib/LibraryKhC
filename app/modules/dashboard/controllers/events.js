/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 13 Jan 2016
    Description : Controller to handle events page
    Change Log
    s.no      date    author     description     


 ===========================================================*/

dashboard.controller("EventsController", ['$rootScope', '$scope', '$state', '$location', 'dashboardService', 'Flash','$mdDialog', '$mdMedia','apiService',
    function ($rootScope, $scope, $state, $location, dashboardService, Flash,$mdDialog, $mdMedia,apiService) {
    var vm = this;



    vm.Refresh= function () {

        apiService.getAllEvents()
            .then(function (event) {
                vm.eventsArray = event;
            }, function (err) {
                console.log("Kholod Says it's an error")
            });
    };






    vm.Refresh();

    /*

    vm.eventsArray = [
      {
          id: 1,
          date: "2/10/1993",
          title: "Event 1",
          description: "Web application to handle Point of Sale and Venue management",
          image: "e-pos",

      },
      {
          id: 2,
          date: "2/10/1993",
          title: "Event 2",
          description: "E-Comm sites for various Attractions, Zoos and Amusement Parks",
          image: "e-comm",


      },
      {
          id: 3,
          date: "2/10/1993",
          title: "Event 3",
          description: "Angular Bootstrap Dashboard is a web dashboard application based on Bootstrap and AngularJS.",
          image: "dashboard",


      },
      {
          id: 4,
          date: "2/10/1993",
          title: "Event 4",
          description: "Web application to view all the Reports of the Sales",
          image: "active-reports",


      },
      {
          id: 5,
          date: "2/10/1993",
          title: "Event 5",
          description: "Web application developed for Ticket vending machine to use it inside the zoos",
          image: "kiosk",


      }
    ];*/

    console.log("coming to events controller");

}]);

