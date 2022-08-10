import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AlertPopupDemoModule} from "./popup/demo.module";
import {AlertInDomDemoModule} from "./in-dom/demo.module";
import {CustomizeAlertDemoModule} from "./customized/demo.module";

import {AlertInDomDemoComponent} from "./in-dom/demo.component";
import {AlertPopupDemoComponent} from "./popup/demo.component";
import {CustomizeAlertDemoComponent} from "./customized/demo.component";

export const routerConfig = [
    {
        path: 'popup', component: AlertPopupDemoComponent
    },
    {
        path: 'in-dom', component: AlertInDomDemoComponent
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
