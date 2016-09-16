/*==========================================================
    Author      : Ranjithprabhu K
    Date Created: 24 Dec 2015
    Description : Controller to handle main application
    
    Change Log
    s.no      date    author     description     
 ===========================================================*/

app.controller("appCtrl", ['$rootScope', '$scope', '$state', '$location', 'Flash','appSettings','globalService',
function ($rootScope, $scope, $state, $location, Flash,appSettings,globalService) {

    $rootScope.theme = appSettings.theme;
    $rootScope.layout = appSettings.layout;

    var vm = this;
    vm.userlocal=globalService.GetUserDetails();

    //avalilable themes
    vm.themes = [
        {
            theme: "black",
            color: "skin-black",
            title: "Dark - Black Skin",
            icon:""
        },
        {
            theme: "black",
            color: "skin-black-light",
            title: "Light - Black Skin",
            icon:"-o"
        },
        {
            theme: "blue",
            color: "skin-blue",
            title: "Dark - Blue Skin",
            icon:""
        },
        {
            theme: "blue",
            color: "skin-blue-light",
            title: "Light - Blue Skin",
            icon:"-o"
        },
        {
            theme: "green",
            color: "skin-green",
            title: "Dark - Green Skin",
            icon:""
        },
        {
            theme: "green",
            color: "skin-green-light",
            title: "Light - Green Skin",
            icon:"-o"
        },
        {
            theme: "yellow",
            color: "skin-yellow",
            title: "Dark - Yellow Skin",
            icon:""
        },
        {
            theme: "yellow",
            color: "skin-yellow-light",
            title: "Light - Yellow Skin",
            icon:"-o"
        },
        {
            theme: "red",
            color: "skin-red",
            title: "Dark - Red Skin",
            icon: ""
        },
        {
            theme: "red",
            color: "skin-red-light",
            title: "Light - Red Skin",
            icon: "-o"
        },
        {
            theme: "purple",
            color: "skin-purple",
            title: "Dark - Purple Skin",
            icon: ""
        },
        {
            theme: "purple",
            color: "skin-purple-light",
            title: "Light - Purple Skin",
            icon: "-o"
        },
    ];

    //available layouts
    vm.layouts = [
        {
            name: "Boxed",
            layout: "layout-boxed"
        },
        {
            name: "Fixed",
            layout: "fixed"
        },
        {
            name: "Sidebar Collapse",
            layout: "sidebar-collapse"
        },
    ];


    //Main menu items of the dashboard
    vm.menuItems = [

      /*  {
            title: "Authors Handling",
            icon: "dashboard",
            state: "authorsHandling",
            isToShow:vm.userlocal.isAdmin
        },

        {
            title: "Books Ordering Handling",
            icon: "dashboard",
            state: "booksOrderingHandling",
            isToShow:vm.userlocal.isAdmin
        },

        {
            title: "Categories Handling",
            icon: "dashboard",
            state: "categoriesHandling",
            isToShow:vm.userlocal.isAdmin

        },
        {
            title: "Languages Handling",
            icon: "dashboard",
            state: "languagesHandling",
            isToShow:vm.userlocal.isAdmin
        },


        {
            title: "Books Handling",
            icon: "dashboard",
            state: "booksHandling",
            isToShow:vm.userlocal.isAdmin
        },
        {
            title: "Rooms Handling",
            icon: "dashboard",
            state: "roomsHandling",
            isToShow:vm.userlocal.isAdmin
        },
        {
            title: "Events Handling",
            icon: "dashboard",
            state: "eventsHandling",
            isToShow:vm.userlocal.isAdmin
        },
        {
            title: "People",
            icon: "dashboard",
            state: "people",
            isToShow:vm.userlocal.isAdmin
        },*/
        {
            title: "Simple Search",
            icon: "dashboard",
            state: "simpleSearch" ,
            isToShow:true
        },


        {
            title: "Events",
            icon: "dashboard",
            state: "events",
            isToShow:true
        },

        {
            title: "My Books Orders",
            icon: "graduation-cap",
            state: "myBookOrders",
            isToShow:true
        },
        {
            title: "Following Books",
            icon: "graduation-cap",
            state: "following",
            isToShow:true
        },


        {
            title: "Top 10 Books",
            icon: "graduation-cap",
            state: "topten",
            isToShow:true
        },
        {
            title: "My Rooms Orders",
            icon: "graduation-cap",
            state: "roomOrders",
            isToShow:true
        },
        {
            title: "Messages",
            icon: "dashboard",
            state: "ordersHandling",
            isToShow:true
        },
        {
            title: "Setting",
            icon: "dashboard",
            state: "setting",
            isToShow:true
        },
        {
            title: "About Us",
            icon: "dashboard",
            state: "aboutUs",
            isToShow:true
        },













      /*  {
            title: "Dashboard",
            icon: "dashboard",
            state: "dashboard"
        },
        {
            title: "Skills",
            icon: "gears",
            state: "skills"
        },
        {
            title: "Education",
            icon: "graduation-cap",
            state: "education"
        },
        {
            title: "Experience",
            icon: "suitcase",
            state: "experience"
        },
        {
            title: "Recent Projects",
            icon: "file-code-o",
            state: "recent"
        },
        {
            title: "Websites",
            icon: "globe",
            state: "websites"
        },
        {
            title: "Portfolio",
            icon: "anchor",
            state: "portfolio"
        },
        {
            title: "About Me",
            icon: "user-secret",
            state: "about"
        },*/
        {
            title: "Contact",
            icon: "phone",
            state: "contact",
            isToShow:true
        }
    ];


    vm.menuHeaderItems = [


        {
            title: "Books Ordering ",
            icon: "dashboard",
            state: "booksOrderingHandling",
            isToShow:vm.userlocal.isAdmin
        },

        {
            title: "Rooms ",
            icon: "dashboard",
            state: "roomsHandling",
            isToShow:vm.userlocal.isAdmin
        },
        {
            title: "Events ",
            icon: "dashboard",
            state: "eventsHandling",
            isToShow:vm.userlocal.isAdmin
        },
        {
            title: "People",
            icon: "dashboard",
            state: "people",
            isToShow:vm.userlocal.isAdmin
        },
        {
            title: "Messages",
            icon: "dashboard",
            state: "ordersHandling",
            isToShow:true
        },
];




    vm.menuBookItems = [
        {
            title: "Authors",
            icon: "dashboard",
            state: "authorsHandling",
            isToShow:vm.userlocal.isAdmin
        },

        {
        title: "Categories ",
            icon: "dashboard",
        state: "categoriesHandling",
        isToShow:vm.userlocal.isAdmin

    },
    {
        title: "Languages",
            icon: "dashboard",
        state: "languagesHandling",
        isToShow:vm.userlocal.isAdmin
    },


    {
        title: "Books ",
            icon: "dashboard",
        state: "booksHandling",
        isToShow:vm.userlocal.isAdmin
    },

];

        //set the theme selected
    vm.setTheme = function (value) {
        $rootScope.theme = value;
    };


    //set the Layout in normal view
    vm.setLayout = function (value) {
        $rootScope.layout = value;
    };


    //controll sidebar open & close in mobile and normal view
    vm.sideBar = function (value) {
        if($(window).width()<=767){
        if ($("body").hasClass('sidebar-open'))
            $("body").removeClass('sidebar-open');
        else
            $("body").addClass('sidebar-open');
        }
        else {
            if(value==1){
            if ($("body").hasClass('sidebar-collapse'))
                $("body").removeClass('sidebar-collapse');
            else
                $("body").addClass('sidebar-collapse');
            }
        }
    };

    //navigate to search page
    vm.search = function () {
        $state.go('app.simpleSearch');
    };


    vm.GoToSetting=function(){
        $state.go('app.setting');
    }
    console.log('getting in to the app controller');





    $rootScope.$on("CallParentMethod", function(){
        $scope.parentmethod();
    });

    $scope.parentmethod = function() {
        vm.userlocal=globalService.GetUserDetails();
    }



}]);
