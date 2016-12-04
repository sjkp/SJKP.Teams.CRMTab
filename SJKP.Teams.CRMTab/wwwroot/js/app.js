var SJKP;
(function (SJKP) {
    var Teams;
    (function (Teams) {
        var CRMTab;
        (function (CRMTab) {
            function getCookie(cname) {
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
            CRMTab.getCookie = getCookie;
            CRMTab.app = angular.module('sjkpteamscrm', ['ngRoute', 'AdalAngular'])
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
                    };
                    console.log(getCookie('crmUrl'));
                    config.endpoints[crmUrl] = crmUrl;
                    adalProvider.init(config, $httpProvider);
                }]);
        })(CRMTab = Teams.CRMTab || (Teams.CRMTab = {}));
    })(Teams = SJKP.Teams || (SJKP.Teams = {}));
})(SJKP || (SJKP = {}));
var SJKP;
(function (SJKP) {
    var Teams;
    (function (Teams) {
        var CRMTab;
        (function (CRMTab) {
            var CrmService = (function () {
                function CrmService($http, $q, crmUrl) {
                    var _this = this;
                    this.$http = $http;
                    this.$q = $q;
                    this.crmUrl = crmUrl;
                    this.getAccounts = function () {
                        var deferred = _this.$q.defer();
                        _this.$http.get(_this.crmUrl + '/api/data/v8.0/accounts?$select=name,address1_city&$top=10').then(function (res) {
                            deferred.resolve(res.data["value"]);
                        }).catch(function (err) {
                            deferred.reject(err);
                        });
                        return deferred.promise;
                    };
                    this.getLeads = function () {
                        var deferred = _this.$q.defer();
                        _this.$http.get(_this.crmUrl + '/api/data/v8.0/leads?$select=subject,fullname,estimatedvalue,estimatedclosedate,salesstage,revenue&$top=50').then(function (res) {
                            deferred.resolve(res.data["value"]);
                        }).catch(function (err) {
                            deferred.reject(err);
                        });
                        return deferred.promise;
                    };
                }
                return CrmService;
            }());
            CrmService.$inject = ['$http', '$q', 'crmUrl'];
            CRMTab.CrmService = CrmService;
            CRMTab.app.service('crmService', CrmService);
        })(CRMTab = Teams.CRMTab || (Teams.CRMTab = {}));
    })(Teams = SJKP.Teams || (SJKP.Teams = {}));
})(SJKP || (SJKP = {}));
var SJKP;
(function (SJKP) {
    var Teams;
    (function (Teams) {
        var CRMTab;
        (function (CRMTab) {
            var HomeController = (function () {
                function HomeController($scope, adalService, $location, crmService, crmUrl) {
                    var _this = this;
                    this.$scope = $scope;
                    this.crmService = crmService;
                    this.crmUrl = crmUrl;
                    crmService.getLeads().then(function (res) {
                        _this.$scope.accounts = res;
                    });
                    $scope.login = function () {
                        adalService.login();
                    };
                    $scope.openLink = function (id) {
                        window.open(_this.crmUrl + '/main.aspx?etc=4&id=' + id + '&newWindow=true&pagetype=entityrecord');
                    };
                }
                return HomeController;
            }());
            HomeController.$inject = ['$scope', 'adalAuthenticationService', '$location', 'crmService', 'crmUrl'];
            CRMTab.HomeController = HomeController;
            CRMTab.app.controller('homeCtrl', HomeController);
        })(CRMTab = Teams.CRMTab || (Teams.CRMTab = {}));
    })(Teams = SJKP.Teams || (SJKP.Teams = {}));
})(SJKP || (SJKP = {}));
/// <reference path="microsoftteams.d.ts" />
var SJKP;
/// <reference path="microsoftteams.d.ts" />
(function (SJKP) {
    var Teams;
    (function (Teams) {
        var CRMTab;
        (function (CRMTab) {
            function setup() {
                microsoftTeams.initialize();
                microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {
                    microsoftTeams.settings.setSettings({
                        contentUrl: "https://sjkpcrmteamstab.azurewebsites.net/" + encodeURIComponent(document.getElementById("url").value),
                        suggestedDisplayName: document.getElementById('tabName').value,
                        websiteUrl: "https://sjkpcrmteamstab.azurewebsites.net/" + encodeURIComponent(document.getElementById("url").value)
                    });
                    saveEvent.notifySuccess();
                });
            }
            CRMTab.setup = setup;
            function onchange() {
                if (document.getElementById('tabName').value.length > 0 && document.getElementById("url").value.indexOf("dynamics.com") > 0) {
                    microsoftTeams.settings.setValidityState(true);
                }
            }
            CRMTab.onchange = onchange;
        })(CRMTab = Teams.CRMTab || (Teams.CRMTab = {}));
    })(Teams = SJKP.Teams || (SJKP.Teams = {}));
})(SJKP || (SJKP = {}));
