import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {TrustedHtmlFullModule} from "./full/demo.module";

import {TrustedHtmlFullComponent} from "./full/demo.component";
import {ListMobileDemoModule} from "../list/demo-set.module";

export const routerConfig = [
    {
        path: 'full', component: TrustedHtmlFullComponent
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
export class TrustedHtmlMobileDemoModule { }
