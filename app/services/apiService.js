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


    //===========================Get All People RESOURCE==============================
    var getAllPeople = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'person', { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };


    //===========================Create  People======== Kholod======================
    var createNewPeople = function (person) {
        var deferred = $q.defer();

        $http.post(apiBase + 'person',
            person
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
    };


    //===========================Edit People======== Kholod======================
    var EditPerson = function (person) {
        var deferred = $q.defer();

        $http.post(apiBase + 'person',
            person
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
    };

   /* var DeleteSubjects= function (subject) {
        var deferred = $q.defer();
        $http.delete(ConfigurationService.ServerUrl() + '/api/subjects?_id='+ subject._id, {
            headers: {
                "access-token": ConfigurationService.UserDetails().token
            }
        }).success(function (data) {
            deferred.resolve(data);
        }).error(function (msg, code) {
            deferred.reject(msg);
            //   $log.error(msg, code);
        });
        return deferred.promise;
    }*/
    //===========================Delete People======== Kholod======================
    var DeletePerson = function (person) {
        var deferred = $q.defer();
        debugger
        $http.delete(apiBase + 'person?Person_id='+person._id+"&ahmad=loveU", { headers: { 'Person_id': person._id} }).success(function (response) {
            debugger
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
        // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };
    //===========================Get All Rooms RESOURCE==============================
    var getAllRooms = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'room', { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };

    //===========================Edit Room======== Kholod======================
    var EditRoom = function (room) {
        var deferred = $q.defer();

        $http.post(apiBase + 'room',
            room
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
    };

    //===========================Delete Room======== Kholod======================
    var DeleteRoom = function (room) {
        var deferred = $q.defer();
        debugger
        $http.delete(apiBase + 'room?room_id='+room._id, { headers: { 'room_id': room._id} }).success(function (response) {
            debugger
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };


    //===========================Create Room RESOURCE======== Kholod======================
    var createNewRoom = function (room) {
        var deferred = $q.defer();

        $http.post(apiBase + 'room',
            room
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
    };



    //===========================Get All Authors RESOURCE==============================
    var getAllAuthors = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'author', { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };


    //===========================Create Author RESOURCE======== Kholod======================
    var createNewAuthor= function (author) {
        var deferred = $q.defer();

        $http.post(apiBase + 'author',
            author
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
    };

    //===========================Edit Author======== Kholod======================
    var EditAuthor = function (author) {
        var deferred = $q.defer();

        $http.post(apiBase + 'author',
            author
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
    };

    //===========================Delete Authors======== Kholod======================
    var DeleteAuthor = function (author) {
        var deferred = $q.defer();
        debugger
        $http.delete(apiBase + 'author?author_id='+author._id, { headers: { 'author_id': author._id} }).success(function (response) {
            debugger
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };




    //===========================Get All Events RESOURCE==============================
    var getAllEvents = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'event', { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };


    //===========================Create Event RESOURCE======== Kholod======================
    var createNewEvent = function (event) {
        var deferred = $q.defer();

        $http.post(apiBase + 'event',
            event
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
    };

    //===========================Edit Event======== Kholod======================
    var EditEvent = function (event) {
        var deferred = $q.defer();

        $http.post(apiBase + 'event',
            event
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
    };

    //===========================Delete Event======== Kholod======================
    var DeleteEvent = function (event) {
        var deferred = $q.defer();
        debugger
        $http.delete(apiBase + 'event?event_id='+event._id, { headers: { 'event_id': event._id} }).success(function (response) {
            debugger
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };

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




    //===========================Edit Book======== Kholod======================
    var EditBook = function (book) {
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
    };


    //===========================Delete Book======== Kholod======================
    var DeleteBook = function (book) {
        var deferred = $q.defer();
        debugger
        $http.delete(apiBase + 'book?book_id='+book._id+"&ahmad=loveU", { headers: { 'book_id': book._id} }).success(function (response) {
            debugger
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
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

    //---------------------Book

    apiService.createNewBook = createNewBook;
    apiService.EditBook=EditBook;
    apiService.DeleteBook=DeleteBook;
    //--------------------end of Book


    //---------------------Events

    apiService.getAllEvents=getAllEvents;
    apiService.createNewEvent=createNewEvent;
    apiService.EditEvent=EditEvent;
    apiService.DeleteEvent=DeleteEvent;


    //--------------------end of Events



    //---------------------Authors

    apiService.getAllAuthors=getAllAuthors;
    apiService.createNewAuthor=createNewAuthor;
    apiService.EditAuthor=EditAuthor;
    apiService.DeleteAuthor=DeleteAuthor;


    //--------------------end of Authors


    //---------------------Rooms
    apiService.getAllRooms=getAllRooms;
    apiService.createNewRoom=createNewRoom;
    apiService.EditRoom=EditRoom;
    apiService.DeleteRoom=DeleteRoom;

    //--------------------end of Rooms

    //---------------------people
    apiService.getAllPeople=getAllPeople;
    apiService.createNewPeople=createNewPeople;
    apiService.EditPerson=EditPerson;
    apiService.DeletePerson=DeletePerson;
//--------------------end of people

    return apiService;

}]);
