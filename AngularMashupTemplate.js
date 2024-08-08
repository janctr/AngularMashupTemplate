/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var prefix = window.location.pathname.substr(
    0,
    window.location.pathname.toLowerCase().lastIndexOf('/extensions') + 1
);
var config = {
    host: window.location.hostname,
    prefix: prefix,
    port: window.location.port,
    isSecure: window.location.protocol === 'https:',
};
require.config({
    baseUrl:
        (config.isSecure ? 'https://' : 'http://') +
        config.host +
        (config.port ? ':' + config.port : '') +
        config.prefix +
        'resources',
});

require(['js/qlik'], function (qlik) {
    const angularMashupApp = angular.module('angularMashupApp', ['ngRoute']);

    angularMashupApp.config(function ($routeProvider) {
        $routeProvider
            .when('/hello-world', {
                templateUrl: 'hello-world.html',
                controller: 'HelloWorldController',
            })
            .otherwise({
                controller: 'MainController',
                templateUrl: 'index.html',
            });
    });

    // Controllers
    angularMashupApp.controller('MainController', [
        '$scope',
        function ($scope) {
            $scope.title = 'Main';
        },
    ]);

    angularMashupApp.controller('HelloWorldController', [
        '$scope',
        function ($scope) {
            $scope.title = 'Main 2';
            $scope.body = 'Hello World';
        },
    ]);

    // Components
    angular.module('angularMashupApp').component('navigation', {
        templateUrl: 'navigation.html',
    });

    angular.bootstrap(document, ['angularMashupApp', 'qlik-angular']);
});
