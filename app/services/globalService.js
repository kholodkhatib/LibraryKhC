/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 27 Dec 2015
    Description : This service is to communicate with server for CRUD Operaions
    
    Change Log
    s.no      date    author     description     
 ===========================================================*/

app.service('globalService', ['$http', '$q', 'appSettings', function ($http, $q, appSettings) {

    var globalService = {};
    var userToken;
    var GetUserDetails = function () {

        var user=window.localStorage["userLocal"];
        if(user) {
            return angular.fromJson(user);
        }
        else
        {
            return user;
        }

        };

    var SetUserDetails = function (userLocal) {
        if (userLocal) {

        window.localStorage["userLocal"] = angular.toJson(userLocal);
     }

    };


    globalService.GetUserDetails=GetUserDetails;
    globalService.SetUserDetails=SetUserDetails;

    return globalService;

}]);
