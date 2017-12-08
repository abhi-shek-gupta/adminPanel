var app=angular.module("myapp",['ngRoute','ngCookies']);

//to set routes
app.config(function($routeProvider,$locationProvider){
    $routeProvider.when('/',{
        templateUrl:'examples/login.html',
        controller:'adminLoginController'
    });
    $routeProvider.when('/dashbord',{
        templateUrl:'examples/dashbord.html',
        // controller:'adminDashbordController'
    });
    $routeProvider.when('/404',{
        templateUrl:'views/404.html'
    });
    $routeProvider.otherwise({
        redirectTo:'/404'
    });
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
})


app.run( function($rootScope, $location,$cookies) {
  console.log("in run")
   // register listener to watch route changes
   $rootScope.$on( "$routeChangeStart", function(event, next, current) {
        // Retrieving a cookie
    let cookieToken = $cookies.get('token');
    //logic
     if ( !cookieToken ) {
        $location.path('/');
     } else {
        // not going to #login, we should redirect now
        $location.path('/dashbord');
     }     
   });
})