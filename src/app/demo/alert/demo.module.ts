import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {PopupService} from "jigsaw/service/popup.service";
import {AlertInDomDemoComponent} from "./in-dom/app.component";
import {AlertPopupDemoComponent} from "./popup/app.component";
import {CustomizeAlertDemoComponent} from "./customized/app.component";
import {AlertPopupDemoModule} from "./popup/app.module";
import {AlertInDomDemoModule} from "./in-dom/app.module";
import {CustomizeAlertDemoModule} from "./customized/app.module";

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
    imports: [
        RouterModule.forChild(popupDemoRoutes),
        AlertInDomDemoModule,
        AlertPopupDemoModule,
        CustomizeAlertDemoModule
    ],
    providers: [PopupService]
})
export class AlertDemoModule {
}
