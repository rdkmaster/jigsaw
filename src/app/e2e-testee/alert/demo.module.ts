import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {JigsawButtonModule} from "jigsaw/component/button/button";
import {JigsawAlertModule} from "jigsaw/component/alert/alert";
import {PopupService} from "jigsaw/service/popup.service";

import {AlertInDomDemoComponent} from "./in-dom/demo";
import {AlertPopupDemoComponent} from "./popup/demo";
import {CustomizedAlert} from "./customized/customized-alert";
import {CustomizeAlertDemoComponent} from "./customized/demo";

const popupDemoRoutes = [
    {
        path: 'in-dom', component: AlertInDomDemoComponent
    },
    {
        path: 'popup', component: AlertPopupDemoComponent
    },
    {
        path: 'customized', component: CustomizeAlertDemoComponent
    },
    {
        path: '**', //fallback router must in the last
        component: AlertInDomDemoComponent
    }
];

@NgModule({
    declarations: [
        AlertInDomDemoComponent, AlertPopupDemoComponent, CustomizeAlertDemoComponent, CustomizedAlert
    ],
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        JigsawAlertModule,
        JigsawButtonModule,
    ],
    providers: [PopupService]
})
export class AlertDemoModule {
}
