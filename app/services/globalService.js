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


    var GetTodayDate= function(){

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        }

        if(mm<10) {
            mm='0'+mm
        }

        today = mm+'/'+dd+'/'+yyyy;
        return today;
    };



    var IsFemale=function(gender)
    {
        if(gender=="Female"){
            return true;
        }
        else{
            return false;
        }
    };
    globalService.GetUserDetails=GetUserDetails;
    globalService.SetUserDetails=SetUserDetails;
    globalService.GetTodayDate=GetTodayDate;
    globalService.IsFemale=IsFemale;
    return globalService;

}]);
