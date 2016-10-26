var app = angular.module('myTweetsApp', ['ngRoute']) //this is where you are creating your angular module

app.controller('MyTweetsWelcomeCtrl', ['$scope', '$rootScope', '$location', //this is the controller for the welcome html
    function ($scope, $rootScope, $location) {

		$scope.setUser = function () {
			$rootScope.name = $scope.username;
			$location.path('/tweets');
		}
    }]);

app.controller('TweetController', ['$scope', '$rootScope', function ($scope, $rootScope) { //controller for tweets html

    $scope.getTweet = function() {
		/*This function should make a get request from 'database', parse the data and prepend each to the page*/
		$.ajax({
			type: 'GET',
			url: 'http://localhost:3000/api/tweets',
			contentType: 'application/json',
		}).then(function (alltheTweets) {
			$scope.tweets = alltheTweets;
		})
	}

	$scope.getTweet();

	$scope.printMyTweet = function() {
		var newTweet = {
			user: $rootScope.name,
			text: $scope.tweet.text
		};
		
		$.ajax({
			type: 'POST',
			url: 'http://localhost:3000/api/tweets',
			contentType: 'application/json',
			data: JSON.stringify(newTweet),
		}).then(function (success) {
			$scope.tweets.push(newTweet);
		})
	}
}]);

//this is the address book that tells it what you're doing when you go to a specific page'
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/welcome', { //when we navigate to localhost:3000/#/welcome...
            templateUrl: 'views/welcome.html', //this is the file you are getting
            controller: 'MyTweetsWelcomeCtrl', //this is what it's going to do'
        })
        .when('/tweets', {
            templateUrl: 'views/tweets.html',
            controller: "TweetController"
        })
        .otherwise({
            redirectTo: '/welcome',//anything else take me to welcome page
        })
}]);