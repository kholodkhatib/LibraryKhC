/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 24 Dec 2015
    Description : Base for Dashboard Application module

    Change Log
    s.no      date    author     description


 ===========================================================*/



















var dashboard = angular.module('dashboard', ['ui.router', 'ngAnimate','ngMaterial']);


dashboard.config(["$stateProvider", function ($stateProvider) {




//people  page state
    $stateProvider.state('app.people', {
        url: '/people',
        templateUrl: 'app/modules/dashboard/views/people.html',
        controller: 'PeopleController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'People'
        }
    });


// orders handling page state
    $stateProvider.state('app.ordersHandling', {
        url: '/ordersHandling',
        templateUrl: 'app/modules/dashboard/views/ordersHandling.html',
        controller: 'OrdersHandlingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'ordersHandling'
        }
    });

// rooms handling page state
    $stateProvider.state('app.roomsHandling', {
        url: '/roomsHandling',
        templateUrl: 'app/modules/dashboard/views/roomsHandling.html',
        controller: 'RoomsHandlingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'roomsHandling'
        }
    });



    // books Ordering handling page state
    $stateProvider.state('app.booksOrderingHandling', {
        url: '/booksOrderingHandling',
        templateUrl: 'app/modules/dashboard/views/booksOrderingHandling.html',
        controller: 'BooksOrderingHandlingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'booksOrderingHandling'
        }
    });


    // authors handling page state
    $stateProvider.state('app.authorsHandling', {
        url: '/authorsHandling',
        templateUrl: 'app/modules/dashboard/views/authorsHandling.html',
        controller: 'AuthorsHandlingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'authorsHandling'
        }
    });

    // languages handling page state
    $stateProvider.state('app.languagesHandling', {
        url: '/languagesHandling',
        templateUrl: 'app/modules/dashboard/views/languagesHandling.html',
        controller: 'LanguagesHandlingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'languagesHandling'
        }
    });


    // categories handling page state
    $stateProvider.state('app.categoriesHandling', {
        url: '/categoriesHandling',
        templateUrl: 'app/modules/dashboard/views/categoriesHandling.html',
        controller: 'CategoriesHandlingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'categoriesHandling'
        }
    });

// books handling page state
    $stateProvider.state('app.booksHandling', {
        url: '/booksHandling',
        templateUrl: 'app/modules/dashboard/views/booksHandling.html',
        controller: 'BooksHandlingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'booksHandling'
        }
    });


/*

    $stateProvider.state('app.CreateBookModalInstanceCtrl', {
        url: '/booksHandling',
        templateUrl: 'app/modules/dashboard/views/createbookmodal.html',
        controller: 'CreateBookModalInstanceCtrl',
        controllerAs: 'vm',
        resolve: {

            parent_id: function(){ return $scope.orgId; },

            small: function(){ if($scope.organization) return $scope.organization.small; }

        },
        data: {
            pageTitle: 'Createbook'
        }
    });
*/



// event handling page state
    $stateProvider.state('app.eventsHandling', {
        url: '/eventsHandling',
        templateUrl: 'app/modules/dashboard/views/eventsHandling.html',
        controller: 'EventsHandlingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'eventsHandling'
        }
    });
    //dashboard home page state
    $stateProvider.state('app.dashboard', {
        url: '/dashboard',
        templateUrl: 'app/modules/dashboard/views/home.html',
        controller: 'HomeController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Home'
        }
    });


    //about us page state
    $stateProvider.state('app.aboutUs', {
        url: '/aboutUs',
        templateUrl: 'app/modules/dashboard/views/aboutUs.html',
        controller: 'AboutUsController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'AboutUs'
        }
    });


    //rooms page state
    $stateProvider.state('app.rooms', {
        url: '/rooms',
        templateUrl: 'app/modules/dashboard/views/rooms.html',
        controller: 'RoomsController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Rooms'
        }
    });

    //skills page state
    $stateProvider.state('app.skills', {
        url: '/skills',
        templateUrl: 'app/modules/dashboard/views/skills.html',
        controller: 'SkillController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Skills'
        }
    });

    //education page state
    $stateProvider.state('app.education', {
        url: '/education',
        templateUrl: 'app/modules/dashboard/views/education.html',
        controller: 'EducationController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Dashboard Home'
        }
    });

    //room orders page state
    $stateProvider.state('app.roomOrders', {
        url: '/roomOrders',
        templateUrl: 'app/modules/dashboard/views/roomOrders.html',
        controller: 'RoomOrdersController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'RoomOrders'
        }
    });

    //orders page state
    $stateProvider.state('app.myBookOrders', {
        url: '/myBookOrders',
        templateUrl: 'app/modules/dashboard/views/myBookOrders.html',
        controller: 'MyBookOrdersController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'MyBookOrders'
        }
    });


    //following page state
    $stateProvider.state('app.following', {
        url: '/following',
        templateUrl: 'app/modules/dashboard/views/following.html',
        controller: 'FollowingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Following'
        }
    });



    //top ten page state
    $stateProvider.state('app.topten', {
        url: '/topten',
        templateUrl: 'app/modules/dashboard/views/topten.html',
        controller: 'ToptenController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'TopTen'
        }
    });

    // Events  page state
    $stateProvider.state('app.events', {
        url: '/events',
        templateUrl: 'app/modules/dashboard/views/events.html',
        controller: 'EventsController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Events'
        }
    });

    //Experience page state
    $stateProvider.state('app.experience', {
        url: '/experience',
        templateUrl: 'app/modules/dashboard/views/experience.html',
        controller: 'ExperienceController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Experience'
        }
    });

    // Portfolio page state
    $stateProvider.state('app.portfolio', {
        url: '/portfolio',
        templateUrl: 'app/modules/dashboard/views/portfolio.html',
        controller: 'PortfolioController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Portfolio'
        }
    });



    //'Simple Search page state
    $stateProvider.state('app.simpleSearch', {
        url: '/simpleSearch',
        templateUrl: 'app/modules/dashboard/views/simpleSearch.html',
        controller: 'SimpleSearchController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Simple Search'
        }
    });

    //Contact page state
    $stateProvider.state('app.contact', {
        url: '/contact',
        templateUrl: 'app/modules/dashboard/views/contact.html',
        controller: 'ContactController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Contact Me'
        }
    });
    //Setting page state
    $stateProvider.state('app.setting', {
        url: '/setting',
        templateUrl: 'app/modules/dashboard/views/setting.html',
        controller: 'SettingController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Setting'
        }
    });
    //Websites page state
    $stateProvider.state('app.websites', {
        url: '/websites',
        templateUrl: 'app/modules/dashboard/views/websites.html',
        controller: 'WebsitesController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Websites'
        }
    });

    //Gallery page state
    $stateProvider.state('app.gallery', {
        url: '/gallery',
        templateUrl: 'app/modules/dashboard/views/gallery.html',
        controller: 'GalleryController',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Gallery'
        }
    });

    //Search page state
    $stateProvider.state('app.search', {
        url: '/search',
        templateUrl: 'app/modules/dashboard/views/search.html',
        controller: 'appCtrl',
        controllerAs: 'vm',
        data: {
            pageTitle: 'Search'
        }
    });

}]);

