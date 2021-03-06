'use strict'
var app = angular.module('app', [
  'ui.router',
  'app.services',
  'app.eventfactory',
  'app.main',
  'app.editprofile',
  'app.createprofile',
  'app.profile',
  'app.auth',
  'app.dashboard',
  'app.optionform',
  'app.createevent',
  'app.showevent',
  'app.responseform',
  'app.restaurantresults',
  'angularjs-datetime-picker'

  ]);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('main', {
      url: '/',
      templateUrl:'app/views/welcome.html',
      controller: 'MainCtrl'
    })
    .state('main.signup', {
      templateUrl:'app/views/signup.html',
      controller: 'AuthCtrl'
    })
    .state('main.signin', {
      templateUrl:'app/views/signin.html',
      controller: 'AuthCtrl'
    })
    .state('dashboard', {
      url:'/dashboard',
      templateUrl:'app/views/dashboard.html',
      controller:'DashboardCtrl',
      authenticate: true
    })
    .state('dashboard.createevent', {
      url:'/createevent',
      templateUrl:'app/views/createevent.html',
      controller:'CreateEventCtrl',
      authenticate: true
    })
    .state('dashboard.showevent', {
      url:'/events',
      templateUrl:'app/views/showevent.html',
      controller:'ShowEventCtrl',
      authenticate: true
    })
    .state('dashboard.restaurantResults', {
      url:'/recommendation',
      templateUrl:'app/views/restaurantResults.html',
      controller:'RestaurantResultsCtrl',
      authenticate: true
    })
    .state('loading', {
      url:'/loading',
      templateUrl:'app/views/loading.html',
      authenticate: true
    })
    .state('dashboard.profile', {
      url:'/profile',
      templateUrl:'app/views/profile.html',
      controller:'ProfileCtrl',
      authenticate: true
    })
    .state('dashboard.createprofile', {
      url:'createprofile',
      templateUrl:'app/views/createprofile.html',
      controller:'CreateProfileCtrl',
      params:{
        user:null
      }
    })
    .state('dashboard.editprofile', {
      url:'/editprofile',
      templateUrl:'app/views/editprofile.html',
      authenticate: true,
      controller:'EditProfileCtrl'
    })
    .state('dashboard.findrestaurant', {
      url:'/findrestaurant',
      templateUrl:'app/views/findrestaurant.html',
      controller:'OptionformCtrl'
    })
    .state('dashboard.findfriends', {
      url:'/findfriends',
      templateUrl:'app/views/findfriends.html',
      controller:'FriendCtrl',
      authenticate:true
    })
    .state('dashboard.guestlist', {
      url:'/guestlist',
      templateUrl:'app/views/guestlist.html',
      controller:'CreateEventCtrl',
      authenticate:true
    })
    .state('dashboard.createeventreview', {
      url:'/revieweventdetails',
      templateUrl:'app/views/createeventreview.html',
      controller:'CreateEventCtrl',
      authenticate:true
    })
    .state('dashboard.singleeventview', {
      url:'/singleeventview',
      templateUrl:'app/views/singleeventview.html',
      controller:'ShowEventCtrl',
      params:{
        singleevent:null
      },
      authenticate:true
    })
    .state('dashboard.eventresponseform', {
      url:'/eventresponseform',
      templateUrl:'app/views/eventresponseform.html',
      controller:'ResponseFormCtrl',
      params:{
        eventData:null
      },
      authenticate:true
    })
    .state('dashboard.eventrecommendations', {
      url:'/recommendations',
      templateUrl:'app/views/eventrecommendations.html',
      controller:'ShowEventCtrl',
      params:{
        recommendations:null
      },
      authenticate:true
    })
    .state('dashboard.singlerecommendationview', {
      url:'/singlerecommendationview',
      templateUrl:'app/views/singlerecommendationview.html',
      controller:'ShowEventCtrl',
      authenticate:true
    });

    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push('AttachTokens');
}])

.factory('AttachTokens', ['$window', function ($window) {
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.app');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
}])
.run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if (toState.authenticate && !Auth.isAuth()) {
      $state.go('main.buttons');
      event.preventDefault();
    }
  });
}]);
