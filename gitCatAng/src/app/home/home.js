angular.module( 'gitCatAng.home')
.controller( 'HomeCtrl', function HomeController( $scope,$rootScope, repositoryService, localStorageService ) {

        var favoriteService = {
            repoData: null,
            init: function(data) {
                this.repoData = data;
                $rootScope.favorites = localStorageService.get("favorites") || [];
                localStorageService.bind($rootScope, 'favorites', []);
                this.presetFavorites();
            },

            presetFavorites: function (data) {
                var self = this;
                this.repoData.forEach(function(item){
                    if(self.matchFavorite($rootScope.favorites, item)){
                        self.updateFavorite(item, true);
                    }
                });
            },

            matchFavorite: function (arr, value) {

                var result = arr.filter(function (o) {
                    return o.id == value.id;
                });

                return result ? result[0] : null; // or undefined
            },

           updateFavorite: function (item, value) {
                item.isFavourite = value;
            },

            makeFavorite: function(id) {
                var item = this.matchFavorite(this.repoData, {"id": id});
                if(item.isFavourite) {
                    this.updateFavorite(item, false);
                    this.removeFromStorage(item);

                } else {
                    if(!this.matchFavorite($rootScope.favorites, item)){
                        this.updateFavorite(item, true);
                        $rootScope.favorites.push(item);
                    }
                }
            },

            removeFromStorage: function(item) {
                var self = this;
                $rootScope.favorites.forEach(function(sItem, index){
                    if(sItem.id == item.id) {
                        $rootScope.favorites.splice(index, 1);
                    }
                });
            },

            getRepoData: function () {
                return this.repoData;
            }

        };

        repositoryService.getRepositories(function(data) {
            favoriteService.init(data);
            $scope.repositories = favoriteService.getRepoData();

            $scope.itemsPerPage = 10;
            $scope.currentPage = 0;


            $scope.pageCount = function() {
                return new Array(Math.ceil($scope.repositories.length / $scope.itemsPerPage) - 1);
            };
            $scope.prevPage = function() {
                if ($scope.currentPage > 0) {
                    $scope.currentPage--;
                }
            };

            $scope.prevPageDisabled = function() {
                return $scope.currentPage === 0 ? "disabled" : "";
            };

            $scope.setPage = function(index) {
                $scope.currentPage = index;
            };

            $scope.nextPage = function() {
                if ($scope.currentPage < $scope.pageCount().length - 1) {
                    $scope.currentPage++;
                }
            };

            $scope.nextPageDisabled = function() {
                return $scope.currentPage === $scope.pageCount().length - 1 ? "disabled" : "";
            };
        });

        $scope.makeFavourite = function(index) {
            favoriteService.makeFavorite(index);
        };
        $scope.reverse = function() {
            $scope.repositories = angular.copy($scope.repositories.reverse());
        };
        $scope.predicate = 'id';
        $scope.reverse = false;
        $scope.order = function(predicate) {
            $scope.reverse = ($scope.predicate === predicate) ? !$scope.reverse : false;
            $scope.predicate = predicate;
        };
});

