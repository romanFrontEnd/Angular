angular.module('gitCatAng', [
    'templates-app',
    'templates-common',
    'gitCatAng.home',
    'gitCatAng.detailed',
    'gitCatAng.favorite',
    'ui.router'
])
.run( function run () {
})
.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
        $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
            if ( angular.isDefined( toState.data.pageTitle ) ) {
                $scope.pageTitle = toState.data.pageTitle + ' | gitCat' ;
            }
            if (toState.name === "detail") {

                event.preventDefault();
            }
        });
});

