angular.module( 'gitCatAng.favorite', [
    'ui.router',
    'ui.bootstrap'
])
    .controller( 'FavoriteCtrl', function FavoriteCtrl( $rootScope, $scope, $stateParams, repositoryService ) {
        $scope.favorites = angular.copy($rootScope.favorites);
    });
