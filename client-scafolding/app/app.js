var app = angular.module('myApp', ['ngRoute'])
app.config(function($routeProvider){
    $routeProvider
    .when("/", {
        templateUrl: "../views/home.html",
        controller: "consoleCtrl"
        
    })
})

app.controller("consoleCtrl", function ($scope){
    
})
// angular.module('myControllers',[])
// .controller('listController',['$scope',function($scope){

// }])