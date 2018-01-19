import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TrustedHtmlFullModule} from "./full/demo.module";

import {TrustedHtmlFullComponent} from "./full/demo.component";

export const routerConfig = [
    {
        path: 'full', component: TrustedHtmlFullComponent, recommended: true
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        TrustedHtmlFullModule,
    ],
    exports: [
    ],
    providers: []
})
export class TrustedHtmlDemoModule { }
