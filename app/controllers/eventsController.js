/**
 * Created by Timothy on 3/25/2016.
 */
bfApp.controller('eventsController', function($scope, $http){
    var request = {
        url: 'https://graph.facebook.com/v2.5/1596300553922503/events?fields=id,name,description,cover,start_time,place&access_token=1030518733661195|F40ohoyUvi2TYGTUm4KW35mjcUQ',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    $http(request)
        .success(function (data) {
            $scope.events = data.data;
        })
        .error(function (data, status) {

        });
    //$scope.events = [];

})