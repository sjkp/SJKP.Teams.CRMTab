module SJKP.Teams.CRMTab {
    export interface ICrmAccount
    {
        name: string;
        address1_city: string;
        accountid: string;
    }
    export interface ICrmLead
    {
        subject: string;        
        fullname: string,
        leadid: string;
        salesstage: string
    }

    export interface ICrmService {
        getAccounts(): ng.IPromise<ICrmAccount[]>
        getLeads(): ng.IPromise<ICrmLead[]>
    }

    export class CrmService implements ICrmService {
        static $inject = ['$http', '$q', 'crmUrl'];

        constructor(private $http: ng.IHttpService, private $q: ng.IQService, private crmUrl: string)
        {            
        }

        public getAccounts = (): ng.IPromise<ICrmAccount[]> => {
            var deferred = this.$q.defer();

            this.$http.get(this.crmUrl + '/api/data/v8.0/accounts?$select=name,address1_city&$top=10').then((res) => {
                deferred.resolve(res.data["value"]);
            }).catch((err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }


        public getLeads = (): ng.IPromise<ICrmLead[]> => {
            var deferred = this.$q.defer();

            this.$http.get(this.crmUrl + '/api/data/v8.0/leads?$select=subject,fullname,estimatedvalue,estimatedclosedate,salesstage,revenue&$top=50').then((res) => {
                deferred.resolve(res.data["value"]);
            }).catch((err) => {
                deferred.reject(err);
            });

            return deferred.promise;
        }
    }


    app.service('crmService', CrmService);
}