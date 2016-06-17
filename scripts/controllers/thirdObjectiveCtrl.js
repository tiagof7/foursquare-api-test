'use strict';

angular.module('foursquareApiTestApp')
    .controller('ThirdObjectiveCtrl', function ($scope, NgTableParams) {

        $scope.alert = undefined;
        $scope.filter = {};
        $scope.result = undefined;

        var localPath = 'https://maps.googleapis.com/maps/api/geocode/json';
        var localPathFour = 'https://api.foursquare.com/v2/venues/search';
        var key = 'AIzaSyCGcagY71-iclbK1htRV7F3ZakfpvjperY';

        $scope.reset = function(){
            resetFilter();
            getLocation();
            $scope.alert = undefined;
            $scope.result = undefined;
        }

        var resetFilter = function(){
            $scope.filter = {
                key: key,
                client_id: 'O5LYT1UX035RD1FBO3OQS4MQ5P4M1VIF0NEICHSTLJBMEQAK',
                client_secret: 'QPYQRUHZR4BU2IK0LT0LXDLIPEJI12QQYTE45XBFGPW55PA1',
                v: '20130815'
            };
        }

        $scope.search = function(){
            $('#categoryInput').focus();
            $scope.alert = '';

            $.get(
                localPath,
                $scope.filter,
                function(data) {
                   openResult(data);
                }
            );
        }

        var openResult = function(data){
            $scope.myLatLng = {lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng};
            $scope.filter.ll = data.results[0].geometry.location.lat+','+ data.results[0].geometry.location.lng;

            $.get(
                localPathFour,
                $scope.filter,
                function(data) {
                   openResultFour(data);
                }
            );
        }

        var openResultFour = function(data){
            if (data.meta.code == 200) {
                if (data.response.venues.length < 1) {
                    $scope.alert = "No records found!";
                }
                else{
                    $scope.result = data.response.venues;
                    $scope.tableParams = new NgTableParams({}, { dataset: $scope.result});
                    initMap($scope.result, true);
                }
                $('#search-button').focus();
            }
            else{
                $scope.alert = "An unknown error occurred. Code: " + data.meta.code;
            }
        }

        var showError = function (error) {
            switch(error.code) {
                case error.PERMISSION_DENIED:
                    $scope.alert = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.alert = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.alert = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.alert = "An unknown error occurred."
                    break;
            }
        }
        
        resetFilter();

        $scope.map;
        var image = 'streetview-icon.png';
        var initMap = function ( venues, satelite) {
            $('#categoryInput').focus();

            if (satelite) {
                $scope.map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: $scope.myLatLng.lat, lng: $scope.myLatLng.lng},
                  zoom: 13,
                  mapTypeId: google.maps.MapTypeId.SATELLITE
                });
            }
            else{
                $scope.map = new google.maps.Map(document.getElementById('map'), {
                  center: {lat: $scope.myLatLng.lat, lng: $scope.myLatLng.lng},
                  zoom: 13
                });
            }
            

            var marker = new google.maps.Marker({
                position: $scope.myLatLng,
                map: $scope.map,
                title: 'I\'m here!',
                icon: image
            });

            angular.forEach(venues, function(venue) {
              var marker = new google.maps.Marker({
                    position: {
                        lat: venue.location.lat,
                        lng: venue.location.lng
                    },
                    map: $scope.map,
                    title: venue.name
              });
            });

            $('#search-button').focus();

        }

      

    });