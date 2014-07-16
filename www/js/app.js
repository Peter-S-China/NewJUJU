'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives','ajoslin.mobile-navigate','ngMobile'])
    .config(function ($compileProvider){
        $compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
    })
    .config(['$routeProvider', function($routeProvider) {
        
    $routeProvider.when('/homeview', {templateUrl: 'partials/homeView.html', controller: 'HomeCtrl'});
             
        //$routeProvider.when('/', {templateUrl: 'partials/homeView.html', controller: 'HomeCtrl'});
        
       $routeProvider.when('/', {templateUrl: 'partials/login.html', controller: 'HomeCtrl'});         
    
        $routeProvider.when('/step1', {templateUrl: 'partials/step1.html'});
             
        $routeProvider.when('/newroom', {templateUrl: 'partials/newroom.html', controller: 'HomeCtrl'});
             
         $routeProvider.when('/joinroom', {templateUrl: 'partials/joinroom.html', controller: 'HomeCtrl'});
            
        $routeProvider.when('/mainchat', {templateUrl: 'partials/mainchat.html', controller: 'HomeCtrl'});
             
        $routeProvider.when('/step2', {templateUrl: 'partials/step2.html', controller: 'HomeCtrl'});
             
         $routeProvider.when('/step3', {templateUrl: 'partials/step3.html', controller: 'HomeCtrl'});
             
          $routeProvider.when('/cbsview', {templateUrl: 'partials/CBS_View.html', controller: 'HomeCtrl'});
             
             
        
             
             
              $routeProvider.when('/cbs2', {templateUrl: 'partials/cbs2.html', controller: 'HomeCtrl'});  
             
        $routeProvider.when('/dmxview', {templateUrl: 'partials/dmx_view.html', controller: 'HomeCtrl'});
         $routeProvider.when('/dmxview2', {templateUrl: 'partials/dmx_view2.html', controller: 'HomeCtrl'});
             
        $routeProvider.when('/inggameview', {templateUrl: 'partials/inggame.html', controller: 'HomeCtrl'});
             
       $routeProvider.when('/nophoneview', {templateUrl: 'partials/nophone.html', controller: 'HomeCtrl'});
             
               $routeProvider.when('/nophoneview', {templateUrl: 'partials/nophone.html', controller: 'HomeCtrl'});
             
             
             
           $routeProvider.when('/flatview', {templateUrl: 'partials/flatview.html', controller: 'HomeCtrl'});  
         
           $routeProvider.when('/cbsteamdetail', {templateUrl: 'partials/cbsteamdetail.html', controller: 'HomeCtrl'});
             
             $routeProvider.when('/homelostview', {templateUrl: 'partials/homelostview.html', controller: 'HomeCtrl'});
             
        $routeProvider.when('/cbsview2', {templateUrl: 'partials/CBS_View2.html', controller: 'HomeCtrl'});
             
        
        
        $routeProvider.when('/myscoreview', {templateUrl: 'partials/myscoreview.html', controller: 'HomeCtrl'});
             
             
         $routeProvider.when('/viewuserlist', {templateUrl: 'partials/ViewUserList.html'});
         
        
             
             
        $routeProvider.when('/view1', {templateUrl: 'partials/notificationView.html'});
        $routeProvider.when('/view2', {templateUrl: 'partials/geolocationView.html'});
        $routeProvider.when('/view3', {templateUrl: 'partials/accelerometerView.html'});
        $routeProvider.when('/view4', {templateUrl: 'partials/deviceInfoView.html'});
        $routeProvider.when('/view5', {templateUrl: 'partials/cameraView.html'});
        $routeProvider.when('/view6', {templateUrl: 'partials/contactsView.html'});
        $routeProvider.when('/view7', {templateUrl: 'partials/compassView.html'});
        $routeProvider.when('/view8', {templateUrl: 'partials/hackerNewsView.html'});
       $routeProvider.when('/searchteam', {templateUrl: 'partials/searchTeamView.html'});
        
             
             
             
        $routeProvider.otherwise({redirectTo: '/'});
  }]);
