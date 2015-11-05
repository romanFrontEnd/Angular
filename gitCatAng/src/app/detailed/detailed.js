var cnt = 0;
angular.module( 'gitCatAng.detailed', [
  'ui.router',
  'ui.bootstrap'
])
.controller( 'DetailedCtrl', function DetailedCtrl( $rootScope, $scope, $stateParams, repositoryService ) {
        repositoryService.getContributors(function(data){
            $scope.contributors = data;
            cnt = 0;
        },  decodeURIComponent($stateParams.contributorsUrl));

});
