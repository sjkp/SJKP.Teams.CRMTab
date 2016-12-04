module SJKP.Teams.CRMTab {

    export function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    export var app = angular.module('sjkpteamscrm', ['ngRoute', 'AdalAngular'])
        .constant('crmUrl', 'https://' + getCookie('crmUrl'))
        .config(['$routeProvider', '$httpProvider', 'adalAuthenticationServiceProvider', 'crmUrl', function ($routeProvider, $httpProvider, adalProvider, crmUrl) {

            $routeProvider.when("/Home", {
                controller: "homeCtrl",
                templateUrl: "/views/home.html",
                requireADLogin: true
            }).when("/TodoList", {
                controller: "todoListCtrl",
                templateUrl: "/App/Views/TodoList.html",
                requireADLogin: true,
            }).when("/UserData", {
                controller: "userDataCtrl",
                templateUrl: "/App/Views/UserData.html",
            }).otherwise({ redirectTo: "/Home" });

            var config = {
                instance: 'https://login.microsoftonline.com/',
                tenant: 'common',
                clientId: '08c968c5-ac9b-4140-9101-740feda33608',
                extraQueryParameter: 'nux=1',
                //cacheLocation: 'localStorage', // enable this for IE, as sessionStorage does not work for localhost.
                endpoints: {}
            }
            console.log(getCookie('crmUrl'));
            config.endpoints[crmUrl] = crmUrl;

            adalProvider.init(
                config
                ,
                $httpProvider
            );

        }]);


}