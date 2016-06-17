'use strict';

angular.module('foursquareApiTestApp')
    .controller('GlobalCtrl', function ($scope) {

        $scope.alerts = [];
        $scope.filter = {};

        $scope.reset = function(){
            $scope.filter = {};
        }

        

        // Restangular.setErrorInterceptor(function (response) {
        //     if (response.status == 401) {
        //         AuthService.logout();
        //         return false;
        //     } else if (response.data && response.data.consumerMessage) {
        //         growl.error($filter('translate')('message.error.' + response.data.consumerMessage));
        //         return false;
        //     }
        //     return true;
        // });



    });