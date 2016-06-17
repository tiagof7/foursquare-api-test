'use strict';

angular.module('foursquareApiTestApp', ['restangular', 'ngTable']);

angular.module('services.config', [])
  .constant('configuration', {
    localPath: 'https://api.foursquare.com/v2/venues/search',
    clientID: 'O5LYT1UX035RD1FBO3OQS4MQ5P4M1VIF0NEICHSTLJBMEQAK',
    clientSecret: 'QPYQRUHZR4BU2IK0LT0LXDLIPEJI12QQYTE45XBFGPW55PA1',
    versionApi: '20130815'
  }).config(function (configuration, RestangularProvider) {

  	var baseUrl = configuration.localPath;
  	baseUrl += '?client_id='+configuration.clientId;
  	baseUrl += '?client_secret='+configuration.clientSecret;
  	baseUrl += '?v='+configuration.versionApi;

  	RestangularProvider.setBaseUrl(baseUrl);

});
  