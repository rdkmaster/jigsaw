import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";

import {RdkButtonModule} from "../../../../component/button/button";
import {AlertInDomDemoComponent} from "./in-dom/demo";
import {RdkAlertModule, RdkErrorAlert, RdkInfoAlert, RdkWarningAlert} from "../../../../component/alert/alert";
import {PopupService} from "../../../../service/popup.service";
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
        RdkAlertModule,
        RdkButtonModule,
    ],
    providers: [PopupService],
    entryComponents: [
        RdkInfoAlert, RdkWarningAlert, RdkErrorAlert, CustomizedAlert
    ]
})
export class AlertDemoModule {
}
