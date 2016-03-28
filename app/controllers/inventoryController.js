bfApp.controller('inventoryController', function($scope, inventoryService, $stateParams, $state, $mdMedia){
    $scope.media = $mdMedia;
    $scope.filter = "";
    inventoryService.getInventory().then(function(data){
        $scope.itemsHolder = data;
        $scope.items = data;
    });

    $scope.filterBanjo = function()
    {
        console.log($scope);
        $scope.items = [];
        $scope.itemsHolder.forEach(function(item)
        {
            if (item.type === '1')
            {
                $scope.items.push(item);
            }
        });
        $state.go("inventory");
    };
    $scope.filterMando = function()
    {
        $scope.items = [];
        $scope.itemsHolder.forEach(function(item)
        {
            if (item.type === '3')
            {
                $scope.items.push(item);
            }
        });
        $state.go("inventory");
    };
    $scope.filterGuitar = function()
    {
        //alert("filtering");
        $scope.items = [];
        $scope.itemsHolder.forEach(function(item)
        {
            if (item.type === '2')
            {
                $scope.items.push(item);
            }
        });
        $state.go("inventory");
    };
    $scope.filterOther = function()
    {
        //alert("filtering");
        $scope.items = [];
        $scope.itemsHolder.forEach(function(item)
        {
            if (item.type === '4')
            {
                $scope.items.push(item);
            }
        });
        $state.go("inventory");
    };
    $scope.resetInventory = function(){
        inventoryService.getInventory().then(function(data){
            $scope.itemsHolder = data;
            $scope.items = data;
        });
    };

    //alert(JSON.stringify($state.current));
    switch($state.current.name)
    {
        case "banjos":
            $scope.type = "Banjos";
            $scope.state = "banjos";
            $scope.path = "banjos";
            inventoryService.getBanjos().then(function(data){
                $scope.itemsHolder =data;
                $scope.items = data;
            });
            break;
        case "guitars":
            $scope.type = "Guitars";
            $scope.state = "guitars";
            $scope.path = "guitars";
            inventoryService.getGuitars().then(function(data){
                $scope.itemsHolder =data;
                $scope.items = data;
            });
            break;
        case "mandos":
            $scope.type = "Mandolins";
            $scope.state = "mandolins";
            $scope.path = "mandos";
            inventoryService.getMandos().then(function(data){
                $scope.itemsHolder =data;
                $scope.items = data;
            });
            break;
    }
    var sortByPrice = function(){
        $scope.items.sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
        });
    };
    var sortByPriceDesc = function(){
        $scope.items.sort(function(a, b) {
            return parseFloat(b.price) - parseFloat(a.price);
        });
    };
    var sortByAZDesc = function(){

        $scope.items.sort(function(a, b) {

            var i = 0;
            while ((b.name.charCodeAt(i) - a.name.charCodeAt(i)) === 0)
            {
                i ++;
            }
            return b.name.charCodeAt(i) - a.name.charCodeAt(i);
        });
    };
    var sortByAZAsec = function(){
        $scope.items.sort(function(a, b) {

            var i = 0;
            while ((a.name.charCodeAt(i) - b.name.charCodeAt(i)) === 0)
            {
                i ++;
            }
            return a.name.charCodeAt(i) - b.name.charCodeAt(i);
        });
    };
    $scope.runFilter = function(filter) {
        switch (filter) {
            case "PriceDesc":
                sortByPriceDesc();
                break;
            case "PriceAsec":
                sortByPrice();
                break;
            case "AZ":
                sortByAZAsec();
                break;
            case "ZA":
                sortByAZDesc();
                break;
        }
    };

    $scope.search = function(value){
        $scope.items = [];
        $scope.itemsHolder.forEach(function(item)
        {
            var name = item.name.toLowerCase();
            value = value.toLowerCase();
            if (name.indexOf(value) > -1)
            {
                $scope.items.push(item);
            }
        })
    };
    $scope.getNumber = function(num) {
        alert(num);
        return new Array(num);
    };
    $scope.navInventory = function(){
        $state.go("inventory");
    };
});