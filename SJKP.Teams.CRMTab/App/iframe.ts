/// <reference path="microsoftteams.d.ts" />
module SJKP.Teams.CRMTab {
    export function setup() {
        microsoftTeams.initialize();

        microsoftTeams.settings.registerOnSaveHandler(function (saveEvent) {

            microsoftTeams.settings.setSettings({
                contentUrl: "https://sjkpcrmteamstab.azurewebsites.net/" + encodeURIComponent((<HTMLInputElement>document.getElementById("url")).value),
                suggestedDisplayName: (<HTMLInputElement>document.getElementById('tabName')).value,
                websiteUrl: "https://sjkpcrmteamstab.azurewebsites.net/" + encodeURIComponent((<HTMLInputElement>document.getElementById("url")).value)               
            });


            saveEvent.notifySuccess();
        });
    }

    export function onchange() { 
        if ((<HTMLInputElement>document.getElementById('tabName')).value.length > 0 && (<HTMLInputElement>document.getElementById("url")).value.indexOf("dynamics.com") > 0) {
            microsoftTeams.settings.setValidityState(true);
        }
    }
}
