import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {AlertInDomDemoModule} from "./in-dom/demo.module";
import {CustomizeAlertMobileDemoModule} from "./customized/demo.module";

import {AlertInDomDemoComponent} from "./in-dom/demo.component";
import {CustomizeAlertDemoComponent} from "./customized/demo.component";

export const routerConfig = [
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
        CustomizeAlertMobileDemoModule
    ]
})
export class AlertMobileDemoModule {
}
