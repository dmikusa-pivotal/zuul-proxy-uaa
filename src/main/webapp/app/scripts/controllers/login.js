'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
angular.module('sbAdminApp')
  .controller('LoginCtrl', function($scope,$http) {
             console.log('LoginCtrl');
            $scope.uaa_servers={};
             $http({
               method: "get",
               url: "/api/v1/uaa_servers"
                })
             .success(function(data) {

                console.log(data);
                $scope.uaa_servers=data;
             })
            .error(function(data, status) {
                //console.log(data);
                // show error...
                $scope.error=true;

            });



  });
