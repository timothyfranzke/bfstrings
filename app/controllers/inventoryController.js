bfApp.controller('inventoryController', function($scope, inventoryService, $stateParams, $timeout, $state, $mdSidenav, $mdMedia){
    $scope.isHome = true;
    $scope.isSmallScreen = $mdMedia('gt-md');
    $scope.selectedInventory = "";
    $scope.selectedIndex = 0;
    function debounce(func, wait, context) {

        var timer;
        return function debounced() {
            var context = $scope,
                args = Array.prototype.slice.call(arguments);
            $timeout.cancel(timer);
            timer = $timeout(function() {
                timer = undefined;
                func.apply(context, args);
            }, wait || 10);
        };
    }
    /**
     * Build handler to open/close a SideNav; when animation finishes
     * report completion in console
     */
    console.log(68);
    function buildDelayedToggler(navID) {
        return debounce(function() {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }, 200);
    }
    function buildToggler(navID) {
        return function() {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    $log.debug("toggle " + navID + " is done");
                });
        }
    }

    $scope.toggleLeft = buildDelayedToggler('left');
    $scope.toggleRight = buildDelayedToggler('right');
    $scope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            if($state.current.name === "home"){
                $scope.isHome = true;
            }
            else{
                $scope.isHome = false;
            }
            console.log( $scope.isHome );
        }
    );
    inventoryService.getInventory().then(function(data){
        $scope.itemsHolder = data;
        data.forEach(function(item){
            item.visible = true;
            if(item.name.toLowerCase().indexOf(' sold') > -1){
                item.sold = true;
            }
            else{
                item.sold = false;
            }
        });

        $scope.items = data;

    });
    var filterInventory = function(index){
        $scope.items.forEach(function(item){
            if (item.type === index)
            {
                item.visible = true;
            }
            else {
                item.visible = false;
            }
        })

    };

    $scope.filterBanjo = function()
    {
        $scope.selectedInventory = "Banjos";
        $scope.selectedIndex = 1;
        filterInventory('1');
        $state.go("inventory");
    };
    $scope.filterMando = function()
    {
        $scope.selectedInventory = "Mandolins";
        $scope.selectedIndex = 3;
        filterInventory('3');
        $state.go("inventory");
    };
    $scope.filterGuitar = function()
    {
        $scope.selectedInventory = "Guitars";
        $scope.selectedIndex = 2;
        filterInventory('2');
        $state.go("inventory");
    };
    $scope.filterOther = function()
    {
        $scope.selectedInventory = "Other Instruments";
        $scope.selectedIndex = 4;
        filterInventory('4');
        $state.go("inventory");
    };
    $scope.goEvents = function(){
        $state.go("events");
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
        if ($state.current.name != 'inventory')
        {
            $state.go("inventory");
        }

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
    $state.goItem = function(id){
        state.go('inventoryItem', { id: id });
    }
});