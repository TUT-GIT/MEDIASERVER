//public/core.js
var mediaserver = angular.module('mediaserver', []);

function audioPlayer($scope, $http)
{
	//API - play ======================================
		$scope.play = function()
		{
		  console.log("CLIENT: play button");
		  $http.get('/api/serverPlay')
			.then(function(response)
			{
				console.log(response.data);
			}
			,function(error)
			{
				console.log('ERROR: ' + data);
		  });
		};
	//API - pause ======================================
		$scope.pause = function()
		{
		  console.log("CLIENT: pause button");
		  $http.get('/api/serverPause')
			.then(function(response)
			{
				console.log(response.data);
			}
			,function(error)
			{
				console.log('ERROR: ' + data);
		  });
		};
	//API - stop ======================================
		$scope.stop = function()
		{
		  console.log("CLIENT: stop button");
		  $http.get('/api/serverStop')
			.then(function(response)
			{
				console.log(response.data);
			}
			,function(error)
			{
				console.log('ERROR: ' + data);
		  });
		};
	//API - previous ======================================
		$scope.previous = function()
		{
		  console.log("CLIENT: previous button");
		  $http.get('/api/serverPrevious')
			.then(function(response)
			{
				console.log(response.data);
			}
			,function(error)
			{
				console.log('ERROR: ' + data);
		  });
		};
	//API - next ======================================
		$scope.next = function()
		{
		  console.log("CLIENT: next button");
		  $http.get('/api/serverNext')
			.then(function(response)
			{
				console.log(response.data);
			}
			,function(error)
			{
				console.log('ERROR: ' + data);
		  });
		};
	//API - setVolume =================================
		$scope.setVolume = function()
		{
		  console.log("CLIENT: setVolume button");
		  $http.get('/api/serverSetVolume')
			.then(function(response)
			{
				console.log(response.data);
			}
			,function(error)
			{
				console.log('ERROR: ' + data);
		  });
		};
	//API - setSong ===================================
		$scope.setSong = function()
		{
		  console.log("CLIENT: setSong button");
		  $http.get('/api/serverSetSong')
			.then(function(response)
			{
				console.log(response.data);
			}
			,function(error)
			{
				console.log('ERROR: ' + data);
		  });
		};

	//API - updateLibrary =============================
		$scope.updateLibrary = function()
		{
		  console.log("CLIENT: updateLibrary button");
		  $http.get('/api/updateLibrary')
			.then(function(response)
			{
				console.log(response.data);
			}
			,function(error)
			{
				console.log('ERROR: ' + data);
		  });
		};

};

mediaserver.controller("audioPlayer", audioPlayer);
