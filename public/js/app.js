var app=angular.module("myapp",['ngRoute','ngCookies','ngAnimate', 'ngSanitize', 'ui.bootstrap']);



app.factory('sessionInjector', function($cookies) {  
    let cookieToken = $cookies.get('token');
    var sessionInjector = {
        request: function(config) {
            if (cookieToken ) {
                config.headers['Authorization'] = "Bearer " + cookieToken;
            }
            return config;
        }
    };
    return sessionInjector;
});
 

//to set routes
app.config(function($routeProvider,$locationProvider,$httpProvider){

    $httpProvider.interceptors.push('sessionInjector');

    $routeProvider.when('/',{
        templateUrl:'examples/login.html',
        controller:'adminLoginController'
    });
    $routeProvider.when('/dashbord',{
        templateUrl:'examples/dashbord.html',
        controller:'adminDashbordController'
    });
    $routeProvider.when('/addBlog',{
        templateUrl:'examples/form.html',
        controller:'adminFormController'
    });
    $routeProvider.when('/editBlog/:id',{
        templateUrl:'examples/form.html',
         controller:'adminEditPostController'
    });

    $routeProvider.otherwise({
        redirectTo:'/404'
    });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
       
})

// to set route if user is logged in
app.run( function($rootScope, $location,$cookies,$http) {
  console.log("in run")
   // register listener to watch route changes
   $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        // Retrieving a cookie
       
    let cookieToken = $cookies.get('token');
    //logic
     if ( !cookieToken ) {
          
        $location.path('/');
        } 
     else if( cookieToken  && ($location.$$path === '/')) {
        $location.path("/dashbord");
     }     
   });
})



