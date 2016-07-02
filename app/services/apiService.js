/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 27 Dec 2015
    Description : This service is to communicate with server for CRUD Operaions
    
    Change Log
    s.no      date    author     description     
 ===========================================================*/

app.service('apiService', ['$http', '$q', 'appSettings', function ($http, $q, appSettings) {

    var apiService = {};
    var apiBase = appSettings.apiBase;

    //+++++++++++++++++++++++++++++++++++++++++++++++KHOLOD+++++++++++++++++++++++++++++++++++++++++++++++





    //===========================Search RESOURCE==============================
    var search = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'book', { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };

    //===========================Create Book RESOURCE======== Kholod======================
    var createNewBook = function (book) {
        var deferred = $q.defer();

        $http.post(apiBase + 'book',
            book
            , {
                headers: {
                    "Content-Type":"application/json"
                }
            }).success(function (data) {
            deferred.resolve(data);
        }).error(function (msg, code) {
            deferred.reject(msg);
            //   $log.error(msg, code);
        });
        return deferred.promise;
        //var deferred = $q.defer();
        //
        //$http.post(apiBase + 'book',{} ,{ headers: { 'Content-Type': 'application/json' } }).success(function (response) {
        //    deferred.resolve(response);
        //}).catch(function (data, status, headers, config) { // <--- catch instead error
        //    deferred.reject(data.statusText);
        //});
        //
        //return deferred.promise;
    };

























    //-----------------------------------------------END OF KHOLOD












    //===========================GET RESOURCE==============================
    var get = function (module, parameter) {
        var deferred = $q.defer();
        $http.get(apiBase + module, { params: parameter }, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };



    //===========================CREATE RESOURCE==============================
    var create = function (module, parameter) {
        console.log("hitting Service=============");

        var deferred = $q.defer();

        $http.post(apiBase + module, parameter, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            deferred.resolve(response);

        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };



    //===========================UPDATE RESOURCE==============================
    var update = function (module, parameter) {
        console.log("hitting Service=============");

        var deferred = $q.defer();

        $http.post(apiBase + module + '/' + parameter.id, parameter, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            deferred.resolve(response);

        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };


    //===========================DELETE RESOURCE==============================
    var delet = function (module, parameter) {
        console.log("hitting Service=============");

        var deferred = $q.defer();

        $http.post(apiBase + module + '/' + parameter.id, parameter, { headers: { 'Content-Type': 'application/json' } }).success(function (response) {

            deferred.resolve(response);

        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };




    apiService.get = get;
    apiService.search = search;

    apiService.create = create;
    apiService.update = update;
    apiService.delet = delet;
    apiService.createNewBook = createNewBook;


    return apiService;

}]);
