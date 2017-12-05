import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AlertPopupDemoModule} from "./popup/app.module";
import {AlertInDomDemoModule} from "./in-dom/app.module";
import {CustomizeAlertDemoModule} from "./customized/app.module";

import {AlertInDomDemoComponent} from "./in-dom/app.component";
import {AlertPopupDemoComponent} from "./popup/app.component";
import {CustomizeAlertDemoComponent} from "./customized/app.component";

export const routerConfig = [
    {
        path: 'in-dom', component: AlertInDomDemoComponent
    },
    {
        path: 'popup', component: AlertPopupDemoComponent
    },
    {
        path: 'customized', component: CustomizeAlertDemoComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        AlertInDomDemoModule,
        AlertPopupDemoModule,
        CustomizeAlertDemoModule
    ]
})
export class AlertDemoModule {
}
