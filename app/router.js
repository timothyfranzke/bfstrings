bfApp.config(function($urlRouterProvider, $stateProvider, $locationProvider){
    //$locationProvider.html5Mode({
    //    enabled: true
    //});
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'app/partials/home.html',
            controller: 'inventoryController'
        })
        .state('fretshop', {
            url: '/fretshop',
            templateUrl: 'app/partials/fretShop.html',
            controller: 'inventoryController'
        })
        .state('events', {
            url: '/events',
            templateUrl: 'app/partials/events.html',
            controller: 'eventsController'
        })
        .state('contact', {
            url:'/contact',
            templateUrl:'app/partials/contact.html',
            controller:'contactController'
        })
        .state('inventory', {
            url: '/inventory',
            templateUrl: 'app/partials/inventory.html'
        })
        .state('inventoryItem', {
            url: '/inventory/:id',
            templateUrl: 'app/partials/item.html',
            controller: 'itemController'
        })
        .state('admin', {
            url: '/admin',
            templateUrl:"app/partials/admin/admin.html",
            controller:'adminController'
        })
        .state('admin.inventory', {
            url:'/inventory',
            templateUrl:'app/partials/admin/inventory.html',
            controller:'adminController'
        })
		.state('admintItem',{
			url: '/admin/inventory/:id',
			templateUrl: 'app/partials/admin/item.html',
			controller: 'adminItemController'
		})
        .state('admin.image', {
            url:'/image',
            templateUrl: 'app/partials/admin/image.html',
            controller:'imageTestController'
        })
        .state('admin.description', {
            url:'/description',
            templateUrl: 'app/partials/admin/description.html',
            controller:'itemDescriptionController'
        });
    $urlRouterProvider.otherwise('/');

})
