'use strict';

angular.module('foursquareApiTestApp')
    .controller('FirstObjectiveCtrl', function ($scope, NgTableParams) {

        $scope.alert = undefined;
        $scope.filter = {};
        $scope.result = undefined;

        var localPath = 'https://api.foursquare.com/v2/venues/search';

        $scope.reset = function(){
            resetFilter();
            getLocation();
            $scope.alert = undefined;
            $scope.result = undefined;
        }

        var resetFilter = function(){
            $scope.filter = {
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
            if (data.meta.code == 200) {
                if (data.response.venues.length < 1) {
                    $scope.alert = "No records found!";
                }
                else{
                    $scope.result = data.response.venues;
                    $scope.tableParams = new NgTableParams({}, { dataset: $scope.result});
                    initMap($scope.result);
                }
                $('#search-button').focus();
            }
            else{
                $scope.alert = "An unknown error occurred. Code: " + data.meta.code;
            }
        }

        var getLocation = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(showPosition, showError);
            } else {
                $scope.alert = "Geolocation is not supported by this browser.";
            }
        }

        var showPosition = function (position) {
            $scope.myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};
            initMap();
            $scope.filter.ll = position.coords.latitude+','+ position.coords.longitude;

            $scope.alert = undefined;
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
        getLocation();

        $scope.map;
        var image = 'streetview-icon.png';
        var initMap = function ( venues) {
            $('#categoryInput').focus();
            
            $scope.map = new google.maps.Map(document.getElementById('map'), {
              center: {lat: $scope.myLatLng.lat, lng: $scope.myLatLng.lng},
              zoom: 15
            });

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