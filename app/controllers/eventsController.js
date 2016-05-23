bfApp.controller('eventsController', function($scope, eventService){
    eventService.getAccessToken().then(function(accessTokenData){
        var token = accessTokenData.split("=");
        eventService.getFacebookevents(token[1]).then(function(data){
            $scope.events = data.data;
        })
    })

});