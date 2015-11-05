/**
 * Created by romangl on 10/31/2015.
 */
angular.module('gitCatAng.home', [
    'ui.router',
    'LocalStorageModule'

])
    .config(function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise( '/home' );
        $stateProvider.state('home', {
            url: '/home',
            views: {
                "main": {
                    controller: 'HomeCtrl',
                    templateUrl: 'home/home.tpl.html'
                }
            },
            data: {
                pageTitle: 'Home'
            }
        }).state('favorite', {
            url: '/favorite',
            views: {
                "main": {
                    controller: 'FavoriteCtrl',
                    templateUrl: 'favorite/favorite.tpl.html'
                }
            },
            data: {
                pageTitle: 'Favorite'
            }
        }).state('detail', {
            url: '/:contributorsUrl', ///:repository owner full name
            views: {
                "main": {
                    controller: 'DetailedCtrl',
                    templateUrl: 'detailed/detailed.tpl.html'
                }
            },
            data: {
                pageTitle: 'Contributors'
            }
        });


    })
    .config(function (localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('gitCatStorage')
            .setNotify(true, true);
    });
