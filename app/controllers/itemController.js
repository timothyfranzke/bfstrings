/**
 * Created by Timothy on 8/4/2015.
 */
bfApp.controller('itemController', function($stateParams, $mdToast, $scope, $mdMedia, $sce, $state, inventoryService, $cookies, $mdDialog, $http){
    var showToast = function(message) {
        $mdToast.show(
            $mdToast.simple()
                .textContent(message)
                .position("top right")
                .hideDelay(3000)

        );
    };
    $scope.isLargeScreen = $mdMedia('gt-md');
    console.log($scope.isLargeScreen);
    $scope.items = [];
    $scope.options = {
        width: '100%',
        height: 400,
        loop: true,
        keyboard: true,
        nav: 'thumbs'
    };
    $scope.item = {};
    $scope.recentlyViewed = [];
    $scope.isSmallScreen = $mdMedia('sm');
    $scope.openInquire = function(item){
        inventoryService.setInquiredInstrument(item);
        console.log(item);
        $mdDialog.show({
            controller: 'contactController',
            templateUrl: 'app/partials/dialog/contact.html',
            parent: angular.element(document.body),
            clickOutsideToClose:true,
            fullscreen: true
        }).then(function(email){
            var request = {
                url: 'php/Email.php',
                method: 'POST',
                data: contact
            };

            $http(request)
                .success(function (data) {
                    showToast("Your inquiry has been sent.  Thank you!")
                })
                .error(function (data, status) {
                });
        })
    };

    inventoryService.getImage($stateParams.id).then(function(data){
        //var fotoramaImages = [];
       $scope.images = data;
        console.log("images: " + JSON.stringify($scope.images));
        //$scope.images.forEach(function(image){
        //    var frImg = {
        //        img: 'img/inventory/' + image.folderId + '/' + image.itemId + '.png',
        //        thumb: 'img/inventory/' + image.folderId + '/' + image.itemId + '.png'
        //    };
        //    fotoramaImages.push(frImg);
        //});
        //$('.fotorama').fotorama({
        //    data: fotoramaImages
        //});
    });
    inventoryService.getItemById($stateParams.id).then(function(data)
    {
        $scope.item = data;
		$scope.description = $sce.trustAsHtml($scope.item.description);

        //$scope.item.type ="Banjo";
        if ($cookies.get("itemTwo") !== undefined)
        {
            $cookies.putObject("itemThree", $cookies.getObject("itemTwo"));
            $scope.recentlyViewed.push($cookies.getObject("itemThree"));
        }
        if ($cookies.get("itemOne") !== undefined)
        {
            $cookies.putObject("itemTwo", $cookies.getObject("itemOne"));
            $scope.recentlyViewed.push($cookies.getObject("itemTwo"));
        }
        if ($cookies.get("current") !== undefined)
        {
            $cookies.putObject("itemOne", $cookies.getObject("current"));
            $scope.recentlyViewed.push($cookies.getObject("itemOne"));
        }
        $cookies.putObject("current", $scope.item);
        $('.fotorama').fotorama();
    });

    $scope.contact = function(item)
    {
        inventoryService.setInquiredInstrument(item);
        $state.go("contact");
    };
    // alert(JSON.stringify($cookies.getObject("itemTwo")));

    console.log(($scope.recentlyViewed));
}
)