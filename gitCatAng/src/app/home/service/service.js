angular.module('gitCatAng.home')

.factory('repositoryService', ['$http','$q',
    function($http,$q) {

        var getRepositories = function(callBack) {
            $http({
                method: "GET",
                url: 'https://api.github.com/repositories',
                params: {
                    per_page: 20
                }
            }).
                success(function(data, status, headers, config) {
                    callBack(data);
                }).
                error(function(data, status, headers, config) {
                    console.log("error description .....");
                });
        };

        var getContributors = function(callBack, contributorsUrl) {
            $http({
                method: "GET",
                url: contributorsUrl
            }).
                success(function(data, status, headers, config) {
                    callBack(data);
                }).
                error(function(data, status, headers, config) {
                    console.log("error description .....");
                });
        };

        return {
            getRepositories: getRepositories,
            getContributors: getContributors
        };
    }
]);