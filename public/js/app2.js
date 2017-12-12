// var app=angular.module("myapp",['ngRoute','ngCookies','ngAnimate', 'ngSanitize', 'ui.bootstrap']);



// app.factory('sessionInjector', function($cookies) {  
//     let cookieToken = $cookies.get('token');
//     console.log(cookieToken);
//     var sessionInjector = {
//         request: function(config) {
//             if (cookieToken ) {
//                 config.headers['Authorization'] = "Bearer " + cookieToken;
//             }
//             return config;
//         }
//     };
//     return sessionInjector;
// });
 

//to set routes
app.config(function($routeProvider,$locationProvider,$httpProvider){
    var interceptors = function($cookies, $rootScope) {
        let cookieToken = $cookies.get('token');
        console.log($rootScope);
        if($rootScope && $rootScope.token){
            cookieToken = $rootScope.token;
        }
        console.log("cookieToken", cookieToken);
        return {
            request: function(config) {
                if (cookieToken ) {
                    config.headers['Authorization'] = "Bearer " + cookieToken;
                }
                return config;
            }
        }    
       
       
    };
    interceptors.$inject = ['$cookies'];
    $httpProvider.interceptors.push(interceptors);

    
       
})