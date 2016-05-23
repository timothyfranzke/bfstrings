bfApp.factory('eventService', function($http, $q, baseService){
    var uid = 1596300553922503;
    //var accessToken = 'EAACEdEose0cBAJomwDI0HmZCRnR7Yd9VwiLEAEHr9ZAkaFfl7wpObYY0MR4Vch8crInvELMTLk5bZA46iXBPUk7kWPYNUhaKI5pwFTrhLaN1LjMbhFmQWZBwSIixclxH3SfMU9Ji3fPYlr6TWl3a1ZBdMvFGneZAxxwjErEZCyhSQZDZD';
    var oath = '/oauth/';
    var accessTokenRequest = 'access_token?%20client_id=1030518733661195&client_secret=3674537faa96a91088f7ad3b9e319ac4&grant_type=client_credentials'

    var events = '/events';
    return {
        getFacebookevents: function(accessToken){
            var url = uid + events;
            var query = "?access_token=" + accessToken;
            return baseService.GET(url, query);
        },
        getAccessToken: function(){
            var url = oath + accessTokenRequest;
            return baseService.GETTOKEN(oath, accessTokenRequest);
        }
    }
})