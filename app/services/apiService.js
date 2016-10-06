/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 27 Dec 2015
    Description : This service is to communicate with server for CRUD Operaions
    
    Change Log
    s.no      date    author     description     
 ===========================================================*/

app.service('apiService', ['$http', '$q', 'appSettings','globalService', function ($http, $q, appSettings,globalService) {

    var apiService = {};
    var apiBase = appSettings.apiBase;

    //+++++++++++++++++++++++++++++++++++++++++++++++KHOLOD+++++++++++++++++++++++++++++++++++++++++++++++

    //===========================Get All Years RESOURCE==============================




    //===========================GetPerson RESOURCE==============================
    var GetPerson = function (personForSearch) {

        var deferred = $q.defer();

        $http.post(apiBase + 'person/search',personForSearch, { headers: { 'Content-Type': 'application/json'}}).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data);
        });

        return deferred.promise;

    };

    var GetPersonById = function (id) {




        var deferred = $q.defer();
        $http.get(apiBase + 'person/getPersonById', { headers: { 'Person_id': id , 'Content-Type': 'application/json' , "token": globalService.GetUserDetails().token } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;

    };

    var getAllYears= function () {
/*
        var years =   [{name: "1111111"},{name: "33333333"},{name: "22222"}]; */
        var years =   [];

        var i;
        for (i = 1980; i < 2015; i++) {
            years.push({name:""+i});
        };

        return years;

      /*  var deferred = $q.defer();
        $http.get(apiBase + 'person', { headers: { 'Content-Type': 'application/json' } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;*/




    };

    //===========================Get All People RESOURCE==============================
    var getAllPeople = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'person', { headers: { 'Content-Type': 'application/json' , "token": globalService.GetUserDetails().token } }).success(function (response) {
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data);
        });
        return deferred.promise;
    };

    var signUpreq=function (person){

        var deferred = $q.defer();

        $http.post(apiBase + 'person',
            person
            , {
                headers: {
                    "Content-Type":"application/json"
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).catch(function (data, status, headers, config) { // <--- catch instead error
                deferred.reject(data);
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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

        $http.delete(apiBase + 'person?Person_id='+person._id+"&ahmad=loveU", { headers: { 'Person_id': person._id , "token": globalService.GetUserDetails().token} }).success(function (response) {

            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
        // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };







    //====================================== Books Ordering

    var GetBooksOrderingForUser = function (personForSearch) {
        var deferred = $q.defer();
        $http.get(apiBase + 'bookOrdering/search', { headers: { 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token,"userID": personForSearch} }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;




/*

        $http.get(apiBase + 'bookOrdering/search', { headers: { 'Content-Type': 'application/json'}}).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data);
        });

*/



       /*
        $http.post(apiBase + 'bookOrdering/search',personForSearch, { headers: {'userID': personForSearch,"token": globalService.GetUserDetails().token}}).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data);
        });
*/
       /* return deferred.promise;*/

    };

    //===========================Get All BooksOrdering RESOURCE==============================
    var getAllBooksOrdering = function () {

        var deferred = $q.defer();
        $http.get(apiBase + 'bookOrdering', { headers: { 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token} }).success(function (response) {
            deferred.resolve(response);

        }).catch(function (data, status, headers, config) { // <--- catch instead error

            deferred.reject(data.statusText);

        });

        return deferred.promise;
    };

    //===========================Edit BooksOrdering======== Kholod======================
    var EditBookOrdering = function (bookOrdering) {
        var deferred = $q.defer();

        $http.post(apiBase + 'bookOrdering',
            bookOrdering
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    //===========================Delete BooksOrdering======== Kholod======================
    var DeleteBookOrdering = function (bookOrdering) {
        var deferred = $q.defer();

        $http.delete(apiBase + 'bookOrdering?bookOrdering_id='+bookOrdering._id, { headers: { 'bookOrdering_id': bookOrdering._id  , "token": globalService.GetUserDetails().token} }).success(function (response) {

            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };



    //===========================Follow Book======== Kholod======================
    var FollowBook = function (book) {
        var deferred = $q.defer();

        $http.post(apiBase + 'book/FollowBook',
            book
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    var FollowUser = function (book) {
        var deferred = $q.defer();

        $http.post(apiBase + 'person/FollowBook',
            book
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };




    //===========================Follow Book======== Kholod======================
    var AddRate = function (book) {
        var deferred = $q.defer();

        $http.post(apiBase + 'book/AddRate',
            book
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };



    var getTopTen = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'book/getTopTen', { headers: { 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token} }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };





    //===========================OrderBookIsFinished======= Kholod======================
  /*  var OrderBookIsFinished = function (bookID) {

        var deferred = $q.defer();

        $http.post(apiBase + 'bookOrdering/finish',
            bookID
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };*/

    //===========================Create BooksOrdering RESOURCE======== Kholod======================
    var createNewBookOrdering = function (bookOrdering) {
        var deferred = $q.defer();

        $http.post(apiBase + 'bookOrdering',
            bookOrdering
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };



    //====================================== books ordering

    var hah = function (bookOrdering) {
        var deferred = $q.defer();


        var deferred = $q.defer();
        $http.get(apiBase + 'book/f', { headers: { 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token} }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;

    };

    //===========================Get All Rooms RESOURCE==============================
    var getAllRooms = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'room', { headers: { 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token} }).success(function (response) {
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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

        $http.delete(apiBase + 'room?room_id='+room._id, { headers: { 'room_id': room._id  , "token": globalService.GetUserDetails().token} }).success(function (response) {

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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    //=================================save room order

    var SaveOrderRoom = function (roomOrder) {
        var deferred = $q.defer();

        $http.post(apiBase + 'room/save',
            roomOrder
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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
        $http.get(apiBase + 'author', { headers: { 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token} }).success(function (response) {
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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

        $http.delete(apiBase + 'author?author_id='+author._id, { headers: { 'author_id': author._id , "token": globalService.GetUserDetails().token} }).success(function (response) {

            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };








    //===========================Get All Categories RESOURCE==============================
    var getAllCategories = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'category', { headers: { 'token': globalService.GetUserDetails().token} }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };


    //===========================Create Category RESOURCE======== Kholod======================
    var createNewCategory= function (category) {

        var deferred = $q.defer();

        $http.post(apiBase + 'category',
            category
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    //===========================Edit Category======== Kholod======================
    var EditCategory = function (category) {
        var deferred = $q.defer();

        $http.post(apiBase + 'category',
            category
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    //===========================Delete Category======== Kholod======================
    var DeleteCategory = function (category) {
        var deferred = $q.defer();

        $http.delete(apiBase + 'category?category_id='+category._id, { headers: { 'category_id': category._id , 'token': globalService.GetUserDetails().token} }).success(function (response) {

            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };






    //===========================Get All Languages RESOURCE==============================
    var getAllLanguages = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'language', { headers: { 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token} }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };


    //===========================Create Language RESOURCE======== Kholod======================
    var createNewLanguage= function (language) {
        var deferred = $q.defer();

        $http.post(apiBase + 'language',
            language
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    //===========================Edit Language======== Kholod======================
    var EditLanguage = function (language) {
        var deferred = $q.defer();

        $http.post(apiBase + 'language',
            language
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    //===========================Delete Language======== Kholod======================
    var DeleteLanguage = function (language) {
        var deferred = $q.defer();

        $http.delete(apiBase + 'language?language_id='+language._id, { headers: { 'language_id': language._id , "token": globalService.GetUserDetails().token} }).success(function (response) {

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
        $http.get(apiBase + 'event', { headers: { 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token} }).success(function (response) {
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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

        $http.delete(apiBase + 'event?event_id='+event._id, { headers: { 'event_id': event._id , "token": globalService.GetUserDetails().token} }).success(function (response) {

            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };



    //===========================Search For Book Advanced RESOURCE==============================
    var AdvancedBookSearch = function (bookForSearch) {

        var deferred = $q.defer();

        $http.post(apiBase + 'book/search',bookForSearch, { headers: { 'Content-Type': 'application/json' , 'token': globalService.GetUserDetails().token } }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };

    //===========================Search RESOURCE==============================
    var search = function () {
        var deferred = $q.defer();
        $http.get(apiBase + 'book', { headers: { 'Content-Type': 'application/json' , "token": globalService.GetUserDetails().token } }).success(function (response) {
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
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

        $http.delete(apiBase + 'book?book_id='+book._id+"&ahmad=loveU", { headers: { 'book_id': book._id , "token": globalService.GetUserDetails().token} }).success(function (response) {

            deferred.resolve(response);
        }).catch(function (data, status, headers, config) {
            // <--- catch instead error
            deferred.reject(data.statusText);
        });
        return deferred.promise;
    };







//----------------------------------------------------start od messages


    var GetMessagesForUser = function (personForSearch) {
        var deferred = $q.defer();
        $http.get(apiBase + 'messages/search', {
            headers: {
                'Content-Type': 'application/json',
                "token": globalService.GetUserDetails().token,
                "userID": personForSearch
            }
        }).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };




    var createNewMessage = function (message) {
        var deferred = $q.defer();
debugger
        $http.post(apiBase + 'messages',
            message
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    var GetMessagesForThisUser = function (personForSearch) {
        var deferred = $q.defer();
        $http.get(apiBase + 'messages', { headers: { 'Person_id':personForSearch, 'Content-Type': 'application/json'  , "token": globalService.GetUserDetails().token}}).success(function (response) {
            deferred.resolve(response);
        }).catch(function (data, status, headers, config) { // <--- catch instead error
            deferred.reject(data.statusText);
        });

        return deferred.promise;
    };


    var EditMessage = function (message) {
        var deferred = $q.defer();

        $http.post(apiBase + 'messages',
            message
            , {
                headers: {
                    "Content-Type":"application/json" , "token": globalService.GetUserDetails().token
                }
            }).success(function (data) {
                deferred.resolve(data);
            }).error(function (msg, code) {
                deferred.reject(msg);
                //   $log.error(msg, code);
            });
        return deferred.promise;
    };

    //----------------------------------------------------end of messages












    //-----------------------------------------------END OF KHOLOD









/*



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
*/




/*
    apiService.get = get;
*/
    apiService.search = search;

 /*   apiService.create = create;
    apiService.update = update;
    apiService.delet = delet;*/

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


    //---------------------Category

    apiService.getAllCategories=getAllCategories;
    apiService.createNewCategory=createNewCategory;
    apiService.EditCategory=EditCategory;
    apiService.DeleteCategory=DeleteCategory;


    //--------------------end of Category



    //---------------------Languages

    apiService.getAllLanguages=getAllLanguages;
    apiService.createNewLanguage=createNewLanguage;
    apiService.EditLanguage=EditLanguage;
    apiService.DeleteLanguage=DeleteLanguage;


    //--------------------end of Languages




    //---------------------Books Ordering
    apiService.GetBooksOrderingForUser=GetBooksOrderingForUser;
    apiService.getAllBooksOrdering=getAllBooksOrdering;
    apiService.createNewBookOrdering=createNewBookOrdering;
    apiService.EditBookOrdering=EditBookOrdering;
    apiService.DeleteBookOrdering=DeleteBookOrdering;
    apiService.FollowBook=FollowBook;
    apiService.FollowUser=FollowUser;
/*    apiService.GetFollowingByUserId=GetFollowingByUserId;*/
    apiService.AddRate=AddRate;
    apiService.getTopTen=getTopTen;

/*
    apiService.OrderBookIsFinished=OrderBookIsFinished;
*/

    //--------------------end ofBooks Ordering

//---------------------messages
    apiService.GetMessagesForUser=GetMessagesForUser;
    apiService.createNewMessage=createNewMessage;
    apiService.GetMessagesForThisUser=GetMessagesForThisUser;
    apiService.EditMessage=EditMessage;
    //----------------------end of messages

    //---------------------Rooms
    apiService.getAllRooms=getAllRooms;
    apiService.createNewRoom=createNewRoom;
    apiService.EditRoom=EditRoom;
    apiService.DeleteRoom=DeleteRoom;
    apiService.hah=hah;

    //--------------------end of Rooms

    //---------------------people
    apiService.getAllPeople=getAllPeople;
    apiService.createNewPeople=createNewPeople;
    apiService.signUpreq=signUpreq;
    apiService.EditPerson=EditPerson;
    apiService.DeletePerson=DeletePerson;
    apiService.GetPersonById=GetPersonById;
//--------------------end of people
apiService.GetPerson=GetPerson;
apiService.getAllYears=getAllYears;
    apiService.AdvancedBookSearch=AdvancedBookSearch;

    apiService.SaveOrderRoom=SaveOrderRoom;
    return apiService;

}]);
