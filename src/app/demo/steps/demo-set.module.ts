import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {StepsHorizontalBasicModule} from "./basic/demo.module";
import {StepsHorizontalFullModule} from "./full/demo.module";
import {StepsHorizontalTrustedHTMLModule} from "./trustedHtml/demo.module";
import {StepsVerticalFullModule} from "./full-vertical/demo.module";

import {StepsHorizontalBasicComponent} from "./basic/demo.component";
import {StepsHorizontalFullComponent} from "./full/demo.component";
import {StepsVerticalFullComponent} from "./full-vertical/demo.component";
import {StepsHorizontalTrustedHTMLComponent} from "./trustedHtml/demo.component";
export const routerConfig = [
    {
        path: 'basic', component: StepsHorizontalBasicComponent,

    },
    {

        path: 'full', component: StepsHorizontalFullComponent,

    },
    {

        path: 'full-vertical', component: StepsVerticalFullModule,

    },

    {

        path: 'trustedHtml', component: StepsHorizontalTrustedHTMLComponent
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routerConfig),
        StepsHorizontalBasicModule,
        StepsHorizontalFullModule,
        StepsHorizontalTrustedHTMLModule,
        StepsVerticalFullModule
    ]
})
export class StepsDemoModule{

}
