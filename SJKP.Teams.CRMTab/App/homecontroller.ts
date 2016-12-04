module SJKP.Teams.CRMTab {
    interface IHomeControllerScope extends ng.IScope
    {
        login: Function;
        accounts: ICrmLead[];
        openLink(id: string) : void;
    }

   export class HomeController {
        static $inject = ['$scope', 'adalAuthenticationService','$location', 'crmService', 'crmUrl'];

        constructor(private $scope: IHomeControllerScope, adalService, $location, private crmService: ICrmService, private crmUrl)
        { 

            crmService.getLeads().then(res => {
                this.$scope.accounts = res;
            });

            $scope.login = () => {
                adalService.login();
            }


            $scope.openLink = id => {
                window.open(this.crmUrl + '/main.aspx?etc=4&id=' + id + '&newWindow=true&pagetype=entityrecord');
            }
        }
    }    


    app.controller('homeCtrl',  HomeController);
}